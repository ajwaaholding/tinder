const express = require("express");
const { userAuth } = require("../middlewears/verify");
const router = express.Router();
const ConnectionRequest = require("../models/request");
const User = require("../models/user");

const { validateConnectionRequest } = require("../utils/validation");

//intrested or ignored api
router.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    // check if its from valid status or not
    validateConnectionRequest({ status });

    //check if toUserId is present in database or not
    const isToUserInDb = await User.findById({ _id: toUserId });
    if (!isToUserInDb) {
      throw new Error("User does not exist!!!");
    }

    //check if request is already present or not
    const isRequestExist = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });
    if (isRequestExist) {
      throw new Error("Request invalid!!!");
    }

    const request = new ConnectionRequest({ fromUserId, toUserId, status });
    request.save();
    res.send("Connection sent successfully!!");
  } catch (err) {
    res.status(400).send(err.message);
  }
});
// need to add pre for sendign to self lol

//rejecetd or accepted
router.post(
  "/request/received/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const status = req.params.status;
      const requestId = req.params.requestId;

      //validate status
      validateConnectionRequest({ status, type: "received" });

      //check if that request is present or not
      const userRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!userRequest) {
        throw new Error("Not Valid Request!!!");
      } else {
        userRequest.status = status;

        userRequest.save();

        res.send(`Request ${status}`);
      }
    } catch (err) {
      res.status(400).send("Request cannot be accepted!!!");
    }
  }
);

module.exports = router;

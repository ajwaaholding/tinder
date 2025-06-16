const express = require("express");
const { userAuth } = require("../middlewears/verify");
const router = express.Router();
const ConnectionRequest = require("../models/request");
const User = require("../models/user");

const { validateSendConnectionRequest } = require("../utils/validation");
//intrested or ignored api
router.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    // check if its from valid status or not
    validateSendConnectionRequest({ status });

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

module.exports = router;

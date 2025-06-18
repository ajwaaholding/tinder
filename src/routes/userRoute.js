const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewears/verify");
const ConnectionRequest = require("../models/request");
const { USER_SAFE_DATA } = require("../constants/global");

router.get("/user/requests", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const pendingRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);
    console.log(pendingRequests, "Pending Req");
    res.json({ message: "Data sent successfully", data: pendingRequests });
  } catch (err) {
    res.status(400).send("Cannot Get pending requests", err.message);
  }
});

router.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connections = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const filteredConnections = connections.map((user) => {
      if (user.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return user.toUserId;
      }
      return user.fromUserId;
    });

    res.json({
      message: "Connections fetched successfully",
      data: filteredConnections,
    });
  } catch (err) {
    res.status(400).send("Error cannot get connections ", err.message);
  }
});

module.exports = router;

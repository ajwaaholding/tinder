const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewears/verify");
const ConnectionRequest = require("../models/request");
const { USER_SAFE_DATA } = require("../constants/global");
const User = require("../models/user");

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

//user feeds
router.get("/user/feeds", userAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 20 : limit;
    const skip = (page - 1) * limit;

    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    const existingConnectionIds = new Set();

    connectionRequest.forEach((e) => {
      existingConnectionIds.add(e.fromUserId);
      existingConnectionIds.add(e.toUserId);
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(existingConnectionIds) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .skip(skip)
      .limit(limit);

    console.log(users);

    if (!users.length) {
      throw new Error("Users not present Check again Later!!");
    }

    res.json({ message: "Connectionse fetched succesfully!", data: users });
  } catch (err) {
    res.status(400).send("Cannot be fetched!!!");
  }
});
module.exports = router;

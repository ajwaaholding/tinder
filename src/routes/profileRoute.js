const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewears/verify");
const { validateUserProfileUpdate } = require("../utils/validation");
const User = require("../models/user");
//get user profile
router.get("/user/profile/view", userAuth, async (req, res) => {
  const { user } = req;

  res.send("User Profile:" + user);
});

//edit
router.patch("/user/profile/edit", userAuth, async (req, res) => {
  const { user } = req;

  try {
    validateUserProfileUpdate(req);
    const loggedInUser = user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    user.save();
    res.send("User Updated Succesfully!!!");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//update password

module.exports = router;

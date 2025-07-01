const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { userAuth } = require("../middlewears/verify");
const {
  validateUserProfileUpdate,
  validatePassword,
} = require("../utils/validation");
const User = require("../models/user");

//get user profile
router.get("/user/profile/view", userAuth, async (req, res) => {
  const { user } = req;

  res.json({ data: user, status: 1 });
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
router.patch("/user/profile/update-password", userAuth, async (req, res) => {
  try {
    const user = req.user;
    validatePassword(req);
    const password = req.body.password;
    console.log(password, "testdta");
    const passwordHash = await bcrypt.hash(password, 10);
    user.password = passwordHash;
    user.save();
    res.send("Password Changed successfully!!!");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;

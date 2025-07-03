const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { validateSignUp, validateLogin } = require("../utils/validation");

router.post("/signup", async (req, res, next) => {
  try {
    validateSignUp(req);
    const { firstName, lastName, email, age, gender, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      age,
      gender,
      password: passwordHash,
    });

    await user.save();
    res.json({
      message: "User Registered Successfully!",
      status: 1,
      data: user,
    });
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    console.log("request recieved");
    validateLogin(req);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).send("Invalid credentials");
    }
    const isPasswordValid = await user.validatePassword({
      userInputPassword: password,
    });
    if (!isPasswordValid) {
      res.status(400).send("Invalid Credentials");
    } else {
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.json({
        message: "User Logged In Successfully",
        status: 1,
        data: user,
      });
    }
  } catch (err) {
    res.status(400).send("ERROR", err.message);
  }
});

//logOut User
router.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  console.log(req.cookies.token);
  res.json({ message: "User logged Out Successfully!" });
});
module.exports = router;

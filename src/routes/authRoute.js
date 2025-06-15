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
    // await User.createIndexes();
    await user.save();
    res.send("User Registered Sucessfuly");
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    validateLogin(req);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await user.validatePassword({
      userInputPassword: password,
    });
    if (!isPasswordValid) {
      throw new Error("Invalid Credentials");
    } else {
      const token = await user.getJWT();
      res.cookie("token", token);
      res.send("User logged In Successfully!");
    }
  } catch (err) {
    res.status(400).send("ERROR", err.message);
  }
});

//logOut User

module.exports = router;

const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token not Valid!!!");
    } else {
      const decodedObj = await jwt.verify(token, "DevTinder@123");
      const { userId } = decodedObj;
      const user = await User.findById({ _id: userId });
      if (!user) {
        throw new Error("Please login Again!");
      } else {
        req.user = user;
        next();
      }
      console.log(user, "UserData");
    }
  } catch (err) {
    res.status(404).send("Cannot get details", err.message);
  }
};

//verifies JWT and returns the user
module.exports = { userAuth };

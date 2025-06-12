const validator = require("validator");

const validateSignUp = (req) => {
  const { firstName, lastName, email, password, profileUrl, age, gender } =
    req.body;

  if (firstName.length < 3)
    throw new Error("First Name cannot be less then 3 charectors");
  if (!validator.isEmail(email)) throw new Error("Email not valid");
  if (!validator.isStrongPassword(password))
    throw new Error("Password is not strong");

  if (!validator.isURL(profileUrl) || !profileUrl)
    throw new Error("Photo URL Not Valid");
  if (age < 18) throw new Error("You need to be greator than 18");
};

const validateLogin = (req) => {
  const { password, email } = req.body;
  if (!validator.isEmail(email)) {
    throw new Error("Email not Valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password not Valid!");
  }
};
module.exports = { validateSignUp, validateLogin };

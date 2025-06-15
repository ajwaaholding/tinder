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

//validate update
const validateUserProfileUpdate = (req) => {
  const allowedEdits = [
    "firstName",
    "lastName",
    "age",
    "profileUrl",
    "about",
    "skills",
  ];
  const userdata = req.body;
  const isEditAllowed = Object.keys(userdata).every((e) =>
    allowedEdits.includes(e)
  );
  if (!isEditAllowed) {
    throw new Error("Edit not allowed. Please check all fields");
  } else {
    if (
      (userdata?.firstName && userdata?.firstName?.length > 15) ||
      (userdata?.lastName && userdata?.lastName > 15)
    ) {
      throw new Error("Maximum length for Name is 15 chars");
    }
    if (userdata?.profileUrl) {
      if (!validator.isURL(userdata?.profileUrl)) {
        throw new Error("Profile Url is Invalid!!!");
      }
    }
    if (userdata?.skills && userdata?.skills?.length > 10) {
      throw new Error("Maximum Skills should be 10!!!");
    }
    if (userdata?.about && userdata?.about?.length > 500) {
      throw new Error("Maximum allowed charectors are 500");
    }
  }
};

//validate update password

module.exports = { validateSignUp, validateLogin, validateUserProfileUpdate };

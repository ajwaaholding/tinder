const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (value) {
          if (!validator.isEmail(value)) {
            throw new Error("Invalid Email");
          }
        },
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          if (!validator.isStrongPassword(value)) {
            throw new error("Password not strong");
          }
        },
      },
    },
    age: {
      type: Number,
      min: 18,
      required: true,
    },
    profileUrl: {
      type: String,
      default:
        "https://www.google.com/imgres?q=dummy%20profile&imgurl=https%3A%2F%2Fwww.mauicardiovascularsymposium.com%2Fwp-content%2Fuploads%2F2019%2F08%2Fdummy-profile-pic-300x300.png&imgrefurl=https%3A%2F%2Fwww.mauicardiovascularsymposium.com%2Fjohn-b-gordon-md-facc%2Fdummy-profile-pic-300x300%2F&docid=wxZY74AN1KvOXM&tbnid=xM0Teum5gKC_rM&vet=12ahUKEwjgl7GY3NeNAxW5TKQEHQanFl4QM3oECBoQAA..i&w=240&h=240&hcb=2&ved=2ahUKEwjgl7GY3NeNAxW5TKQEHQanFl4QM3oECBoQAA",
    },
    skills: {
      type: [String],
      default: ["React", "Nextjs", "Java"],
    },
    gender: {
      type: String,
      validate: {
        validator: function (value) {
          const acceptable = ["male", "female", "others"];
          if (!acceptable.includes(value)) {
            throw new Error("Gender Not Valid");
          }
        },
      },
    },
    about: {
      type: String,
      default: "Hello I have recently joined Dev Tinder.",
      maxLength: 500,
    },
  },
  { timestamps: true }
);

userSchema.methods.validatePassword = async function ({ userInputPassword }) {
  try {
    const user = this;
    const isPasswordValid = await bcrypt.compare(
      userInputPassword,
      user.password
    );
    return isPasswordValid;
  } catch (err) {
    res.status(400).send("Err", err.message);
  }
};

userSchema.methods.getJWT = async function () {
  try {
    const user = this;
    const token = await jwt.sign({ userId: user._id }, "DevTinder@123");
    return token;
  } catch (err) {
    res.status(400).send("JWT Generate failed!");
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;

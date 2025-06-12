const express = require("express");
const connectDB = require("./config/database");
const bcrypt = require("bcrypt");
const app = express();
const User = require("./models/user");
const cookieParser = require("cookie-parser");
const { validateSignUp, validateLogin } = require("./utils/validation");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewears/verify");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res, next) => {
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

app.post("/login", async (req, res, next) => {
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
    res.status(400).send("ERROR:", err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  const { user } = req;

  res.send("User Profile:" + user);
});
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(400).send(err.message, "Error Occured");
  }
});

connectDB()
  .then(() => {
    console.log("DB Connected Successfuly!");

    app.listen(7000, () => {
      console.log("Server Started");
    });
  })
  .catch((err) => console.log(err.message));

// app.get("/users", async (req, res) => {
//   const userId = req.body.userId;
//   try {
//     const data = await User.findById(userId);
//     if (!data) {
//       res.send("No User Found");
//     } else {
//       res.send(data);
//     }
//   } catch (err) {
//     res.status(400).send(err.message);
//   }
// });
// app.get("/feeds", async (req, res) => {
//   try {
//     const data = await User.find({});
//     if (!data.length) {
//       res.send("No Users Found");
//     } else {
//       res.send(data);
//     }
//   } catch (err) {
//     res.status(400).send(err.message);
//   }
// });

// Delete by ID
// app.delete("/users", async (req, res) => {
//   try {
//     const name = req.body.firstName;
//     await User.deleteMany({ firstName: name });
//     res.send("Users deleted successfullty");
//   } catch (err) {
//     throw new Error(err);
//   }
//   // try {
//   //   await User.findByIdAndDelete(req.body.userId);
//   //   res.send("User Deleted Successfully");
//   // } catch (err) {
//   //   throw new Error(err.message);
//   // }
// });

// app.patch("/users/:id", async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const {
//       firstName,
//       lastName = "NA",
//       email,
//       age,
//       profileUrl,
//       about,
//       skills,
//       gender,
//     } = req.body;

//     //NEVER TRUST DATA PART
//     const user = await User.findByIdAndUpdate(
//       userId,
//       { firstName, lastName, age, profileUrl, about, skills, gender },
//       {
//         returnDocument: "after",
//         runValidators: true,
//       }
//     );

//     res.send("User updated succesfully");
//   } catch (err) {
//     throw new Error(err.message);
//   }
// });

const express = require("express");
const connectDB = require("./config/database"); // also fixed the path (should be relative)
const app = express();
const User = require("./models/user");
const { validateSignUp } = require("./utils/validation");
app.use(express.json());

app.post("/signup", async (req, res, next) => {
  try {
    //Validate Data
    validateSignUp(req);
    //Encrypt Data

    // Save Data
    const { firstName, lastName, email, age, gender, password } = req.body;

    const user = new User({
      firstName,
      lastName,
      email,
      age,
      gender,
      password,
    });
    await User.createIndexes();
    await user.save();
    res.send("User Registered Sucessfuly");
  } catch (err) {
    console.log(err);
    res.status(404).send(err.message);
  }
});

app.get("/users", async (req, res) => {
  const userId = req.body.userId;
  try {
    const data = await User.findById(userId);
    if (!data) {
      res.send("No User Found");
    } else {
      res.send(data);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//Get All Users
app.get("/feeds", async (req, res) => {
  try {
    const data = await User.find({});
    if (!data.length) {
      res.send("No Users Found");
    } else {
      res.send(data);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Delete by ID
app.delete("/users", async (req, res) => {
  try {
    const name = req.body.firstName;
    await User.deleteMany({ firstName: name });
    res.send("Users deleted successfullty");
  } catch (err) {
    throw new Error(err);
  }
  // try {
  //   await User.findByIdAndDelete(req.body.userId);
  //   res.send("User Deleted Successfully");
  // } catch (err) {
  //   throw new Error(err.message);
  // }
});

app.patch("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const {
      firstName,
      lastName = "NA",
      email,
      age,
      profileUrl,
      about,
      skills,
      gender,
    } = req.body;

    //NEVER TRUST DATA PART
    const user = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, age, profileUrl, about, skills, gender },
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    res.send("User updated succesfully");
  } catch (err) {
    throw new Error(err.message);
  }
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

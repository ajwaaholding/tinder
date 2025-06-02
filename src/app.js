const express = require("express");
const connectDB = require("./config/database"); // also fixed the path (should be relative)
const app = express();
const User = require("./models/user");
//Connecting To Server

app.use(express.json());

//Register API
app.post("/signup", async (req, res, next) => {
  const data = req.body;

  const user = new User(data);
  await user.save();
  res.send("User Registered Sucessfuly");
});

//GET API for one
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
    await User.findByIdAndDelete(req.body.userId);
    res.send("User Deleted Successfully");
  } catch (err) {
    throw new Error(err.message);
  }
});

app.patch("/users", async (req, res) => {
  try {
    const userId = req.body.userId;
    const data = req.body;
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
    });
    res.send(user);
  } catch (err) {
    throw new Error(err.message);
  }
});
app.patch("/users", async (req, res) => {
  try {
    const userId = req.body.userId;
    const data = req.body;
    console.log(data, "User data");
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
    });
    res.send(user);
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

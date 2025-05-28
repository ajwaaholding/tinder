const express = require("express");
const connectDB = require("./config/database"); // also fixed the path (should be relative)
const app = express();
const User = require("./models/user");
//Connecting To Server
app.use(express.json());
app.post("/signup", async (req, res, next) => {
  const data = req.body;

  const user = new User(data);
  await user.save();
  res.send("User Registered Sucessfuly");
});

connectDB()
  .then(() => {
    console.log("DB Connected Successfuly!");
    app.listen(7000, () => {
      console.log("Server Started");
    });
  })
  .catch((err) => console.log(err.message));

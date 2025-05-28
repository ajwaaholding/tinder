const express = require("express");
const connectDB = require("./config/database"); // also fixed the path (should be relative)
const app = express();
//Connecting To Server
connectDB()
  .then(() => {
    console.log("DB Connected Successfuly!");
    app.listen(7000, () => {
      console.log("Server Started");
    });
  })
  .catch((err) => console.log(err.message));

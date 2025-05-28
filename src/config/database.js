const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://ajwaaholding:Test_123@cluster0.eakksnu.mongodb.net/Tinder"
  );
};

module.exports = connectDB;

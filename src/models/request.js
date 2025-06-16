const mongoose = require("mongoose");
const RequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: ["interested", "ignored", "accepted", "rejected"],

      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ConnectionRequest = mongoose.model("connectionRequest", RequestSchema);
module.exports = ConnectionRequest;

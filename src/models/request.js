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
// RequestSchema.pre("save", function (next) {
//   const connectionRequest = this;
//   if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
//     return next(new Error("Request cannot be sent!!"));
//   }
//   next();
// });

//indexing

RequestSchema.index({ fromUserId: 1, toUserId: 1 });
const ConnectionRequest = mongoose.model("connectionRequest", RequestSchema);
module.exports = ConnectionRequest;

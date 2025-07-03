const mongoose = require("mongoose");
const { Schema } = mongoose;

const notificationSchema = new Schema(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 150,
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    actionId: {
      type: Schema.Types.ObjectId,
      required: false,
    },
    actionType: {
      type: String,
      enum: ["task", "leave", "correction", "general"],
      default: "general",
    },
    readBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;

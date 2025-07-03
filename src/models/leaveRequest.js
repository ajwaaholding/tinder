const mongoose = require("mongoose");
const { Schema } = mongoose;

const leaveRequestSchema = new Schema(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    approverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "deleted"],
      default: "pending",
    },
    reason: {
      type: String,
      maxlength: 500,
    },
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      required: true,
    },
    managerReason: {
      type: String,
      maxlength: 500,
    },
    attachment: {
      type: String, // file path or cloud URL
    },
  },
  { timestamps: true }
);

const LeaveRequest = mongoose.model("LeaveRequest", leaveRequestSchema);
module.exports = LeaveRequest;

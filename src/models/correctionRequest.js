const mongoose = require("mongoose");
const { Schema } = mongoose;

const correctionRequestSchema = new Schema(
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

    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "deleted"],
      default: "pending",
    },

    approverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    reason: {
      type: String,
      required: true,
      maxlength: 500,
    },

    checkInTime: {
      type: Date,
    },

    checkOutTime: {
      type: Date,
    },

    managerReason: {
      type: String,
      maxlength: 500,
    },

    attachment: {
      type: String, // File path or full URL
    },
  },
  { timestamps: true }
);

const CorrectionRequest = mongoose.model(
  "CorrectionRequest",
  correctionRequestSchema
);
module.exports = CorrectionRequest;

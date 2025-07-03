const mongoose = require("mongoose");
const { Schema } = mongoose;

const attendanceSchema = new Schema(
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

    date: {
      type: Date,
      required: true,
    },

    checkIn: {
      type: Date,
    },

    checkOut: {
      type: Date,
    },

    deductions: {
      type: Number,
      default: 0,
      min: 0, // In hours or minutes as per logic
    },

    overtimeHours: {
      type: Number,
      default: 0,
      min: 0,
    },

    status: {
      type: String,
      enum: ["present", "absent", "late", "half-day", "holiday", "weekend"],
      default: "present",
    },

    correctionRequested: {
      type: Boolean,
      default: false,
    },

    correctionId: {
      type: Schema.Types.ObjectId,
      ref: "Correction",
    },

    approverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    approvedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = Attendance;

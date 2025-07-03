const mongoose = require("mongoose");
const { Schema } = mongoose;

const leaveSchema = new Schema(
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
    type: {
      type: String,
      enum: [
        "annual",
        "sick",
        "unpaid",
        "maternity",
        "paternity",
        "emergency",
        "compensatory",
      ],
      default: "annual",
    },
    total: {
      type: Number,
      required: true,
      default: 30,
    },
    taken: {
      type: Number,
      default: 0,
    },
    remaining: {
      type: Number,
      default: 30,
    },
    carryForwarded: {
      type: Number,
      default: 0,
    },
    resetDate: {
      type: Date,
    },
    notes: {
      type: String,
      maxlength: 500,
    },
  },
  { timestamps: true }
);

const Leave = mongoose.model("Leave", leaveSchema);
module.exports = Leave;

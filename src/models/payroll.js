const mongoose = require("mongoose");
const { Schema } = mongoose;

const payrollSchema = new Schema(
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
    managerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    salary: {
      type: Number,
      required: true,
      min: 0,
    },
    gratuity: {
      type: Number,
      default: 0,
    },
    deductions: {
      type: Number,
      default: 0,
    },
    netSalary: {
      type: Number,
      required: true,
    },
    payPeriod: {
      month: { type: Number, min: 1, max: 12, required: true },
      year: { type: Number, required: true },
    },
    status: {
      type: String,
      enum: ["paid", "unpaid", "pending"],
      default: "pending",
    },
    notes: {
      type: String,
      maxlength: 500,
    },
  },
  { timestamps: true }
);

const Payroll = mongoose.model("Payroll", payrollSchema);
module.exports = Payroll;

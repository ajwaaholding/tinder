const mongoose = require("mongoose");
const { Schema } = mongoose;

const departmentSchema = new Schema(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    managerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    name: {
      en: { type: String, required: true, trim: true },
      ar: { type: String, trim: true },
    },

    size: {
      type: Number,
      min: 1,
    },

    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    budget: {
      type: Number,
      min: 0,
    },
  },
  { timestamps: true }
);

const Department = mongoose.model("Department", departmentSchema);
module.exports = Department;

const mongoose = require("mongoose");
const { Schema } = mongoose;

const localizedString = {
  en: { type: String, trim: true, required: true },
  ar: { type: String, trim: true, required: true },
};

const jobSchema = new Schema(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    managerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: localizedString,
    },
    title: {
      type: localizedString,
    },
    description: {
      type: localizedString,
    },
    requiredSkills: {
      type: [String], // assuming skills are universal
      default: [],
    },
    location: {
      type: localizedString,
    },
    department: {
      type: localizedString,
    },
    candidates: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    datePosted: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["open", "closed", "on hold"],
      default: "open",
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;

const mongoose = require("mongoose");
const { Schema } = mongoose;

const localizedString = {
  en: { type: String, required: true, trim: true },
  ar: { type: String, required: true, trim: true },
};

const candidateSchema = new Schema(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    interviewerId: {
      type: Schema.Types.ObjectId,
      ref: "User", // assuming interviewer is a user
      required: false,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    resume: {
      type: String, // file URL or path
      required: false,
    },
    nationality: {
      type: String,
      required: true,
    },
    iqamaType: {
      type: String, // example: transferable, non-transferable
      required: true,
    },
    isSaudiNational: {
      type: Boolean,
      required: true,
      default: false,
    },
    status: {
      type: localizedString, // e.g., { en: "Rejected", ar: "مرفوض" }
      enum: [
        {
          en: "rejected",
          ar: "مرفوض",
        },
        {
          en: "offered",
          ar: "تم تقديم العرض",
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);

const Candidate = mongoose.model("Candidate", candidateSchema);
module.exports = Candidate;

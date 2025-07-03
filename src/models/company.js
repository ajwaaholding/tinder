const mongoose = require("mongoose");
const validator = require("validator");

const { Schema } = mongoose;

const companySchema = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      en: { type: String, required: true, trim: true },
      ar: { type: String, trim: true },
    },

    crNum: {
      type: String,
      required: true,
      trim: true,
    },

    vatNum: {
      type: String,
      required: true,
      trim: true,
    },

    gosiNum: {
      type: String,
      trim: true,
    },

    licenseNum: {
      type: String,
      trim: true,
    },

    mudadId: {
      type: String,
      trim: true,
    },

    type: {
      type: String,
      enum: ["LLC", "Corporation", "Partnership", "Sole Proprietor", "Other"],
      default: "LLC",
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, "Invalid email"],
    },

    phone: {
      type: String,
      trim: true,
    },

    website: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return v === "" || validator.isURL(v);
        },
        message: "Invalid website URL",
      },
    },

    address: {
      en: { type: String, trim: true },
      ar: { type: String, trim: true },
    },

    city: {
      en: { type: String, trim: true },
      ar: { type: String, trim: true },
    },

    region: {
      en: { type: String, trim: true },
      ar: { type: String, trim: true },
    },

    postal: {
      type: String,
      trim: true,
    },

    country: {
      type: String,
      default: "Saudi Arabia",
    },

    timezone: {
      type: String,
      default: "Asia/Riyadh",
    },

    logo: {
      type: String, // Can store public URL or Cloudinary path
    },

    teamsize: {
      type: Number,
      min: 1,
    },

    budget: {
      type: Number,
      min: 0,
    },

    establishedDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);
module.exports = Company;

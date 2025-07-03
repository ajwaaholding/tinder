const mongoose = require("mongoose");
const { Schema } = mongoose;

const assetSchema = new Schema(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employee", // assuming there's an employee model
      required: false, // optional if asset is not yet assigned
    },

    category: {
      type: {
        en: {
          type: String,
          enum: ["IT", "Other"],
          required: true,
        },
        ar: {
          type: String,
          enum: ["تقنية المعلومات", "أخرى"],
          required: true,
        },
      },
      required: true,
    },

    type: {
      type: {
        en: {
          type: String,
          enum: [
            "monitor",
            "mouse",
            "keyboard",
            "laptop",
            "pcu",
            "car",
            "phone",
            "tablet",
            "other",
          ],
        },
        ar: {
          type: String,
          enum: [
            "شاشة",
            "فأرة",
            "لوحة مفاتيح",
            "حاسوب محمول",
            "وحدة معالجة",
            "سيارة",
            "هاتف",
            "جهاز لوحي",
            "أخرى",
          ],
        },
      },
      required: true,
    },

    serialNumber: {
      type: String,
      required: false,
    },

    assignedDate: {
      type: Date,
    },

    condition: {
      type: {
        en: {
          type: String,
          enum: ["new", "used", "damaged"],
        },
        ar: {
          type: String,
          enum: ["جديد", "مستخدم", "تالف"],
        },
      },
      default: {
        en: "new",
        ar: "جديد",
      },
    },

    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

const Asset = mongoose.model("Asset", assetSchema);
module.exports = Asset;

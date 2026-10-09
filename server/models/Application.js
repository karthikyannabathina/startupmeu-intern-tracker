const mongoose = require("mongoose");

const APPLICATION_STATUSES = [
  "Wishlist",
  "Applied",
  "Assessment",
  "Interview",
  "Offer",
  "Rejected",
  "Withdrawn",
];

const applicationSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      maxlength: [100, "Company name cannot exceed 100 characters"],
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      trim: true,
      maxlength: [100, "Role cannot exceed 100 characters"],
    },
    status: {
      type: String,
      enum: {
        values: APPLICATION_STATUSES,
        message: "{VALUE} is not a valid status",
      },
      default: "Wishlist",
    },
    appliedDate: {
      type: Date,
      default: null,
    },
    deadline: {
      type: Date,
      default: null,
    },

    jobUrl: {
      type: String,
      trim: true,
      default: null,
      validate: {
        validator: (value) => {
          if (value == null || value === "") return true;
          try {
            const url = new URL(value);
            return url.protocol === "http:" || url.protocol === "https:";
          } catch {
            return false;
          }
        },
        message: "Please provide a valid http(s) URL",
      },
    },

    location: {
      type: String,
      trim: true,
      maxlength: [100, "Location cannot exceed 100 characters"],
      default: null,
    },
    salary: {
      type: Number,
      min: [0, "Salary cannot be negative"],
      default: null,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [2000, "Notes cannot exceed 2000 characters"],
      default: null,
    },
  },
  { timestamps: true },
);

// Export the status list so routes/controllers can reference it without re-defining it
applicationSchema.statics.STATUSES = APPLICATION_STATUSES;

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;

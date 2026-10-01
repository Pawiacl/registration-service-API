const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    userType: {
      type: String,
      required: true,
    },

    // Faculty field
    subject: {
      type: String,
      trim: true,
      default: null,
    },

    // Faculty Registration Number
    registrationNumber: {
      type: String,
      trim: true,
      default: null,
    },

    // Faculty Academic Year
    academicYear: {
      type: String,
      trim: true,
      default: null,
    },

    // Faculty Active / Inactive Status
    status: {
      type: Boolean,
      default: true,
    },

    // Faculty Remarks
    remarks: {
      type: String,
      trim: true,
      default: "",
    },
  }
);

module.exports = mongoose.model(
  "Registration",
  userSchema,
  "registration"
);
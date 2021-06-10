const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  image: {
    type: String,
    required: false,
    default: "default.png",
  },
  fullName: {
    type: String,
    required: true,
    default: null,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  isPhoneNumberVerified: {
    type: Boolean,
    required: false,
    default: false,
  },
  status: {
    type: String,
    required: false,
    default: "Hey There! I am using ChatUS",
  },
  password: {
    type: String,
    required: true,
  },
  list: {
    type: Array,
    required: false,
    default: null,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  senderID: {
    type: String,
    required: true,
  },
  senderName: {
    type: String,
    required: true,
  },
  receiverID: {
    type: String,
    required: true,
  },
  receiverName: {
    type: String,
    required: true,
  },
  hasSeen: {
    type: Boolean,
    required: true,
    default: false,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;

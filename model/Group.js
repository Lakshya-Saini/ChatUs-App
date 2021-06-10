const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  admin_id: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
    default: "default.png",
  },
  groupName: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  members: {
    type: Array,
    required: false,
    default: null,
  },
  chats: {
    type: Array,
    required: false,
    default: {
      id: "12345",
      name: "ChatUs Bot",
      text: "Hey There, Welcome to ChatUs",
      date: Date.now(),
    },
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Group = mongoose.model("Group", GroupSchema);

module.exports = Group;

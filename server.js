const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http");
const passport = require("passport");
const socketio = require("socket.io");
const path = require("path");
const users = require("./routes/users");
const User = require("./model/User");
const Group = require("./model/Group");
const Notification = require("./model/Notification");
const {
  addGroupUser,
  getGroupUser,
  getUsersInGroup,
  removeGroupUser,
} = require("./socket-modules/group-chats");
const {
  addUser,
  getUser,
  removeUser,
} = require("./socket-modules/friend-chats");
const { addMyGroup } = require("./socket-modules/my-groups");
const { addJoinedGroup } = require("./socket-modules/joined-groups");
const port = process.env.PORT || 5000;

// Init app
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// io connection
io.on("connection", (socket) => {
  socket.on("group_created", async ({ newGroup }, callback) => {
    const groupName = newGroup.groupName;
    const group = await Group.findOne({ groupName });
    const user_groups = await Group.find({ admin_id: group.admin_id });

    if (group) {
      const { groupAlreadyExists, myGroups } = addMyGroup({
        id: group.id,
        image: group.image,
        admin_id: group.admin_id,
        groupName: group.groupName,
        members: group.members,
        user_groups: user_groups,
      });

      if (groupAlreadyExists) return callback(groupAlreadyExists);

      socket.emit("getMyGroupData", myGroups, () => {});
    } else {
      console.log("Group Not Found");
    }
  });

  socket.on("removeJoinedGroup", async ({ user_id, group_id }) => {
    let groups = await Group.find();
    let newGroups = await groups.filter(
      (group) => group.admin_id !== user_id && group.id !== group_id
    );

    let filteredGroups = [];
    let flag = false;

    newGroups.forEach((group) => {
      group.members.forEach((member) => {
        if (JSON.stringify(member.id).replace(/["]{1,}/gi, "") === user_id) {
          flag = true;
        }
      });

      if (flag === false) {
        filteredGroups.push(group);
      }

      flag = false;
    });

    socket.emit("getAllGroupData", filteredGroups, () => {});
  });

  socket.on("getJoinedGroupData", async (group_id, callback) => {
    const group = await Group.findById(group_id);
    if (group) {
      const { groupAlreadyExists, joinedGroups } = addJoinedGroup({
        id: group.id,
        image: group.image,
        admin_id: group.admin_id,
        groupName: group.groupName,
        members: group.members,
      });

      if (groupAlreadyExists) return callback(groupAlreadyExists);

      socket.emit("joinedGroupData", joinedGroups, () => {});
    }
  });

  socket.on("group", async ({ user_id, group_id }) => {
    try {
      let user = await User.findById(user_id);
      let group = await Group.findById(group_id);

      if (!user) {
        return socket.emit("errors", { userNotFound: "User Not Found" });
      }

      if (!group) {
        return socket.emit("errors", { groupNotFound: "Group Not Found" });
      }

      socket.emit("groupData", group);

      const { existingUser, newUser } = addGroupUser({
        id: socket.id,
        user_id: user_id,
        name: user.fullName,
        image: user.image,
        groupName: group.groupName,
      });

      if (existingUser) {
        return;
      }

      socket.emit("groupMessage", {
        image: "chatbot.png",
        name: "ChatUs Bot",
        text: `Hey ${newUser.name}, Welcome to ${newUser.groupName}`,
        group: newUser.groupName,
      });

      socket.broadcast.to(newUser.groupName).emit("groupMessage", {
        image: "chatbot.png",
        name: "ChatUs Bot",
        text: `${newUser.name} has joined the chat`,
        group: newUser.groupName,
      });

      const allGroupUsers = getUsersInGroup(group.groupName);
      socket.emit("allGroupUsers", allGroupUsers);

      socket.join(newUser.groupName);
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("sendGroupMessage", async (message) => {
    const user = getGroupUser(socket.id);

    if (user) {
      io.to(user.groupName).emit("groupMessage", {
        id: user.user_id,
        image: user.image,
        name: user.name,
        text: message,
        group: user.groupName,
      });
    } else {
      socket.emit("errors", { userNotFound: "User Not Found" });
    }
  });

  socket.on("removeGroupUser", (user_id) => {
    const users = removeGroupUser(user_id);
  });

  socket.on("sendFriendRequest", async (sender_id, receiver_id) => {
    const sender = await User.findById(sender_id);
    const receiver = await User.findById(receiver_id);

    if (!sender) {
      return socket.emit("errors", { unauthorisedUser: "Unauthorised User" });
    }

    if (!receiver) {
      return socket.emit("errors", { userNotFound: "User Not Found" });
    }

    const notification = await Notification.findOne({
      senderID: sender_id,
      receiverID: receiver_id,
    });

    if (notification) {
      socket.emit("errors", {
        alreadySentRequest: "A request has already been sent to this user",
      });
      return;
    }

    let newRequest = {
      senderID: sender._id,
      senderName: sender.fullName,
      receiverID: receiver._id,
      receiverName: receiver.fullName,
      hasSeen: false,
      message: `${sender.fullName} sent you a friend request`,
      type: "request",
    };

    let request = new Notification(newRequest);
    try {
      var save = await request.save();
    } catch (err) {
      console.log(err);
    }

    socket.emit("friendRequestSent");

    io.emit("newFriendRequest", save);
  });

  socket.on(
    "friendRequestAccepted",
    async (receiverID, senderID, conversation_id) => {
      const sender = await User.findById(senderID);
      const receiver = await User.findById(receiverID);

      if (!sender)
        return socket.emit("errors", { unauthorisedUser: "Unauthorised User" });
      if (!receiver)
        return socket.emit("errors", { userNotFound: "User Not Found" });

      let newRequest = {
        senderID: sender._id,
        senderName: sender.fullName,
        receiverID: receiver._id,
        receiverName: receiver.fullName,
        hasSeen: false,
        message: `${sender.fullName} has accepted your friend request`,
        type: "confirmation",
      };

      let request = new Notification(newRequest);
      try {
        var message = await request.save();
      } catch (err) {
        console.log(err);
      }

      const senderData = {
        id: sender._id,
        name: sender.fullName,
        image: sender.image,
        status: sender.status,
        phoneNumber: sender.phoneNumber,
        conversation_id,
        isBlocked: false,
      };

      receiver.list.push(senderData);
      await receiver.save();

      io.emit(
        "friendRequestConfirmationMessage",
        message,
        senderData,
        receiverID
      );
    }
  );

  socket.on("subscribeChannel", (user, channel) => {
    const { existingUser, newUser } = addUser({
      id: socket.id,
      user_id: user.id,
      name: user.name,
      image: user.image,
      channel,
    });

    if (existingUser) return;

    socket.broadcast.to(channel).emit("message", {
      image: "chatbot.png",
      name: "ChatUs Bot",
      text: `${newUser.name} is Online`,
      channel,
    });

    socket.join(channel);
  });

  socket.on("sendMessage", async (message, user_id, channel) => {
    const user = getUser(user_id, channel);

    if (user) {
      io.to(channel).emit("message", {
        id: user.user_id,
        image: user.image,
        name: user.name,
        text: message,
        channel: user.channel,
      });
    } else {
      socket.emit("errors", { userNotFound: "User Not Found" });
    }
  });

  socket.on("removeUser", (user_id) => {
    removeUser(user_id);
  });

  socket.on("userTyping", (user, channel, isTyping) => {
    const get_user = getUser(user.id, channel);

    if (get_user) {
      isTyping
        ? io.emit("listenTyping", get_user, "typing...")
        : io.emit("listenTyping", get_user, "");
    } else {
      socket.emit("errors", { userNotFound: "User Not Found" });
    }
  });
});

// Get URI
const db = require("./config/keys").mongoURI;

// Connect database
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error in database connection"));

// Passport Config
require("./config/passport")(passport);

// Middleware
app.use(bodyParser.urlencoded({ extended: false, limit: "100mb" }));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(passport.initialize());

// Route
app.use("/api/users", users);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Connect port
server.listen(port, () => console.log(`App running on port ${port}`));

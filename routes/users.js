const express = require("express");
const router = express.Router();
const passwordHash = require("password-hash");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const cloudinary = require("../common/cloudinary");
let sendOTP = require("../common/sendOTP");
let ObjectId = require("mongodb").ObjectId;

// Load User & Group Model
const User = require("../model/User");
const Group = require("../model/Group");
const Notification = require("../model/Notification");

// Register User
router.post("/register", async (req, res) => {
  const { fullName, phoneNumber, password } = req.body;

  try {
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      const otp = otpGenerator.generate(6, {
        digits: true,
        alphabets: false,
        upperCase: false,
        specialChars: false,
      });

      const newUser = new User({
        fullName,
        phoneNumber,
        password,
        otp,
      });

      const hashedPassword = passwordHash.generate(password);

      newUser.password = hashedPassword;
      const save = await newUser.save();

      sendOTP(otp, phoneNumber);

      const payload = {
        id: newUser._id,
        name: newUser.fullName,
        image: newUser.image,
        phoneNumber: newUser.phoneNumber,
      };

      let token = jwt.sign(payload, keys.secretOrKey, { expiresIn: 31556926 });

      res.status(200).json({ data: save, token: token });
    } else {
      return res.status(200).json({
        userAlreadyRegistered: "Phone Number is already registered",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

// Login User
router.post("/login", async (req, res) => {
  const { phoneNumber, password } = req.body;

  const user = await User.findOne({ phoneNumber });
  if (!user) {
    return res.status(200).json({
      phoneNumberNotFound: "Could not find this Phone Number",
    });
  }

  const checkPassword = passwordHash.verify(password, user.password);
  if (!checkPassword)
    return res.status(200).json({ incorrectPassword: "Incorrect Password" });

  const payload = {
    id: user._id,
    name: user.fullName,
    image: user.image,
    phoneNumber: user.phoneNumber,
  };

  let token = jwt.sign(payload, keys.secretOrKey, { expiresIn: 31556926 });
  res.status(200).json({ token: token });
});

// Verify-OTP
router.post("/verify-otp", async (req, res) => {
  const otp = req.body.otp;
  const phoneNumber = req.body.user.phoneNumber;

  try {
    const user = await User.findOne({ phoneNumber });
    if (user) {
      if (user.otp !== parseInt(otp))
        return res.status(200).json({ invalidOTP: "Invalid OTP" });
      else {
        user.isPhoneNumberVerified = true;
        const save = await user.save();
        return res
          .status(200)
          .json({ phoneNumberVerified: "Number Verified", data: save });
      }
    } else {
      return res
        .status(200)
        .json({ invalidPhoneNumber: "Invalid Phone Number" });
    }
  } catch (err) {
    console.log(err);
  }
});

// Check Phone No Verified
router.get("/check-phone-no-verified/:id", async (req, res) => {
  const user_id = req.params.id;
  const user = await User.findById(user_id);

  if (user) {
    const isPhoneNoVerified = user.isPhoneNumberVerified;
    return res.status(200).json({ isPhoneNoVerified });
  } else {
    return res.status(200).json({ invalidUser: "Invalid User" });
  }
});

// Get User Data
router.get("/get-user-data/:id", async (req, res) => {
  const user_id = req.params.id;

  const user = await User.findById(user_id);
  if (user) {
    const user_data = {
      id: user._id,
      name: user.fullName,
      image: user.image,
      phoneNumber: user.phoneNumber,
      status: user.status,
      date: user.date,
    };

    return res.status(200).json({ user: user_data });
  } else {
    return res.status(200).json({ invalidUser: "Invalid User" });
  }
});

// Add Group
router.post("/add-group", async (req, res) => {
  const { user_id, groupName, key } = req.body;

  try {
    const user = await User.findById(user_id);
    if (user) {
      const group = await Group.findOne({ groupName });
      if (group) {
        return res
          .status(200)
          .json({ groupExists: "Group already exists. Try different name" });
      }

      const newGroup = new Group({
        admin_id: user_id,
        groupName: groupName,
        key: key,
      });

      // Hash Key
      const hashedKey = passwordHash.generate(key);
      // Save Hashed Key
      newGroup.key = hashedKey;
      const save = await newGroup.save();
      res.status(200).json({ groupAdded: "Group Added", data: save });
    } else {
      res.status(200).json({ invalidUser: "Invalid User" });
    }
  } catch (err) {
    console.log(err);
  }
});

// Fetch My Groups
router.get("/fetch-my-groups/:id", async (req, res) => {
  const user_id = req.params.id;

  try {
    const group = await Group.find({ admin_id: user_id });
    if (group) {
      res.status(200).json({ group });
    } else {
      res.status(200).json({ invalidUser: "Invalid User" });
    }
  } catch (err) {
    console.log(err);
  }
});

// Fetch All Groups
router.get("/fetch-all-groups/:id", async (req, res) => {
  const user_id = req.params.id;
  let flag = false;
  let filteredGroups = [];

  try {
    if (!user_id) {
      return res.status(200).json({ invalidUser: "Invalid User" });
    }

    const allGroups = await Group.find({});
    const newGroup = await allGroups.filter(
      (group) => group.admin_id !== user_id
    );

    if (newGroup) {
      newGroup.forEach((group) => {
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
      return res.status(200).json({ filteredGroups });
    }
  } catch (err) {
    console.log(err);
  }
});

// Verify Group Join Key
router.get("/verify-group-join-key/:id/:key/:user_id", async (req, res) => {
  const group_id = req.params.id;
  const groupKey = req.params.key;
  const user_id = req.params.user_id;

  const user = await User.findById(user_id);

  if (user) {
    const group = await Group.findById(group_id);

    if (group) {
      const key = passwordHash.verify(groupKey, group.key);

      if (key) {
        const newGroupMember = {
          id: user._id,
        };

        group.members.push(newGroupMember);
        await group.save();

        return res.status(200).json({
          keyVerified: "Key Verified",
        });
      } else {
        return res.status(200).json({ incorrectKey: "Incorrect Key" });
      }
    } else {
      return res.status(200).json({ groupNotFound: "Group Not Found" });
    }
  } else {
    return res.json({ invalidUser: "Invalid User" });
  }
});

// Get User Joined Groups
router.get("/get-joined-groups/:id", async (req, res) => {
  const user_id = req.params.id;
  const user = await User.findById(user_id);
  const allGroups = await Group.find({});
  const filteredGroups = await allGroups.filter(
    (group) => group.admin_id !== user_id
  );
  let joinedGroupsList = [];

  if (user) {
    filteredGroups.forEach((group) => {
      group.members.forEach((member) => {
        if (JSON.stringify(member.id).replace(/["]{1,}/gi, "") === user_id) {
          joinedGroupsList.push(group);
        }
      });
    });
  } else {
    return res.status(200).json({ invalidUser: "Invalid User" });
  }
  res.status(200).json({ joinedGroupsList });
});

// Fetch Group Data When Clicked
router.get("/get-group-data-when-clicked/:id", async (req, res) => {
  const group_id = req.params.id;

  try {
    const group = await Group.findById(group_id);
    if (group) {
      res.status(200).json({ group });
    } else {
      res.status(200).json({ invalidGroupID: "Invalid Group ID" });
    }
  } catch (err) {
    console.log(err);
  }
});

// Submit User Profile
router.post("/submit-profile", async (req, res) => {
  const { fullName, status } = req.body.profileData;
  const { phoneNumber } = req.body.decoded;

  try {
    const user = await User.findOne({ phoneNumber });

    if (user) {
      user.fullName = fullName.trim();
      user.status = status.trim();
      if (req.body.profileData.image) {
        user.image = user._id;
        await cloudinary.uploader.upload(req.body.profileData.image.trim(), {
          upload_preset: "chatus-app",
          public_id: user._id,
        });
      }
      await user.save();

      return res.status(200).json({
        profileDataSubmitted: "Profile Updated",
      });
    } else {
      return res
        .status(200)
        .json({ invalidPhoneNumber: "Invalid Phone Number" });
    }
  } catch (err) {
    res.status(200).json({
      profileUpdateError:
        "Sorry, due to some technical issue your profile cannot be updated. Try again later",
    });
  }
});

// Get User Profile Image From Cloudinary
router.get("/get-user-profile-image-from-cloudinary", async (req, res) => {
  try {
    const { resources } = await cloudinary.search
      .expression("folder:chatus-app")
      .max_results(100)
      .execute();

    if (resources) {
      let allProfileImages = [];

      resources.forEach((resource) => {
        const new_resource = {
          filename: resource.filename,
          secure_url: resource.secure_url,
        };
        allProfileImages.push(new_resource);
      });

      res.status(200).send({ allProfileImages });
    } else {
      res.status(200).send({ noImageFound: "No Image Found" });
    }
  } catch (err) {
    console.log(err);
  }
});

// Exit Joined Groups
router.get("/exit-joined-group/:user_id/:group_id", async (req, res) => {
  const { user_id } = req.params;
  const { group_id } = req.params;

  const group = await Group.findById(group_id);
  if (group) {
    await Group.updateOne(
      { _id: group_id },
      { $pull: { members: { id: ObjectId(user_id) } } },
      { safe: true },
      (err, obj) => {
        if (err) console.log(err);
        console.log(obj);
      }
    );

    const filteredGroup = group.members.filter(
      (member) => JSON.stringify(member.id).replace(/["]{1,}/gi, "") !== user_id
    );

    return res.status(200).json({ filteredGroup });
  } else {
    return res.status(200).json({ invalidGroup: "Invalid Group" });
  }
});

// Delete User Created Group
router.get(
  "/delete-user-created-group/:user_id/:group_id",
  async (req, res) => {
    const { user_id } = req.params;
    const { group_id } = req.params;

    const group = await Group.findById(group_id);
    if (group) {
      const deleted_group = await group.deleteOne();

      const filteredGroup = await Group.find({ admin_id: user_id });

      return res.status(200).json({ filteredGroup });
    } else {
      return res.status(200).json({ invalidGroup: "Invalid Group" });
    }
  }
);

// Get all Users
router.get("/get-all-users/:id", async (req, res) => {
  const user_id = req.params.id;
  const allUsers = await User.find({});
  const current_user = await User.findById(user_id);
  let users = [];

  if (allUsers) {
    const filteredUsers = allUsers.filter(
      (user) => JSON.stringify(user._id).replace(/["]{1,}/gi, "") !== user_id
    );

    if (current_user.list.length > 0) {
      filteredUsers.forEach((user) => {
        let isMatched = false;

        current_user.list.forEach((friend) => {
          if (
            JSON.stringify(friend.id).replace(/["]{1,}/gi, "") ===
            JSON.stringify(user._id).replace(/["]{1,}/gi, "")
          ) {
            isMatched = true;
            return;
          }
        });

        if (!isMatched) users.push(user);
      });
    } else {
      users = [...filteredUsers];
    }

    return res.status(200).json({ users });
  } else {
    return res.status(200).json({ noUserFound: "No User Found" });
  }
});

// Get all Notifications
router.get("/get-all-notifications/:id", async (req, res) => {
  const user_id = req.params.id;
  const user = await User.findById(user_id);

  if (!user) return res.status(200).json({ userNotFound: "User Not Found" });

  const notifications = await Notification.find({});

  const filteredNotifications = notifications.filter(
    (notification) => notification.receiverID === user_id
  );

  return res.status(200).json({ notifications: filteredNotifications });
});

// Update Notification Seen
router.get("/update-notification-seen/:r_id", async (req, res) => {
  const receiver_id = req.params.r_id;

  const allNotifications = await Notification.find({});

  const notifications = await allNotifications.filter(
    (n) => n.receiverID === receiver_id
  );

  if (notifications) {
    notifications.forEach(async (notification) => {
      notification.hasSeen = true;
      await notification.save();
    });

    return res.status(200).json({ updated: "Updated" });
  }
});

// Decline Friend Request
router.get("/decline-friend-request/:s_id/:r_id", async (req, res) => {
  const sender_id = req.params.s_id;
  const receiver_id = req.params.r_id;

  const notification = await Notification.findOne({
    senderID: sender_id,
    receiverID: receiver_id,
  });

  const allNotifications = await Notification.find({});

  if (notification) {
    await notification.deleteOne();

    let filteredNotifications = await allNotifications.filter(
      (n) => n.receiverID === receiver_id && n.senderID !== sender_id
    );

    return res.status(200).json({ notifications: filteredNotifications });
  } else {
    return res
      .status(200)
      .json({ notificationNotFound: "Notification Not Found" });
  }
});

// Get Sender Info and Delete Notification
router.get(
  "/get-sender-info-and-delete-notification/:s_id/:r_id/:c_id",
  async (req, res) => {
    const sender_id = req.params.s_id;
    const receiver_id = req.params.r_id;
    const conversation_id = req.params.c_id;

    const notification = await Notification.findOne({
      senderID: sender_id,
      receiverID: receiver_id,
    });

    const allNotifications = await Notification.find({});

    if (notification) {
      await notification.deleteOne();

      const sender = await User.findById(sender_id);
      if (!sender)
        return res.status(200).json({ userNotFound: "User Not Found" });

      const senderData = {
        id: sender._id,
        name: sender.fullName,
        image: sender.image,
        status: sender.status,
        phoneNumber: sender.phoneNumber,
        conversation_id,
        isBlocked: false,
      };

      const receiver = await User.findById(receiver_id);
      if (receiver) {
        receiver.list.push(senderData);
        await receiver.save();
      }

      let filteredNotifications = await allNotifications.filter(
        (n) => n.senderID !== sender_id
      );

      return res
        .status(200)
        .json({ notifications: filteredNotifications, user: senderData });
    } else {
      return res
        .status(200)
        .json({ notificationNotFound: "Notification Not Found" });
    }
  }
);

// Get Friend List
router.get("/get-friend-list/:id", async (req, res) => {
  const user_id = req.params.id;

  const user = await User.findById(user_id);
  if (!user) return res.status(200).json({ userNotFound: "User Not Found" });

  const friend_list = user.list;
  let allFriends = [];
  if (friend_list && friend_list.length > 0) {
    friend_list.forEach((friend) => {
      if (!friend.isBlocked) {
        allFriends.push(friend);
      }
    });
  }

  res.status(200).json({ allFriends });
});

// Block User
router.post("/block-user", async (req, res) => {
  const { user_id } = req.body;
  const { friend_id } = req.body;
  const { conversation_id } = req.body;

  const user = await User.findById(user_id);
  if (!user) return res.status(200).json({ userNotFound: "User Not Found" });

  const friend = await User.findById(friend_id);
  if (!friend)
    return res.status(200).json({ friendNotFound: "Friend Not Found" });

  const friendData = {
    id: friend._id,
    name: friend.fullName,
    image: friend.image,
    status: friend.status,
    phoneNumber: friend.phoneNumber,
    conversation_id,
    isBlocked: true,
  };

  user.list.forEach(async (friend) => {
    if (JSON.stringify(friend.id).replace(/["]{1,}/gi, "") === friend_id) {
      const index = user.list.indexOf(friend);
      user.list.splice(index, 1);
      user.list.push(friendData);
      await user.save();
    }
  });

  const filtered_friends = user.list.filter(
    (friend) => JSON.stringify(friend.id).replace(/["]{1,}/gi, "") !== friend_id
  );

  res.status(200).json({ friends: filtered_friends });
});

module.exports = router;

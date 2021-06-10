import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import {
  SET_CURRENT_USER,
  USER_REGISTERED,
  LOADING,
  SET_JOINED_GROUPS,
  MY_CREATED_GROUPS,
  ALL_GROUPS,
  SET_DATA,
  GROUP_MESSAGE,
  SET_CURRENT_SOCKET,
  SET_GROUP_SOCKETS,
  SET_CURRENT_CHANNEL,
  SET_CURRENT_USER_DECODED,
  SET_CURRENT_USER_PROFILE_IMAGE,
  SET_ALL_GROUP_USERS,
  SET_USER_SEARCHED_GROUPS,
  SET_ALL_USERS,
  SET_FRIEND_REQUEST,
  DELETE_FRIEND_REQUEST,
  SET_ALL_NOTIFICATIONS,
  SET_FRIEND_LIST,
  SET_ALL_FRIENDS,
  SET_FRIEND_REQUEST_CONFIRMATION,
  SET_MESSAGE,
  USER_TYPING,
} from "./types";
import { io, endPoint } from "../services/socket.js";

// Register User
export const registerUserForm = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/register", userData)
    .then((res) => {
      if (res.data.userAlreadyRegistered) {
        return toast.error("Phone Number is already registered");
      }
      dispatch(userRegistered());
      const { token } = res.data;
      sessionStorage.setItem("jwtToken", token);
      setAuthToken(token);
      dispatch(setCurrentUser(token));
      history.push("/verify");
    })
    .catch((err) => console.log(err));
};

// Login User
export const loginUserForm = (userData, history) => (dispatch) => {
  axios.post("/api/users/login", userData).then((res) => {
    if (res.data.phoneNumberNotFound) {
      return toast.error(res.data.phoneNumberNotFound);
    }

    if (res.data.incorrectPassword) {
      return toast.error(res.data.incorrectPassword);
    }

    const { token } = res.data;
    sessionStorage.setItem("jwtToken", token);
    dispatch(setCurrentUser(token));
    history.push("/chat");
  });
};

// User OTP
export const userOTP = (otp, user, history) => (dispatch) => {
  try {
    var decoded = jwt_decode(user);
  } catch (err) {
    console.log(err);
  }

  const userData = {
    otp,
    user: decoded,
  };

  axios
    .post("/api/users/verify-otp", userData)
    .then((res) => {
      if (res.data.invalidOTP) {
        return toast.error(res.data.invalidOTP);
      }

      if (res.data.phoneNumberVerified) {
        history.push("/chat");
      }

      if (res.data.invalidPhoneNumber) {
        history.push("/login");
      }
    })
    .catch((err) => console.log(err));
};

// Check if Phone No is Verified
export const checkPhoneNoVerified = (encoded_user) => (dispatch) => {
  try {
    const decoded_user = jwt_decode(encoded_user);
    var user_id = decoded_user.id;
  } catch (err) {
    console.log(err);
  }

  axios
    .get(`/api/users/check-phone-no-verified/${user_id}`)
    .then((res) => {
      if (res.data.invalidUser) {
        return toast.error(res.data.invalidUser);
      }

      if (res.data.isPhoneNoVerified) {
        // sessionStorage.setItem("phoneNumberVerified", true);
      }
    })
    .catch((err) => console.log(err));
};

// Add Group
export const addGroup = (groupName, key, user) => (dispatch) => {
  try {
    const new_user = jwt_decode(user);
    var user_id = new_user.id;
  } catch (err) {
    console.log(err);
  }

  const newGroup = {
    user_id,
    groupName,
    key,
  };

  axios
    .post("/api/users/add-group", newGroup)
    .then((res) => {
      const socket = io(endPoint);

      if (res.data.invalidUser) {
        return toast.error(res.data.invalidUser);
      }
      if (res.data.groupExists) {
        return toast.error(res.data.groupExists);
      }

      socket.emit("group_created", { newGroup }, () => {});

      socket.on("getMyGroupData", (group) => {
        dispatch(setMyCreatedGroups(group));
      });

      toast.success(res.data.groupAdded);
    })
    .catch((err) => console.log(err));
};

// Fetch My Groups
export const fetchMyGroups = (user) => (dispatch) => {
  try {
    const newUser = jwt_decode(user);
    var user_id = newUser.id;
  } catch (err) {
    console.log(err);
  }

  axios
    .get(`/api/users/fetch-my-groups/${user_id}`)
    .then((res) => {
      if (res.data.invalidUser) {
        return toast.error(res.data.invalidUser);
      }
      dispatch(setMyCreatedGroups(res.data.group));
    })
    .catch((err) => console.log(err));
};

// Fetch All Groups
export const fetchAllGroups = (user) => (dispatch) => {
  try {
    const newUser = jwt_decode(user);
    var user_id = newUser.id;
  } catch (err) {
    console.log(err);
  }

  axios
    .get(`/api/users/fetch-all-groups/${user_id}`)
    .then((res) => {
      if (res.data.invalidUser) {
        return toast.error(res.data.invalidUser);
      }
      dispatch(setAllGroups(res.data.filteredGroups));
    })
    .catch((err) => console.log(err));
};

// Get User Joined Groups
export const getJoinedGroups = (user) => (dispatch) => {
  try {
    const decoded = jwt_decode(user);
    var user_id = decoded.id;
  } catch (err) {
    console.log(err);
  }

  axios
    .get(`/api/users/get-joined-groups/${user_id}`)
    .then((res) => {
      if (res.data.invalidUser) {
        return toast.error(res.data.invalidUser);
      }
      dispatch(setJoinedGroups(res.data.joinedGroupsList));
    })
    .catch((err) => console.log(err));
};

// Verify Group Join Key
export const verifyGroupJoinKey = (groupData, user) => (dispatch) => {
  const { group_id, groupKey } = groupData;

  try {
    const decoded = jwt_decode(user);
    var user_id = decoded.id;
  } catch (err) {
    console.log(err);
  }

  axios
    .get(`/api/users/verify-group-join-key/${group_id}/${groupKey}/${user_id}`)
    .then((res) => {
      const socket = io(endPoint);

      if (res.data.invalidUser) {
        return toast.error(res.data.invalidUser);
      }
      if (res.data.groupNotFound) {
        return toast.error(res.data.groupNotFound);
      }
      if (res.data.incorrectKey) {
        return toast.error(res.data.incorrectKey);
      }

      socket.emit("removeJoinedGroup", { user_id, group_id }, () => {});
      socket.emit("getJoinedGroupData", group_id, () => {});

      socket.on("getAllGroupData", (group) => {
        dispatch(setAllGroups(group));
      });

      socket.on("joinedGroupData", (group) => {
        dispatch(setJoinedGroups(group));
      });

      toast.success(res.data.keyVerified);

      return () => {
        socket.emit("disconnect");
        socket.off();
      };
    })
    .catch((err) => console.log(err));
};

// Make Socket Connection
export const newGroupSocketConnection = (
  groupSockets,
  encoded_user,
  group_id
) => (dispatch) => {
  try {
    const decoded_user = jwt_decode(encoded_user);
    var user_id = decoded_user.id;
  } catch (err) {
    console.log(err);
  }

  var socket = io(endPoint);
  let isMatched = false;

  if (groupSockets === undefined) {
    let newGroupSocket = {
      group_id,
      socket,
    };

    dispatch(setGroupSockets(newGroupSocket));
  } else {
    groupSockets.forEach((group) => {
      if (group.group_id === group_id) {
        socket = group.socket;
        isMatched = true;
        return;
      }
    });
  }

  if (!isMatched) {
    let newGroupSocket = {
      group_id,
      socket,
    };

    dispatch(setGroupSockets(newGroupSocket));
  }

  socket.emit("group", { user_id, group_id });

  socket.on("groupData", (groupData) => {
    dispatch(setData(groupData));
    dispatch(setCurrentChannel(groupData.groupName));
  });

  socket.on("errors", (error) => {
    if (error.groupNotFound) {
      return toast.error(
        `Sorry, ${error.groupNotFound}. It seems that admin has deleted this group`
      );
    }
    if (error.userNotFound) {
      return toast.error(error.userNotFound);
    }
  });

  socket.on("allGroupUsers", (users) => {
    dispatch(setAllGroupUsers(users));
  });

  dispatch(listenGroupMessage(socket));
  dispatch(setCurrentSocket(socket));

  return () => {
    socket.off("groupData");
    socket.off("allGroupUsers");
    socket.off("errors");
  };
};

// Send Message on Socket Connection
export const sendGroupMessage = (socket, message) => (dispatch) => {
  socket.emit("sendGroupMessage", message, () => {});

  socket.off("errors").on("errors", (error) => {
    if (error.userNotFound) {
      return toast.error(error.userNotFound);
    }
  });

  dispatch(listenGroupMessage(socket));
};

// Listen On Message Event On Socket Connection
export const listenGroupMessage = (socket) => (dispatch) => {
  socket.off("groupMessage").on("groupMessage", (message) => {
    dispatch(groupMessage(message));
  });

  return () => {
    socket.off("groupMessage");
  };
};

// Get Current User Data
export const getCurrentUserData = (encoded_user) => (dispatch) => {
  try {
    const decoded_user = jwt_decode(encoded_user);
    var user_id = decoded_user.id;
  } catch (err) {
    console.log(err);
  }

  axios
    .get(`/api/users/get-user-data/${user_id}`)
    .then((res) => {
      if (res.data.invalidUser) {
        return toast.error(res.data.invalidUser);
      }
      dispatch(setCurrentUserDecoded(res.data.user));
      sessionStorage.setItem("currentUser", JSON.stringify(res.data.user));
    })
    .catch((err) => console.log(err));
};

// Send Profile Data
export const submitProfile = (profileData, user) => (dispatch) => {
  try {
    var decoded = jwt_decode(user);
  } catch (err) {
    console.log(err);
  }

  axios({
    url: "/api/users/submit-profile",
    method: "post",
    data: { profileData, decoded },
    maxContentLength: 1000000,
    headers: { "Content-type": "application/json" },
  })
    .then((res) => {
      if (res.data.profileUpdateError)
        return toast.error(res.data.profileUpdateError);

      if (res.data.invalidPhoneNumber)
        return toast.error(res.data.invalidPhoneNumber);

      if (res.data.profileDataSubmitted) {
        dispatch(getCurrentUserData(user));
        dispatch(getUserProfileImageFromCloudinary());
        return toast.success(res.data.profileDataSubmitted);
      }
    })
    .catch((err) => console.log(err));
};

// Fetch User Profile Image From Cloudinary
export const getUserProfileImageFromCloudinary = () => (dispatch) => {
  axios
    .get("/api/users/get-user-profile-image-from-cloudinary")
    .then((res) => {
      if (res.data.noImageFound) {
        return toast.error(res.data.noImageFound);
      }

      if (res.data.allProfileImages) {
        sessionStorage.setItem(
          "userProfileImages",
          JSON.stringify(res.data.allProfileImages)
        );
        dispatch(setCurrentUserProfileImage(res.data.allProfileImages));
      }
    })
    .catch((err) => console.log(err));
};

// Exit From Joined Group
export const exitJoinedGroup = (user_id, group_id) => (dispatch) => {
  axios
    .get(`/api/users/exit-joined-group/${user_id}/${group_id}`)
    .then((res) => {
      if (res.data.invalidGroup) {
        return toast.error(res.data.invalidGroup);
      }

      dispatch(setJoinedGroups(res.data.filteredGroup));
      dispatch(setData(null));
      return toast.success("Group exited");
    })
    .catch((err) => console.log(err));
};

// Delete My Created Group
export const deleteUserCreatedGroup = (user_id, group_id) => (dispatch) => {
  axios
    .get(`/api/users/delete-user-created-group/${user_id}/${group_id}`)
    .then((res) => {
      if (res.data.invalidGroup) {
        return toast.error(res.data.invalidGroup);
      }

      dispatch(setMyCreatedGroups(res.data.filteredGroup));
      dispatch(setData(null));
      return toast.success("Group deleted");
    })
    .catch((err) => console.log(err));
};

// Delete User in Group When User Refreshes
export const deleteUserInGroupWhenRefresh = (encoded_user) => (dispatch) => {
  const socket = io(endPoint);

  try {
    var user = jwt_decode(encoded_user);
  } catch (err) {
    console.log(err);
  }

  socket.emit("removeGroupUser", user.id);
};

// Get all Users
export const getAllUsers = (encoded_user) => (dispatch) => {
  try {
    const decoded_user = jwt_decode(encoded_user);
    var user_id = decoded_user.id;
  } catch (err) {
    console.log(err);
  }

  axios.get(`/api/users/get-all-users/${user_id}`).then((res) => {
    if (res.data.userNotFound) {
      return toast.error(res.data.userNotFound);
    }

    dispatch(setAllUsers(res.data.users));
  });
};

// Send Friend Request
export const sendFriendRequest = (sender_id, receiver_id) => (dispatch) => {
  const socket = io(endPoint);
  socket.emit("sendFriendRequest", sender_id, receiver_id);

  socket.off("errors").on("errors", (error) => {
    if (error.unauthorisedUser) return toast.error(error.unauthorisedUser);
    if (error.userNotFound) return toast.error(error.userNotFound);
    if (error.alreadySentRequest) return toast.error(error.alreadySentRequest);
  });

  socket.off("friendRequestSent").on("friendRequestSent", () => {
    return toast.success("Friend Request Sent");
  });
};

// Receive Friend Request
export const receiveFriendRequest = (encoded_user) => (dispatch) => {
  try {
    const decoded_user = jwt_decode(encoded_user);
    var user_id = decoded_user.id;
  } catch (err) {
    console.log(err);
  }

  const socket = io(endPoint);

  socket.off("newFriendRequest").on("newFriendRequest", (request) => {
    if (request.receiverID === user_id) {
      dispatch(setFriendRequest(request));
    }
  });
};

// Update Notification Seen
export const updateNotificationSeen = (receiver_id, history) => (dispatch) => {
  axios
    .get(`/api/users/update-notification-seen/${receiver_id}`)
    .then((res) => {
      if (res.data.updated) {
        history.push("/all-notifications");
      }
    })
    .catch((err) => console.log(err));
};

// Decline Friend Request
export const declineFriendRequest = (sender_id, receiver_id) => (dispatch) => {
  axios
    .get(`/api/users/decline-friend-request/${sender_id}/${receiver_id}`)
    .then((res) => {
      if (res.data.notificationNotFound)
        return toast.error(res.data.notificationNotFound);

      if (res.data.notifications) {
        dispatch(setAllNotifications(res.data.notifications));
        return toast.success("Request Deleted");
      }
    })
    .catch((err) => console.log(err));
};

// Get All Notifications
export const getAllNotifications = (encoded_user) => (dispatch) => {
  try {
    const decoded_user = jwt_decode(encoded_user);
    var user_id = decoded_user.id;
  } catch (err) {
    console.log(err);
  }

  axios.get(`/api/users/get-all-notifications/${user_id}`).then((res) => {
    if (res.data.userNotFound) return toast.error(res.data.userNotFound);
    dispatch(setAllNotifications(res.data.notifications));
  });
};

// Get Sender Info and Delete Notification
export const getSenderInfoAndDeleteNotificationFromDB = (
  senderID,
  receiverID,
  conversation_id
) => (dispatch) => {
  axios
    .get(
      `/api/users/get-sender-info-and-delete-notification/${senderID}/${receiverID}/${conversation_id}`
    )
    .then((res) => {
      if (res.data.userNotFound) return toast.error(res.data.userNotFound);
      if (res.data.notificationNotFound)
        return toast.error(res.data.notificationNotFound);

      dispatch(setAllNotifications(res.data.notifications));
      dispatch(setFriendList(res.data.user));
    })
    .catch((err) => console.log(err));
};

// Get Friend List
export const getFriendList = (encoded_user) => (dispatch) => {
  try {
    const decoded_user = jwt_decode(encoded_user);
    var user_id = decoded_user.id;
  } catch (err) {
    console.log(err);
  }

  axios
    .get(`/api/users/get-friend-list/${user_id}`)
    .then((res) => {
      if (res.data.userNotFound) return toast.error(res.data.userNotFound);
      dispatch(setAllFriends(res.data.allFriends));
    })
    .catch((err) => console.log(err));
};

// Send Notification to Sender
export const sendNotificationToSender = (
  senderID,
  receiverID,
  encoded_user,
  conversation_id
) => (dispatch) => {
  const my_id = receiverID;
  const user_id = senderID;
  const socket = io(endPoint);

  socket.emit("friendRequestAccepted", user_id, my_id, conversation_id);

  socket.on("errors", (error) => {
    if (error.unauthorisedUser) return toast.error(error.unauthorisedUser);
    if (error.userNotFound) return toast.error(error.userNotFound);
  });

  dispatch(getRequestAcceptedNotification(encoded_user));

  toast.success("Friend Request Accepted");

  return () => {
    socket.off("errors");
  };
};

// Get Request Accepted Notification
export const getRequestAcceptedNotification = (encoded_user) => (dispatch) => {
  try {
    const decoded_user = jwt_decode(encoded_user);
    var user_id = decoded_user.id;
  } catch (err) {
    console.log(err);
  }
  const socket = io(endPoint);

  socket.on("friendRequestConfirmationMessage", (message, senderData, id) => {
    if (id === user_id) {
      dispatch(setFriendRequestConfirmation(message));
      dispatch(setFriendList(senderData));
    }
  });

  return () => {
    socket.off("friendRequestConfirmationMessage");
  };
};

// Set Friend Data in Chats Header
export const setFriendDataInChatHeader = (friend) => (dispatch) => {
  dispatch(setData(friend));
  dispatch(setCurrentChannel(friend.conversation_id));
};

// Subscribe Channel
export const subscribeChannel = (decoded_user, channel) => (dispatch) => {
  const socket = io(endPoint);

  socket.emit("subscribeChannel", decoded_user, channel);
  dispatch(listenMessage(socket));
  dispatch(setCurrentSocket(socket));
};

// Send Message
export const sendMessage = (socket, message, user, channel) => (dispatch) => {
  socket.emit("sendMessage", message, user.id, channel);

  socket.off("errors").on("errors", (error) => {
    if (error.userNotFound) {
      return toast.error(error.userNotFound);
    }
  });

  dispatch(listenMessage(socket));
};

// Listen Message
export const listenMessage = (socket) => (dispatch) => {
  socket.off("message").on("message", (message) => {
    dispatch(setMessage(message));
  });

  return () => {
    socket.off("message");
  };
};

// Unsubscribe Channel When Page Refreshes
export const unsubscribeChannel = (encoded_user) => (dispatch) => {
  const socket = io(endPoint);

  try {
    var user = jwt_decode(encoded_user);
  } catch (err) {
    console.log(err);
  }

  socket.emit("removeUser", user.id);
};

// Block User
export const blockUser = (user_id, friend_id, conversation_id) => (
  dispatch
) => {
  axios
    .post("/api/users/block-user", { user_id, friend_id, conversation_id })
    .then((res) => {
      if (res.data.userNotFound) return toast.error(res.data.userNotFound);
      if (res.data.friendNotFound) return toast.error(res.data.friendNotFound);

      dispatch(setAllFriends(res.data.friends));
      dispatch(setData(null));
      return toast.success("User Blocked");
    })
    .catch((err) => console.log(err));
};

// User Typing Indicator
let socket = io(endPoint);
export const userTyping = (user, channel, isTyping) => (dispatch) => {
  socket.emit("userTyping", user, channel, isTyping);

  socket.off("errors").on("errors", (error) => {
    if (error.userNotFound) {
      return toast.error(error.userNotFound);
    }
  });

  socket.off("listenTyping").on("listenTyping", (sender, message) => {
    if (sender.channel === channel && sender.user_id !== user.id) {
      dispatch(setTyping(message));
    }
  });
};

///// ------------------------------------------------------------------////

// Set Current User Decoded
export const setCurrentUserDecoded = (user) => {
  return {
    type: SET_CURRENT_USER_DECODED,
    payload: user,
  };
};

// Set Current User
export const setCurrentUser = (encoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: encoded,
  };
};

// Set Current User Profile Image
export const setCurrentUserProfileImage = (images) => {
  return {
    type: SET_CURRENT_USER_PROFILE_IMAGE,
    payload: images,
  };
};

// User Registered
export const userRegistered = () => {
  return {
    type: USER_REGISTERED,
  };
};

// Set Joined Groups
export const setJoinedGroups = (groups) => {
  return {
    type: SET_JOINED_GROUPS,
    payload: groups,
  };
};

// Set My Created Groups List
export const setMyCreatedGroups = (groups) => {
  return {
    type: MY_CREATED_GROUPS,
    payload: groups,
  };
};

// Set All Groups List
export const setAllGroups = (groups) => {
  return {
    type: ALL_GROUPS,
    payload: groups,
  };
};

// Set Data of Group When Clicked
export const setData = (group) => {
  return {
    type: SET_DATA,
    payload: group,
  };
};

// Set Group Messages
export const groupMessage = (message) => {
  return {
    type: GROUP_MESSAGE,
    payload: message,
  };
};

// Set Current Socket
export const setCurrentSocket = (socket) => {
  return {
    type: SET_CURRENT_SOCKET,
    payload: socket,
  };
};

// Set Group Sockets
export const setGroupSockets = (group_socket) => {
  return {
    type: SET_GROUP_SOCKETS,
    payload: group_socket,
  };
};

// Set Cuurent Chatting Group
export const setCurrentChannel = (channelName) => {
  return {
    type: SET_CURRENT_CHANNEL,
    payload: channelName,
  };
};

// Set All Group Users
export const setAllGroupUsers = (users) => {
  return {
    type: SET_ALL_GROUP_USERS,
    payload: users,
  };
};

// Delete User From All Groups
export const deleteUserFromAllGroups = (user) => {
  const decoded_user = jwt_decode(user);
  const user_id = decoded_user.id;
  const socket = io(endPoint);

  socket.emit("deleteUserFromAllGroups", user_id);
};

// Set User Searched Groups
export const setUserSearchedGroups = (groups) => {
  return {
    type: SET_USER_SEARCHED_GROUPS,
    payload: groups,
  };
};

// Set all users
export const setAllUsers = (users) => {
  return {
    type: SET_ALL_USERS,
    payload: users,
  };
};

// Set Friend Request
export const setFriendRequest = (request) => {
  return {
    type: SET_FRIEND_REQUEST,
    payload: request,
  };
};

// Delete Friend Request
export const deleteFriendRequest = (senderID) => {
  return {
    type: DELETE_FRIEND_REQUEST,
    payload: senderID,
  };
};

// Set All Notifications
export const setAllNotifications = (notifications) => {
  return {
    type: SET_ALL_NOTIFICATIONS,
    payload: notifications,
  };
};

// Set Friend List
export const setFriendList = (user) => {
  return {
    type: SET_FRIEND_LIST,
    payload: user,
  };
};

// Set All Friends
export const setAllFriends = (friends) => {
  return {
    type: SET_ALL_FRIENDS,
    payload: friends,
  };
};

// Set Friend Request Confirmation
export const setFriendRequestConfirmation = (message) => {
  return {
    type: SET_FRIEND_REQUEST_CONFIRMATION,
    payload: message,
  };
};

// Set Messages
export const setMessage = (message) => {
  return {
    type: SET_MESSAGE,
    payload: message,
  };
};

// Typing
export const setTyping = (message) => {
  return {
    type: USER_TYPING,
    payload: message,
  };
};

// Loading
export const loading = (show) => {
  return {
    type: LOADING,
    payload: show,
  };
};

// Logout User
export const logoutUser = (history) => (dispatch) => {
  sessionStorage.removeItem("jwtToken");
  sessionStorage.removeItem("currentUser");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  history.push("/login");
};

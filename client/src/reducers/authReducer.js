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
} from "../actions/types";
const isEmpty = require("is-empty");

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: {},
  userRegistered: false,
  userJoinedGroups: [],
  myCreatedGroups: [],
  allGroups: [],
  setData: {},
  groupMessage: [],
  currentSocket: {},
  setGroupSockets: [],
  setCurrentChannel: "",
  setCurrentUserDecoded: {},
  setCurrentUserProfileImage: [],
  setAllGroupUsers: [],
  setUserSearchedGroups: [],
  setAllUsers: [],
  setFriendRequest: [],
  setAllNotifications: [],
  setFriendList: [],
  setAllFriends: [],
  setFriendRequestConfirmation: [],
  message: [],
  isTyping: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case USER_REGISTERED:
      return {
        ...state,
        userRegistered: true,
      };
    case SET_JOINED_GROUPS:
      return {
        ...state,
        userJoinedGroups: action.payload,
      };
    case MY_CREATED_GROUPS:
      return {
        ...state,
        myCreatedGroups: action.payload,
      };
    case ALL_GROUPS:
      return {
        ...state,
        allGroups: action.payload,
      };
    case SET_DATA:
      return {
        ...state,
        setData: action.payload,
      };
    case GROUP_MESSAGE:
      return {
        ...state,
        groupMessage:
          state.groupMessage !== undefined
            ? [...state.groupMessage, action.payload]
            : [action.payload],
      };
    case SET_CURRENT_SOCKET:
      return {
        ...state,
        currentSocket: action.payload,
      };
    case SET_GROUP_SOCKETS:
      return {
        ...state,
        setGroupSockets:
          state.setGroupSockets !== undefined
            ? [...state.setGroupSockets, action.payload]
            : [],
      };
    case SET_CURRENT_CHANNEL:
      return {
        ...state,
        setCurrentChannel: action.payload,
      };
    case SET_CURRENT_USER_DECODED:
      return {
        ...state,
        setCurrentUserDecoded: action.payload,
      };
    case SET_CURRENT_USER_PROFILE_IMAGE:
      return {
        ...state,
        setCurrentUserProfileImage: action.payload,
      };
    case SET_ALL_GROUP_USERS:
      return {
        ...state,
        setAllGroupUsers: action.payload,
      };
    case SET_USER_SEARCHED_GROUPS:
      return {
        ...state,
        setUserSearchedGroups: action.payload,
      };
    case SET_ALL_USERS:
      return {
        ...state,
        setAllUsers: action.payload,
      };
    case SET_FRIEND_REQUEST:
      return {
        ...state,
        setFriendRequest:
          state.setFriendRequest !== undefined
            ? [...state.setFriendRequest, action.payload]
            : [action.payload],
      };
    case DELETE_FRIEND_REQUEST:
      return {
        ...state,
        setFriendRequest:
          state.setFriendRequest && state.setFriendRequest.length > 0
            ? state.setFriendRequest.filter(
                (request) => request.senderID !== action.payload
              )
            : "",
      };
    case SET_ALL_NOTIFICATIONS:
      return {
        ...state,
        setAllNotifications: action.payload,
      };
    case SET_FRIEND_LIST:
      return {
        ...state,
        setFriendList:
          state.setFriendList !== undefined
            ? [...state.setFriendList, action.payload]
            : [action.payload],
      };
    case SET_ALL_FRIENDS:
      return {
        ...state,
        setAllFriends: action.payload,
      };
    case SET_FRIEND_REQUEST_CONFIRMATION:
      return {
        ...state,
        setFriendRequestConfirmation:
          state.setFriendRequestConfirmation !== undefined
            ? [...state.setFriendRequestConfirmation, action.payload]
            : [action.payload],
      };
    case SET_MESSAGE:
      return {
        ...state,
        message:
          state.message !== undefined
            ? [...state.message, action.payload]
            : [action.payload],
      };
    case USER_TYPING:
      return {
        ...state,
        isTyping: action.payload,
      };
    case LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return {
        state,
      };
  }
}

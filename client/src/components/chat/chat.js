import React, { PureComponent } from "react";
import { Dots } from "react-preloaders";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import _ from "lodash";
import {
  blockUser,
  checkPhoneNoVerified,
  deleteUserCreatedGroup,
  deleteUserInGroupWhenRefresh,
  exitJoinedGroup,
  fetchMyGroups,
  getJoinedGroups,
  loading,
  newGroupSocketConnection,
  sendGroupMessage,
  setMyCreatedGroups,
  setUserSearchedGroups,
  setFriendDataInChatHeader,
  subscribeChannel,
  sendMessage,
  unsubscribeChannel,
  userTyping,
} from "../../actions/authActions";
import Users from "./friend-group-list/users";
import ChatMessages from "./chat-messages/chat-messages";
import WelcomeChatMenu from "./welcome-chat-menu";
import getAllFriends from "../../utils/getAllFriends";

class Chat extends PureComponent {
  constructor() {
    super();
    this.state = {
      allFriends: [],
      currentSocket: {},
      groupMessage: [],
      isTyping: false,
      myCreatedGroups: [],
      messages: [],
      newMessage: "",
      searchedGroup: "",
      setData: [],
      setUserSearchedGroups: [],
      setCurrentChannel: "",
      setCurrentUserDecoded: {},
      setCurrentUserProfileImage: [],
      setAllGroupUsers: [],
      setFriendList: [],
      setTyping: "",
      showEmojis: false,
      userJoinedGroups: [],
    };
  }

  componentDidMount() {
    window.addEventListener(
      "beforeunload",
      this.props.deleteUserInGroupWhenRefresh(this.props.auth.user)
    );

    window.addEventListener(
      "beforeunload",
      this.props.unsubscribeChannel(this.props.auth.user)
    );

    this.props.loading(false);
    this.props.fetchMyGroups(this.props.auth.user);
    this.props.getJoinedGroups(this.props.auth.user);
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.props.deleteUserInGroupWhenRefresh(this.props.auth.user)
    );

    window.removeEventListener(
      "beforeunload",
      this.props.unsubscribeChannel(this.props.auth.user)
    );
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      allFriends: nextProps.auth.setAllFriends,
      currentSocket: nextProps.auth.currentSocket,
      groupMessage: nextProps.auth.groupMessage,
      setTyping: nextProps.auth.isTyping,
      messages: nextProps.auth.message,
      myCreatedGroups: nextProps.auth.myCreatedGroups,
      setUserSearchedGroups: nextProps.auth.setUserSearchedGroups,
      setData: nextProps.auth.setData,
      setCurrentChannel: nextProps.auth.setCurrentChannel,
      setCurrentUserDecoded: nextProps.auth.setCurrentUserDecoded,
      setCurrentUserProfileImage: nextProps.auth.setCurrentUserProfileImage,
      setAllGroupUsers: nextProps.auth.setAllGroupUsers,
      setFriendList: nextProps.auth.setFriendList,
      userJoinedGroups: nextProps.auth.userJoinedGroups,
    };
  }

  groupSearchChange = (e) => {
    this.setState({
      searchedGroup: e.target.value,
    });

    const {
      setFriendList,
      allFriends,
      myCreatedGroups,
      userJoinedGroups,
    } = this.state;

    const friends = getAllFriends(setFriendList, allFriends);

    const allUserGroups = friends;
    const userSearchedGroup = [];

    myCreatedGroups.forEach((group) => {
      allUserGroups.push(group);
    });

    userJoinedGroups.forEach((group) => {
      allUserGroups.push(group);
    });

    if (e.target.value) {
      allUserGroups.forEach((group) => {
        if (group.groupName) {
          if (
            group.groupName.toLowerCase().includes(e.target.value.toLowerCase())
          ) {
            userSearchedGroup.push(group);
            this.props.setUserSearchedGroups(userSearchedGroup);
          }
        } else if (group.name) {
          if (group.name.toLowerCase().includes(e.target.value.toLowerCase())) {
            userSearchedGroup.push(group);
            this.props.setUserSearchedGroups(userSearchedGroup);
          }
        } else {
          this.props.setUserSearchedGroups(userSearchedGroup);
        }
      });
    } else {
      this.props.setUserSearchedGroups([]);
      this.props.fetchMyGroups(this.props.auth.user);
      this.props.getJoinedGroups(this.props.auth.user);
    }
  };

  handleGroupClick = (id, groupName) => {
    if (groupName !== this.props.auth.setCurrentChannel) {
      this.props.newGroupSocketConnection(
        this.props.auth.setGroupSockets,
        this.props.auth.user,
        id
      );
    }
  };

  messageChange = (e) => {
    this.setState({ newMessage: e.target.value });
  };

  messageSubmit = (e, isGroup) => {
    e.preventDefault();

    const {
      newMessage,
      currentSocket,
      setCurrentUserDecoded,
      setCurrentChannel,
    } = this.state;

    if (newMessage) {
      if (isGroup) {
        this.props.sendGroupMessage(currentSocket, newMessage);
      } else {
        this.setState({ isTyping: false }, this._getUserState);

        this.props.sendMessage(
          currentSocket,
          newMessage,
          setCurrentUserDecoded,
          setCurrentChannel
        );
      }
    }

    this.setState({ newMessage: "" });
  };

  deleteGroupChat = (e) => {
    const { groupMessage, setCurrentChannel } = this.props.auth;

    _.remove(groupMessage, (value, index, groupMessage) => {
      return value.group === setCurrentChannel;
    });

    toast.success("Chat deleted");
  };

  exitGroup = (e) => {
    const user_id = this.props.auth.setCurrentUserDecoded.id;
    const group_id = this.props.auth.setData._id;

    this.props.exitJoinedGroup(user_id, group_id);
  };

  deleteGroup = (e) => {
    const user_id = this.props.auth.setCurrentUserDecoded.id;
    const group_id = this.props.auth.setData._id;

    this.props.deleteUserCreatedGroup(user_id, group_id);
  };

  addEmoji = (e) => {
    const emoji = e.native;

    this.setState({ newMessage: this.state.newMessage + emoji });
  };

  showEmojisMenu = (e) => {
    const { showEmojis } = this.state;

    if (showEmojis) {
      this.setState({ showEmojis: false });
    } else {
      this.setState({ showEmojis: true });
    }
  };

  hideEmojiMenu = (e) => {
    if (e.target.tagName !== "SPAN") this.setState({ showEmojis: false });
  };

  handleFriendClick = (friend) => {
    const { setCurrentUserDecoded } = this.state;

    this.props.setFriendDataInChatHeader(friend);
    this.props.subscribeChannel(setCurrentUserDecoded, friend.conversation_id);
  };

  keyPress = (e, isGroup) => {
    if (!isGroup) {
      this.setState({ isTyping: true }, this._getUserState);
    }
  };

  _getUserState = () => {
    const { setCurrentUserDecoded, setCurrentChannel, isTyping } = this.state;

    this.props.userTyping(setCurrentUserDecoded, setCurrentChannel, isTyping);
  };

  deleteFriendChat = () => {
    const { message, setCurrentChannel } = this.props.auth;

    _.remove(message, (value, index, message) => {
      return value.channel === setCurrentChannel;
    });

    toast.success("Chat deleted");
  };

  blockUser = (id) => {
    const user_id = this.state.setCurrentUserDecoded.id;
    const conversation_id = this.state.setCurrentChannel;

    this.props.blockUser(user_id, id, conversation_id);
  };

  render() {
    const {
      allFriends,
      groupMessage,
      myCreatedGroups,
      messages,
      newMessage,
      setUserSearchedGroups,
      searchedGroup,
      setFriendList,
      setData,
      setCurrentChannel,
      setCurrentUserDecoded,
      setCurrentUserProfileImage,
      setAllGroupUsers,
      showEmojis,
      setTyping,
      userJoinedGroups,
    } = this.state;

    return (
      <div className="container-fluid px-0">
        <div className="row mx-0">
          <div className="col-md-4 px-0">
            <Users
              allFriends={allFriends}
              friendList={setFriendList}
              userProfileImages={setCurrentUserProfileImage}
              groups={myCreatedGroups}
              groupSearchChange={this.groupSearchChange}
              handleFriendClick={this.handleFriendClick}
              handleGroupClick={this.handleGroupClick}
              searchedGroup={searchedGroup}
              searchedGroups={setUserSearchedGroups}
              userJoinedGroups={userJoinedGroups}
            />
          </div>
          <div className="col-md-8 px-0">
            <div className="chat-messages">
              {setData ? (
                <ChatMessages
                  addEmoji={this.addEmoji}
                  allGroupUsers={setAllGroupUsers}
                  blockUser={this.blockUser}
                  currentChannel={setCurrentChannel}
                  data={setData}
                  deleteGroup={this.deleteGroup}
                  deleteGroupChat={this.deleteGroupChat}
                  deleteFriendChat={this.deleteFriendChat}
                  exitGroup={this.exitGroup}
                  groupMessages={groupMessage}
                  hideEmojiMenu={this.hideEmojiMenu}
                  keyPress={this.keyPress}
                  messages={messages}
                  messageChange={this.messageChange}
                  messageSubmit={this.messageSubmit}
                  showEmojis={showEmojis}
                  showEmojisMenu={this.showEmojisMenu}
                  setTyping={setTyping}
                  user={setCurrentUserDecoded}
                  userProfileImages={setCurrentUserProfileImage}
                  value={newMessage}
                />
              ) : (
                <WelcomeChatMenu />
              )}
            </div>
          </div>
        </div>
        <Dots color={"#0046d5"} customLoading={this.props.auth.isLoading} />
      </div>
    );
  }
}

Chat.propTypes = {
  auth: PropTypes.object.isRequired,
  blockUser: PropTypes.func.isRequired,
  checkPhoneNoVerified: PropTypes.func.isRequired,
  deleteUserCreatedGroup: PropTypes.func.isRequired,
  deleteUserInGroupWhenRefresh: PropTypes.func.isRequired,
  exitJoinedGroup: PropTypes.func.isRequired,
  fetchMyGroups: PropTypes.func.isRequired,
  getJoinedGroups: PropTypes.func.isRequired,
  loading: PropTypes.func.isRequired,
  newGroupSocketConnection: PropTypes.func.isRequired,
  sendGroupMessage: PropTypes.func.isRequired,
  setMyCreatedGroups: PropTypes.func.isRequired,
  setUserSearchedGroups: PropTypes.func.isRequired,
  setFriendDataInChatHeader: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  subscribeChannel: PropTypes.func.isRequired,
  unsubscribeChannel: PropTypes.func.isRequired,
  userTyping: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  blockUser,
  checkPhoneNoVerified,
  deleteUserCreatedGroup,
  deleteUserInGroupWhenRefresh,
  fetchMyGroups,
  exitJoinedGroup,
  getJoinedGroups,
  loading,
  newGroupSocketConnection,
  sendGroupMessage,
  setMyCreatedGroups,
  setUserSearchedGroups,
  setFriendDataInChatHeader,
  sendMessage,
  subscribeChannel,
  unsubscribeChannel,
  userTyping,
})(withRouter(Chat));

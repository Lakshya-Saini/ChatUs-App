import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NavbarChat from "../common/navbar-chat";
import Sidebar from "../common/sidebar";
import {
  logoutUser,
  getCurrentUserData,
  getUserProfileImageFromCloudinary,
  receiveFriendRequest,
  updateNotificationSeen,
  getAllNotifications,
  getFriendList,
  getRequestAcceptedNotification,
} from "../../actions/authActions";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      activeComponent: "",
      setCurrentUserDecoded: {},
      userProfileImages: [],
      friendRequests: [],
      allNotifications: [],
      requestConfirmation: [],
    };
  }

  componentDidMount() {
    if (!sessionStorage.getItem("jwtToken")) {
      this.props.history.push("/login");
    }

    if (this.props.auth.user) {
      this.props.getCurrentUserData(this.props.auth.user);
    }

    this.props.getUserProfileImageFromCloudinary();
    this.props.receiveFriendRequest(this.props.auth.user);
    this.props.getAllNotifications(this.props.auth.user);
    this.props.getFriendList(this.props.auth.user);
    this.props.getRequestAcceptedNotification(this.props.auth.user);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      setCurrentUserDecoded: nextProps.auth.setCurrentUserDecoded,
      userProfileImages: nextProps.auth.setCurrentUserProfileImage,
      friendRequests: nextProps.auth.setFriendRequest,
      allNotifications: nextProps.auth.setAllNotifications,
      requestConfirmation: nextProps.auth.setFriendRequestConfirmation,
    };
  }

  handleLogout = (e) => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  };

  handleClick = (e) => {
    if (e.target.tagName === "LI") {
      const activeComponent = e.target.getAttribute("title").toLowerCase();
      this.setState({ activeComponent });
    } else {
      const activeComponent = e.target.parentElement
        .getAttribute("title")
        .toLowerCase();
      this.setState({ activeComponent });
    }
  };

  notificationClick = (sender_id, receiver_id) => {
    this.props.updateNotificationSeen(receiver_id, this.props.history);
  };

  render() {
    return (
      <React.Fragment>
        <NavbarChat
          user={this.state.setCurrentUserDecoded}
          userProfileImages={this.state.userProfileImages}
          friendRequests={this.state.friendRequests}
          requestConfirmation={this.state.requestConfirmation}
          allNotifications={this.state.allNotifications}
          handleLogout={this.handleLogout}
          notificationClick={this.notificationClick}
        />
        <Sidebar
          handleLogout={this.handleLogout}
          handleClick={this.handleClick}
          activeComponent={this.state.activeComponent}
        />
        {this.props.children}
      </React.Fragment>
    );
  }
}

Main.propTypes = {
  getCurrentUserData: PropTypes.func.isRequired,
  getUserProfileImageFromCloudinary: PropTypes.func.isRequired,
  receiveFriendRequest: PropTypes.func.isRequired,
  updateNotificationSeen: PropTypes.func.isRequired,
  getAllNotifications: PropTypes.func.isRequired,
  getFriendList: PropTypes.func.isRequired,
  getRequestAcceptedNotification: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getCurrentUserData,
  getUserProfileImageFromCloudinary,
  receiveFriendRequest,
  updateNotificationSeen,
  getAllNotifications,
  getFriendList,
  getRequestAcceptedNotification,
  logoutUser,
})(withRouter(Main));

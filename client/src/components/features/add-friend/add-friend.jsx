import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Dots } from "react-preloaders";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Friends from "./friends";
import SearchFriend from "./search-friend";
import {
  loading,
  getAllUsers,
  sendFriendRequest,
} from "../../../actions/authActions";

class AddFriend extends Component {
  constructor() {
    super();
    this.state = {
      searchedUser: "",
      allUsers: [],
      searchedUsers: [],
      friendList: [],
      allFriends: [],
    };
  }

  componentDidMount() {
    this.props.loading(false);
    this.props.getAllUsers(this.props.auth.user);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      allUsers: nextProps.auth.setAllUsers,
      friendList: nextProps.auth.setFriendList,
      allFriends: nextProps.auth.setAllFriends,
    };
  }

  userSearchChange = (e) => {
    const { value } = e.target;
    const { allUsers } = this.state;
    const searched_users = [];

    this.setState({ searchedUser: value });

    allUsers.forEach((user) => {
      const { fullName, phoneNumber } = user;

      if (
        fullName.toLowerCase().includes(value.toLowerCase()) ||
        phoneNumber.toString().includes(value.toString())
      ) {
        searched_users.push(user);
      }
    });

    this.setState({ searchedUsers: searched_users });
  };

  sendRequest = (receiver_id) => {
    const sender_id = this.props.auth.setCurrentUserDecoded.id;
    this.props.sendFriendRequest(sender_id, receiver_id);
  };

  render() {
    let {
      searchedUser,
      searchedUsers,
      allUsers,
      friendList,
      allFriends,
    } = this.state;

    return (
      <div className="container-fluid px-0">
        <div className="row mx-0">
          <div className="col-md-4 px-0">
            <div className="friends">
              <Friends friendList={friendList} allFriends={allFriends} />
            </div>
          </div>
          <div className="col-md-8 px-0">
            <div className="search-friends">
              <SearchFriend
                searchedUser={searchedUser}
                searchedUsers={searchedUsers}
                allUsers={allUsers}
                userSearchChange={this.userSearchChange}
                sendRequest={this.sendRequest}
              />
            </div>
          </div>
        </div>
        <Dots color={"#0046d5"} customLoading={this.props.auth.isLoading} />
      </div>
    );
  }
}

AddFriend.propTypes = {
  loading: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  sendFriendRequest: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  loading,
  getAllUsers,
  sendFriendRequest,
})(withRouter(AddFriend));

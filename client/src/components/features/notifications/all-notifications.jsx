import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Dots } from "react-preloaders";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  loading,
  declineFriendRequest,
  deleteFriendRequest,
  getSenderInfoAndDeleteNotificationFromDB,
  sendNotificationToSender,
} from "../../../actions/authActions";
import Notifications from "./notifications";
import getConversationID from "../../../utils/getConversationID";

class AllNotifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendRequest: [],
      allNotifications: [],
      requestConfirmation: [],
      friendList: [],
      allFriends: [],
    };
  }

  componentDidMount() {
    this.props.loading(false);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      friendRequest: nextProps.auth.setFriendRequest,
      allNotifications: nextProps.auth.setAllNotifications,
      requestConfirmation: nextProps.auth.setFriendRequestConfirmation,
      friendList: nextProps.auth.setFriendList,
      allFriends: nextProps.auth.setAllFriends,
    };
  }

  declineRequest = (senderID, receiverID) => {
    this.props.deleteFriendRequest(senderID);
    this.props.declineFriendRequest(senderID, receiverID);
  };

  acceptRequest = (senderID, receiverID) => {
    const conversation_id = getConversationID();

    this.props.deleteFriendRequest(senderID);
    this.props.getSenderInfoAndDeleteNotificationFromDB(
      senderID,
      receiverID,
      conversation_id
    );

    this.props.sendNotificationToSender(
      senderID,
      receiverID,
      this.props.auth.user,
      conversation_id
    );
  };

  render() {
    let { allNotifications, friendRequest, requestConfirmation } = this.state;

    return (
      <React.Fragment>
        <div className="container-fluid px-0">
          <div className="row mx-0">
            <div className="col-md-10 mx-auto px-0">
              <div className="all-notifications-container">
                <h5>All Notifications</h5>
                <Notifications
                  allNotifications={allNotifications}
                  friendRequest={friendRequest}
                  requestConfirmation={requestConfirmation}
                  declineRequest={this.declineRequest}
                  acceptRequest={this.acceptRequest}
                />
              </div>
            </div>
          </div>
        </div>
        <Dots color={"#0046d5"} customLoading={this.props.auth.isLoading} />
      </React.Fragment>
    );
  }
}

AllNotifications.propTypes = {
  loading: PropTypes.func.isRequired,
  declineFriendRequest: PropTypes.func.isRequired,
  deleteFriendRequest: PropTypes.func.isRequired,
  getSenderInfoAndDeleteNotificationFromDB: PropTypes.func.isRequired,
  sendNotificationToSender: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  loading,
  declineFriendRequest,
  deleteFriendRequest,
  getSenderInfoAndDeleteNotificationFromDB,
  sendNotificationToSender,
})(withRouter(AllNotifications));

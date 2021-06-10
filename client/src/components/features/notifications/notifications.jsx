import React from "react";
import Notification from "./notification";
import getAllNotifications from "../../../utils/getAllNotifications";

const Notifications = ({
  allNotifications,
  friendRequest,
  requestConfirmation,
  declineRequest,
  acceptRequest,
}) => {
  const notifications = getAllNotifications(
    allNotifications,
    friendRequest,
    requestConfirmation
  );

  return (
    <React.Fragment>
      {notifications && notifications.length > 0 ? (
        notifications.map((notification) => (
          <Notification
            key={notification.senderID}
            date={notification.date}
            senderID={notification.senderID}
            receiverID={notification.receiverID}
            message={notification.message}
            type={notification.type}
            declineRequest={declineRequest}
            acceptRequest={acceptRequest}
          />
        ))
      ) : (
        <h6>No Notifications</h6>
      )}
    </React.Fragment>
  );
};

export default Notifications;

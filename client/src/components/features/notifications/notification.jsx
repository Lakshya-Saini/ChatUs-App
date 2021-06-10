import React from "react";
import { Link } from "react-router-dom";
import formatDateTime from "../../../utils/formatDateTime";

const Notification = (props) => {
  const {
    date,
    senderID,
    receiverID,
    message,
    type,
    declineRequest,
    acceptRequest,
  } = props;

  return (
    <React.Fragment>
      <div className="all-notifications">
        <div className="row mx-0">
          <div className="col-md-1 px-0">
            <img src="img/chatbot.png" id="notification-img" alt="img" />
          </div>
          <div className="col-md-8">
            <p className="notification-text">{message}</p>
            <p className="notification-time">{formatDateTime(date)}</p>
          </div>
          {type === "request" && (
            <div className="col-md-3">
              <div className="buttons">
                <div className="row mx-0">
                  <div className="col-md-6">
                    <Link
                      to="#"
                      className="shadow-none accept-btn"
                      onClick={() => acceptRequest(senderID, receiverID)}
                    >
                      Accept
                    </Link>
                  </div>
                  <div className="col-md-6">
                    <Link
                      to="#"
                      className="shadow-none decline-btn"
                      onClick={() => declineRequest(senderID, receiverID)}
                    >
                      Decline
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Notification;

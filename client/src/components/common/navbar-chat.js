import React from "react";
import { Link } from "react-router-dom";
import formatDateTime from "../../utils/formatDateTime";
import getAllNotifications from "../../utils/getAllNotifications";
import getProfileImageURL from "../../utils/getProfileImageURL";

function NavbarChat(props) {
  const {
    handleLogout,
    user,
    userProfileImages,
    friendRequests,
    allNotifications,
    requestConfirmation,
    notificationClick,
  } = props;

  let { name, user_img_url } = getProfileImageURL(user, userProfileImages);

  let notifications = getAllNotifications(
    allNotifications,
    friendRequests,
    requestConfirmation
  );

  var filteredNotifications = notifications.filter((n) => n.hasSeen === false);

  return (
    <React.Fragment>
      <nav className="navbar navbar-chat sticky-top">
        <Link className="navbar-brand" to="#">
          ChatUs
        </Link>
        <div>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <div className="dropdown">
                <Link
                  to="#"
                  className="btn shadow-none"
                  id="notification-bell"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-bell"></i>{" "}
                  <sup className="badge badge-danger">
                    {filteredNotifications.length}
                  </sup>
                </Link>

                <div
                  className="dropdown-menu dropdown-menu-notifications"
                  aria-labelledby="notification-bell"
                >
                  <p>
                    Notifications{" "}
                    <span>
                      <Link to="#">Mark all as read</Link>
                    </span>
                  </p>

                  <div className="dropdown-divider"></div>

                  {filteredNotifications.length > 0 ? (
                    filteredNotifications.slice(0, 6).map((request) => (
                      <Link
                        to="#"
                        key={request.senderID}
                        className="dropdown-item px-0 py-2"
                        onClick={() =>
                          notificationClick(
                            request.senderID,
                            request.receiverID
                          )
                        }
                      >
                        <div className="row mx-0">
                          <div className="col-md-2 px-0">
                            <img
                              src="img/chatbot.png"
                              id="notification-img"
                              alt="img"
                            />
                          </div>
                          <div className="col-md-10">
                            <p className="notification-text">
                              {request.message}
                            </p>
                            <p className="notification-time">
                              {formatDateTime(request.date)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <h6>No Notifications</h6>
                  )}

                  <div className="dropdown-divider"></div>

                  <Link
                    to="/all-notifications"
                    className="dropdown-item text-center text-secondary"
                  >
                    All Notifications
                  </Link>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <img src={user_img_url} id="navbar-chat-img" alt="img" />
            </li>
            <li className="nav-item">
              <div className="dropdown">
                <Link
                  className="btn shadow-none"
                  to="#"
                  id="auth-user-dropdown"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Hello {name} <i className="fas fa-caret-down"></i>
                </Link>

                <div
                  className="dropdown-menu"
                  aria-labelledby="auth-user-dropdown"
                >
                  <Link className="dropdown-item" to="/chat">
                    Chat Menu
                  </Link>
                  <Link className="dropdown-item" to="/profile">
                    Profile
                  </Link>
                  <Link className="dropdown-item" to="#" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default NavbarChat;

import React from "react";
import { Link } from "react-router-dom";

const GroupHeader = (props) => {
  const {
    data,
    allGroupUsers,
    user,
    deleteGroupChat,
    deleteGroup,
    exitGroup,
  } = props;
  let users = [];

  if (allGroupUsers) {
    allGroupUsers.forEach((group_user) => {
      users.push(group_user.name);
    });
  }

  return (
    <div className="row mx-0">
      <div className="col-md-1">
        <img src="/img/default.png" id="chat-messages-header-img" alt="img" />
      </div>
      <div className="col-md-5">
        <h5>{data.groupName}</h5>
        {users.length > 0 ? (
          <p className="status">Members: {users.toString()}</p>
        ) : (
          <p className="status">No Member</p>
        )}
      </div>
      <div className="col-md-6">
        <div className="dropdown">
          <Link
            className="btn shadow-none"
            to="#"
            id="user-options-dropdown"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fas fa-ellipsis-v"></i>
          </Link>

          <div
            className="dropdown-menu"
            aria-labelledby="user-options-dropdown"
          >
            <Link className="dropdown-item" to="#">
              View Profile
            </Link>
            <Link className="dropdown-item" to="#" onClick={deleteGroupChat}>
              Delete Chat
            </Link>
            {data.admin_id === user.id ? (
              <Link className="dropdown-item" to="#" onClick={deleteGroup}>
                Delete Group
              </Link>
            ) : (
              <Link className="dropdown-item" to="#" onClick={exitGroup}>
                Exit Group
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupHeader;

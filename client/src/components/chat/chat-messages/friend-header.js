import React from "react";
import { Link } from "react-router-dom";

const FriendHeader = (props) => {
  const { data, setTyping, deleteFriendChat, blockUser } = props;

  const image = data.image === "default.png" ? "/img/default.png" : data.image;

  return (
    <div className="row mx-0">
      <div className="col-md-1">
        <img src={image} id="chat-messages-header-img" alt="img" />
      </div>
      <div className="col-md-5">
        <h5>{data.name}</h5>
        <p className="status">{setTyping ? setTyping : "Online"}</p>
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
            <Link className="dropdown-item" to="#" onClick={deleteFriendChat}>
              Delete Chat
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => blockUser(data.id)}
            >
              Block User
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendHeader;

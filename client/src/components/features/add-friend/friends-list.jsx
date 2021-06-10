import React from "react";

function FriendsList({ friend }) {
  return (
    <React.Fragment>
      <div className="friends-list-item active">
        <a href="/chat">
          <div className="row mx-0">
            <div className="col-md-2">
              <img src="img/default.png" id="user-img" alt="img" />
            </div>
            <div className="col-md-10">
              <h5>{friend.name}</h5>
              <p className="last-seen">
                {friend.status.substring(0, 30) + "..."}
              </p>
            </div>
          </div>
        </a>
      </div>
    </React.Fragment>
  );
}

export default FriendsList;

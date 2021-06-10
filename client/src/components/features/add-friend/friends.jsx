import React from "react";
import FriendsList from "./friends-list";
import getAllFriends from "../../../utils/getAllFriends";

function Friends({ friendList, allFriends }) {
  const friends = getAllFriends(friendList, allFriends);

  return (
    <React.Fragment>
      <div className="row-mx-0">
        <div className="col-md-12 px-0">
          <div className="friends-list-text">
            <h4>
              Your Friends List <i className="fas fa-caret-right"></i>
            </h4>
          </div>
        </div>
      </div>

      <div className="row mx-0">
        <div className="col-md-12 px-0">
          <div className="friends-list">
            {friends.length > 0 ? (
              friends.map((friend) => (
                <FriendsList key={friend.id} friend={friend} />
              ))
            ) : (
              <h6>No Friend(s)</h6>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Friends;

import React, { memo } from "react";
import { Link } from "react-router-dom";
import getAllFriends from "../../../utils/getAllFriends";

const AllFriends = (props) => {
  const {
    friendList,
    allFriends,
    userProfileImages,
    handleFriendClick,
  } = props;
  const friends = getAllFriends(friendList, allFriends, userProfileImages);

  return (
    <React.Fragment>
      {friends.map((friend) => (
        <div
          key={friend.id}
          className="users-list-item"
          onClick={() => handleFriendClick(friend)}
        >
          <Link to="#">
            <div className="row mx-0">
              <div className="col-md-2">
                <img src={friend.image} id="user-img" alt="img" />
              </div>
              <div className="col-md-10">
                <h5>{friend.name}</h5>
                <p>{"Online"}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </React.Fragment>
  );
};

export default memo(AllFriends);

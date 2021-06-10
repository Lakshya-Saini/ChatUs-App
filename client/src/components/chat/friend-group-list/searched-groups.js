import React from "react";
import { Link } from "react-router-dom";

const SearchedGroups = (props) => {
  const { groups, handleGroupClick, handleFriendClick } = props;

  return (
    <React.Fragment>
      {groups.map((group) =>
        group.name ? (
          <div
            key={group.id}
            className="users-list-item"
            onClick={() => handleFriendClick(group)}
          >
            <Link to="#">
              <div className="row mx-0">
                <div className="col-md-2">
                  <img src={`img/${group.image}`} id="user-img" alt="img" />
                </div>
                <div className="col-md-10">
                  <h5>{group.name}</h5>
                  <p>{"Online"}</p>
                </div>
              </div>
            </Link>
          </div>
        ) : (
          <div
            key={group._id}
            className="users-list-item"
            onClick={() => handleGroupClick(group._id, group.groupName)}
          >
            <Link to="#">
              <div className="row mx-0">
                <div className="col-md-2">
                  <img src={`img/${group.image}`} id="user-img" alt="img" />
                </div>
                <div className="col-md-10">
                  <h5>{group.groupName}</h5>
                  <p>Members: {group.members.length}</p>
                </div>
              </div>
            </Link>
          </div>
        )
      )}
    </React.Fragment>
  );
};

export default SearchedGroups;

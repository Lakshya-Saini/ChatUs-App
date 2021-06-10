import React from "react";
import { Link } from "react-router-dom";

const UserCreatedAndJoinedGroups = (props) => {
  const { myGroups, joinedGroups, handleGroupClick } = props;
  let noGroups = false;
  let noJoinedGroups = false;
  let message = <h5>No Groups</h5>;

  return (
    <React.Fragment>
      {myGroups !== undefined && myGroups.length > 0
        ? myGroups.map((group) => (
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
          ))
        : (noGroups = true)}

      {joinedGroups !== undefined && joinedGroups.length > 0
        ? joinedGroups.map((group) => (
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
          ))
        : (noJoinedGroups = true)}

      {noGroups && noJoinedGroups ? message : ""}
    </React.Fragment>
  );
};

export default UserCreatedAndJoinedGroups;

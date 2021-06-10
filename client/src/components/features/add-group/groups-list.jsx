import React from "react";
import { Link } from "react-router-dom";

function GroupsList(props) {
  let { groups, joinedGroups } = props;
  let noGroups = false;
  let noJoinedGroups = false;
  let message = <h5>No Groups</h5>;

  return (
    <React.Fragment>
      {groups !== undefined && groups.length > 0
        ? groups.map((group) => (
            <div key={group._id} className="groups-list-item">
              <Link to="/chat">
                <div className="row mx-0">
                  <div className="col-md-2">
                    <img src={`/img/${group.image}`} id="user-img" alt="img" />
                  </div>
                  <div className="col-md-10">
                    <h5>{group.groupName}</h5>
                    <p className="members">Members - {group.members.length}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        : (noGroups = true)}

      {joinedGroups !== undefined && joinedGroups.length > 0
        ? joinedGroups.map((group) => (
            <div key={group._id} className="groups-list-item">
              <Link to="/chat">
                <div className="row mx-0">
                  <div className="col-md-2">
                    <img src={`img/${group.image}`} id="user-img" alt="img" />
                  </div>
                  <div className="col-md-10">
                    <h5>{group.groupName}</h5>
                    <p className="members">Members - {group.members.length}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        : (noJoinedGroups = true)}

      {noGroups && noJoinedGroups ? message : ""}
    </React.Fragment>
  );
}

export default GroupsList;

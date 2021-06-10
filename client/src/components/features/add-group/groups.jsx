import React from "react";
import GroupsList from "./groups-list";

function Groups(props) {
  const { groups, joinedGroups } = props;

  return (
    <React.Fragment>
      <div className="row-mx-0">
        <div className="col-md-12 px-0">
          <div className="groups-list-text">
            <h4>
              Your Groups <i className="fas fa-caret-right"></i>
            </h4>
          </div>
        </div>
      </div>

      <div className="row mx-0">
        <div className="col-md-12 px-0">
          <div className="groups-list">
            <GroupsList groups={groups} joinedGroups={joinedGroups} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Groups;

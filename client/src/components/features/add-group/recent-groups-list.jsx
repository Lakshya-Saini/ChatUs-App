import React from "react";
import Button2 from "../../common/button2";

function RecentGroupsList(props) {
  const { allGroups, handleClick } = props;

  return (
    <React.Fragment>
      {allGroups !== undefined && allGroups.length > 0 ? (
        allGroups.map((group) => (
          <div
            className="recent-groups-list-item"
            key={group._id}
            id={group._id}
          >
            <div className="row mx-0">
              <div className="col-md-2">
                <img src={`/img/${group.image}`} id="user-img" alt="img" />
              </div>
              <div className="col-md-7">
                <h5>{group.groupName}</h5>
                <p className="members">Members - {group.members.length}</p>
              </div>
              <div className="col-md-3">
                <Button2
                  type="button"
                  className="btn btn-block shadow-none join-group-btn"
                  value="Join"
                  handleLink={handleClick}
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <h5>No Groups</h5>
      )}
    </React.Fragment>
  );
}

export default RecentGroupsList;

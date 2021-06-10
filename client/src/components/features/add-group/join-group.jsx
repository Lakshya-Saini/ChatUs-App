import React from "react";
import RecentGroupsList from "./recent-groups-list";
import Search from "../../common/search";

function JoinGroup(props) {
  const { allGroups, value, handleChange, handleClick } = props;

  return (
    <React.Fragment>
      <div className="row-mx-0">
        <div className="col-md-12 px-0">
          <div className="recent-groups-list-text">
            <h4>
              Recently Added Groups <i className="fas fa-caret-right"></i>
            </h4>
          </div>
        </div>
      </div>

      <div className="row mx-0">
        <div className="col-md-12 px-0">
          <div className="search mt-1">
            <Search
              id="search"
              type="text"
              name="search"
              placeholder="Search Groups"
              icon="fa-search"
              value={value}
              handleChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="row mx-0">
        <div className="col-md-12 px-0">
          <div className="recent-groups-list">
            <RecentGroupsList allGroups={allGroups} handleClick={handleClick} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default JoinGroup;

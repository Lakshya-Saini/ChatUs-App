import React from "react";
import Search from "../../common/search";
import UsersList from "./users-list";

function Users(props) {
  const {
    groups,
    userJoinedGroups,
    searchedGroups,
    handleGroupClick,
    searchedGroup,
    groupSearchChange,
    friendList,
    allFriends,
    userProfileImages,
    handleFriendClick,
  } = props;

  return (
    <React.Fragment>
      <div className="users">
        <div className="row-mx-0">
          <div className="col-md-12 px-0">
            <div className="search">
              <Search
                id="search"
                type="text"
                name="search"
                placeholder="Search Groups"
                icon="fa-search"
                value={searchedGroup}
                handleChange={groupSearchChange}
              />
            </div>
          </div>
        </div>

        <div className="row mx-0">
          <div className="col-md-12 px-0">
            <div className="users-list">
              <UsersList
                groups={groups}
                userJoinedGroups={userJoinedGroups}
                searchedGroups={searchedGroups}
                handleGroupClick={handleGroupClick}
                friendList={friendList}
                allFriends={allFriends}
                userProfileImages={userProfileImages}
                handleFriendClick={handleFriendClick}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Users;

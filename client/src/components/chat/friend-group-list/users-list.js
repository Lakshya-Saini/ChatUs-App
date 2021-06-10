import React, { memo } from "react";
import SearchedGroups from "./searched-groups";
import UserCreatedAndJoinedGroups from "./user-created-and-joined-groups";
import AllFriends from "./all-friends";

function UsersList(props) {
  const {
    groups,
    userJoinedGroups,
    searchedGroups,
    friendList,
    allFriends,
    userProfileImages,
    handleGroupClick,
    handleFriendClick,
  } = props;
  let isSearched;

  if (searchedGroups !== undefined && searchedGroups.length > 0) {
    isSearched = true;
  } else {
    isSearched = false;
  }

  return (
    <React.Fragment>
      {isSearched ? (
        <SearchedGroups
          groups={searchedGroups}
          handleGroupClick={handleGroupClick}
          handleFriendClick={handleFriendClick}
        />
      ) : (
        <>
          <AllFriends
            friendList={friendList}
            allFriends={allFriends}
            userProfileImages={userProfileImages}
            handleFriendClick={handleFriendClick}
          />
          <UserCreatedAndJoinedGroups
            myGroups={groups}
            joinedGroups={userJoinedGroups}
            handleGroupClick={handleGroupClick}
          />
        </>
      )}
    </React.Fragment>
  );
}

export default memo(UsersList);

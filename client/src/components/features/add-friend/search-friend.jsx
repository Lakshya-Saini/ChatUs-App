import React from "react";
import Search from "../../common/search";
import SearchedUser from "./searched-user";

function SearchFriend(props) {
  const {
    searchedUser,
    searchedUsers,
    allUsers,
    userSearchChange,
    sendRequest,
  } = props;
  let isSearched = false;
  let message = <h6>No User(s) Found</h6>;

  if (searchedUser) {
    isSearched = true;
  }

  return (
    <React.Fragment>
      <div className="row-mx-0">
        <div className="col-md-12 px-0">
          <Search
            id="search"
            type="text"
            name="search"
            placeholder="Search Groups"
            icon="fa-search"
            value={searchedUser}
            handleChange={userSearchChange}
          />
        </div>
      </div>
      <div className="row-mx-0">
        <div className="col-md-12 px-0">
          {!isSearched
            ? allUsers && allUsers.length > 0
              ? allUsers.map((user) => (
                  <SearchedUser
                    key={user._id}
                    user={user}
                    sendRequest={sendRequest}
                  />
                ))
              : message
            : searchedUsers && searchedUsers.length > 0
            ? searchedUsers.map((user) => (
                <SearchedUser
                  key={user._id}
                  user={user}
                  sendRequest={sendRequest}
                />
              ))
            : message}
        </div>
      </div>
    </React.Fragment>
  );
}

export default SearchFriend;

import React from "react";
import { Link } from "react-router-dom";

const SearchedUser = (props) => {
  const { user, sendRequest } = props;

  return (
    <React.Fragment>
      <div className="searched-result">
        <div className="row mx-0">
          <div className="col-md-1 px-0">
            <img src="/img/default.png" alt="img" />
          </div>
          <div className="col-md-7">
            <h5>{user.fullName}</h5>
            <p>{user.status.substr(0, 55) + "..."}</p>
          </div>
          <div className="col-md-4">
            <Link
              to="#"
              className="btn shadow-none add-friend-btn"
              onClick={() => sendRequest(user._id)}
            >
              Send Request
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SearchedUser;

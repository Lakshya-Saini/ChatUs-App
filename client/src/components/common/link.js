import React from "react";
import { Link } from "react-router-dom";

const Links = (props) => {
  const { className, path, value } = props;

  return (
    <React.Fragment>
      <div className="form-group">
        <Link className={className} to={path}>
          {value}
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Links;

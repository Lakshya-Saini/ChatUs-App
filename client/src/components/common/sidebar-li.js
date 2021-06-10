import React from "react";
import { Link } from "react-router-dom";

const SidebarLI = (props) => {
  const { className, title, path, icon, handleLogout, handleClick } = props;

  return (
    <React.Fragment>
      <Link to={path}>
        <li
          className={className}
          data-toggle="tooltip"
          data-placement="right"
          title={title}
          onClick={path === "#" ? handleLogout : handleClick}
        >
          <i className={`fas ${icon}`}></i>
        </li>
      </Link>
    </React.Fragment>
  );
};

export default SidebarLI;

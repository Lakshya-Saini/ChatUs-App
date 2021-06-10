import React from "react";
import SidebarLI from "./sidebar-li";

function Sidebar(props) {
  const { activeComponent, handleLogout, handleClick } = props;

  return (
    <React.Fragment>
      <div className="sidebar">
        <ul>
          <SidebarLI
            className={activeComponent === "chat" ? "active" : ""}
            title="Chat"
            path="/chat"
            icon="fa-comments"
            handleClick={handleClick}
          />
          <SidebarLI
            className={activeComponent === "add friend" ? "active" : ""}
            title="Add Friend"
            path="/add-friend"
            icon="fa-user-plus"
            handleClick={handleClick}
          />
          <SidebarLI
            className={activeComponent === "groups" ? "active" : ""}
            title="Groups"
            path="/add-group"
            icon="fa-users"
            handleClick={handleClick}
          />
          <SidebarLI
            className={activeComponent === "profile" ? "active" : ""}
            title="Profile"
            path="/profile"
            icon="fa-user-circle"
            handleClick={handleClick}
          />
          <SidebarLI
            className=""
            title="Logout"
            path="#"
            icon="fa-sign-out-alt"
            handleLogout={handleLogout}
          />
        </ul>
      </div>
    </React.Fragment>
  );
}

export default Sidebar;

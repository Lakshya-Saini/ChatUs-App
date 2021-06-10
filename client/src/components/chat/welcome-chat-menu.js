import React from "react";

const WelcomeChatMenu = () => {
  return (
    <React.Fragment>
      <div className="row mx-0">
        <div className="col-md-12 px-0">
          <div className="welcome-chat-menu">
            <img src="/img/chatbot.png" alt="chat-img" />
            <h5>Welcome to ChatUs</h5>
            <p>
              Go to Add Friend <i className="fas fa-user-plus"></i> icon or Add
              Group page <i className="fas fa-users"></i> icon. Search for a
              friend or Create or Join Group respectively and start chatting
              with your friends.
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default WelcomeChatMenu;

import React from "react";
import ShowMyMessage from "./show-my-message";
import ShowOtherUserMessage from "./show-other-user-message";

const Message = (props) => {
  const { message, userProfileImages } = props;
  let isSentByCurrentUserOrBot = false;
  let isSentByOtherUser = false;
  let img_url = "";

  if (message) {
    if (message.user === "me" || message.user === "bot") {
      isSentByCurrentUserOrBot = true;
    }
    if (message.user === "other") {
      isSentByOtherUser = true;
    }
  }

  if (userProfileImages && userProfileImages.length > 0) {
    userProfileImages.forEach((profile) => {
      if (message.message.image === "chatbot.png") {
        img_url = "/img/chatbot.png";
      } else if (message.message.image === "default.png") {
        img_url = "/img/default.png";
      } else if (profile.filename === message.message.image) {
        img_url = profile.secure_url;
      }
    });
  }

  return (
    <React.Fragment>
      {isSentByCurrentUserOrBot ? (
        <ShowMyMessage message={message} img_url={img_url} />
      ) : isSentByOtherUser ? (
        <ShowOtherUserMessage message={message} img_url={img_url} />
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default Message;

import React, { useEffect, useRef } from "react";
import Message from "./message";
import getGroupMessages from "../../../utils/getGroupMessages";
import getMessages from "../../../utils/getMessages";

function Messages(props) {
  const {
    currentChannel,
    isGroup,
    groupMessages,
    messages,
    user,
    userProfileImages,
  } = props;

  let allMessages = [];
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, groupMessages]);

  if (isGroup) {
    allMessages = getGroupMessages(groupMessages, currentChannel, user);
  } else {
    allMessages = getMessages(messages, currentChannel, user);
  }

  return (
    <React.Fragment>
      {allMessages.map((message, index) => (
        <Message
          key={index}
          message={message}
          userProfileImages={userProfileImages}
        />
      ))}
      <div ref={messagesEndRef} />
    </React.Fragment>
  );
}

export default Messages;

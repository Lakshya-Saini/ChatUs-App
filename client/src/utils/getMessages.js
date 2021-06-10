const groupMessages = (messages, currentChannel, user) => {
  let allMessages = [];

  if (messages !== undefined && messages.length > 0) {
    messages.forEach((message) => {
      if (message.channel === currentChannel) {
        if (!message.id && message.name === "ChatUs Bot") {
          const newMessage = {
            user: "bot",
            message,
          };
          return allMessages.push(newMessage);
        }
        if (message.id === user.id) {
          const newMessage = {
            user: "me",
            message,
          };
          return allMessages.push(newMessage);
        } else {
          const newMessage = {
            user: "other",
            message,
          };
          return allMessages.push(newMessage);
        }
      }
    });
  }

  return allMessages;
};

export default groupMessages;

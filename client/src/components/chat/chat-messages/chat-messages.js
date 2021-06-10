import React from "react";
import MessagesHeader from "./messages-header";
import Messages from "./messages";
import SendMessages from "./send-messages";

function ChatMessages(props) {
  const {
    addEmoji,
    allGroupUsers,
    blockUser,
    currentChannel,
    data,
    deleteGroupChat,
    deleteFriendChat,
    deleteGroup,
    exitGroup,
    groupMessages,
    hideEmojiMenu,
    keyPress,
    messageChange,
    messageSubmit,
    messages,
    setTyping,
    showEmojisMenu,
    showEmojis,
    userProfileImages,
    user,
    value,
  } = props;

  let isGroup = false;
  if (data && data.groupName) isGroup = true;
  if (data && data.conversation_id) isGroup = false;

  document.addEventListener("click", hideEmojiMenu, true);

  return (
    <React.Fragment>
      <div className="row mx-0">
        <div className="col-md-12 px-0">
          <div className="chat-messages-header">
            <MessagesHeader
              allGroupUsers={allGroupUsers}
              blockUser={blockUser}
              data={data}
              deleteGroupChat={deleteGroupChat}
              deleteFriendChat={deleteFriendChat}
              deleteGroup={deleteGroup}
              exitGroup={exitGroup}
              setTyping={setTyping}
              user={user}
            />
            <hr />
          </div>
        </div>
      </div>
      <div className="row mx-0">
        <div className="col-md-12 px-0">
          <div className="chat-messages-body">
            <Messages
              currentChannel={currentChannel}
              isGroup={isGroup}
              groupMessages={groupMessages}
              messages={messages}
              user={user}
              userProfileImages={userProfileImages}
            />
          </div>
        </div>
      </div>
      <div className="row mx-0">
        <div className="col-md-12 px-0">
          <div className="send-chat-messages">
            <SendMessages
              addEmoji={addEmoji}
              isGroup={isGroup}
              messageChange={messageChange}
              messageSubmit={messageSubmit}
              keyPress={keyPress}
              showEmojis={showEmojis}
              showEmojisMenu={showEmojisMenu}
              value={value}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ChatMessages;

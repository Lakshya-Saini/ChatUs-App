import React from "react";
import GroupHeader from "../chat-messages/group-header";
import FriendHeader from "../chat-messages/friend-header";

function MessagesHeader(props) {
  const {
    allGroupUsers,
    blockUser,
    data,
    deleteGroupChat,
    deleteGroup,
    deleteFriendChat,
    exitGroup,
    setTyping,
    user,
  } = props;

  return (
    <React.Fragment>
      {data && data.groupName ? (
        <GroupHeader
          allGroupUsers={allGroupUsers}
          data={data}
          deleteGroupChat={deleteGroupChat}
          deleteGroup={deleteGroup}
          exitGroup={exitGroup}
          user={user}
        />
      ) : (
        <FriendHeader
          blockUser={blockUser}
          data={data}
          deleteFriendChat={deleteFriendChat}
          setTyping={setTyping}
        />
      )}
    </React.Fragment>
  );
}

export default MessagesHeader;

import uuid from "react-uuid";

const getConversationID = () => {
  return uuid();
};

export default getConversationID;

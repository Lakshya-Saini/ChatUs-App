let users = [];

const addGroupUser = ({ id, user_id, name, image, groupName }) => {
  const existingUser = users.find(
    (user) => user.user_id === user_id && user.groupName === groupName
  );

  if (existingUser) {
    return { existingUser: "Existing User" };
  }

  const newUser = {
    id,
    user_id,
    name,
    image,
    groupName,
  };

  users.push(newUser);

  return { newUser };
};

const getGroupUser = (id) => {
  return users.find((user) => user.id === id);
};

const getUsersInGroup = (groupName) => {
  return users.filter((user) => user.groupName === groupName);
};

const removeGroupUser = (id) => {
  const index = users.findIndex((user) => user.user_id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const clearGroupUsers = () => {
  return (users.length = 0);
};

module.exports = {
  addGroupUser,
  removeGroupUser,
  getGroupUser,
  getUsersInGroup,
  clearGroupUsers,
};

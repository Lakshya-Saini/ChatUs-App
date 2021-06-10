let users = [];

const addUser = ({ id, user_id, name, image, channel }) => {
  const existingUser = users.find(
    (user) => user.user_id === user_id && user.channel === channel
  );

  if (existingUser) {
    return { existingUser: "Existing User" };
  }

  const newUser = {
    id,
    user_id,
    name,
    image,
    channel,
  };

  users.push(newUser);

  return { newUser };
};

const getUser = (user_id, channel) => {
  return users.find(
    (user) => user.user_id === user_id && user.channel === channel
  );
};

const removeUser = (user_id) => {
  const index = users.findIndex((user) => user.user_id === user_id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

module.exports = { addUser, getUser, removeUser };

const filterFriendRequests = (friendRequests) => {
  let requests = [];

  if (friendRequests && friendRequests.length > 0) {
    requests = friendRequests.filter(
      ((set) => (f) => !set.has(f.senderID) && set.add(f.senderID))(new Set())
    );
  }

  return requests;
};

export default filterFriendRequests;

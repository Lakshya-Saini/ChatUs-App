import getUserProfileImagesFromSS from "./getUserProfileImagesFromSS";

const getAllFriends = (friendList, allFriends, userProfileImages) => {
  let friends = [];
  let new_friend_list = [];

  if (
    friendList &&
    friendList.length > 0 &&
    allFriends &&
    allFriends.length > 0
  ) {
    friends = [...allFriends];
  }

  if (friendList && friendList.length > 0) friends = [...friendList];

  if (allFriends && allFriends.length > 0) friends = [...allFriends];

  friends.forEach((friend) => {
    const img_url = getUserProfileImagesFromSS(friend.id);
    let { image, ...rest } = friend;
    const new_friend = { ...rest, image: img_url };
    new_friend_list.push(new_friend);
  });

  return new_friend_list;
};

export default getAllFriends;

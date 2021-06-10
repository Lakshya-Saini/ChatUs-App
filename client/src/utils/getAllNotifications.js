import filterFriendRequests from "./filterFriendRequests";

const getAllNotifications = (
  allNotifications,
  friendRequests,
  requestConfirmation
) => {
  let notifications = [];

  let filterRequests = filterFriendRequests(friendRequests);

  if (filterRequests.length > 0) notifications = [...filterRequests];

  if (requestConfirmation && requestConfirmation.length > 0)
    notifications = [...requestConfirmation];

  if (allNotifications && allNotifications.length > 0)
    notifications = [...allNotifications];

  if (
    filterRequests.length > 0 &&
    requestConfirmation &&
    requestConfirmation.length > 0 &&
    allNotifications &&
    allNotifications.length > 0
  )
    notifications = [...allNotifications];

  return notifications;
};

export default getAllNotifications;

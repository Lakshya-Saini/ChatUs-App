const joinedGroups = [];

const addJoinedGroup = ({ id, image, admin_id, groupName, members }) => {
  const existingGroup = joinedGroups.find(
    (group) => group.groupName === groupName
  );

  if (existingGroup) {
    return { groupAlreadyExists: "Group Already Exists" };
  }

  const newGroup = {
    _id: id,
    image: image,
    admin_id: admin_id,
    groupName: groupName,
    members: members,
  };

  joinedGroups.push(newGroup);

  return { joinedGroups };
};

module.exports = { addJoinedGroup };

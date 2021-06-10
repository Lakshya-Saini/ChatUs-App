const myGroups = [];

const addMyGroup = ({
  id,
  image,
  admin_id,
  groupName,
  members,
  user_groups,
}) => {
  myGroups.length = 0;

  const existingGroup = myGroups.find((group) => group.groupName === groupName);

  if (existingGroup) {
    return { groupAlreadyExists: "Group Already Exists" };
  }

  user_groups.pop();

  user_groups.forEach((group) => {
    const newGroup = {
      _id: group.id,
      image: group.image,
      admin_id: group.admin_id,
      groupName: group.groupName,
      members: group.members,
    };

    myGroups.push(newGroup);
  });

  const newGroup = {
    _id: id,
    image: image,
    admin_id: admin_id,
    groupName: groupName,
    members: members,
  };

  myGroups.push(newGroup);

  return { myGroups };
};

module.exports = { addMyGroup };

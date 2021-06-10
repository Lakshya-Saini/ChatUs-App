const getProfileImageURL = (user, userProfileImages) => {
  let user_img_url = "";

  if (user !== undefined) {
    var { name, image } = user;

    if (image !== "default.png") {
      if (userProfileImages !== undefined) {
        userProfileImages.forEach((profile) => {
          if (profile.filename === image) {
            user_img_url = profile.secure_url;
          }
        });
      }
    } else {
      user_img_url = "/img/default.png";
    }
  }

  return { name, user_img_url };
};

export default getProfileImageURL;

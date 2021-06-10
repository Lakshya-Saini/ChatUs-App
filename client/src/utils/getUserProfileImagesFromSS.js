const getUserProfileImagesFromSS = (image) => {
  let profileImages = sessionStorage.getItem("userProfileImages");
  let image_url;
  let isMatched = false;

  if (JSON.parse(profileImages) && JSON.parse(profileImages).length > 0) {
    JSON.parse(profileImages).forEach((profile) => {
      if (profile.filename === image) {
        image_url = profile.secure_url;
        isMatched = true;
      } else {
        if (!isMatched) {
          image_url = "/img/default.png";
        }
      }
    });
  } else {
    image_url = "/img/default.png";
  }

  return image_url;
};

export default getUserProfileImagesFromSS;

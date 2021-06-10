import React from "react";

const getUrl = (url) => {
  return <img id="profile-img-preview" src={url} alt="img" />;
};

const setUserProfileImage = (image_url, image) => {
  return image_url ? getUrl(image_url) : getUrl(image);
};

export default setUserProfileImage;

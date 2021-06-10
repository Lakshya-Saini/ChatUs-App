import getUserProfileImagesFromSS from "./getUserProfileImagesFromSS";

const getCurrentUserFromSS = () => {
  let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  if (currentUser) {
    const { image, name, phoneNumber, status, date } = currentUser;

    let image_url = getUserProfileImagesFromSS(image);

    return {
      image: image_url,
      name,
      phoneNumber,
      status,
      date,
    };
  }
};

export default getCurrentUserFromSS;

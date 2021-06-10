import isEmpty from "is-empty";

const profileValidation = (fullName, phoneNumber) => {
  if (isEmpty(fullName)) {
    return "Please enter your name";
  }

  if (isEmpty(phoneNumber)) {
    return "Please enter your phone number";
  }

  if (phoneNumber.length !== undefined && phoneNumber.length !== 10) {
    return "Invalid Phone Number";
  }

  if (isEmpty(phoneNumber)) {
    return "Please enter your status";
  }
};

export default profileValidation;

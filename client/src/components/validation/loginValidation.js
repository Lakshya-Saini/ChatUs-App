import isEmpty from "is-empty";

const loginValidation = (phoneNumber, password) => {
  if (isEmpty(phoneNumber)) {
    return "Please enter your phone number";
  }

  if (phoneNumber.length !== 10) {
    return "Invalid phone number";
  }

  if (isEmpty(password)) {
    return "Please enter your password";
  }
};

export default loginValidation;

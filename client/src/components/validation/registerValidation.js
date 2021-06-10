import isEmpty from "is-empty";

const registerValidation = (
  fullName,
  phoneNumber,
  password,
  confirmPassword
) => {
  let regExp;

  if (isEmpty(fullName)) {
    return "Please enter your name";
  }

  if (fullName.length < 2) {
    return "Name must be atleast 2 characters";
  }

  if (isEmpty(phoneNumber)) {
    return "Please enter your phone number";
  }

  if (phoneNumber.length !== 10) {
    return "Invalid phone number";
  }

  if (isEmpty(password)) {
    return "Please enter your password";
  }

  regExp = /[A-Za-z0-9!@#$^&*]{6,20}/;
  if (!regExp.test(password)) {
    return "Invalid Password";
  }

  if (isEmpty(confirmPassword)) {
    return "Please confirm your password";
  }

  if (password !== confirmPassword) {
    return "Both passwords must be same";
  }
};

export default registerValidation;

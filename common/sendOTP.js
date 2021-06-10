const MSG91 = require("msg91-node-v2");
const keys = require("../config/keys");

const msg91 = new MSG91(keys.API_KEY);

module.exports = (otp, phoneNumber) => {
  let options = {
    sender: keys.SENDER_ID,
    route: keys.ROUTE,
    country: keys.COUNTRY_CODE,
    sms: [
      {
        message: `Your OTP is: ${otp}`,
        to: [phoneNumber],
      },
    ],
  };

  msg91
    .send(options)
    .then((data) => {})
    .catch((err) => console.log(err));
};

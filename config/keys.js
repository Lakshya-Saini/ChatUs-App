require("dotenv").config();

module.exports = {
  mongoURI:
    "mongodb://localhost:27017/CHAT-APP",
  secretOrKey: process.env.SECRET_OR_KEY,
  API_KEY: process.env.MSG91_API_KEY,
  SENDER_ID: "AMBITH",
  ROUTE: "4",
  COUNTRY_CODE: "91",
};

const nodemailer = require("nodemailer");

require("dotenv").config();

const { CURRENT_ENVIRONMENT, SMPT_USERNAME, SMPT_PASSWORD } = process.env;


const transport = nodemailer.createTransport({
  host: CURRENT_ENVIRONMENT == "development" ? "smtp.mailtrap.io" : "",
  port: 2525,
  auth: {
    user: SMPT_USERNAME,
    pass: SMPT_PASSWORD,
  },
});


module.exports = transport;
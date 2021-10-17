const transport = require("../config/mail");

module.exports = (message) => {
  var message = {
    from: message.from,
    to: message.to,
    subject: message.subject,
    text: message.text,
    html: message.html,
    // attachments: [
    //   {
    //     filename: "name.txt",
    //     path: message.path,
    //   },],
  };
  transport.sendMail(message);
};

const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
// const sendMail = require("../utils/sendmail");
// const path = require("path");
const transport = require("../config/mail");

router.post("", async (req, res) => {
  const { first_name, last_name, email } = req.body;
  const users = await User.create(req.body);

  const sendMessage = {
    from: "sheetalsindhu@gmail.com",
    to: email,
    subject: "Welcome to Masai School " + first_name + " " + last_name + " ;",
    text:
      "Hey " + first_name + " " + last_name + ", Please confirm your email address",
  };


  const adminOne = {
    from: email,
    to: "ironman@gmail.com",
    subject: "" + first_name + " " + last_name + " has registered with us",
    text: "Please welcome " + first_name + " " + last_name,
    // html: <h3>Please welcome  + first_name  + last_name</h3>,
  };
  const adminTwo = {
    from: email,
    to: "captainamerica@gmail.com",
    subject: "" + first_name + " " + last_name + " has registered with us",
    text: "Please welcome " + first_name + " " + last_name,
  };
  const adminThree = {
    from: email,
    to: "hulk@gmail.com",
    subject: "" + first_name + " " + last_name + " has registered with us",
    text: "Please welcome " + first_name + " " + last_name,
  };
  const adminFour = {
    from: email,
    to: "blackwidow@gmail.com",
    subject: "" + first_name + " " + last_name + " has registered with us",
    text: "Please welcome " + first_name + " " + last_name,
  };
  const adminFive = {
    from: email,
    to: "doctorstrange@gmail.com",
    subject: "" + first_name + " " + last_name + " has registered with us",
    text: "Please welcome " + first_name + " " + last_name,
  };

  transport.sendMail(sendMessage);
  transport.sendMail(adminOne);
  transport.sendMail(adminTwo);
  transport.sendMail(adminThree);
  transport.sendMail(adminFour);
  transport.sendMail(adminFive);

  res.status(201).send({ users });
});

router.get("", async function (req, res) {
  const page = +req.query.page || 1;
  const size = +req.query.size || 10;
  const offset = (page - 1) * size;

  const users = await User.find().skip(offset).limit(size).lean().exec();
  const totalUsersCount = await User.find().countDocuments();
  const totalpages = Math.ceil(totalUsersCount / size);

//   sendMail({
//     from: "sheetal@masai.com",
//     to: "tonystark@stark.com",
//     subject: "hey",
//     text: "Hello, Nice to meet you.",
//     html: "<h3>Iron man</h3>",
//     path: path.join(__dirname, "../files/name.txt")
//   });

  return res.send({ users, totalpages });
});

module.exports = router;

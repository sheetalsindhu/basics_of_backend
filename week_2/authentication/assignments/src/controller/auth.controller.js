const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
require("dotenv").config();

const User = require("../models/user.model");

const { body, validationResult } = require("express-validator");

const newToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY);
};


router.post(
  "/register",
  body("name")
    .isLength({ min: 4, max: 20 })
    .withMessage("Name should be 4 to 20 letters"),

  body("email").isEmail().withMessage("Please enter the Valid email address"),

  body("password")
    .isLength({ min: 8, max: 20 })
    .withMessage("The password must be minlength of 8"),

  async (req, res) => {
    let user;
    const errors = validationResult(req);
    let finalErrors = null;
    if (!errors.isEmpty()) {
      finalErrors = errors.array().map((error) => {
        return { param: error.param, msg: error.msg };
      });
      return res.status(400).send({ errors: finalErrors });
    }

    try {
      user = await User.findOne({ email: req.body.email });
      if (user)
        return res
          .status(400)
          .send({ message: "email address already exists" });

      user = await User.create(req.body);
      let token = newToken(user);
      return res.status(200).send({ user, token });
    } catch (err) {
      return res.status(500).send({ message: "Please Try Again Later !!" });
    }
  }
);

router.post(
  "/login",
  body("email").isEmail().withMessage("Please enter the valid email address"),
  body("password")
    .isLength({ min: 8, max: 20 })
    .withMessage("The password must be length 8"),
  async (req, res) => {
    const errors = validationResult(req);

    let finalErrors = null;
    if (!errors.isEmpty()) {
      finalErrors = errors.array().map((error) => {
        return { param: error.param, msg: error.msg };
      });
      return res.status(400).send({ errors: finalErrors });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (!user)
        return res.status(400).send({
          message: "Please check your email and password.",
        });

      let match = user.checkPassword(req.body.password);
      if (!match)
        return res.status(400).send({
          message: "Please check your email and password.",
        });

      const token = newToken(user);
      return res.status(200).send({ user, token });
    } catch (err) {
      return res.status(500).send({ message: "Please Try Again Later !!" });
    }
  }
);

module.exports = router;

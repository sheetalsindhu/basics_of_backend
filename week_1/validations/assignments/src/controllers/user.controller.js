const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/user.model");

router.post(
  "/",
  body("first_name").notEmpty().isLength({ min: 5 }).withMessage("should be 5 length"),
  body("last_name").notEmpty().isLength({ min: 5 }),
  body("email").notEmpty().isLength({ min: 5 }),
  body("pincode")
    .isLength({ min: 6, max: 6 })
    .withMessage("Should be 6 digits"),
  body("age").custom((value) => {
    if (value >= 1 && value <= 100) {
      return true;
    } else {
      throw new Error("It should be between 1 to 100");
    }
  }),
  body("gender").custom((value) => {
    if (value == "Male" || value == "Female" || value == "Others") {
      return true;
    } else {
      throw new Error("It should be either Male, Female or Others");
    }
  }),
  async (req, res) => {
    const errors = validationResult(req);
    let finalErrors = null;
    if (!errors.isEmpty()) {
      finalErrors = errors.array().map((error) => {
        return {
          param: error.param,
          msg: error.msg,
        };
      });

      return res.status(400).json({ errors: finalErrors });
    }

    try {
      const user = await User.create(req.body);
      return res.status(201).json({ user });
    } catch (err) {
      return res.status(400).send({ err: err.message });
    }
  }
);

module.exports = router;

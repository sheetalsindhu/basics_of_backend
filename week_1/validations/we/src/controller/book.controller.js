const express = require("express");
const router = express.Router();
const Book = require("../models/book.model");

const { body, validationResult } = require("express-validator");

router.post("", async (req, res) => {
  const book = await Book.create(req.body);
});

const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  pages: { type: Number, required: true },
  edition: { type: Number, required: true },
  author: { type: String, required: true },
});

const Book = mongoose.model("book", bookSchema);
module.exports = Book;

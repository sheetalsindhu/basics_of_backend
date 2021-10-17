const mongoose = require("mongoose");

const productSchmea = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  image_urls: [{ type: String, required: true }],
});

const Product = mongoose.model("product", productSchmea);
module.exports = Product;

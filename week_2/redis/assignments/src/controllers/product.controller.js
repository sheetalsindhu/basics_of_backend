const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");
const redis = require("../configs/redis");

router.post("/", async (req, res) => {
  const product = await Product.create(req.body);
  const products = await Product.find().lean().exec();

  redis.set("products", JSON.stringify(products));
  return res.status(201).send({ product });
});

router.get("", (req, res) => {
  redis.get("products", async function (err, myproducts) {
    if (err) {
      console.error(err);
    }
    if (myproducts) {
      return res.status(200).send(JSON.parse(myproducts));
    }

    const products = await Product.find().lean().exec();
    redis.set("product", JSON.stringify(products));
    return res.status(200).send(products);
  });
});

router.get("/:id", (req, res) => {
  redis.get(`products.${req.params.id}`, async function (err, myproducts) {
    if (err) {
      console.error(err);
    }
    if (myproducts) {
      return res.status(200).send(JSON.parse(myproducts));
    }

    const product = await Product.findById(req.params.id).lean().exec();

    redis.set("product", JSON.stringify(product));
    return res.status(200).send(product);
  });
});

router.patch("/:id", async (req, res) => {
  let product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  redis.set(`products.${req.params.id}`, JSON.stringify(product));

  const products = await Product.find().lean().exec();
  redis.set("product", JSON.stringify(products));
  return res.status(200).send(products);
});

router.delete("/:id", async (req, res) => {
  let product = await Product.findByIdAndDelete(req.params.id);
  redis.del(`products.${req.params.id}`);

  const products = await Product.find().lean().exec();
  redis.set("product", JSON.stringify(products));
  return res.status(200).send(products);
});

// 616717490a5bcd7c6134a74a
// 616718e2c5105c3b68825b1a
module.exports = router;

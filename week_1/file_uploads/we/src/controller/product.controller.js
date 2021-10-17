const express = require("express");

const upload = require("../middlewares/file-upload");

const router = express.Router();

const Product = require("../models/product.model");


router.post(
    "/single",
    upload.single("productImages"),
    async function (req, res) {
        const product = await Product.create({
            title: req.body.title,
            price: req.body.price,
            image_urls: req.file.path,
        });
        return res.status(201).send(product);
    }
);

router.post(
    "/multiple",
    upload.any("productImages"),
    async function (req, res) {
        const filePaths = req.files.map((file) => file.path);

        const product = await Product.create({
            title: req.body.title,
            price: req.body.price,
            image_urls: filePaths,
        });

        return res.status(201).send(product);
    }
);

module.exports = router;

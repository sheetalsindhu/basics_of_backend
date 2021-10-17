const express = require("express");

const productController = require("../src/controller/product.controller");

const app = express();
app.use(express.json());

app.use(express.urlencoded());
app.set("view engine", "ejs");

app.get("/products/single", function (req, res) {
    res.render("form");
});


app.use("/products", productController);

module.exports = app;

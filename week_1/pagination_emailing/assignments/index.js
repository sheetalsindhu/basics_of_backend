const express = require("express");

const app = express();
const userController = require("./src/controller/user.controller")
app.use(express.json());

app.use("/users", userController)

module.exports = app;

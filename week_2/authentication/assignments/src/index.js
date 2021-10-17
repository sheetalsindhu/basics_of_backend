
const express = require("express");
const app = express();
app.use(express.json());

const authController = require("./controller/auth.controller");
const postController = require("./controller/post.controller");
const userControler = require("./controller/user.controller")

app.use("/users", userControler)
app.use("/users", authController);
app.use("/posts", postController);

module.exports = app;
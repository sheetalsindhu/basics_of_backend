const express = require("express");
const router = express.Router();


const User = require("../models/user.model");

router.get("/", async(req, res) => {
    const user = await User.find({}).select("-password").lean().exec();

    return res.status(200).json({data: user})
})

module.exports = router;
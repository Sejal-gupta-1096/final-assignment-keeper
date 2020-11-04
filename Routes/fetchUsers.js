const express = require("express");
const router = express.Router();
const User = require('../models/User')

router.get("/", async (req, res) => {

    let users = await User.find({ "messages.0": { "$exists": true } });
    console.log('fetch users' , users)
    return  res.status(200).json({
        users
    });
    
})

module.exports = router;

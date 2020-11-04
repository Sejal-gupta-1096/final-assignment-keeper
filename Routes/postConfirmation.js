
const express = require("express");
const router = express.Router();
const Token = require('../models/Token')
const User = require('../models/User')

router.post("/", async (req, res) => {

    let token = await Token.findOne({ token: req.body.token });
    if (!token) {

        res.status(400).json(
            {
                msg: 'We were unable to find a valid token. Your token my have expired.'
            });
    }

    let user = await User.findOne({
        _id: token._userID,
        email: req.body.email
    })
    if (!user) {

        res.status(400).json({
            msg: 'We were unable to find a user for this token.'
        });
    }

    if (user.isVerified) {
        res.status(400).json({
            msg: 'This user has already been verified.'
        });
    }
    user.isVerified = true;
    await user.save();
    res.status(200).json({
        msg: "The account has been verified. Please log in."
    });
})
module.exports = router

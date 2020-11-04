const express = require("express");
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs')



router.post("/", async (req, res) => {
    var { email, OTP, password } = req.body
    try {
        let user = await User.findOne({ email });
        if (user) {

            if (user.resetOTP === parseInt(OTP)) {
                const salt = await bcrypt.genSalt(10);
                password = await bcrypt.hash(password, salt);
                await User.updateOne({ email }, { $set: { password: password } })
                return res.status(200).json('password changed successfully')
            }
            else {
                return res.status(400).json({ msg: 'Incorrect OTP' })
            }
        }
    }
    catch (err) {
        return res.status(422).json(err)
    }
})

module.exports = router;


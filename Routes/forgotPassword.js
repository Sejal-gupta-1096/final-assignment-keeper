const express = require("express");
const router = express.Router();
const User = require('../models/User')
const nodemailer = require('nodemailer')
const otpGenerator = require('otp-generator')



router.post("/", async (req, res) => {
    const { email } = req.body
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: 'User does not exists'
            })
        }
        const OTP = otpGenerator.generate(5, { digits: true, upperCase: false, specialChars: false, alphabets: false });
        await User.updateOne({ email }, { $set: { resetOTP: OTP } })
        //sending verification code
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'arihantsingla2020@gmail.com',
                pass: 'arihant@1'
            }
        });
        var mailOptions = {
            from: 'no-reply@eracost.com',
            to: user.email,
            subject: 'Account Verification Token',
            text: `Your OTP for reseting password is ${OTP}`
        };
        transporter.sendMail(mailOptions, async err => {
            if (err) {
                await User.deleteOne({ email })
                return res.status(400).json({ msg: 'try again' });
            }
            res.status(200).json('A  email has been sent to ' + user.email + '.');
        });
    }
    catch (err) {
        console.log(err);
        return res.status(422).json(err)

    }


})

module.exports = router;

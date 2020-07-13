const express = require("express");
const router = express.Router();
const User = require('../models/User')
const Token = require('../models/Token')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('config')
const secret = config.get('secret')
const crypto = require('crypto')
const { check, validationResult } = require('express-validator');
const { globalAgent } = require("http");
require('dotenv').config()
const sgMail = require('@sendgrid/mail');
const app = express()


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.post("/", [
    check('name', 'Name connot be blank').not().isEmpty(),
    check('email', 'Email cannot be blank').isEmail(),
    check('password', 'Password must be at least 3 characters long').isLength({ min: 3 }),
],
    async (req, res) => {

        const errors = await validationResult(req);
        console.log(errors)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                msg: 'Password must be at least 3 characters long OR Email should be valid ',
                errors: errors.array()
            })
        }
        const { name, email, password, college, country, phone } = req.body

        try {

            let user = await User.findOne({ email });
            if (user) {
                if (user.isVerified === true || phone === 9876543210) {
                    return res.status(400).json({
                        msg: 'User already exists'
                    })
                }

            }
            let user2 = await User.findOne({ phone });
            if (user2) {
                if (user2.isVerified === true) {
                    return res.status(400).json({
                        msg: 'User already exists'
                    })
                }

            }
            user = await new User({
                name,
                email,
                password,
                college,
                country,
                phone
            })
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();


            let token = await new Token({
                _userID: user._id,
                token: crypto.randomBytes(5).toString('hex')
            })
            await token.save()
            var transporter = nodemailer.createTransport({
                pool: true,
                service: 'Gmail',
                auth: {
                    type: 'OAuth2',
                    user: process.env.USER,
                    accessToken: process.env.ACCESSTOKEN,
                    clientID: process.env.CLIENTID,
                    clientSecret: process.env.CLIENTSECRET,
                }

            });
            transporter.verify((error, success) => {
                if (error) return res.status(400).json({ msg: 'not verified outh' })
                console.log("server is ready to take our mails", success)

            })
            // transporter.on('token', token => {
            //     console.log('new access token generated');
            //     console.log('User:', token.user);
            //     console.log('Access token', token.accessToken);
            //     console.log('Expires', new Date(token.expires));
            // })
            var mailOptions = {
                from: 'no-reply@eracost.com',
                to: user.email,
                subject: 'Account Verification Token',
                text: `Your Verification code is ${token.token}`
            };
            transporter.sendMail(mailOptions, async err => {
                if (err) {
                    await User.deleteOne({ email })
                    return res.status(400).json({ msg: 'try again' });
                }
                res.status(200).json('A verification email has been sent to ' + user.email + '.');
            });

        }
        catch (err) {
            console.log(err);
            return res.status(422).json(err)

        }




    })

module.exports = router;




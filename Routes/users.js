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
var helper = require('sendgrid').mail;
const app = express()
const async = require('async');


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
        // const nodemailer = require("nodemailer");
        // const { google } = require("googleapis");
        // const OAuth2 = google.auth.OAuth2;
        // const oauth2Client = new OAuth2(
        //     process.env.CLIENTID, // ClientID
        //     process.env.CLIENTSECRET, // Client Secret,
        //     "https://developers.google.com/oauthplayground" // Redirect URL
        // );
        // oauth2Client.setCredentials({
        //     refresh_token: process.env.REFRESHTOKEN,
        //     callbackURL: "/http://herokupathauth/google/callback",
        //     proxy: true
        // });
        // const accessToken = oauth2Client.getAccessToken()
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

            function sendEmail(
                parentCallback,
                fromEmail,
                toEmails,
                subject,
                textContent,
                htmlContent
            ) {
                const errorEmails = [];
                const successfulEmails = [];
                const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
                async.parallel([
                    function (callback) {
                        // Add to emails
                        for (let i = 0; i < toEmails.length; i += 1) {
                            // Add from emails
                            const senderEmail = new helper.Email(fromEmail);
                            // Add to email
                            const toEmail = new helper.Email(toEmails[i]);
                            // HTML Content
                            const content = new helper.Content('text/html', htmlContent);
                            const mail = new helper.Mail(senderEmail, subject, toEmail, content);
                            var request = sg.emptyRequest({
                                method: 'POST',
                                path: '/v3/mail/send',
                                body: mail.toJSON()
                            });
                            sg.API(request, function (error, response) {
                                console.log('SendGrid');
                                if (error) {
                                    console.log('Error response received');
                                }
                                console.log(response.statusCode);
                                console.log(response.body);
                                console.log(response.headers);
                            });
                        }
                        // return
                        callback(null, true);
                    }
                ], function (err, results) {
                    console.log('Done');
                });
                parentCallback(null,
                    {
                        successfulEmails: successfulEmails,
                        errorEmails: errorEmails,
                    }
                );
            }
            async.parallel([
                function (callback) {
                    sendEmail(
                        callback,
                        'arihantsingla2020@gmail.com',
                        [user.email],
                        'Subject Line',
                        'Text Content',
                        `<p style="font-size: 32px;">Verification code is ${token.token}</p>`
                    );
                }
            ], function (err, results) {
                if (err) {

                    return res.status(400).json({ msg: 'try again' })
                }
                res.status(200).json('A verification email has been sent to ' + user.email + '.')
            });



            // const smtpTransport = nodemailer.createTransport({
            //     service: "gmail",
            //     auth: {
            //         type: "OAuth2",
            //         user: "arihantsingla2020@gmail.com",
            //         clientId: process.env.CLIENTID,
            //         clientSecret: process.env.CLIENTSECRET,
            //         refreshToken: process.env.REFRESHTOKEN,
            //         accessToken: accessToken
            //     }
            // });



            // var transporter = nodemailer.createTransport({
            //     pool: true,
            //     service: 'Gmail',
            //     auth: {
            //         type: 'OAuth2',
            //         user: process.env.USER,
            //         accessToken: process.env.ACCESSTOKEN,
            //         clientID: process.env.CLIENTID,
            //         clientSecret: process.env.CLIENTSECRET,
            //         refreshToken: process.env.REFRESHTOKEN,
            //         expires: 1594663571726 + 60000000
            //     }

            // });



            // transporter.verify((error, success) => {
            //     if (error) return res.status(400).json({ msg: 'not verified outh' })
            //     console.log("server is ready to take our mails", success)

            // })



            // transporter.on('token', token => {
            //     console.log('new access token generated');
            //     console.log('User:', token.user);
            //     console.log('Access token', token.accessToken);
            //     console.log('Expires', new Date(token.expires));
            // })



            // var mailOptions = {
            //     from: 'no-reply@eracost.com',
            //     to: user.email,
            //     subject: 'Account Verification Token',
            //     text: `Your Verification code is ${token.token}`
            // };


            // transporter.sendMail(mailOptions, async err => {
            //     if (err) {
            //         await User.deleteOne({ email })
            //         return res.status(400).json({ msg: 'try again' });
            //     }
            //     res.status(200).json('A verification email has been sent to ' + user.email + '.');
            // });




            //     smtpTransport.sendMail(mailOptions, async (error, response) => {
            //         if (!error) {
            //             console.log(response)
            //             res.status(200).json('A verification email has been sent to ' + user.email + '.');
            //         }
            //         else {
            //             try {
            //                 User.deleteOne({ email })
            //                 return res.status(400).json({ msg: 'try again' });

            //             }
            //             catch (err) {
            //                 console.log(err)
            //                 res.status(400).json({ msg: 'try again' });

            //             }


            //         }
            //         smtpTransport.close();
            //     });
        }



        catch (err) {
            console.log(err);
            return res.status(422).json(err)

        }




    })

module.exports = router;




const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const { check, validationResult } = require('express-validator');
const checkToken = require('../middleware/auth')

// post
// /api/auth
// public
router.post("/", [
    check('email').isEmail(),
    check('password').isLength({ min: 3 })
],
    async (req, res) => {
        const { email, password } = req.body;
        let user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                msg: `invalid details`
            })
        }
        let findPass = await bcrypt.compare(password, user.password);
        if (!findPass) {
            return res.status(400).json({
                msg: `invalid details`
            })
        }
        const token = jwt.sign({
            data: user.id
        }, 'ERACOST', {
            expiresIn: 360000
        })
        return res.json({
            msg: `user saved sucessfully`,
            token: token
        });

    })


// get
// /api/auth
// private
router.get("/", checkToken, async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.decoded.data }).select("-password");
        return res.json({ user })
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Wrong Token'
        })

    }
})

module.exports = router
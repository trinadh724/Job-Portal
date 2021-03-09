const express = require('express');
const router = express.Router();
const {
    check,
    validationResult
} = require("express-validator");
const Applicant = require('../models/Applicant');
const Recruiter = require('../models/Recruiter');
const auth = require('../middleware/auth');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



// @route       GET auth
// @desc        get info about applicant
// @access      Private


router.get('/', auth, async (req, res) => {
    try {

        let Profile = Applicant;
        if (req.user.who == "Recruiter") Profile = Recruiter;
        const profile = await Profile.findById(req.user.id).select('-password');
        res.status(200).json(profile);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});


// @route       POST auth/login
// @desc        login user, both of them
// @access      Public

router.post(
    "/login",
    [
        check("email", "Please enter a valid email").isEmail(),
        check(
            "password",
            "Password is required"
        ).exists(),
    ],
    async (req, res) => {
        // console.log('heheheh');
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }
        const {
            email,
            password,
            who
        } = req.body;

        try {
            // console.log("hola");
            // console.log(password.length);
            // console.log("hola");
            let profile = await Applicant.findOne({
                email,
            });
            if (!profile) {
                profile = await Recruiter.findOne({
                    email,
                });
                if (!profile) {
                    return res.status(400).json({
                        errors: [{
                            msg: "Invalid Credentials"
                        }]
                    });
                }
            }
            // Check is the password matches for that email.

            const isMatch = await bcrypt.compare(password, profile.password);

            if (!isMatch) {
                return res.status(400).json({
                    errors: [{
                        msg: "Invalid credentails",
                    }, ],
                });
            }

            const payload = {
                user: {
                    id: profile.id,
                    who: profile.who
                },
            };

            jwt.sign(payload, "mySecret", {
                expiresIn: 360000
            }, (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    token,
                });
            });

            // return JWT
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Server error");
        }
    }
);

module.exports = router;
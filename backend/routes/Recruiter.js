const express = require("express");
const {
    check,
    validationResult
} = require("express-validator");
const router = express.Router();
const Recruiter = require("../models/Recruiter");
const Applicant = require('../models/Applicant');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



// @route       POST recruiter
// @desc        Register recruiter
// @access      Public

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter password of leangth atleast 6').isLength({
        min: 6
    })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    const {
        name,
        email,
        password,
        who
    } = req.body;

    try {
        let recruiter = await Recruiter.findOne({
            email,
        });
        if (recruiter) {
            return res.status(400).json({
                errors: [{
                    msg: "User already exists"
                }]
            });
        }
        recruiter = await Applicant.findOne({
            email,
        });
        if (recruiter) {
            return res.status(400).json({
                errors: [{
                    msg: "User already exists"
                }]
            });
        }
        recruiter = new Recruiter({
            name,
            email,
            who
        });

        // Encrypt Password
        const salt = await bcrypt.genSalt(10);
        recruiter.password = await bcrypt.hash(password, salt);
        recruiter.who = "Recruiter";
        await recruiter.save();
        const payload = {
            user: {
                id: recruiter.id,
                who: recruiter.who
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

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
});


module.exports = router;
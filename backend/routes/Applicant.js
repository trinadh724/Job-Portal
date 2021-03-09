const express = require("express");
const {
    check,
    validationResult
} = require("express-validator");
const router = express.Router();
const Applicant = require("../models/Applicant");
const Recruiter = require('../models/Recruiter');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @route       POST applicant
// @desc        Register applicant
// @access      Public

router.post(
    "/",
    [
        check("name", "Name is required").not().isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check(
            "password",
            "Please enter a password with 6 or more character"
        ).isLength({
            min: 6,
        }),
    ],
    async (req, res) => {
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
            // See if the user exists
            let applicant = await Applicant.findOne({
                email,
            });
            if (applicant) {
                return res.status(400).json({
                    errors: [{
                        msg: "User already exists",
                    }, ],
                });
            }
            applicant = await Recruiter.findOne({
                email,
            });
            if (applicant) {
                return res.status(400).json({
                    errors: [{
                        msg: "User already exists",
                    }, ],
                });
            }
            applicant = new Applicant({
                name,
                email,
                password,
                who
            });
            // applicant.skills = skills.split(',').map(skill => skill.trim());

            // Encrypt password
            const salt = await bcrypt.genSalt(10);

            applicant.password = await bcrypt.hash(password, salt);
            applicant.who = "Applicant";
            await applicant.save();

            const payload = {
                user: {
                    id: applicant.id,
                    who: applicant.who
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
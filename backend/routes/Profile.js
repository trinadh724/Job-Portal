const express = require('express');
const router = express.Router();
const Applicant = require('../models/Applicant');
const Recruiter = require('../models/Recruiter');
const auth = require('../middleware/auth');
const {
    check,
    validationResult
} = require("express-validator");


// @route       GET profile/me
// @desc        Get current user profile
// @acess       Private

router.get('/me', auth, async (req, res) => {
    try {
        let Profile = Applicant;
        if (req.user.who == "Recruiter") Profile = Recruiter;
        const profile = await Profile.findById(req.user.id);
        if (!profile) {
            return res.status(400).json({
                msg: "There is no Profile for this user"
            });
        }
        res.status(200).json(profile);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error")
    }
});


// @route       POST profile/me
// @desc        Edit current user profile
// @acess       Private


router.post(
    "/me", [auth, [
        check("name", "Name is required").not().isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check("skills", "Skills are required").not().isEmpty()
    ]],
    async (req, res) => {
        const errors = validationResult(req);
        // console.log(req.body.skills);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }
        const {
            name,
            email,
            skills,
            education,
            who
        } = req.body;

        // Build Profile objects

        const profileFields = {};
        if (name) profileFields.name = name;
        if (email) profileFields.email = email;
        if (skills) profileFields.skills = skills;

        try {
            // See if the user exists
            let applicant = await Applicant.findOne({
                email,
            });
            if (!applicant) {
                return res.status(400).json({
                    errors: [{
                        msg: "Profile doesnt exist",
                    }, ],
                });
            }
            // profileFields.skills = skills.split(',').map(skill => skill.trim());
            // Update
            applicant = await Applicant.findOneAndUpdate({
                _id: req.user.id
            }, {
                $set: profileFields
            }, {
                new: true
            }).select('-password');
            res.status(200).json(applicant);
            // return JWT
        } catch (err) {

            console.log(err.message);
            res.status(500).send("Server error");
        }
    }
);



// @route       POST profile/recruiter/me
// @desc        Edit current recruiter profile
// @acess       Private


router.post(
    "/recruiter/me", [auth, [
        check("name", "Name is required").not().isEmpty(),
        check("email", "Please enter a valid email").isEmail()
    ]], 
    async (req, res) => {
        const errors = validationResult(req);
        // console.log(req.user.skills);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }
        const {
            name,
            email,
            password,
            who,
            contactnumber,
            bio
        } = req.body;

        // Build Profile objects

        const profileFields = {};
        if (name) profileFields.name = name;
        if (email) profileFields.email = email;
        if (contactnumber) profileFields.contactnumber = contactnumber;
        if (bio) profileFields.bio = bio;


        try {
            // See if the user exists
            let recruiter = await Recruiter.findOne({
                email,
            });
            if (!recruiter) {
                return res.status(400).json({
                    errors: [{
                        msg: "Profile doesnt exist",
                    }, ],
                });
            }
            // Update
            recruiter = await Recruiter.findOneAndUpdate({
                _id: req.user.id
            }, {
                $set: profileFields
            }, {
                new: true
            }).select('-password');
            res.status(200).json(recruiter);
            // return JWT
        } catch (err) {

            console.log(err.message);
            res.status(500).send("Server error");
        }
    }
);


// @route       GET profile/all
// @desc        Get all profiles
// @access      Private

router.get('/all', auth, async (req, res) => {
    try {
        let Profile = Applicant;
        if (req.user.who == "Recruiter") Profile = Recruiter;
        const profiles = await Profile.find();
        // console.log(profiles);
        res.status(200).json(profiles);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
});

// @route       GET profile/id/:id
// @desc        Get profile of the id given
// @access      Private


router.get('/id/:id', auth, async (req, res) => {
    try {
        let profile = await Applicant.findById(req.params.id);
        if (profile) {
            return res.status(200).json(profile);
        }
        profile = await Recruiter.findById(req.params.id);
        if (profile) {
            return res.status(200).json(profile);
        }
        res.status(400).json({
            errors: [{
                msg: "Profile not find"
            }]
        });
    } catch (err) {
        console.log(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({
                errors: [{
                    msg: "Profile not find"
                }]
            });
        }
        res.status(500).send("Server error");
    }
});


module.exports = router;
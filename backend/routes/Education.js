const express = require("express");
const {
    check,
    validationResult
} = require("express-validator");
const auth = require('../middleware/auth');
const router = express.Router();
const Education = require('../models/Education');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// @route       POST Education
// @desc        Add Education column
// @access      Private

router.post('/', [auth, [
    check('institute', 'Institute is required').not().isEmpty(),
    check('from', 'From date is required').exists()
]], async (req, res) => {

    const errors = validationResult(req);
        // console.log(req.body.skills);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    const {
        institute,
        to,
        from
    } = req.body;
    // console.log(institute);

    try {
        if(from > to|| to > 2030 || from < 1950){
            return res.status(400).json({
                errors: [{
                    msg: "Invalid to and From dates",
                }, ],
            });   
        }
        education = new Education({
            userid: req.user.id,
            institute,
            to,
            from
        });
        await education.save();
        edu = await Education.find({userid: req.user.id});
        res.status(200).json(edu);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
});


// @route       GET Education
// @desc        GET education of current user
// @access      Private

router.get('/', auth, async (req, res) => {
    try {
        const educations = await Education.find({userid: req.user.id});
        res.status(200).json(educations);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
});


// @route       POST Education/delete
// @desc        DELETE education of current user
// @access      Private

router.post('/delete', auth, async (req, res) => {
    try {
        // console.log(req.bo);
        const education = await Education.findByIdAndDelete(req.body.id);
        edu = await Education.find({userid: req.user.id});
        res.status(200).json(edu);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
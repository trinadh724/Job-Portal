const express = require("express");
const {
    check,
    validationResult
} = require("express-validator");
const router = express.Router();
const Applicant = require("../models/Applicant");
const Recruiter = require('../models/Recruiter');
const ApplicantJob = require("../models/ApplicantJob");
const Job = require('../models/Jobs');
const auth = require('../middleware/auth');


// @route       POST jobs
// @desc        Create a new job
// @access      Private

router.post('/', [auth,[
    check("title", "Please enter a title").not().isEmpty(),
    check("applications", "Please enter valid number of applciations").isNumeric(),

// todo need to complete this list

]] , async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    try {
        if(req.user.who === 'Applicant')
        {
            return res.status(404).json({
                errors: [{
                    msg: "Applciant cannot acces this page",
                }, ],
            })
        }
        const {
            title,
            applications,
            positions,
            date_of_posting,
            deadline,
            skills,
            typeOfJob,
            duration,
            salary,
            rating,
        } = req.body;
        const newJob = new Job({
            title,
            recruiter_id: req.user.id,
            applications,
            positions,
            deadline,
            skills,
            typeOfJob,
            duration,
            salary,
            rating,
            positionsfilled: 0,
            applicationsapplied: 0,
            status: 'Apply'
        });
        let dead = new Date(deadline).getTime();
        var now = new Date().getTime();
        if(dead - now <= 0)
        {
            return res.status(404).json({
                errors: [{
                    msg: "Invalid Deadline",
                }, ],
            })
        }
        await newJob.save();
        const allJobs = await Job.find({recruiter_id: req.user.id});
        // console.log(allJobs);
        res.status(200).json(allJobs);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
});

// @route       GET jobs 
// @desc        GET jobs of current recruiter
// @access      Private


router.get('/', auth , async (req, res)=>{
    try {
        if(req.user.who === 'Applicant')
        {
            const allJobs = await Job.find();
            res.status(200).json(allJobs);
        }
        else{
            const allJobs = await Job.find({recruiter_id: req.user.id});
            res.status(200).json(allJobs);
        }
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
});



// @route       GET jobs/all 
// @desc        GET all jobs
// @access      Private


// router.get('/all', auth , async (req, res)=>{
//     try {
//         if(req.user.who === 'Recruiter')
//         {
//             return res.status(404).json({
//                 errors: [{
//                     msg: "Recruiter cannot acces this page",
//                 }, ],
//             })
//         }
//         const allJobs = await Job.find();
//         res.status(200).json(allJobs);
//     } catch (err) {
//         console.log(err.message);
//         res.status(500).send("Server error");
//     }
// });

// @route       POST jobs/delete 
// @desc        DELETE job using id
// @access      Private


router.post('/delete', auth , async (req, res)=>{
    try {
        if(req.user.who === 'Applicant')
        {
            return res.status(404).json({
                errors: [{
                    msg: "Applciant cannot acces this page",
                }, ],
            })
        }
        const profileFields = {
            status: 'Rejected'
        }
        const appapplications = await ApplicantJob.updateMany({
            job_id: req.body.id
        }, {
            $set: profileFields
        }, {
            new: true
        });
        
        const allJobs = await Job.findByIdAndRemove(req.body.id);
        const all = await Job.find({recruiter_id: req.user.id});
        res.status(200).json(all);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
});


// @route       POST jobs/update
// @desc        Update Job
// @access      Private

router.post('/update', auth, async (req, res)=>{
    
    try {
        if(req.user.who === 'Applicant')
        {
            return res.status(404).json({
                errors: [{
                    msg: "Applciant cannot access this page",
                }, ],
            })
        }
        const {
            applications,
            positions,
            deadline,
            id
        } = req.body;
        const editJob = {
            applications,
            positions,
            deadline,
        };
        const jobdate = await Job.findById(id).date_of_posting;
        let dead = new Date(deadline).getTime();
        if(dead - new Date().getTime() <= 0)
        {
            return res.status(404).json({
                errors: [{
                    msg: "Invalid Deadline",
                }, ],
            })
        }
        // console.log(id);
        const editedjob = await Job.findOneAndUpdate({
            _id: id
        }, {
            $set: editJob
        }, {
            new: true
        });
        // console.log(editedjob);
        res.status(200).json(editedjob);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
});


// @route       POST job/id 
// @desc        GET job using id
// @access      Private


router.post('/id', auth , async (req, res)=>{
    try {
        const allJobs = await Job.findById(req.body.id);
        if(!allJobs)
        {
            return res.status(404).json({
                errors: [{
                    msg: "No such Job exists",
                }, ],
            })
        }
        res.status(200).json(allJobs);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
});


module.exports = router;
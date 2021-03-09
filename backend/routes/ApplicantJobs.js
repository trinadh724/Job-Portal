const express = require("express");
const {
    check,
    validationResult
} = require("express-validator");
const router = express.Router();
const Applicant = require("../models/Applicant");
const Recruiter = require('../models/Recruiter');
const Job = require('../models/Jobs');
const auth = require('../middleware/auth');
const ApplicantJob = require('../models/ApplicantJob');

// @route       POST appjobs
// @desc        Create a new instance job
// @access      Private

router.post('/', auth, async (req, res) => {
    try {
        // console.log('Am I good');
        if(req.user.who === 'Recruiter')
        {
            return res.status(404).json({
                errors: [{
                    msg: "Recruiter cannot acces this page",
                }, ],
            })
        }
        let applis = await ApplicantJob.find({applicant: req.user.id});
        applis = applis.filter((value) => value && value.status !== 'Rejected' && value.status !== 'Accepted');
        if(applis.length>=10)
        {
            return res.status(404).json({
                errors: [{
                    msg: "Maximum Number of active Applications cannot be more than 10",
                }, ],
            })
        }

        const {
            recruiter,
            status,
             sop,
        title,
        salary,
        typeOfJob,
        rating,
        job_id,
        deadline
        } = req.body;
        if(new Date(deadline).getTime() < new Date().getTime()){
            return res.status(404).json({
                errors: [{
                    msg: "Oops seems like you missed the deadline, sorry",
                }, ],
            })
        }
        let ll = await ApplicantJob.find({job_id: job_id, applicant: req.user.id});
        // console.log(ll);
        if(ll.length>0){
            return res.status(404).json({
                errors: [{
                    msg: "Oops seems like you submitted, you cannot submit more than once!!",
                }, ],
            })
        }
        let val = await Job.findById(job_id);
        let {
            applicationsapplied,
        } = val;
        await Job.findOneAndUpdate({_id: job_id},
            {
                $set: {applicationsapplied: applicationsapplied+1},
            }, {
                new: true
            }
        );
        const newinstance = new ApplicantJob({
            recruiter,
            applicant: req.user.id,
            status,
        sop,
        title,
        salary,
        typeOfJob,
        rating,
        job_id,
        dateOfApplication: new Date().getTime(),
        });
        await newinstance.save();
        const all = await ApplicantJob.find({applicant: req.user.id}).populate('recruiter').populate('applicant');
        res.status(200).json(all);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
});


// @route       GET appjobs
// @desc        Get all applications of this user
// @access      Private

router.get('/', auth, async (req, res) => {
    try {
        let all;
        if(req.user.who === 'Applicant'){
            all = await ApplicantJob.find({applicant: req.user.id}).populate('recruiter').populate('applicant');
        }
        else{
            all = await ApplicantJob.find({recruiter: req.user.id}).populate('recruiter').populate('applicant');
        }
        res.status(200).json(all);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
});



// @route       POst appjobs/id
// @desc        Get all applications of this job
// @access      Private

router.post('/id', auth, async (req, res) => {
    try {
        let all;
        all = await ApplicantJob.find({job_id: req.body.id}).populate('recruiter').populate('applicant');
        res.status(200).json(all);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
});



// @route       POst appjobs/statusupdate
// @desc        Update status of all applications of this job
// @access      Private

router.post('/statusupdate', auth, async (req, res) => {
    try {
        let all;
        const {
            _id, 
            status,
            newstatus,
            nopositions,
            noapplications,
            job_id,
        } = req.body;
        let newdata;
        if(newstatus === 'Accepted'){
            newdata = { 
            dateOfJoining: new Date().getTime(),
            status: newstatus
            }
        }
        else {
            newdata = { 
            status: newstatus,}
        }
        
        
        const lo = await Job.findById(job_id);
        const {
            positionsfilled,
            applicationsapplied,
        } = lo;
        console.log(nopositions);
        all = await Job.findOneAndUpdate({_id: job_id},
            {
                $set: {
                    positionsfilled: positionsfilled + nopositions,
                    applicationsapplied: applicationsapplied + noapplications
                },
            }, {
                new: true
            });
        all = await Job.findById(job_id);
        if( all.positionsfilled >= all.positions )
        {
            await ApplicantJob.updateMany({job_id: job_id},
                {
                    $set: {
                        status: 'Rejected'
                    },
                }, {
                    new: true
                });
            await Job.updateMany({_id: job_id},
                    {
                        $set: {
                            status: 'Full'
                        },
                    }, {
                        new: true
                    });
        }
        else if(all.applicationsapplied >= all.applications){
            await Job.updateMany({_id: job_id},
                {
                    $set: {
                        status: 'Full'
                    },
                }, {
                    new: true
                });
        }
        else{
            await Job.updateMany({_id: job_id},
                {
                    $set: {
                        status: 'Apply'
                    },
                }, {
                    new: true
                });
        }
        all = await ApplicantJob.findOneAndUpdate({_id: _id},
            {
                $set: newdata,
            }, {
                new: true
            }
        );
        all = await ApplicantJob.find({job_id: job_id}).populate('recruiter').populate('applicant');
        // console.log(all);
        res.status(200).json(all);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;

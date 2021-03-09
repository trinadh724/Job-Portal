const mongoose = require('mongoose');

const ApplicantJobSchema = new mongoose.Schema({
    
    recruiter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'recruiter'
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'applicant'
    },
    status: {
        type: String,
        require: true,
        default: 'Applied'
    },
    sop: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    salary: {
        type: Number,
        require: true
    },
    typeOfJob: {
        type: String,
        require: true
    },
    rating: {
        type: Number,
    },
    job_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'job'
    },
    dateOfJoining: {
        type: Date,
        deafult: Date.now
    },
    dateOfApplication: {
        type: Date,
        deafult: Date.now,
        require: true
    }

});

module.exports = ApplicantJob = mongoose.model('applicantjob', ApplicantJobSchema);
const mongoose = require('mongoose');
const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    recruiter_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'recruiter'
    },
    applications: {
        type: Number,
        require: true,
        default: 10
    },
    positions: {
        type: Number,
        require: true,
        default: 10 
    },
    positionsfilled: {
        type: Number,
        default: 0
    },
    applicationsapplied: {
        type: Number,
        default: 0
    },
    date_of_posting: {
        type: Date,
        require: true,
        default: Date.now,
    },
    deadline: {
        type: Date,
        require: true,
    },
    skills: {
        type: String,
    },
    typeOfJob: {
        type: String,
        require: true
    },
    duration: {
        type: Number,
        require: true
    },
    salary: {
        type: Number,
        require: true
    },
    rating: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: 'Apply'
    }

});

module.exports = Job = mongoose.model('job', JobSchema); 
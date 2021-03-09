const mongoose = require('mongoose');
const ApplicantSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    who: {
        type: String,
        default: "Applicant"
    },
    password: {
        type: String,
        require: true
    },
    education: [{
        institute: {
            type: String,
            require: true
        },
        from: {
            type: Date,
            default: Date.now,
            require: true
        },
        to: {
            type: Date,
            default: Date.now
        }
    }],
    skills: {
        type: String,
    },
    rating: {
        type: Number,
        default: 0
    }

});

module.exports = Applicant = mongoose.model('applicant', ApplicantSchema);
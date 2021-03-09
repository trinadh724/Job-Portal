const mongoose = require('mongoose');
const RecruiterSchema = new mongoose.Schema({
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
        default: "Recruiter"
    },
    password: {
        type: String,
        require: true
    },
    contactnumber: {
        type: Number,
    },
    bio: {
        type: String
    },
    rating: {
        type: Number,
    }

});

module.exports = Recruiter = mongoose.model('recruiter', RecruiterSchema);
const mongoose = require('mongoose');
const EduacationSchema = new mongoose.Schema({
    institute: {
        type: String,
        require: true
    },
    from: {
        type: Number,
        require: true
    },
    to: {
        type: Number,
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    }
});

module.exports = Eduaction = mongoose.model('education', EduacationSchema);
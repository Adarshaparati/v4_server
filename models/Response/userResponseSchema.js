const mongoose = require('mongoose');

const userResponseSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: ''
    },
    submissionId: {
        type: String,
        default: ''
    }
});

// const User = mongoose.model('User', userSchema);

module.exports = userResponseSchema;
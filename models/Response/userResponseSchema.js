const mongoose = require('mongoose');

const userResponseSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: 'userId'
    },
    submissionId: {
        type: String,
        default: 'submissionId'
    }
});



module.exports = userResponseSchema;
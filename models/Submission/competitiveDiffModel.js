const mongoose = require('mongoose');

const competitiveDiffSchema = new mongoose.Schema({
    competitiveDiff: {
        type: String,
        default: ''
    }
});



module.exports = competitiveDiffSchema;

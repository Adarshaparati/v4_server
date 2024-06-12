const mongoose = require('mongoose');

const caseStudySchema = new mongoose.Schema({
    caseStudies: {
        type: String,
        default: ''
    }
});


module.exports = caseStudySchema;

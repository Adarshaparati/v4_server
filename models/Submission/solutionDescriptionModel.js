const mongoose = require('mongoose');

const solutionDescriptionSchema = new mongoose.Schema({
    solutionsDescription: {
        type: String,
        default: ''
    }
});


module.exports = solutionDescriptionSchema;

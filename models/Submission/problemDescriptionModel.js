const mongoose = require('mongoose');


const problemDescriptionSchema = new mongoose.Schema({
    problemDescription: {
        type: String,
        default: ''
    }
});



module.exports = problemDescriptionSchema;
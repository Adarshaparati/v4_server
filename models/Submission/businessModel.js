const mongoose = require('mongoose');

const businessModelSchema = new mongoose.Schema({
    businessModel: {
        type: String,
        default: ''
    }
});

module.exports = businessModelSchema;

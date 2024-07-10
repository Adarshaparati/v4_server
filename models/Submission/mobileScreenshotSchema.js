const mongoose = require('mongoose');

const mobileScreenSchema = new mongoose.Schema({
    appType: {
        type: String,
        default: ''
    },
    mobileScreenshots: [{
        type: String,
        default: ''
    }]
});



module.exports = mobileScreenSchema;

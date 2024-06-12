const mongoose = require('mongoose');

const productScreenSchema = new mongoose.Schema({
    appType: {
        type: String,
        default: ''
    },
    mobileScreenshots: [{
        type: String,
        default: ''
    }],
    webScreenshots: [{
        type: String,
        default: ''
    }]
});



module.exports = productScreenSchema;

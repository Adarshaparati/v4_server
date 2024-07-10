const mongoose = require('mongoose');

const webScreenSchema = new mongoose.Schema({
    appType: {
        type: String,
        default: ''
    },
    webScreenshots: [{
        type: String,
        default: ''
    }]
});



module.exports = webScreenSchema;

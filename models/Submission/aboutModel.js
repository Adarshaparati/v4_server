const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    companyName: {
        type: String,
        default: ''
    },
    tagline: {
        type: String,
        default: ''
    },
    logo: {
        type: String,
        default: null
    },
    primaryColor: {
        type: String,
        default: ''
    },
    secondaryColor: {
        type: String,
        default: ''
    },
    p50s50: {
        type: String,
        default: ''
    },
    
    p75s25: {
        type: String,
        default: ''
    },
    p25s75: {
        type: String,
        default: ''
    }
});
module.exports = aboutSchema;

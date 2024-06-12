const mongoose = require('mongoose');

const contactInfoSchema = new mongoose.Schema({
    websiteLink: {
        type: String,
        default: ''
    },
    linkedinLink: {
        type: String,
        default: ''
    },
    contactEmail: {
        type: String,
        default: ''
    },
    contactPhone: {
        type: String,
        default: ''
    }
});

module.exports = contactInfoSchema;

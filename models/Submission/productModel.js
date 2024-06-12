const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productOverview: {
        type: String,
        default: ''
    },
    productRoadmap: {
        type: String,
        default: ''
    },
    productRoadmapDescription: {
        type: String,
        default: ''
    },
    technicalArchitecture: {
        type: String,
        default: ''
    }
});
module.exports = productSchema;

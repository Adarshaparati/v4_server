const mongoose = require('mongoose');

const marketSchema = new mongoose.Schema({
    sector: {
        type: String,
        default: ''
    },
    otherSector: {
        type: String,
        default: ''
    },
    industry: {
        type: String,
        default: ''
    },
    otherIndustry: {
        type: String,
        default: ''
    },
    marketDescription: {
        type: String,
        default: ''
    },
    TAM: {
        type: String,
        default: ''
    },
    TAMGrowthRate: {
        type: String,
        default: ''
    },
    SAM: {
        type: String,
        default: ''
    },
    SAMGrowthRate: {
        type: String,
        default: ''
    }
});

module.exports = marketSchema;

const mongoose = require('mongoose');

const financialInfoSchema = new mongoose.Schema({
    financialSnapshot: {
        type: String,
        default: ''
    },
    revenueCost:{
        type: Object,
        default: ['']
    },
    plannedRaise: {
        type: String,
        default: ''
    },
    useOfFunds: {
        type: Object,
        default: ['']
    },
    percentage: {
        type: String,
        default: ''
    }
});

module.exports = financialInfoSchema;

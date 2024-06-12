const mongoose = require('mongoose');

const goToMarketSchema = new mongoose.Schema({
    keyStakeholders: {
        type: String,
        default: ''
    },
    customerPersona: {
        type: String,
        default: ''
    },
    goToMarketStrategy: {
        type: String,
        default: ''
    }
});

module.exports = goToMarketSchema;

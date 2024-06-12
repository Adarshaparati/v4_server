const mongoose = require('mongoose');

const companyDetailsSchema = new mongoose.Schema({
    establishmentYear: {
        type: String,
        default: ''
    },
    companyOverview: {
        type: String,
        default: ''
    }
});

module.exports = companyDetailsSchema;

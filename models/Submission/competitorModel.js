const mongoose = require('mongoose');

const competitorSchema = new mongoose.Schema({
    competitors: [{
        type: String,
        default: ''
    }]
});



module.exports =  competitorSchema;

const mongoose = require('mongoose');

const trackRecordSchema = new mongoose.Schema({
    trackRecord: {
        type: Object,
        default: ['']
    }
});

module.exports = trackRecordSchema;

const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
    teamMembers: [{
        type: Object,
        default: ''
    }]
});



module.exports = teamMemberSchema;

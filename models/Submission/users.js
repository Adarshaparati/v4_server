const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true, // Ensures email uniqueness
        required: true
    },
    latestLogin: {
        type: Date,
        default: Date.now // Sets the default value to the current date/time
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;

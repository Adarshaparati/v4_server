const mongoose = require('mongoose');

async function connectToDb() {
    try {
        const mongoURL = process.env.MONGO_URI;
        if (!mongoURL) {
            throw new Error("MongoDB URI is not defined in the environment variables.");
        }

        await mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); 
    }
}

module.exports = connectToDb;

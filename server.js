const bodyParser = require('body-parser');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express(); 

app.use(cors()); 
app.use(express.json());

// Import routes
const userRoutes = require('./routes/userRoutes');
const historyRoutes = require('./routes/historyRoutes');
const slidesRoutes = require('./routes/slidesRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
const colorsRoutes = require('./routes/colorsRoutes');
const processRoutes = require('./routes/processRoutes');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use routes
app.use('/users', userRoutes);
app.use('/history', historyRoutes);
app.use('/slides', slidesRoutes);
app.use('/submission', submissionRoutes);
app.use('/get-colors', colorsRoutes);
app.use('/process', processRoutes);

// Test route
app.get("/test", (req, res) => {
  console.log("API hit");
  res.json("API hit");
});

module.exports = { app };

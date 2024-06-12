const express = require('express');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express(); 
app.use(cors()); // Enable CORS for all origins
const mongoURL = 'mongodb+srv://pdnigade77:Prthmsh123@formresponse.2ipy7xx.mongodb.net/';

  client = mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }).then(console.error('connected to mongodb'))
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


app.use(express.json());

module.exports = { app, client};

const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const cors = require('cors');
require('dotenv').config();

const app = express();

// const allowedOrigins = [
//   'http://localhost:3000',  //development
//   'https://zynthtestai.web.app', //testing
//   'https://zynth.ai' //Production
// ];

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (allowedOrigins.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: 'GET,POST,PUT,DELETE',
//   allowedHeaders: 'Content-Type,Authorization'
// };
// app.use(cors(corsOptions));
app.use(cors());

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Environment variables
const MERCHANT_KEY = process.env.MERCHANT_KEY || 'DKg25I';
const MERCHANT_SALT = process.env.MERCHANT_SALT || 'FCSLoAXe8swrMzEls4GxcSJJSg7l7KH0';

// Import routes
const userRoutes = require('./routes/userRoutes');
const historyRoutes = require('./routes/historyRoutes');
const slidesRoutes = require('./routes/slidesRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
const colorsRoutes = require('./routes/colorsRoutes');
const processRoutes = require('./routes/processRoutes');
const appscriptRoutes = require('./routes/appscriptRoutes');

// Use routes
app.use('/users', userRoutes);
app.use('/history', historyRoutes);
app.use('/slides', slidesRoutes);
app.use('/submission', submissionRoutes);
app.use('/get-colors', colorsRoutes);
app.use('/process', processRoutes);
app.use('/appscript', appscriptRoutes);

// Test route
app.get("/test", (req, res) => {
  console.log("API hit");
  res.json("API hit");
});

app.post('/api/generate-payu-hash', (req, res) => {
  const { amount, productinfo, firstname, email, phone } = req.body;
  const txnid = `txn${Date.now()}`;
  const status = 'success'; // Set the status to 'success'

  // Construct the hash string with udf1 to udf5 as empty strings
  const hashString = `${MERCHANT_KEY}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|${phone}|${status}|||||||||||||${MERCHANT_SALT}`;

  // Calculate SHA-512 hash
  const hash = crypto.createHash('sha512').update(hashString).digest('hex');

  console.log('Hash string for generation:', hashString);
  console.log('Generated hash:', hash);

  res.json({
    key: MERCHANT_KEY,
    txnid: txnid,
    hash: hash,
  });
});

app.post('/api/verify-payment', (req, res) => {
  const { status, txnid, amount, productinfo, firstname, email, phone, hash } = req.body;

  // Construct the hash string for verification
  const hashString = `${MERCHANT_KEY}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|${phone}|${status}|||||||||||||${MERCHANT_SALT}`;

  // Calculate SHA-512 hash
  const generatedHash = crypto.createHash('sha512').update(hashString).digest('hex');

  console.log('Hash string for verification:', hashString);
  console.log('Received hash:', hash);
  console.log('Generated hash:', generatedHash);

  if (generatedHash === hash) {
    res.json({ verified: true });
  } else {
    console.error('Hash mismatch:', { received: hash, generated: generatedHash });
    res.json({ verified: false });
  }
});

module.exports = { app };

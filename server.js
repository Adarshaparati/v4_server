const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Environment variables
const MERCHANT_KEY = process.env.MERCHANT_KEY || 'DKg25I';
const MERCHANT_SALT = process.env.MERCHANT_SALT || 'FCSLoAXe8swrMzEls4GxcSJJSg7l7KH0';
if (!MERCHANT_KEY || !MERCHANT_SALT) {
  throw new Error('Merchant key or salt is missing.');
}

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
  res.json({ message: "API hit" });
});

// Function to construct hash string
function constructHashString(txnid, amount, productinfo, firstname, email, phone, status) {
  return `${MERCHANT_KEY}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|${phone}|${status}|||||||||||||${MERCHANT_SALT}`;
}

// Function to generate hash
function generateHash(hashString) {
  return crypto.createHash('sha512').update(hashString).digest('hex');
}

app.post('/api/generate-payu-hash', (req, res) => {
  try {
    const { amount, productinfo, firstname, email, phone } = req.body;
    if (!amount || !productinfo || !firstname || !email || !phone) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const txnid = `txn${Date.now()}`;
    const status = 'success'; // Set the status to 'success'

    const hashString = constructHashString(txnid, amount, productinfo, firstname, email, phone, status);
    const hash = generateHash(hashString);

    console.log('Hash string for generation:', hashString);
    console.log('Generated hash:', hash);

    res.json({
      key: MERCHANT_KEY,
      txnid: txnid,
      amount: amount,
      productinfo: productinfo,
      firstname: firstname,
      email: email,
      phone: phone,
      surl: 'http://localhost:3000/payment-success',
      furl: 'http://localhost:3000/payment-failure',
      hash: hash,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/verify-payment', (req, res) => {
  try {
    const { status, txnid, amount, productinfo, firstname, email, phone, hash } = req.body;
    if (!status || !txnid || !amount || !productinfo || !firstname || !email || !phone || !hash) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const hashString = constructHashString(txnid, amount, productinfo, firstname, email, phone, status);
    const generatedHash = generateHash(hashString);

    console.log('Hash string for verification:', hashString);
    console.log('Received hash:', hash);
    console.log('Generated hash:', generatedHash);

    if (generatedHash === hash) {
      res.json({ verified: true });
    } else {
      console.error('Hash mismatch:', { received: hash, generated: generatedHash });
      res.status(400).json({ verified: false, error: 'Hash mismatch' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/payment-success', (req, res) => {
  res.json({ message: 'Payment successful' });
});

app.get('/payment-failure', (req, res) => {
  res.json({ message: 'Payment failed' });
});

module.exports = { app };
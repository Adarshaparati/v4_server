const express = require('express');
const router = express.Router();
const processController = require('../controllers/processController');

router.post('/fetch-and-process', processController.postFetchAndProcess);

module.exports = router;

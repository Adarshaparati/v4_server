const express = require('express');
const router = express.Router();
const appscriptController = require('../controllers/appscriptController')

router.post('/triggerAppScript',appscriptController.getTriggerAppscript)

module.exports = router;

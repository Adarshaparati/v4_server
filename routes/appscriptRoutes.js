const express = require('express');
const router = express.Router();
const appscriptController = require('../controllers/appscriptController')

router.post('/triggerAppScript',appscriptController.getTriggerAppscript)
// Route to store data in MongoDB
router.post('/storeDataInMongo', appscriptController.storeDataInMongo);
router.post('/storeslideInMongo', appscriptController.storeslideInMongo);


module.exports = router;

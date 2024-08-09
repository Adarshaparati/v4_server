const express = require('express');
const  router = express.Router();
const submissionController = require('../controllers/submissionController');

router.get('/id', submissionController.getSubmissionID);
router.post('/update-row', submissionController.postUpdateRow);
router.post('/store-response', submissionController.postStoreResponse);
router.post('/', submissionController.postSubmission);
router.post('/short-form', submissionController.postShortFormSubmission);
router.post('/section-form', submissionController.postSectionSubmission);
router.post('/inapp-form', submissionController.postInAppSubmission);


module.exports = router;

const express = require('express');
const router = express.Router();
const slidesController = require('../controllers/slidesController');

router.get('/url', slidesController.getSlidesURL);
router.get('/ids', slidesController.getSlideIDs);
router.get('/id_by_section',slidesController.getSlideIDbySection)
router.get('/', slidesController.getSlides);

module.exports = router;

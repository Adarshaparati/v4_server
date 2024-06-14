const express = require('express');
const router = express.Router();
const colorsController = require('../controllers/colorsController');

router.post('/', colorsController.postGetColors);

module.exports = router;

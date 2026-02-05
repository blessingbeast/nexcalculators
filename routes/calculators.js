const express = require('express');
const router = express.Router();
const calculatorController = require('../controllers/calculatorController');

router.get('/:slug', calculatorController.getCalculator);

module.exports = router;

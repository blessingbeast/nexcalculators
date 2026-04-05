const express = require('express');
const router  = express.Router();
const { getHourlySalaryPage, VALID_RATES } = require('../controllers/hourlyController');

// Match exactly: /[number]-an-hour-is-how-much-a-year
// Using regex route so it never interferes with other routes
const HOURLY_PATTERN = /^\/(\d+)-an-hour-is-how-much-a-year$/;

router.get(HOURLY_PATTERN, getHourlySalaryPage);

module.exports = router;
module.exports.VALID_RATES = VALID_RATES;

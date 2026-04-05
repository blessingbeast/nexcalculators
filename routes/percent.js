const express = require('express');
const router  = express.Router();
const { getPercentPage, VALID_PERCENTS, VALID_BASES } = require('../controllers/percentController');

// Match exactly: /[X]-percent-of-[Y] 
const PERCENT_PATTERN = /^\/(\d+)-percent-of-(\d+)$/;

router.get(PERCENT_PATTERN, getPercentPage);

module.exports = router;
module.exports.VALID_PERCENTS = VALID_PERCENTS;
module.exports.VALID_BASES = VALID_BASES;

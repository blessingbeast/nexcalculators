const express = require('express');
const router  = express.Router();
const { getFuelCostPage, VALID_DISTANCES } = require('../controllers/fuelController');

// Match exactly: /fuel-cost-for-[X]-miles
const FUEL_PATTERN = /^\/fuel-cost-for-(\d+)-miles$/;

router.get(FUEL_PATTERN, getFuelCostPage);

module.exports = router;
module.exports.VALID_DISTANCES = VALID_DISTANCES;

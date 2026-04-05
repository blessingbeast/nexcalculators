const express = require('express');
const router = express.Router();
const clusterController = require('../controllers/clusterController');

// Hub page — lists all topic clusters
router.get('/topic-calculators', clusterController.getClusterIndex);

// Individual topic cluster pages
// /percentage-calculators, /salary-calculators, /travel-cost-calculators, /statistics-calculators
router.get('/:slug(percentage-calculators|salary-calculators|travel-cost-calculators|statistics-calculators)', clusterController.getCluster);

module.exports = router;

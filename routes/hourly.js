const express = require('express');
const router  = express.Router();
const fs      = require('fs');
const path    = require('path');
const { getHourlySalaryPage, VALID_RATES } = require('../controllers/hourlyController');

const calculatorsPath = path.join(__dirname, '../calculators/calculators.json');

// ── Hub page: /hourly-salary-calculator ──────────────────────────────────────
router.get('/hourly-salary-calculator', (req, res) => {
    let allCalculators = [];
    try { allCalculators = JSON.parse(fs.readFileSync(calculatorsPath, 'utf8')); } catch(e) {}
    const baseUrl = res.locals.baseUrl || 'https://www.nexcalculators.com';
    res.render('hourly-salary-hub', {
        title: 'Hourly to Salary Calculator – How Much is Your Hourly Pay Per Year? (2026)',
        metaDescription: 'Free hourly to annual salary calculator. See exactly how much $10–$150/hour equals per year, month, and week. Explore 43 detailed hourly salary breakdown pages.',
        canonicalUrl: `${baseUrl}/hourly-salary-calculator`,
        calculators: allCalculators,
        baseUrl
    });
});

// ── Individual pages: /20-an-hour-is-how-much-a-year ─────────────────────────
const HOURLY_PATTERN = /^\/(\d+)-an-hour-is-how-much-a-year$/;
router.get(HOURLY_PATTERN, getHourlySalaryPage);

module.exports = router;
module.exports.VALID_RATES = VALID_RATES;

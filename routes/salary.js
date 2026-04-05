const express = require('express');
const router  = express.Router();
const { getSalaryPage, VALID_K_SALARIES } = require('../controllers/salaryController');

// Match exactly: /[X]k-salary-after-tax
const SALARY_PATTERN = /^\/(\d+)k-salary-after-tax$/;

router.get(SALARY_PATTERN, getSalaryPage);

module.exports = router;
module.exports.VALID_K_SALARIES = VALID_K_SALARIES;

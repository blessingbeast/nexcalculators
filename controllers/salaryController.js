const fs = require('fs');
const path = require('path');

const calculatorsPath = path.join(__dirname, '../calculators/calculators.json');

// Supported "k" values (e.g. 50 = 50k = $50,000)
const VALID_K_SALARIES = [30, 40, 50, 60, 70, 80, 90, 100, 120, 150];
exports.VALID_K_SALARIES = VALID_K_SALARIES;

const fmt = (n) => Number.isInteger(n) ? n.toLocaleString('en-US') : n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

exports.getSalaryPage = (req, res) => {
    // Matches /50k-salary-after-tax
    const matches = req.path.match(/^\/(\d+)k-salary-after-tax$/);
    if (!matches) return res.status(404).end();

    const kValue = parseInt(matches[1], 10);
    
    if (!VALID_K_SALARIES.includes(kValue)) {
        return res.status(404).end();
    }

    const grossYearly = kValue * 1000;
    
    // Estimate effective tax rate based on US brackets (rough approximation)
    let taxRate = 0.22; // 22% default
    if (kValue <= 40) taxRate = 0.18;
    else if (kValue <= 70) taxRate = 0.22;
    else if (kValue <= 100) taxRate = 0.25;
    else taxRate = 0.28;

    const netYearly = grossYearly * (1 - taxRate);
    const taxAmount = grossYearly * taxRate;
    
    const monthlyGross = grossYearly / 12;
    const monthlyNet = netYearly / 12;
    
    const weeklyGross = grossYearly / 52;
    const weeklyNet = netYearly / 52;
    
    // Hourly based on 2080 hours (40 hours * 52 weeks)
    const hourlyGross = grossYearly / 2080;
    const hourlyNet = netYearly / 2080;

    const idx = VALID_K_SALARIES.indexOf(kValue);
    const prev = idx > 0 ? VALID_K_SALARIES[idx - 1] : null;
    const next = idx < VALID_K_SALARIES.length - 1 ? VALID_K_SALARIES[idx + 1] : null;

    const faqs = [
        {
            question: `What is a $${kValue}k salary after taxes?`,
            answer: `A $${fmt(grossYearly)} salary after a rough estimated ${Math.round(taxRate*100)}% tax rate (federal, state, and FICA) comes out to approximately $${fmt(Math.round(netYearly))} per year.`
        },
        {
            question: `How much is $${kValue}k a month?`,
            answer: `Before taxes, $${kValue}k a year is $${fmt(Math.round(monthlyGross))} a month. After estimated taxes, it is about $${fmt(Math.round(monthlyNet))} per month.`
        },
        {
            question: `How much is $${kValue}k a week?`,
            answer: `Before taxes, $${kValue}k a year is $${fmt(Math.round(weeklyGross))} per week. After deductions, you take home roughly $${fmt(Math.round(weeklyNet))} per week.`
        },
        {
            question: `What is $${kValue}k an hour?`,
            answer: `Working a full-time 40-hour week (2,080 hours a year), a $${kValue}k salary equals $${fmt(hourlyGross)} per hour before taxes.`
        }
    ];

    let allCalculators = [];
    try {
        allCalculators = JSON.parse(fs.readFileSync(calculatorsPath, 'utf8'));
    } catch(e) { }

    const baseUrl = res.locals.baseUrl || 'https://www.nexcalculators.com';
    const slug = `${kValue}k-salary-after-tax`;

    res.render('salary-page', {
        title: `$${kValue}k Salary After Tax – Calculate Take Home Pay (Free Online Tool)`,
        metaDescription: `Use this free salary calculator to quickly calculate what a $${kValue}k salary looks like after taxes. Instant results with simple input.`,
        canonicalUrl: `${baseUrl}/${slug}`,
        kValue,
        grossYearly,
        taxRate,
        taxAmount,
        netYearly,
        monthlyGross,
        monthlyNet,
        weeklyGross,
        weeklyNet,
        hourlyGross,
        hourlyNet,
        prev,
        next,
        faqs,
        fmt,
        calculators: allCalculators
    });
};

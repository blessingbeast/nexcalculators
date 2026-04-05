const fs = require('fs');
const path = require('path');

const calculatorsPath = path.join(__dirname, '../calculators/calculators.json');

// All valid hourly rates this system handles
const VALID_RATES = [10, 12, 15, 18, 20, 22, 25, 30, 35, 40, 45, 50, 60, 75, 100];

// Helper: format number with commas (Indian style)
const fmt = (n) => n.toLocaleString('en-IN');

exports.VALID_RATES = VALID_RATES;

exports.getHourlySalaryPage = (req, res) => {
    // Extract rate from URL  e.g. /25-an-hour-is-how-much-a-year => matches[1] = '25'
    const matches = req.path.match(/^\/(\d+)-an-hour-is-how-much-a-year$/);
    if (!matches) return res.status(404).end();

    const rate = parseInt(matches[1], 10);
    if (!VALID_RATES.includes(rate)) {
        return res.status(404).end();
    }

    // Core calculations
    const hoursPerWeek   = 40;
    const weeksPerYear   = 52;
    const yearlyGross    = rate * hoursPerWeek * weeksPerYear;   // full-time annual
    const monthlyGross   = Math.round(yearlyGross / 12);
    const weeklyGross    = rate * hoursPerWeek;
    const dailyGross     = rate * 8;

    // Part-time variants
    const partTime20     = rate * 20 * weeksPerYear;             // 20 hrs/week
    const partTime30     = rate * 30 * weeksPerYear;             // 30 hrs/week

    // Approximate tax deductions (simplified, India – 10% tax + 12% PF approx)
    const estimatedMonthlyTakeHome = Math.round(monthlyGross * 0.78);

    // Neighbour rates for internal links
    const idx  = VALID_RATES.indexOf(rate);
    const prev = idx > 0 ? VALID_RATES[idx - 1] : null;
    const next = idx < VALID_RATES.length - 1 ? VALID_RATES[idx + 1] : null;

    // FAQs
    const faqs = [
        {
            question: `₹${rate} an hour is how much a year?`,
            answer: `₹${rate} per hour, working full-time (40 hours/week, 52 weeks/year), equals ₹${fmt(yearlyGross)} per year before taxes.`
        },
        {
            question: `₹${rate} an hour is how much a month?`,
            answer: `At ₹${rate}/hour full-time, your monthly gross salary is approximately ₹${fmt(monthlyGross)} (₹${fmt(yearlyGross)} ÷ 12 months).`
        },
        {
            question: `₹${rate} an hour is how much a week?`,
            answer: `Working 40 hours at ₹${rate}/hour gives ₹${fmt(weeklyGross)} per week.`
        },
        {
            question: `What is ₹${rate} per hour take-home pay?`,
            answer: `After approximate deductions (tax + PF ≈ 22%), ₹${rate}/hour annually is roughly ₹${fmt(estimatedMonthlyTakeHome)}/month take-home. Use our Take Home Salary Calculator for a precise figure.`
        },
        {
            question: `Is ₹${rate} per hour a good wage in India?`,
            answer: `In India, ₹${rate}/hour = ₹${fmt(yearlyGross)}/year (₹${fmt(monthlyGross)}/month). ${rate < 100 ? 'This is below the national average for skilled professionals but may suit entry-level, part-time, or gig work.' : 'This is a strong professional rate — above median for most sectors except senior tech or consulting roles.'}`
        }
    ];

    // Read calculators for search
    let allCalculators = [];
    try {
        allCalculators = JSON.parse(fs.readFileSync(calculatorsPath, 'utf8'));
    } catch(e) { /* graceful fail */ }

    const baseUrl = res.locals.baseUrl || 'https://www.nexcalculators.com';
    const slug    = `${rate}-an-hour-is-how-much-a-year`;

    res.render('hourly-salary', {
        title:       `₹${rate} an Hour is How Much a Year? – Free Salary Calculator (2026)`,
        metaDescription: `₹${rate} per hour = ₹${fmt(yearlyGross)} per year (₹${fmt(monthlyGross)}/month). See full breakdown: weekly, monthly, yearly salary. Free hourly to annual converter.`,
        canonicalUrl: `${baseUrl}/${slug}`,
        // Page data
        rate,
        yearlyGross,
        monthlyGross,
        weeklyGross,
        dailyGross,
        partTime20,
        partTime30,
        estimatedMonthlyTakeHome,
        prev,
        next,
        faqs,
        fmt,
        // Global
        calculators: allCalculators,
        isHourlyPage: true
    });
};

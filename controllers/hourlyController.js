const fs = require('fs');
const path = require('path');

const calculatorsPath = path.join(__dirname, '../calculators/calculators.json');

// All valid hourly rates this system handles
const VALID_RATES = [
    10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 45, 50, 55, 60, 65, 70, 75, 80, 90,
    100, 120, 150
];

// Helper: format number with commas (US style)
const fmt = (n) => n.toLocaleString('en-US');

exports.VALID_RATES = VALID_RATES;

exports.getHourlySalaryPage = (req, res) => {
    const matches = req.path.match(/^\/(\d+)-an-hour-is-how-much-a-year$/);
    if (!matches) return res.status(404).end();

    const rate = parseInt(matches[1], 10);
    if (!VALID_RATES.includes(rate)) return res.status(404).end();

    // Core calculations
    const hoursPerWeek  = 40;
    const weeksPerYear  = 52;
    const yearlyGross   = rate * hoursPerWeek * weeksPerYear;
    const monthlyGross  = Math.round(yearlyGross / 12);
    const weeklyGross   = rate * hoursPerWeek;
    const dailyGross    = rate * 8;

    // Part-time variants
    const partTime20    = rate * 20 * weeksPerYear;
    const partTime30    = rate * 30 * weeksPerYear;

    // Approximate after-tax (US ~22–24% effective federal+state)
    const estimatedMonthlyTakeHome = Math.round(monthlyGross * 0.77);

    // Neighbour rates for internal links
    const idx  = VALID_RATES.indexOf(rate);
    const prev = idx > 0 ? VALID_RATES[idx - 1] : null;
    const next = idx < VALID_RATES.length - 1 ? VALID_RATES[idx + 1] : null;

    // FAQs
    const faqs = [
        {
            question: `$${rate} an hour is how much a year in the United States?`,
            answer: `$${rate} per hour, working full-time (40 hours/week, 52 weeks/year), equals $${fmt(yearlyGross)} per year before taxes in the United States.`
        },
        {
            question: `$${rate} an hour is how much a month?`,
            answer: `At $${rate}/hour full-time, your monthly gross salary is approximately $${fmt(monthlyGross)} ($${fmt(yearlyGross)} ÷ 12 months).`
        },
        {
            question: `$${rate} an hour is how much a week?`,
            answer: `Working 40 hours at $${rate}/hour gives $${fmt(weeklyGross)} per week before taxes.`
        },
        {
            question: `What is $${rate} per hour take-home pay after taxes?`,
            answer: `After approximate federal and state taxes (~23%), $${rate}/hour annually works out to roughly $${fmt(estimatedMonthlyTakeHome)}/month take-home. Actual amount varies by state and filing status.`
        },
        {
            question: `Is $${rate} per hour a good wage in the United States?`,
            answer: `$${rate}/hour = $${fmt(yearlyGross)}/year ($${fmt(monthlyGross)}/month). ${rate < 20 ? 'This is near or below the federal median wage — suitable for entry-level, part-time, or hourly retail/service roles.' : rate < 40 ? 'This is a solid middle-income wage, above the federal median in most US states.' : 'This is a strong professional rate — well above median household income in most US states.'}`
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
        title:       `$${rate} an Hour is How Much a Year? – Salary Calculator (2026)`,
        metaDescription: `$${rate} per hour = $${fmt(yearlyGross)} per year ($${fmt(monthlyGross)}/month). Full salary breakdown: weekly, monthly, yearly. Free hourly to annual salary converter for the US.`,
        canonicalUrl: `${baseUrl}/${slug}`,
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
        calculators: allCalculators,
        isHourlyPage: true
    });
};

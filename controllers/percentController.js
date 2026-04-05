const fs = require('fs');
const path = require('path');

const calculatorsPath = path.join(__dirname, '../calculators/calculators.json');

// Define the exact valid combinations to avoid infinite programmatic pages
const VALID_PERCENTS = [5, 10, 12, 15, 18, 20, 25, 30, 35, 40, 50];
const VALID_BASES = [50, 100, 200, 250, 500, 1000];

exports.VALID_PERCENTS = VALID_PERCENTS;
exports.VALID_BASES = VALID_BASES;

// Format numbers: allow up to 2 decimal places if needed, add commas
const fmt = (n) => Number.isInteger(n) ? n.toLocaleString('en-US') : n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });

exports.getPercentPage = (req, res) => {
    const matches = req.path.match(/^\/(\d+)-percent-of-(\d+)$/);
    if (!matches) return res.status(404).end();

    const x = parseInt(matches[1], 10);
    const y = parseInt(matches[2], 10);

    if (!VALID_PERCENTS.includes(x) || !VALID_BASES.includes(y)) {
        return res.status(404).end();
    }

    const result = (x / 100) * y;
    
    // Quick math representation
    const decimalX = x / 100;
    
    const faqs = [
        {
            question: `What is ${x}% of ${y}?`,
            answer: `${x} percent of ${y} is ${fmt(result)}.`
        },
        {
            question: `How do you calculate ${x} percent of ${fmt(y)}?`,
            answer: `To calculate ${x}% of ${fmt(y)}, you first convert the percentage to a decimal by dividing by 100 (${x} / 100 = ${decimalX}). Then, you multiply that decimal by ${fmt(y)}: ${decimalX} × ${fmt(y)} = ${fmt(result)}.`
        },
        {
            question: `How to calculate percentages quickly?`,
            answer: `A quick way to calculate percentages is by using fractions or decimals. For example, knowing that 50% is half, 25% is a quarter, and 10% is moving the decimal point one place to the left can help you quickly find parts of numbers.`
        }
    ];

    let allCalculators = [];
    try {
        allCalculators = JSON.parse(fs.readFileSync(calculatorsPath, 'utf8'));
    } catch(e) { }

    const baseUrl = res.locals.baseUrl || 'https://www.nexcalculators.com';
    const slug = `${x}-percent-of-${y}`;

    res.render('percent-page', {
        title: `What is ${x}% of ${y}? – Free Percentage Calculator`,
        metaDescription: `Find out exactly what ${x}% of ${fmt(y)} is. The answer is ${fmt(result)}. See the step-by-step formula and calculation example.`,
        canonicalUrl: `${baseUrl}/${slug}`,
        x,
        y,
        result,
        decimalX,
        faqs,
        fmt,
        calculators: allCalculators
    });
};

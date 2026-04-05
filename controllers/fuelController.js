const fs = require('fs');
const path = require('path');

const calculatorsPath = path.join(__dirname, '../calculators/calculators.json');

// Distances supported natively by this programmatic route
const VALID_DISTANCES = [50, 100, 150, 200, 250, 300, 400, 500, 750, 1000];
exports.VALID_DISTANCES = VALID_DISTANCES;

// Format numbers nicely
const fmt = (n) => Number.isInteger(n) ? n.toLocaleString('en-US') : n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

exports.getFuelCostPage = (req, res) => {
    // Matches /fuel-cost-for-100-miles
    const matches = req.path.match(/^\/fuel-cost-for-(\d+)-miles$/);
    if (!matches) return res.status(404).end();

    const distance = parseInt(matches[1], 10);
    
    // Validate we only serve allowed programmatic pages
    if (!VALID_DISTANCES.includes(distance)) {
        return res.status(404).end();
    }

    // Assumptions for the quick answer example (US Averages)
    const avgMpg = 25; // Miles per gallon
    const avgPricePerGallon = 3.50; // USD
    
    // Core calculation: Fuel Cost = (Distance / MPG) * Price Per Gallon
    const gallonsNeeded = distance / avgMpg;
    const estimatedCost = gallonsNeeded * avgPricePerGallon;

    // Determine neighbor distances for sidebar/links
    const idx = VALID_DISTANCES.indexOf(distance);
    const prev = idx > 0 ? VALID_DISTANCES[idx - 1] : null;
    const next = idx < VALID_DISTANCES.length - 1 ? VALID_DISTANCES[idx + 1] : null;

    const faqs = [
        {
            question: `How much is gas for a ${distance} mile trip?`,
            answer: `The cost of gas for a ${distance} mile trip depends on your vehicle's fuel efficiency and current gas prices. Assuming an average of ${avgMpg} MPG and gas at $${fmt(avgPricePerGallon)} per gallon, the trip would cost approximately $${fmt(estimatedCost)}.`
        },
        {
            question: `How do you calculate fuel cost for ${distance} miles?`,
            answer: `To calculate fuel cost for ${distance} miles, first divide the distance by your car's miles per gallon (MPG) to find the number of gallons needed. Then, multiply the gallons by the price of gas per gallon.`
        },
        {
            question: `How many gallons of gas is ${distance} miles?`,
            answer: `If your car gets ${avgMpg} miles per gallon, you will need ${fmt(gallonsNeeded)} gallons of gas to drive ${distance} miles. Calculate this by dividing ${distance} by your car's MPG.`
        }
    ];

    let allCalculators = [];
    try {
        allCalculators = JSON.parse(fs.readFileSync(calculatorsPath, 'utf8'));
    } catch(e) { }

    const baseUrl = res.locals.baseUrl || 'https://www.nexcalculators.com';
    const slug = `fuel-cost-for-${distance}-miles`;

    res.render('fuel-page', {
        title: `Fuel Cost for ${distance} Miles – Estimate Gas Cost Instantly (2026) | NexCalculators`,
        metaDescription: `Calculate the exact fuel cost for a ${distance} mile trip. See estimated gas prices, gallons needed, and the mathematical formula for a ${distance} mile drive.`,
        canonicalUrl: `${baseUrl}/${slug}`,
        distance,
        avgMpg,
        avgPricePerGallon,
        gallonsNeeded,
        estimatedCost,
        prev,
        next,
        faqs,
        fmt,
        calculators: allCalculators
    });
};

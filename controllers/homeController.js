const fs = require('fs');
const path = require('path');

const calculatorsPath = path.join(__dirname, '../calculators/calculators.json');

exports.getHomePage = (req, res) => {
    fs.readFile(calculatorsPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading calculators.json:', err);
            return res.status(500).render('index', {
                title: 'Error',
                metaDescription: 'An error occurred',
                calculators: []
            });
        }

        try {
            const calculators = JSON.parse(data);
            res.render('index', {
                title: 'Free Online Calculators - Calculate Anything Instantly',
                metaDescription: 'Free online calculators for finance, health, math, and more. Calculate EMI, BMI, Age, Percentage, and more instantly.',
                calculators: calculators
            });
        } catch (parseErr) {
            console.error('Error parsing calculators.json:', parseErr);
            res.status(500).render('index', {
                title: 'Error',
                metaDescription: 'An error occurred',
                calculators: []
            });
        }
    });
};

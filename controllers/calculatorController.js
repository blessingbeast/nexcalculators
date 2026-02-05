const fs = require('fs');
const path = require('path');

const calculatorsPath = path.join(__dirname, '../calculators/calculators.json');

exports.getCalculator = (req, res) => {
    const slug = req.params.slug;

    fs.readFile(calculatorsPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading calculators.json:', err);
            return res.status(500).send('Server Error');
        }

        try {
            const calculators = JSON.parse(data);
            const calculator = calculators.find(c => c.slug === slug);

            if (!calculator) {
                return res.status(404).render('index', {
                    title: 'Calculator Not Found',
                    metaDescription: 'Page not found',
                    calculators: calculators
                });
            }

            // Get Related Calculators from same category
            const relatedCalculators = calculators.filter(c => c.category === calculator.category && c.slug !== calculator.slug);

            // Try to read content file
            const contentPath = path.join(__dirname, `../calculators/content/${slug}.html`);
            fs.readFile(contentPath, 'utf8', (contentErr, contentData) => {
                if (!contentErr) {
                    calculator.content = contentData;
                } else {
                    calculator.content = '<p>Description coming soon.</p>';
                }

                res.render('calculator', {
                    title: calculator.metaTitle,
                    metaDescription: calculator.metaDescription,
                    calculator: calculator,
                    relatedCalculators: relatedCalculators,
                    calculators: calculators
                });
            });

        } catch (parseErr) {
            console.error('Error parsing calculators.json:', parseErr);
            res.status(500).send('Server Error');
        }
    });
};

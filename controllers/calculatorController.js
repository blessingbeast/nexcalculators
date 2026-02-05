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

                // --- SEO LOGIC START ---
                // 1. Extract FAQs from HTML content
                // Looking for <h3>Question</h3><p>Answer</p> pattern common in our content
                const faqs = [];
                const faqRegex = /<h3>(.*?)<\/h3>\s*<p>(.*?)<\/p>/g;
                let match;

                // We limit to first 6 matched FAQs for Schema to avoid noise
                while ((match = faqRegex.exec(calculator.content)) !== null && faqs.length < 6) {
                    faqs.push({
                        question: match[1].replace(/<[^>]*>?/gm, '').trim(), // Strip tags
                        answer: match[2].replace(/<[^>]*>?/gm, '').trim()
                    });
                }

                // 2. Prepare Canonical URL
                const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
                const fullUrl = `${baseUrl}/calculator/${slug}`;

                res.render('calculator', {
                    title: calculator.metaTitle || `${calculator.title} - Free Online Calculator`,
                    metaDescription: calculator.metaDescription || `Calculate ${calculator.title} instantly online. Free, accurate and fast.`,
                    calculator: calculator,
                    relatedCalculators: relatedCalculators,
                    calculators: calculators,
                    // SEO Props
                    canonicalUrl: fullUrl,
                    faqs: faqs,
                    isCalculatorPage: true
                });
            });

        } catch (parseErr) {
            console.error('Error parsing calculators.json:', parseErr);
            res.status(500).send('Server Error');
        }
    });
};

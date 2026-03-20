const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const homeController = require('../controllers/homeController');

const calculatorsPath = path.join(__dirname, '../calculators/calculators.json');

router.get('/', homeController.getHomePage);

// Static Pages
router.get('/about', (req, res) => {
    fs.readFile(calculatorsPath, 'utf8', (err, data) => {
        const calculators = JSON.parse(data);
        res.render('pages/about', { 
            title: 'About NexCalculators – Free Online Calculator Tools for Finance & Health (2026)', 
            metaDescription: 'Learn about NexCalculators — your trusted source for 60+ free, accurate online calculators for finance, health, math, and everyday life.',
            calculators: calculators
        });
    });
});
router.get('/contact', (req, res) => {
    fs.readFile(calculatorsPath, 'utf8', (err, data) => {
        const calculators = JSON.parse(data);
        res.render('pages/contact', { 
            title: 'Contact NexCalculators – Get Help with Our Free Online Calculators', 
            metaDescription: 'Have a question or suggestion? Contact the NexCalculators team. We are happy to help with any of our free online calculator tools.',
            calculators: calculators
        });
    });
});
router.get('/privacy', (req, res) => {
    fs.readFile(calculatorsPath, 'utf8', (err, data) => {
        const calculators = JSON.parse(data);
        res.render('pages/privacy', { 
            title: 'Privacy Policy – NexCalculators.com', 
            metaDescription: 'Read the NexCalculators privacy policy. We do not store personal data. All calculations happen in your browser.',
            calculators: calculators
        });
    });
});
router.get('/terms', (req, res) => {
    fs.readFile(calculatorsPath, 'utf8', (err, data) => {
        const calculators = JSON.parse(data);
        res.render('pages/terms', { 
            title: 'Terms of Service – NexCalculators.com', 
            metaDescription: 'Read the NexCalculators terms of service and usage policy.',
            calculators: calculators
        });
    });
});
router.get('/google-search-console', (req, res) => res.render('pages/seo-helper', { title: 'SEO Verification', metaDescription: 'SEO Helper' }));

// Calculator Directory
router.get('/calculators', (req, res) => {
    fs.readFile(calculatorsPath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Server Error');
        const calculators = JSON.parse(data);
        res.render('calculators-directory', {
            title: 'All Free Online Calculators – Finance, Health & Math | NexCalculators',
            metaDescription: 'Browse 60+ free online calculators for finance, health, math, and more. Find EMI, BMI, SIP, GST, age calculator and many more tools at NexCalculators.',
            calculators: calculators,
            canonicalUrl: (res.locals.baseUrl || 'https://www.nexcalculators.com') + '/calculators'
        });
    });
});

module.exports = router;

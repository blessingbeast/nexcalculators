const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const homeController = require('../controllers/homeController');

const calculatorsPath = path.join(__dirname, '../calculators/calculators.json');

router.get('/', homeController.getHomePage);

// Static Pages
router.get('/about', (req, res) => res.render('pages/about', { title: 'About Us', metaDescription: 'About NexCalculators' }));
router.get('/contact', (req, res) => res.render('pages/contact', { title: 'Contact Us', metaDescription: 'Contact NexCalculators' }));
router.get('/privacy', (req, res) => res.render('pages/privacy', { title: 'Privacy Policy', metaDescription: 'Privacy Policy of NexCalculators' }));
router.get('/terms', (req, res) => res.render('pages/terms', { title: 'Terms of Service', metaDescription: 'Terms of Service of NexCalculators' }));
router.get('/google-search-console', (req, res) => res.render('pages/seo-helper', { title: 'SEO Verification', metaDescription: 'SEO Helper' }));

// Calculator Directory
router.get('/calculators', (req, res) => {
    fs.readFile(calculatorsPath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Server Error');
        const calculators = JSON.parse(data);
        res.render('calculators-directory', {
            title: 'All Free Online Calculators – Finance, Health & Math | NexCalculators',
            metaDescription: 'Browse 40+ free online calculators for finance, health, math, and more. Find EMI, BMI, SIP, GST, age calculator and many more tools at NexCalculators.',
            calculators: calculators,
            canonicalUrl: (res.locals.baseUrl || 'https://www.nexcalculators.com') + '/calculators'
        });
    });
});

module.exports = router;

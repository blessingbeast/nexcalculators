const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/', homeController.getHomePage);

// Static Pages
router.get('/about', (req, res) => res.render('pages/about', { title: 'About Us', metaDescription: 'About NexCalculators' }));
router.get('/contact', (req, res) => res.render('pages/contact', { title: 'Contact Us', metaDescription: 'Contact NexCalculators' }));
router.get('/privacy', (req, res) => res.render('pages/privacy', { title: 'Privacy Policy', metaDescription: 'Privacy Policy of NexCalculators' }));
router.get('/terms', (req, res) => res.render('pages/terms', { title: 'Terms of Service', metaDescription: 'Terms of Service of NexCalculators' }));
router.get('/google-search-console', (req, res) => res.render('pages/seo-helper', { title: 'SEO Verification', metaDescription: 'SEO Helper' }));

module.exports = router;

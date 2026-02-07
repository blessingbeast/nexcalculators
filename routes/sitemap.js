const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const calculatorsPath = path.join(__dirname, '../calculators/calculators.json');

// Helper to get Base URL
const getBaseUrl = () => {
    if (process.env.BASE_URL) return process.env.BASE_URL;
    if (process.env.NODE_ENV === 'production') return 'https://nexcalculators.com';
    return 'http://localhost:3000';
};

// Sitemap Route
router.get('/sitemap.xml', (req, res) => {
    fs.readFile(calculatorsPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading calculators for sitemap', err);
            return res.status(500).end();
        }

        const calculators = JSON.parse(data);
        const currentDate = new Date().toISOString();

        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!-- Static Pages -->
    <url>
        <loc>${getBaseUrl()}/</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>${getBaseUrl()}/about</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
    </url>
    <url>
        <loc>${getBaseUrl()}/contact</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
    </url>
    <url>
        <loc>${getBaseUrl()}/privacy</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.3</priority>
    </url>
    <url>
        <loc>${getBaseUrl()}/terms</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.3</priority>
    </url>
        `;

        // Calculator Pages
        calculators.forEach(calc => {
            sitemap += `
    <url>
        <loc>${getBaseUrl()}/calculator/${calc.slug}</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>`;
        });

        sitemap += '\n</urlset>';

        res.header('Content-Type', 'application/xml');
        res.send(sitemap);
    });
});

// Robots.txt Route
router.get('/robots.txt', (req, res) => {
    const robots = `User-agent: *
Allow: /

Sitemap: ${getBaseUrl()}/sitemap.xml`;

    res.header('Content-Type', 'text/plain');
    res.send(robots);
});

module.exports = router;

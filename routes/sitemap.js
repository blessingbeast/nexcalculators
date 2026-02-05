const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const calculatorsPath = path.join(__dirname, '../calculators/calculators.json');
const BASE_URL = 'https://nexcalculators.vercel.app'; // Production URL

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
        <loc>${BASE_URL}/</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>${BASE_URL}/about</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
    </url>
    <url>
        <loc>${BASE_URL}/contact</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
    </url>
    <url>
        <loc>${BASE_URL}/privacy</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.3</priority>
    </url>
    <url>
        <loc>${BASE_URL}/terms</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.3</priority>
    </url>
        `;

        // Calculator Pages
        calculators.forEach(calc => {
            sitemap += `
    <url>
        <loc>${BASE_URL}/calculator/${calc.slug}</loc>
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

Sitemap: ${BASE_URL}/sitemap.xml`;

    res.header('Content-Type', 'text/plain');
    res.send(robots);
});

module.exports = router;

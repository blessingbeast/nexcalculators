const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const calculatorsPath = path.join(__dirname, '../calculators/calculators.json');
const blogsPath = path.join(__dirname, '../data/blogs.json');

// Helper to get Base URL
const getBaseUrl = () => {
    if (process.env.BASE_URL) return process.env.BASE_URL;
    if (process.env.NODE_ENV === 'production') return 'https://www.nexcalculators.com';
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
    <url>
        <loc>${getBaseUrl()}/calculators</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
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

        // Blog Index
        sitemap += `
    <url>
        <loc>${getBaseUrl()}/blog</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>`;

        // Blog Posts
        try {
            const blogs = JSON.parse(fs.readFileSync(blogsPath, 'utf8'));
            blogs.forEach(blog => {
                sitemap += `
    <url>
        <loc>${getBaseUrl()}/blog/${blog.slug}</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>`;
            });
        } catch(e) {
            console.error('Could not read blogs.json for sitemap', e);
        }

        // Topic Cluster Hub
        sitemap += `
    <url>
        <loc>${getBaseUrl()}/topic-calculators</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.85</priority>
    </url>`;

        // Individual Topic Cluster Pages
        try {
            const clustersPath = path.join(__dirname, '../data/clusters.json');
            const clusters = JSON.parse(fs.readFileSync(clustersPath, 'utf8'));
            clusters.forEach(cluster => {
                sitemap += `
    <url>
        <loc>${getBaseUrl()}/${cluster.slug}</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.85</priority>
    </url>`;
            });
        } catch(e) {
            console.error('Could not read clusters.json for sitemap', e);
        }

        // Hourly Salary Hub Page
        sitemap += `
    <url>
        <loc>${getBaseUrl()}/hourly-salary-calculator</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.9</priority>
    </url>`;

        // Programmatic Hourly Salary Pages
        const hourlyRates = [
            10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
            30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
            40, 45, 50, 55, 60, 65, 70, 75, 80, 90,
            100, 120, 150
        ];
        hourlyRates.forEach(rate => {
            sitemap += `
    <url>
        <loc>${getBaseUrl()}/${rate}-an-hour-is-how-much-a-year</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>`;
        });

        // Programmatic Percent Pages
        const validPercents = [5, 10, 12, 15, 18, 20, 25, 30, 35, 40, 50];
        const validBases = [50, 100, 200, 250, 500, 1000];
        validPercents.forEach(p => {
            validBases.forEach(b => {
                sitemap += `
    <url>
        <loc>${getBaseUrl()}/${p}-percent-of-${b}</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>`;
            });
        });

        // Programmatic Fuel Cost Pages
        const fuelDistances = [50, 100, 150, 200, 250, 300, 400, 500, 750, 1000];
        fuelDistances.forEach(distance => {
            sitemap += `
    <url>
        <loc>${getBaseUrl()}/fuel-cost-for-${distance}-miles</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>`;
        });

        // Programmatic Salary Pages
        const kSalaries = [30, 40, 50, 60, 70, 80, 90, 100, 120, 150];
        kSalaries.forEach(k => {
            sitemap += `
    <url>
        <loc>${getBaseUrl()}/${k}k-salary-after-tax</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
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
Disallow: /api
Disallow: /admin

Sitemap: ${getBaseUrl()}/sitemap.xml`;

    res.header('Content-Type', 'text/plain');
    res.send(robots);
});

module.exports = router;

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// View Engine Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static Files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Google Verification File (Direct Route)
app.get('/google0572cb8c76265bca.html', (req, res) => {
    res.send('google-site-verification: google0572cb8c76265bca.html');
});

app.use(express.static(path.join(__dirname, 'public')));

// Global Variables Middleware
app.use((req, res, next) => {
    // Set Base URL (fallback to localhost if undefined)
    const baseUrl = process.env.BASE_URL || `http://localhost:${PORT}`;
    res.locals.baseUrl = baseUrl;
    res.locals.currentUrl = `${baseUrl}${req.originalUrl}`;
    next();
});

// Routes
const indexRouter = require('./routes/index');
const calculatorRouter = require('./routes/calculators');

const sitemapRouter = require('./routes/sitemap');

app.use('/', indexRouter);
app.use('/', sitemapRouter); // Handle /sitemap.xml and /robots.txt at root
app.use('/calculator', calculatorRouter);

// 404 Handler
app.use((req, res) => {
    res.status(404).render('index', {
        title: '404 - Not Found',
        metaDescription: 'Page not found',
        calculators: [] // we will populate this properly later
    });
});



if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;

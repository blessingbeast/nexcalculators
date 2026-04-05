const express = require('express');
const path = require('path');
const compression = require('compression');
const app = express();
const PORT = process.env.PORT || 3000;

// Gzip Compression (Performance + PageSpeed)
app.use(compression());

// View Engine Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Google Verification File (Direct Route)
app.get('/google0572cb8c76265bca.html', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send('google-site-verification: google0572cb8c76265bca.html');
});

// WWW Redirect Middleware (Production Only)
app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'production' && req.headers.host === 'nexcalculators.com') {
        return res.redirect(301, `https://www.nexcalculators.com${req.originalUrl}`);
    }
    next();
});

// Static Files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// Global Variables Middleware
app.use((req, res, next) => {
    // Set Base URL (fallback to localhost if undefined)
    let baseUrl = process.env.BASE_URL;
    if (!baseUrl) {
        if (process.env.NODE_ENV === 'production') {
            baseUrl = 'https://www.nexcalculators.com';
        } else {
            baseUrl = `http://localhost:${PORT}`;
        }
    }
    res.locals.baseUrl = baseUrl;
    res.locals.currentUrl = `${baseUrl}${req.originalUrl}`;
    next();
});

// Routes
const indexRouter    = require('./routes/index');
const calculatorRouter = require('./routes/calculators');
const blogRouter     = require('./routes/blog');
const clusterRouter  = require('./routes/clusters');
const hourlyRouter   = require('./routes/hourly');
const percentRouter  = require('./routes/percent');
const sitemapRouter  = require('./routes/sitemap');

app.use('/', indexRouter);
app.use('/', sitemapRouter);   // /sitemap.xml and /robots.txt
app.use('/', clusterRouter);   // /percentage-calculators etc.
app.use('/', hourlyRouter);    // /20-an-hour-is-how-much-a-year etc.
app.use('/', percentRouter);   // /20-percent-of-100 etc.
app.use('/calculator', calculatorRouter);
app.use('/blog', blogRouter);

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

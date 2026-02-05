const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// View Engine Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
const indexRouter = require('./routes/index');
const calculatorRouter = require('./routes/calculators');

app.use('/', indexRouter);
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

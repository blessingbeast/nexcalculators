const fs = require('fs');
const path = require('path');

const clustersPath = path.join(__dirname, '../data/clusters.json');
const calculatorsPath = path.join(__dirname, '../calculators/calculators.json');

// GET /percentage-calculators, /salary-calculators etc.
exports.getCluster = (req, res) => {
    const slug = req.params.slug;

    // Read both data files in parallel
    const clustersRaw = fs.readFileSync(clustersPath, 'utf8');
    const calculatorsRaw = fs.readFileSync(calculatorsPath, 'utf8');

    const clusters = JSON.parse(clustersRaw);
    const allCalculators = JSON.parse(calculatorsRaw);

    const cluster = clusters.find(c => c.slug === slug);

    if (!cluster) {
        return res.status(404).render('index', {
            title: 'Page Not Found',
            metaDescription: 'The page you are looking for does not exist.',
            calculators: allCalculators
        });
    }

    // Resolve full calculator objects for this cluster (in defined order)
    const clusterCalculators = cluster.calculatorSlugs
        .map(s => allCalculators.find(c => c.slug === s))
        .filter(Boolean); // drop any missing ones gracefully

    const baseUrl = res.locals.baseUrl || 'https://www.nexcalculators.com';
    const canonicalUrl = `${baseUrl}/${slug}`;

    res.render('cluster', {
        title: cluster.metaTitle,
        metaDescription: cluster.metaDescription,
        canonicalUrl,
        cluster,
        clusterCalculators,
        calculators: allCalculators,   // for header search
        isClusterPage: true
    });
};

// GET /topic-clusters — index of all clusters (optional hub page)
exports.getClusterIndex = (req, res) => {
    const clustersRaw = fs.readFileSync(clustersPath, 'utf8');
    const calculatorsRaw = fs.readFileSync(calculatorsPath, 'utf8');
    const clusters = JSON.parse(clustersRaw);
    const allCalculators = JSON.parse(calculatorsRaw);
    const baseUrl = res.locals.baseUrl || 'https://www.nexcalculators.com';

    res.render('cluster-index', {
        title: 'Calculator Topic Guides – Free Online Calculators by Topic | NexCalculators',
        metaDescription: 'Browse calculators by topic: percentage calculators, salary calculators, travel cost calculators, and statistics calculators. Free, instant, and accurate.',
        canonicalUrl: `${baseUrl}/topic-calculators`,
        clusters,
        calculators: allCalculators
    });
};

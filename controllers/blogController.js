const fs = require('fs');
const path = require('path');

const blogsPath = path.join(__dirname, '../data/blogs.json');
const calculatorsPath = path.join(__dirname, '../calculators/calculators.json');

// GET /blog – blog listing index
exports.getBlogIndex = (req, res) => {
    fs.readFile(blogsPath, 'utf8', (err, blogsData) => {
        if (err) {
            console.error('Error reading blogs.json:', err);
            return res.status(500).send('Server Error');
        }
        fs.readFile(calculatorsPath, 'utf8', (err2, calcsData) => {
            const calculators = err2 ? [] : JSON.parse(calcsData);
            const blogs = JSON.parse(blogsData);

            res.render('blog/index', {
                title: 'Calculator Guides & How-To Articles – NexCalculators Blog (2026)',
                metaDescription: 'Free calculation guides, formula explanations, and step-by-step tutorials on EMI, GST, profit margin, percentages, and more. Learn to calculate anything.',
                canonicalUrl: (res.locals.baseUrl || 'https://www.nexcalculators.com') + '/blog',
                blogs: blogs,
                calculators: calculators,
                isBlogPage: true
            });
        });
    });
};

// GET /blog/:slug – individual blog post
exports.getBlogPost = (req, res) => {
    const slug = req.params.slug;

    fs.readFile(blogsPath, 'utf8', (err, blogsData) => {
        if (err) {
            console.error('Error reading blogs.json:', err);
            return res.status(500).send('Server Error');
        }

        fs.readFile(calculatorsPath, 'utf8', (err2, calcsData) => {
            const calculators = err2 ? [] : JSON.parse(calcsData);
            const blogs = JSON.parse(blogsData);
            const blog = blogs.find(b => b.slug === slug);

            if (!blog) {
                return res.status(404).render('blog/index', {
                    title: 'Article Not Found – NexCalculators Blog',
                    metaDescription: 'Blog post not found.',
                    blogs: blogs,
                    calculators: calculators
                });
            }

            // Try to load blog content partial
            const contentPath = path.join(__dirname, `../views/blog/posts/${slug}.ejs`);
            const contentExists = fs.existsSync(contentPath);

            const baseUrl = res.locals.baseUrl || 'https://www.nexcalculators.com';
            const canonicalUrl = `${baseUrl}/blog/${slug}`;

            res.render('blog/post', {
                title: blog.metaTitle,
                metaDescription: blog.metaDescription,
                canonicalUrl: canonicalUrl,
                blog: blog,
                contentSlug: slug,
                contentExists: contentExists,
                calculators: calculators,
                isBlogPage: true,
                // Article Schema fields
                articleTitle: blog.title,
                articleDate: blog.datePublished,
                articleDescription: blog.metaDescription
            });
        });
    });
};

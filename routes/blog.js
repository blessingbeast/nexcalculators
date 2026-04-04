const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Blog Index
router.get('/', blogController.getBlogIndex);

// Individual Blog Post
router.get('/:slug', blogController.getBlogPost);

module.exports = router;

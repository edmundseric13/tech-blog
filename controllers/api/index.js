const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../../models');

// Example route
router.get('/', (req, res) => {
  res.send('Welcome to the Tech Blog API!');
});

// User routes
router.use('/users', require('./userRoutes'));

// Post routes
router.use('/posts', require('./postRoutes'));

// Comment routes
router.use('/comments', require('./commentRoutes'));

module.exports = router;
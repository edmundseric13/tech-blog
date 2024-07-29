const express = require('express');
const router = express.Router();

// Example route
router.get('/', (req, res) => {
  res.send('Welcome to the Tech Blog API!');
});

// Add more routes here
router.use('/api', require('./api'));

module.exports = router;
const express = require('express');
const PopularDestination = require('../models/popularDestination'); // Assuming you have this model

const router = express.Router();

// Route to get popular destinations
router.get('/popular-destinations', async (req, res) => {
  try {
    const destinations = await PopularDestination.find(); // Fetch destinations from MongoDB
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching popular destinations' });
  }
});

module.exports = router;

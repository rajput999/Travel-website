const express = require('express');
const router = express.Router();
const { populardestinations, editDestination, deleteDestination, addDestination } = require('../controllers/popularDestinations');

// Existing routes
router.get('/', populardestinations);
router.put('/:id', editDestination);
router.delete('/:id', deleteDestination);
router.post('/', addDestination);

module.exports = router;

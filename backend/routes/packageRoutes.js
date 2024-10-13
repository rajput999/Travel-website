const express = require('express');
const {getfixedpackages,addPackage, deletePackage} = require('../controllers/packages');

const router = express.Router();

// Package Routes
router.get('/', getfixedpackages); // Get fixed packages 
router.post('/', addPackage);  
router.delete('/:id',  deletePackage);

module.exports = router;

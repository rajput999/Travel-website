const express = require('express');
const carController = require('../controllers/cars');

const router = express.Router();

// Car Routes
router.get('/', carController.getCars); // Get cars

router.post('/', carController.createCar);

router.put('/:id', carController.updateCar);

router.delete('/:id', carController.deleteCar);

module.exports = router;

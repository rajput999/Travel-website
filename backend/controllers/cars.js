// controllers/carController.js
const CarOption = require('../models/cars');

const carController = {
    getCars: async (req, res) => {
        try {
            const allcars = await CarOption.find();
            res.json(allcars);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching cars' });
        }
    },

    createCar: async (req, res) => {
        try {
            const car = new CarOption(req.body);
            const newCar = await car.save();
            res.status(201).json(newCar);
        } catch (error) {
            res.status(400).json({ message: 'Error creating car' });
        }
    },

    updateCar: async (req, res) => {
        try {
            const { id } = req.params;
            const car = await CarOption.findByIdAndUpdate(id, req.body, { new: true });
            if (!car) {
                return res.status(404).json({ message: 'Car not found' });
            }
            res.json(car);
        } catch (error) {
            res.status(400).json({ message: 'Error updating car' });
        }
    },

    deleteCar: async (req, res) => {
        try {
            const { id } = req.params;
            const car = await CarOption.findByIdAndDelete(id);
            if (!car) {
                return res.status(404).json({ message: 'Car not found' });
            }
            res.json({ message: 'Car deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting car' });
        }
    }
};

module.exports = carController;
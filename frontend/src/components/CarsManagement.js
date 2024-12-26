import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, Plus, Pencil, Trash } from 'lucide-react';

const baseUrl = process.env.REACT_APP_API_URL;

const CarManagementModal = ({ isOpen, onClose }) => {
  const [cars, setCars] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [formData, setFormData] = useState({
    value: '',
    label: '',
    price: 0,
    wheelers: 0
  });

  useEffect(() => {
    if (isOpen) {
      fetchCars();
    }
  }, [isOpen]);


  const fetchCars = async () => {
    try {
        console.log(`${baseUrl}/cars`)
      const response = await fetch(`${baseUrl}/cars`);
      if (!response.ok) throw new Error('Failed to fetch cars');
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'wheelers' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedCar) {
        await axios.put(`${baseUrl}/cars/${selectedCar._id}`, formData);
      } else {
        await axios.post(`${baseUrl}/cars`, formData);
      }
      fetchCars();
      resetForm();
    } catch (error) {
      console.error('Error saving car:', error);
    }
  };

  const handleDelete = async (carId) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        await axios.delete(`${baseUrl}/cars/${carId}`);
        fetchCars();
      } catch (error) {
        console.error('Error deleting car:', error);
      }
    }
  };

  const handleEdit = (car) => {
    setSelectedCar(car);
    setFormData({
      value: car.value,
      label: car.label,
      price: car.price,
      wheelers: car.wheelers
    });
    setIsAddMode(true);
  };

  const resetForm = () => {
    setFormData({
      value: '',
      label: '',
      price: 0,
      wheelers: 0
    });
    setSelectedCar(null);
    setIsAddMode(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Car Management</h2>
          <button onClick={onClose} className="p-1">
            <X className="w-6 h-6" />
          </button>
        </div>

        {!isAddMode ? (
          <>
            <button
              onClick={() => setIsAddMode(true)}
              className="mb-4 bg-orange-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add New Car
            </button>

            <div className="grid gap-4">
              {cars.map(car => (
                <div key={car._id} className="border p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{car.label}</h3>
                    <p className="text-gray-600">Price: ${car.price}</p>
                    <p className="text-gray-600">Wheelers: {car.wheelers}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(car)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(car._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Value</label>
              <input
                type="text"
                name="value"
                value={formData.value}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Label</label>
              <input
                type="text"
                name="label"
                value={formData.label}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                required
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Wheelers</label>
              <input
                type="number"
                name="wheelers"
                value={formData.wheelers}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                required
                min="0"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
              >
                {selectedCar ? 'Update Car' : 'Add Car'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CarManagementModal;
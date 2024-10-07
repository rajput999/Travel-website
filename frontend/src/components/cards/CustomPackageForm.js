// src/components/CustomPackageForm.jsx
import React, { useState } from 'react';
import { FaCar } from 'react-icons/fa';
import { Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomPackageForm = ({
  selectedPlaces,
  setSelectedPlaces,
  carType,
  setCarType,
  travelDate,
  setTravelDate,
  handleGetQuote,
}) => {
  const [duration, setDuration] = useState('');
  const [errors, setErrors] = useState({});

  const handlePlaceSelection = (place) => {
    setSelectedPlaces((prev) => {
      if (prev.includes(place)) {
        return prev.filter((p) => p !== place);
      } else {
        return [...prev, place];
      }
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (selectedPlaces.length === 0) newErrors.places = 'Please select at least one place.';
    if (!carType) newErrors.carType = 'Please select a car type.';
    if (!travelDate) newErrors.travelDate = 'Please select a travel date.';
    if (!duration || duration <= 0) newErrors.duration = 'Please enter a valid duration.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleGetQuote({ selectedPlaces, carType, travelDate, duration });
    }
  };

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div>
        <label className="text-sm sm:text-lg font-bold text-gray-800 mb-2 block">
          Select Places:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {['Mathura', 'Vrindavan', 'Gokul', 'Barsana'].map((place) => (
            <div key={place} className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 sm:h-5 sm:w-5 rounded border-gray-300 focus:ring-2 focus:ring-orange-500"
                onChange={() => handlePlaceSelection(place)}
                checked={selectedPlaces.includes(place)}
              />
              <label className="ml-2 text-xs sm:text-sm text-gray-700 font-semibold">
                {place}
              </label>
            </div>
          ))}
        </div>
        {errors.places && <p className="text-red-500 text-sm mt-1">{errors.places}</p>}
      </div>

      <div>
        <label className="text-sm sm:text-lg font-bold text-gray-800 mb-2 block">
          Travel Date:
        </label>
        <div className="relative">
          <DatePicker
            selected={travelDate}
            onChange={(date) => setTravelDate(date)}
            className={`block w-full h-10 sm:h-12 pl-10 pr-4 rounded-lg border ${
              errors.travelDate ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-orange-500 text-xs sm:text-sm`}
            placeholderText="dd/mm/yyyy"
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
          />
          <span className="absolute inset-y-0 left-3 sm:left-4 flex items-center pointer-events-none text-orange-500">
            <Calendar size={16} />
          </span>
        </div>
        {errors.travelDate && <p className="text-red-500 text-sm mt-1">{errors.travelDate}</p>}
      </div>

      <div>
        <label className="text-sm sm:text-lg font-bold text-gray-800 mb-2 block">
          Select Car:
        </label>
        <div className="relative">
          <select
            className={`block w-full h-10 sm:h-12 pl-10 pr-4 rounded-lg border ${
              errors.carType ? 'border-red-500' : 'border-gray-300'
            } text-xs sm:text-sm focus:ring-2 focus:ring-orange-500 transition-colors`}
            value={carType}
            onChange={(e) => setCarType(e.target.value)}
          >
            <option value="">Select car type</option>
            <option value="hatchback">Hatchback</option>
            <option value="sedan">Sedan (+₹500)</option>
            <option value="suv">SUV (+₹1000)</option>
          </select>
          <span className="absolute inset-y-0 left-3 sm:left-4 flex items-center pointer-events-none text-orange-500">
            <FaCar size={16} />
          </span>
        </div>
        {errors.carType && <p className="text-red-500 text-sm mt-1">{errors.carType}</p>}
      </div>

      <div>
        <label className="text-sm sm:text-lg font-bold text-gray-800 mb-2 block">
          Duration (Days):
        </label>
        <input
          type="number"
          className={`block w-full h-10 sm:h-12 pl-4 pr-4 rounded-lg border ${
            errors.duration ? 'border-red-500' : 'border-gray-300'
          } focus:ring-2 focus:ring-orange-500 text-xs sm:text-sm`}
          placeholder="Duration (Days)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          min="1"
        />
        {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full h-10 sm:h-12 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg text-sm sm:text-base transition-colors duration-200"
        >
          Get Quote
        </button>
      </div>
    </form>
  );
};

export default CustomPackageForm;

import React, { useState } from 'react';
import { Calendar as CalendarIcon, MapPin, Car, DollarSign } from 'lucide-react';

const carOptions = ['Sedan', 'SUV', 'Truck', 'Convertible', 'Coupe', 'Minivan'];

const SearchBar = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [selectedCar, setSelectedCar] = useState('');
  const [estimatedDistance, setEstimatedDistance] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState('');

  const estimate = () => {
    // Placeholder logic for estimation, replace with actual logic
    const distance = '100 miles';
    const price = '$150';
    setEstimatedDistance(distance);
    setEstimatedPrice(price);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 ">Plan Your Trip</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">From</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Enter departure"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-white text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">To</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Enter destination"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-white text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-white text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Car Type</label>
            <select
              value={selectedCar}
              onChange={(e) => setSelectedCar(e.target.value)}
              className="w-full p-2 bg-white text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Select a car</option>
              {carOptions.map((car) => (
                <option key={car} value={car}>{car}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={estimate}
            className="w-full sm:w-auto px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Estimate
          </button>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <div className="relative">
              <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                value={estimatedDistance}
                placeholder="Estimated Distance"
                readOnly
                className="w-full sm:w-48 pl-10 pr-3 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                value={estimatedPrice}
                placeholder="Estimated Price"
                readOnly
                className="w-full sm:w-48 pl-10 pr-3 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
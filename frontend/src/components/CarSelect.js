import React, { useEffect, useState } from 'react';
import { FaCar, FaChevronDown } from 'react-icons/fa';

const CarSelect = ({ 
  selectedCar, 
  setSelectedCar, 
  error, 
  setError, 
  allCars, 
  islabel = false 
}) => {
  const [isCarDropdownOpen, setIsCarDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.car-dropdown')) {
        setIsCarDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getSelectedCarLabel = () => {
    const car = allCars.find(car => car.value === selectedCar);
    return car ? car.label : 'Select car';
  };

  return (
    <div className="space-y-1 sm:space-y-2 car-dropdown">
      {islabel && <label className="hidden md:block text-xs sm:text-sm font-medium text-gray-700" htmlFor="car-type">
        Car Type
      </label>}
      <div className="relative h-[40px] sm:h-[48px]">
        <button
          type="button"
          onClick={() => setIsCarDropdownOpen(!isCarDropdownOpen)}
          className={`w-full h-full pl-8 sm:pl-10 pr-2 sm:pr-3 bg-white text-gray-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base flex items-center justify-between ${
            error && !selectedCar ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <span className="truncate">{getSelectedCarLabel()}</span>
          <FaChevronDown className="ml-2 text-orange-500" size={14} />
        </button>
        <span className="absolute inset-y-0 left-2 sm:left-3 flex items-center pointer-events-none text-orange-500">
          <FaCar size={16} />
        </span>
        {isCarDropdownOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {allCars.map((car) => (
              <div
                key={car.value}
                onClick={() => {
                  setSelectedCar(car.value);
                  setIsCarDropdownOpen(false);
                  setError('');
                }}
                className={`px-4 py-2 text-sm sm:text-base cursor-pointer hover:bg-orange-100 ${
                  selectedCar === car.value ? 'bg-orange-50 text-orange-600' : 'text-gray-800'
                }`}
              >
                {car.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarSelect;

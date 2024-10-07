// src/components/PackageCard.jsx
import React from 'react';
import { FaCar } from 'react-icons/fa';
import { Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PackageCard = ({
  pkg,
  carType,
  setCarType,
  travelDate,
  setTravelDate,
  calculatePrice,
  handleBookNow,
}) => {
  const truncateText = (text, limit) => {
    return text.length > limit ? `${text.substring(0, limit)}...` : text;
  };

  return (
    <div className="rounded-xl border border-orange-200 bg-white shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="cursor-pointer" onClick={() => handleBookNow(pkg)}>
        <img
          src={pkg.image[0]}
          alt={`${pkg.name} Image`}
          className="w-full h-48 sm:h-52 md:h-60 object-cover"
          loading="lazy"
        />
        <div className="p-4 sm:p-6 bg-gradient-to-r from-orange-500 to-orange-400 text-white">
          <h3 className="text-xl sm:text-2xl md:text-2.5xl font-semibold">
            {pkg.name}
          </h3>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-center mt-2">
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-600">
            ₹{calculatePrice(pkg.basePrice)}
          </p>
          <p className="text-xs sm:text-sm text-gray-600">{pkg.duration}</p>
        </div>

        <div className="mt-2 sm:mt-3 text-gray-700">
          <span className="text-sm sm:text-base">
            {truncateText(pkg.description, 100)}
          </span>
        </div>

        <div className="mt-4">
          <label className="text-sm sm:text-lg font-bold text-gray-800 mb-1 block">
            Select Car:
          </label>
          <div className="relative">
            <select
              className="block w-full h-10 sm:h-12 pl-10 pr-4 rounded-lg border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-orange-500 transition-colors"
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
        </div>

        <div className="mt-4">
          <label className="text-sm sm:text-lg font-bold text-gray-800 mb-1 block">
            Travel Date:
          </label>
          <div className="relative">
            <DatePicker
              selected={travelDate}
              onChange={(date) => setTravelDate(date)}
              className="block w-full h-10 sm:h-12 pl-10 pr-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 text-xs sm:text-sm"
              placeholderText="dd/mm/yyyy"
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
            />
            <span className="absolute inset-y-0 left-3 sm:left-4 flex items-center pointer-events-none text-orange-500">
              <Calendar size={16} />
            </span>
          </div>
        </div>

        <div className="mt-6">
          <button
            className={`w-full h-10 sm:h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all duration-200 text-sm sm:text-base ${
              !carType || !travelDate ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleBookNow(pkg);
            }}
            disabled={!carType || !travelDate}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;

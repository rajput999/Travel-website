// src/components/PackageCard.jsx
import React from 'react';
import { FaCar } from 'react-icons/fa';
import { Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';

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

  const carOptions = [
    {
      value: 'hatchback',
      label: (
        <div className="flex items-center">
          {/* <FaHatchback className="mr-2 text-orange-500" /> */}
          Hatchback
        </div>
      ),
      cost: 0,
    },
    {
      value: 'sedan',
      label: (
        <div className="flex items-center">
          {/* <FaCarSide className="mr-2 text-orange-500" /> */}
          Sedan (+₹500)
        </div>
      ),
      cost: 500,
    },
    {
      value: 'suv',
      label: (
        <div className="flex items-center">
          {/* <FaTruck className="mr-2 text-orange-500" /> */}
          SUV (+₹1000)
        </div>
      ),
      cost: 1000,
    },
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      height: '48px',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(251,113,133,0.5)' : provided.boxShadow,
      paddingLeft: '40px', // To accommodate the icon
    }),
    singleValue: (provided) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
    }),
    option: (provided, state) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#f97316',
      '&:hover': {
        color: '#f97316',
      },
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
  };

  return (
    <div className="rounded-xl border border-orange-200 bg-white shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Package Image and Title */}
      <div
        className="cursor-pointer"
        onClick={() => handleBookNow(pkg)}
        aria-label={`View details for ${pkg.name}`}
      >
        <img
          src={pkg.image[0]}
          alt={`${pkg.name} Image`}
          className="w-full h-48 sm:h-52 md:h-60 object-cover"
          loading="lazy"
        />
        <div className="p-4 sm:p-6 bg-gradient-to-r from-orange-500 to-orange-400 text-white">
          <h3 className="text-xl sm:text-2xl font-semibold">
            {pkg.name}
          </h3>
        </div>
      </div>

      {/* Package Details */}
      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-center mt-2">
          <p className="text-xl sm:text-2xl font-bold text-orange-600">
            ₹{calculatePrice(pkg.basePrice)}
          </p>
          <p className="text-sm text-gray-600">{pkg.duration}</p>
        </div>

        <div className="mt-2 sm:mt-3 text-gray-700">
          <span className="text-sm sm:text-base">
            {truncateText(pkg.description, 100)}
          </span>
        </div>

        {/* Select Car Type */}
        <div>
        <label className="text-sm sm:text-lg font-semibold text-gray-800 mb-2 block">
          Select Car:
        </label>
        <div className="relative">
          <Select
            options={carOptions}
            value={carOptions.find((option) => option.value === carType)}
            onChange={(selectedOption) => setCarType(selectedOption ? selectedOption.value : '')}
            styles={customStyles}
            placeholder="Select car type"
            isClearable
            aria-label="Select Car Type"
          />
          <span className="absolute inset-y-0 left-3 sm:left-4 flex items-center pointer-events-none text-orange-500">
            <FaCar size={20} />
          </span>
        </div>
      </div>

        {/* Travel Date */}
        <div className="mt-4">
          <label className="text-sm sm:text-lg font-semibold text-gray-800 mb-1 block">
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
              aria-label="Travel Date"
            />
            <span className="absolute inset-y-0 left-3 sm:left-4 flex items-center pointer-events-none text-orange-500">
              <Calendar size={16} />
            </span>
          </div>
        </div>

        {/* Book Now Button */}
        <div className="mt-6">
          <button
            className={`w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all duration-200 text-sm sm:text-base ${
              !carType || !travelDate ? 'opacity-50 cursor-not-allowed' : ''
            } focus:outline-none focus:ring-2 focus:ring-orange-500`}
            onClick={(e) => {
              e.stopPropagation();
              handleBookNow(pkg);
            }}
            disabled={!carType || !travelDate}
            aria-label="Book Now"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;

import React, { forwardRef, useEffect, useState } from 'react';
import { Calendar as CalendarIcon, MapPin, Car, DollarSign, Phone, X } from 'lucide-react';
import Select from 'react-select';
import { FaCar } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

const baseUrl = process.env.REACT_APP_API_URL;

const SearchBar = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [estimatedDistance, setEstimatedDistance] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState('');
  const [errors, setErrors] = useState({});
  const [allCars, setAllCars] = useState([]);
  const [isEstimated, setIsEstimated] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    primaryPhone: '',
    secondaryPhone: ''
  });

  // Fetch cars from the API
  const fetchCars = async () => {
    try {
      const response = await fetch(`${baseUrl}/cars`);
      if (!response.ok) throw new Error('Failed to fetch cars');
      const data = await response.json();
      setAllCars(data);
    } catch (error) {
      console.error('Error fetching cars:', error);
      setErrors((prevErrors) => ({ ...prevErrors, fetch: error.message }));
    }
  };

  // Custom date input component
  const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
    <div className="relative w-full">
      <input
        type="text"
        onClick={onClick}
        ref={ref}
        value={value}
        readOnly
        aria-label="Select Travel Date"
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-700"
        placeholder="Select Travel Date"
      />
      <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-600" size={20} />
    </div>
  ));

  useEffect(() => {
    fetchCars();
  }, []);

  // Estimate distance and price
  const estimate = () => {
    const distance = '100 miles';
    const price = '$150';
    setEstimatedDistance(distance);
    setEstimatedPrice(price);
    setIsEstimated(true);
  };

  const handleBookNowClick = () => {
    setShowBookingModal(true);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the booking submission
    console.log('Booking details:', {
      from,
      to,
      date,
      selectedCar,
      estimatedPrice,
      ...bookingDetails
    });
    setShowBookingModal(false);
  };

  // Custom styles for react-select
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      height: '48px',
      borderColor: errors.carType ? '#f87171' : '#d1d5db',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(251,113,133,0.5)' : provided.boxShadow,
      '&:hover': {
        borderColor: errors.carType ? '#f87171' : '#f97316',
      },
      paddingLeft: '40px',
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
    <>
      <div className="w-[85vw] sm:w-[75vw] max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-visible">
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* From Input */}
            <div className="space-y-2">
              <label className="hidden md:block text-sm font-medium text-gray-700" htmlFor="departure">
                From
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-600" size={18} />
                <input
                  id="departure"
                  type="text"
                  placeholder="Enter departure"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 bg-white text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
            
            {/* To Input */}
            <div className="space-y-2">
              <label className="hidden md:block text-sm font-medium text-gray-700" htmlFor="destination">
                To
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-600" size={18} />
                <input
                  id="destination"
                  type="text"
                  placeholder="Enter destination"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 bg-white text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Date Picker */}
            <div className="space-y-2">
              <label className="hidden md:block text-sm font-medium text-gray-700" htmlFor="travel-date">
                Date
              </label>
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                customInput={<CustomDateInput />}
                dateFormat="dd MMMM yyyy"
                minDate={new Date()}
                aria-label="Travel Date"
              />
            </div>

            {/* Car Type Selector */}
            <div className="space-y-2">
              <label className="hidden md:block text-sm font-medium text-gray-700" htmlFor="car-type">
                Car Type
              </label>
              <div className="relative w-full">
                <Select
                  options={allCars}
                  value={allCars.find(car => car.value === selectedCar) || null}
                  onChange={(option) => setSelectedCar(option ? option.value : null)}
                  styles={customStyles}
                  placeholder="Select car"
                  aria-label="Select Car"
                />
                <span className="absolute inset-y-0 left-3 sm:left-4 flex items-center pointer-events-none text-orange-500">
                  <FaCar size={20} />
                </span>
              </div>
            </div>
          </div>

          {/* Estimate Button and Results */}
          <div className="flex flex-col sm:flex-row justify-evenly items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={isEstimated ? handleBookNowClick : estimate}
              className="w-[30vw] md:w-48 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {isEstimated ? 'Book Now' : 'Estimate'}
            </button>

            {/* Estimated Distance */}
            <div className="relative hidden w-[30vw] sm:block md:w-48">
              <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                value={estimatedDistance}
                placeholder="Estimated Distance"
                readOnly
                className="w-full pl-10 pr-3 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>

            {/* Estimated Price */}
            <div className="relative hidden w-[30vw] sm:block md:w-48">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                value={estimatedPrice}
                placeholder="Estimated Price"
                readOnly
                className="w-full pl-10 pr-3 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setShowBookingModal(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-xl font-semibold mb-2">Review Your Order</h2>
            <p className="text-gray-600 mb-6">Please provide your details to complete the booking</p>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={bookingDetails.name}
                  onChange={(e) => setBookingDetails(prev => ({...prev, name: e.target.value}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Primary Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="tel"
                    value={bookingDetails.primaryPhone}
                    onChange={(e) => setBookingDetails(prev => ({...prev, primaryPhone: e.target.value}))}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter primary phone number"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Secondary Phone Number (Optional)
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="tel"
                    value={bookingDetails.secondaryPhone}
                    onChange={(e) => setBookingDetails(prev => ({...prev, secondaryPhone: e.target.value}))}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter secondary phone number"
                  />
                </div>
              </div>

              {/* Order Summary */}
              <div className="mt-6 bg-gray-50 p-4 rounded-md space-y-2">
                <h4 className="font-medium text-gray-900">Order Summary</h4>
                <div className="text-sm text-gray-600">
                  <p>From: {from}</p>
                  <p>To: {to}</p>
                  <p>Date: {date ? date.toLocaleDateString() : 'Not selected'}</p>
                  <p>Estimated Price: {estimatedPrice}</p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 mt-6"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

SearchBar.propTypes = {
  fetchCars: PropTypes.func,
  estimate: PropTypes.func,
};

export default SearchBar;
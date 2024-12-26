import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, MapPin, Car } from 'lucide-react';
import { FaRupeeSign } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import DatePicker from './Datepicker';
import CarSelect from './CarSelect';

const baseUrl = process.env.REACT_APP_API_URL;

const SearchBar = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [estimatedDistance, setEstimatedDistance] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState('');
  const [error, setError] = useState('');
  const [allCars, setAllCars] = useState([]);
  const [isEstimated, setIsEstimated] = useState(false);
  const navigate = useNavigate();

  const fetchCars = async () => {
    try {
      const response = await fetch(`${baseUrl}/cars`);
      if (!response.ok) throw new Error('Failed to fetch cars');
      const data = await response.json();
      setAllCars(data);
    } catch (error) {
      console.error('Error fetching cars:', error);
      setError('Unable to load car options. Please try again later.');
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);


  const validateInputs = () => {
    if (!from.trim()) {
      setError('Please enter a departure location');
      return false;
    }
    if (!to.trim()) {
      setError('Please enter a destination');
      return false;
    }
    if (!date) {
      setError('Please select a travel date');
      return false;
    }
    if (!selectedCar) {
      setError('Please select a car type');
      return false;
    }

    if (from.trim().toLowerCase() === to.trim().toLowerCase()) {
      setError('Departure and destination cannot be the same');
      return false;
    }

    setError('');
    return true;
  };

  const calculatePrice = (distance) => {
    const car = allCars.find((car) => car.value === selectedCar);
    if (!car) {
      setError('Invalid car selection');
      return 0;
    }
    const carPrice = car.price;
    return distance < 300 ? carPrice * 1.3 * distance : carPrice * distance;
  };

  const estimate = () => {
    if (!validateInputs()) return;

    try {
      const distance = 100; // Replace with actual distance calculation
      const price = calculatePrice(distance);

      if (price === 0) {
        setError('Error calculating price. Please try again.');
        return;
      }

      setEstimatedDistance(distance);
      setEstimatedPrice(price);
      setIsEstimated(true);
      setError('');
    } catch (err) {
      setError('Error calculating estimate. Please try again.');
    }
  };

  const handleBookNowClick = () => {
    if (!validateInputs()) return;

    navigate('/booking', {
      state: {
        from,
        to,
        date,
        selectedCar,
        estimatedPrice,
        estimatedDistance
      }
    });
  };

  return (
    <div className="w-[85vw] md:w-[75vw] max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-visible">
      <div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          {/* From Input */}
          <div className="space-y-1 sm:space-y-2">
            <label className="hidden md:block text-xs sm:text-sm font-medium text-gray-700" htmlFor="departure">
              From
            </label>
            <div className="relative h-[40px] sm:h-[48px]">
              <MapPin className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-orange-600" size={16} />
              <input
                id="departure"
                type="text"
                placeholder="Enter departure"
                value={from}
                onChange={(e) => {
                  setFrom(e.target.value);
                  setError('');
                }}
                className={`w-full h-full pl-8 sm:pl-10 pr-2 sm:pr-3 bg-white text-gray-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base ${
                  error && !from.trim() ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
          </div>

          {/* To Input */}
          <div className="space-y-1 sm:space-y-2">
            <label className="hidden md:block text-xs sm:text-sm font-medium text-gray-700" htmlFor="destination">
              To
            </label>
            <div className="relative h-[40px] sm:h-[48px]">
              <MapPin className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-orange-600" size={16} />
              <input
                id="destination"
                type="text"
                placeholder="Enter destination"
                value={to}
                onChange={(e) => {
                  setTo(e.target.value);
                  setError('');
                }}
                className={`w-full h-full pl-8 sm:pl-10 pr-2 sm:pr-3 bg-white text-gray-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base ${
                  error && !to.trim() ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
          </div>

          {/* Date Picker */}
          <div className="space-y-1 sm:space-y-2">
            <label className="hidden md:block text-xs sm:text-sm font-medium text-gray-700" htmlFor="travel-date">
              Date
            </label>
            <DatePicker
              selectedDate={date}
              onChange={(date) => {
                setDate(date);
                setError('');
              }}
              error={error && !date}
            />
          </div>

          {/* Car Select Component */}
          <CarSelect
            selectedCar={selectedCar}
            setSelectedCar={setSelectedCar}
            error={error}
            setError={setError}
            allCars={allCars}
            islabel={true}
          />
        </div>

        {/* Estimate Button and Results */}
        <div className="flex flex-col sm:flex-row justify-evenly items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <button
            onClick={isEstimated ? handleBookNowClick : estimate}
            className="w-full sm:w-[30vw] md:w-48 py-1.5 sm:py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
          >
            {isEstimated ? 'Book Now' : 'Estimate'}
          </button>

          {/* Estimated Distance */}
          <div className="relative w-full sm:w-[30vw] md:w-48 h-[40px] sm:h-[48px]">
            <Car className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              value={estimatedDistance}
              placeholder="Estimated Distance"
              readOnly
              className="w-full h-full pl-8 sm:pl-10 pr-2 sm:pr-3 bg-gray-100 text-gray-800 border border-gray-300 rounded-md focus:outline-none text-sm sm:text-base"
            />
          </div>

          {/* Estimated Price */}
          <div className="relative w-full sm:w-[30vw] md:w-48 h-[40px] sm:h-[48px]">
            <FaRupeeSign className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              value={estimatedPrice}
              placeholder="Estimated Price"
              readOnly
              className="w-full h-full pl-8 sm:pl-10 pr-2 sm:pr-3 bg-gray-100 text-gray-800 border border-gray-300 rounded-md focus:outline-none text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-center">
            <p className="text-red-500 text-xs sm:text-sm font-medium">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
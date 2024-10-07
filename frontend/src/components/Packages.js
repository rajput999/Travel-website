// src/pages/PackagesPage.jsx
import React, { useState } from 'react';
import { FaCar } from 'react-icons/fa';
import PackageCard from './cards/PackageCard';
import CustomPackageForm from './cards/CustomPackageForm';
import FixedPkgPopup from './cards/FixedPkgPopup'; // Ensure this component is professionally styled
import 'react-datepicker/dist/react-datepicker.css';
import '../index.css';

const PackagesPage = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [carType, setCarType] = useState('');
  const [travelDate, setTravelDate] = useState(null);
  const [tab, setTab] = useState('fixed');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  const fixedPackages = [
    {
      id: 1,
      name: 'Mathura Darshan',
      duration: '1 Day',
      basePrice: 1999,
      description: "Experience the divine atmosphere of Lord Krishna's birthplace",
      longDescription: 'Immerse yourself in the spiritual aura of Mathura...',
      image: [
        'https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455_1280.jpg',
        'https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455_1280.jpg',
      ],
    },
    {
      id: 2,
      name: 'Vrindavan Special',
      duration: '2 Days',
      basePrice: 3999,
      description: 'Explore the magical land where Lord Krishna spent his childhood',
      longDescription: 'Delve into the enchanting town of Vrindavan...',
      image: [
        'https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455_1280.jpg',
        'https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455_1280.jpg',
      ],
    },
    {
      id: 3,
      name: 'Mathura-Vrindavan Combo',
      duration: '3 Days',
      basePrice: 5999,
      description: 'Complete tour of both holy cities...',
      longDescription: 'Embark on a comprehensive spiritual journey...',
      image: [
        'https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455_1280.jpg',
        'https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455_1280.jpg',
      ],
    },
  ];

  const carPrices = {
    hatchback: 0,
    sedan: 500,
    suv: 1000,
  };

  const calculatePrice = (basePrice) => {
    const carPrice = carPrices[carType] || 0;
    return basePrice + carPrice;
  };

  const handlePackageClick = (pkg) => {
    setSelectedPackage(pkg);
    setShowPopup(true);
  };

  const handleGetQuote = (customPackage) => {
    setLoading(true);
    // Simulate an API call
    setTimeout(() => {
      // Here you can handle the quote logic
      alert(`Quote generated for your custom package!`);
      setLoading(false);
      // Reset form if needed
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-16 md:pt-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 py-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-10 text-orange-700">
          Our Exclusive Packages
        </h1>

        <div className="w-full mb-8">
          <div className="flex justify-center mb-6">
            <div className="flex rounded-full bg-orange-100 p-1 shadow-md">
              <button
                className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-lg font-medium transition-all ${
                  tab === 'fixed'
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'text-orange-600 hover:bg-orange-200'
                }`}
                onClick={() => setTab('fixed')}
              >
                Fixed Packages
              </button>
              <button
                className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-lg font-medium transition-all ${
                  tab === 'custom'
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'text-orange-600 hover:bg-orange-200'
                }`}
                onClick={() => setTab('custom')}
              >
                Custom Packages
              </button>
            </div>
          </div>

          {/* Fixed Packages */}
          {tab === 'fixed' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {fixedPackages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  carType={carType}
                  setCarType={setCarType}
                  travelDate={travelDate}
                  setTravelDate={setTravelDate}
                  calculatePrice={calculatePrice}
                  handleBookNow={handlePackageClick}
                />
              ))}
            </div>
          )}

          {/* Custom Packages */}
          {tab === 'custom' && (
            <div className="w-full mx-auto bg-white shadow-lg rounded-xl border border-orange-200 p-6">
              <div className="p-6 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-t-xl">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold">
                  Create Your Custom Package
                </div>
              </div>
              <div className="p-6">
                <CustomPackageForm
                  selectedPlaces={selectedPlaces}
                  setSelectedPlaces={setSelectedPlaces}
                  carType={carType}
                  setCarType={setCarType}
                  travelDate={travelDate}
                  setTravelDate={setTravelDate}
                  handleGetQuote={handleGetQuote}
                />
                {loading && (
                  <div className="mt-4 text-center text-orange-600">
                    Generating your quote, please wait...
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Render the FixedPkgPopup */}
      {showPopup && selectedPackage && (
        <FixedPkgPopup
          onClose={() => setShowPopup(false)}
          destination={selectedPackage}
          calculatePrice={calculatePrice}
          carType={carType}
          travelDate={travelDate}
        />
      )}
    </div>
  );
};

export default PackagesPage;

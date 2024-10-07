import React, { useState } from 'react';
import { Calendar, MapPin, Car } from 'lucide-react';
import DestinationPopup from './cards/DestinationPopup'; // Import the DestinationPopup component
import DatePicker from 'react-datepicker'; // Importing a date picker library
import 'react-datepicker/dist/react-datepicker.css'; // Importing the date picker styles
import '../index.css'

const PackagesPage = () => {
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [carType, setCarType] = useState('');
    const [travelDate, setTravelDate] = useState(null);
    const [tab, setTab] = useState('fixed');
    const [showPopup, setShowPopup] = useState(false);

    const fixedPackages = [
        {
            id: 1,
            name: 'Mathura Darshan',
            duration: '1 Day',
            basePrice: 1999,
            description: 'Experience the divine atmosphere of Lord Krishna\'s birthplace',
            longDescription: 'Immerse yourself in the spiritual aura of Mathura...',
            image: [
                'https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455_1280.jpg',
                'https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455_1280.jpg'
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
                'https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455_1280.jpg'
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
                'https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455_1280.jpg'
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

    const handlePlaceSelection = (pkg) => { };

    const truncateText = (text, limit) => {
        return text.length > limit ? `${text.substring(0, limit)}...` : text;
    };

    return (
        <div className="min-h-screen  pt-[4rem]">
            <div className="container mx-auto px-6 py-10">
                <h1 className="text-5xl font-bold text-center mb-10 text-orange-800">Our Packages</h1>

                <div className="w-full mb-8">
                    <div className="grid w-full grid-cols-2 bg-orange-300 rounded-full p-1 mb-6 shadow-md">
                        <button
                            className={`inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-2 text-lg font-medium transition-all ${tab === 'fixed' ? 'bg-white text-orange-800 shadow-lg' : 'text-orange-600'}`}
                            onClick={() => setTab('fixed')}
                        >
                            Fixed Packages
                        </button>
                        <button
                            className={`inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-2 text-lg font-medium transition-all ${tab === 'custom' ? 'bg-white text-orange-800 shadow-lg' : 'text-orange-600'}`}
                            onClick={() => setTab('custom')}
                        >
                            Custom Packages
                        </button>
                    </div>

                    {/* Fixed Packages */}
                    {tab === 'fixed' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {fixedPackages.map((pkg) => (
                                <div
                                    key={pkg.id}
                                    className="rounded-xl border border-orange-200 bg-white shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                                >
                                    <div onClick={() => handlePackageClick(pkg)} className="cursor-pointer">
                                        <img src={pkg.image[0]} alt={pkg.name} className="w-full h-52 object-cover" />
                                        <div className="p-6 bg-gradient-to-r from-orange-500 to-orange-400 text-white">
                                            <h3 className="text-2xl font-semibold">{pkg.name}</h3>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex justify-between items-center mt-2">
                                            <p className="text-2xl font-bold text-orange-600">₹{calculatePrice(pkg.basePrice)}</p>
                                            <p className="text-sm text-gray-600">{pkg.duration}</p>
                                        </div>


                                        <div className="mt-3 text-gray-700">
                                            <span>{truncateText(pkg.description, 100)}</span>
                                        </div>

                                        <div>
                                            <label className="text-lg font-bold text-gray-800 mb-2 block">Select Car:</label>
                                            <div className="relative">
                                                <select
                                                    className="block w-full h-12 pl-10 pr-4 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500"
                                                    value={carType}
                                                    onChange={(e) => setCarType(e.target.value)}
                                                >
                                                    <option value="">Select car type</option>
                                                    <option value="hatchback">Hatchback</option>
                                                    <option value="sedan">Sedan (+₹500)</option>
                                                    <option value="suv">SUV (+₹1000)</option>
                                                </select>
                                                <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-orange-500">
                                                    <Car size={20} />
                                                </span>
                                            </div>
                                        </div>

                                        <div>
                                        <label className="text-lg font-bold text-gray-800 mb-2 block">Travel Date:</label>
                                        <div className="relative">
                                            <DatePicker
                                                selected={travelDate}
                                                onChange={(date) => setTravelDate(date)}
                                                className="block w-full h-12 pl-10 pr-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 text-sm"
                                                placeholderText="dd/mm/yyyy"
                                                dateFormat="dd/MM/yyyy"
                                            />
                                            <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-orange-500">
                                                <Calendar size={20} />
                                            </span>
                                        </div>
                                    </div>

                                        <div className="mt-6">
                                            <button
                                                className="w-full h-10 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all duration-200"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedPackage(pkg);
                                                }}
                                                disabled={!carType || !travelDate}
                                            >
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Custom Packages */}
                    {tab === 'custom' && (
                        <div className="w-full mx-auto bg-white shadow-lg rounded-xl border border-orange-200">
                            <div className="p-6 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-t-xl">
                                <h3 className="text-3xl font-bold">Create Your Custom Package</h3>
                            </div>
                            <div className="p-6">
                                <form className="space-y-6">
                                    <div>
                                        <label className="text-lg font-bold text-gray-800 mb-2 block">Select Places:</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            {['Mathura', 'Vrindavan', 'Gokul', 'Barsana'].map((place) => (
                                                <div key={place} className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-orange-500"
                                                        onChange={() => handlePlaceSelection(place)}
                                                    />
                                                    <label className="ml-2 text-gray-700 font-semibold">{place}</label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-lg font-bold text-gray-800 mb-2 block">Travel Date:</label>
                                        <div className="relative">
                                            <DatePicker
                                                selected={travelDate}
                                                onChange={(date) => setTravelDate(date)}
                                                className="block w-full h-12 pl-10 pr-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 text-sm"
                                                placeholderText="dd/mm/yyyy"
                                                dateFormat="dd/MM/yyyy"
                                            />
                                            <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-orange-500">
                                                <Calendar size={20} />
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-lg font-bold text-gray-800 mb-2 block">Select Car:</label>
                                        <div className="relative">
                                            <select
                                                className="block w-full h-12 pl-10 pr-4 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500"
                                                value={carType}
                                                onChange={(e) => setCarType(e.target.value)}
                                            >
                                                <option value="">Select car type</option>
                                                <option value="hatchback">Hatchback</option>
                                                <option value="sedan">Sedan (+₹500)</option>
                                                <option value="suv">SUV (+₹1000)</option>
                                            </select>
                                            <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-orange-500">
                                                <Car size={20} />
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-lg font-bold text-gray-800 mb-2 block">Duration (Days):</label>
                                        <input
                                            type="number"
                                            className="block w-full h-12 pl-4 pr-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 text-sm"
                                            placeholder="Duration (Days)"
                                        />
                                    </div>

                                    <div className="mt-6">
                                        <button
                                            className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg "
                                            disabled={!carType || !travelDate}
                                        >
                                            Get Quote
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* Render the DestinationPopup */}
            {showPopup && <DestinationPopup onClose={() => setShowPopup(false)} destination={selectedPackage} />}
        </div>
    );
};

export default PackagesPage;

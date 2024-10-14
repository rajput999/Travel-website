import React, { useEffect, useState } from 'react';
import { MapPin, DollarSign } from 'lucide-react';
import DestinationPopup from './DestinationPopup';

const PopularDestinationsCard = ({ destination }) => {
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showPopup]);

  return (
    <>
      <div 
        className="w-[400px] bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out m-5 rounded-lg border border-gray-200 cursor-pointer relative"
        onClick={openPopup}
      >
        <div className="relative pb-24"> {/* Added padding at the bottom */}
          <img 
            src={destination.image} 
            alt={destination.name} 
            className="w-full h-[250px] object-cover transition-transform duration-300 ease-in-out hover:scale-105"
          />
          <span className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wide">
            Featured
          </span>
        
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-800 truncate flex-1 mr-4">
                {destination.name}
              </h3>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-orange-500" />
                <span className="ml-1 text-lg font-semibold text-orange-800">{destination.rating}</span>
              </div>
            </div>
            <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
              {destination.description}
            </p>
          </div>
        </div>

        {/* Fixed Price and Button Section */}
        <div className="absolute bottom-0 left-0 right-0 bg-gray-50 p-6 flex items-center justify-between border-t border-gray-200">
          <div className="flex items-center">
            <DollarSign className="w-6 h-6 text-orange-500" />
            <span className="text-3xl font-bold text-gray-900 mr-1">{destination.price}</span>
            <span className="text-gray-600 text-sm">per person</span>
          </div>
          <button 
            className="bg-orange-500 text-white hover:bg-orange-600 px-6 py-2 rounded-lg transition duration-300 ease-in-out font-semibold text-sm uppercase tracking-wider"
            onClick={(e) => {
              e.stopPropagation();
              openPopup();
            }}
          >
            Book Now
          </button>
        </div>
      </div>

      {showPopup && (
        <DestinationPopup destination={destination} onClose={closePopup} />
      )}
    </>
  );
};

export default PopularDestinationsCard;

import React, { useEffect, useRef, useState } from 'react';
import PopularDestinationsCard from './cards/PopularDestinationsCard';


const baseUrl = process.env.REACT_APP_API_URL;

const RecommendedPlaces = ({isAdmin}) => {
    console.log(isAdmin);
    const scrollContainerRef = useRef(null);
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        // Fetch popular destinations from backend
        const fetchDestinations = async () => {
            try {
                const response = await fetch(`${baseUrl}/popular-destinations`); // Adjust URL if needed
                const data = await response.json();
                setDestinations(data);
                console.log(data)
            } catch (error) {
                console.error("Error fetching destinations:", error);
            }
        };

        fetchDestinations();
    }, []);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const { scrollLeft } = scrollContainerRef.current;
            const scrollAmount = 350;
            scrollContainerRef.current.scrollTo({
                left: scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount),
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="px-5 mb-20">
            <div className="flex justify-between">
                <div>
                    <div className="pl-[3.1vw] text-4xl font-bold">Popular  Destinations</div>
                    <div className="pl-[3.1vw] text-lg text-gray-500">From historical cities to natural spectaculars, come see the best of the world!</div>
                </div>

            </div>

            <div className="w-full overflow-x-scroll no-scrollbar" ref={scrollContainerRef}>
                <div className="flex mt-10 w-max">
                    {destinations.map(dest => (
                        <PopularDestinationsCard key={dest.id} destination={dest} isAdmin={isAdmin}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RecommendedPlaces;

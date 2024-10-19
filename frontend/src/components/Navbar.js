import React, { useState } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ isAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Create a variable for the homepage
  const isHomepage = location.pathname === '/';

  return (
    <header className={`flex justify-between items-center p-4 ${isHomepage ? 'absolute' : 'fixed'} w-full top-0 z-10 transition duration-300 ${!isHomepage ? 'bg-white' : ''}`}>
      <div className={`text-2xl font-bold transition-transform transform hover:scale-110 text-orange-600`}>
        <NavLink to="/" onClick={closeMenu}>Travel.</NavLink>
      </div>
      <nav className={`md:flex ${isOpen ? 'flex' : 'hidden'} flex-col md:flex-row md:items-center absolute md:static top-full md:top-0 left-0 w-full md:w-auto transition-all duration-500 ${!isHomepage ? 'bg-white' : 'bg-transparent backdrop-blur-md'}`}>
        <ul className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 font-semibold text-lg md:text-base p-4 md:p-0 justify-center items-center">
          <li>
            <NavLink
              to="/"
              onClick={closeMenu}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                  isActive
                    ? `${isHomepage? 'text-white' :'bg-[#FFF4EC] text-[#FF6347]'}`
                    : `${isHomepage? 'text-white' :'text-gray-600 hover:bg-[#FFF4EC] hover:text-[#FF6347]'}`
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/packages"
              onClick={closeMenu}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                  isActive
                    ? `${isHomepage? 'text-white' :'bg-[#FFF4EC] text-[#FF6347]'}`
                    : `${isHomepage? 'text-white' :'text-gray-600 hover:bg-[#FFF4EC] hover:text-[#FF6347]'}`
                }`
              }
            >
              Packages
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              onClick={closeMenu}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                  isActive
                    ? `${isHomepage? 'text-white' :'bg-[#FFF4EC] text-[#FF6347]'}`
                    : `${isHomepage? 'text-white' :'text-gray-600 hover:bg-[#FFF4EC] hover:text-[#FF6347]'}`
                }`
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contactus"
              onClick={closeMenu}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                  isActive
                    ? `${isHomepage? 'text-white' :'bg-[#FFF4EC] text-[#FF6347]'}`
                    : `${isHomepage? 'text-white' :'text-gray-600 hover:bg-[#FFF4EC] hover:text-[#FF6347]'}`
                }`
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="flex items-center">
        {isAuthenticated ? (
          <NavLink to='/profile' onClick={closeMenu}>
            <FontAwesomeIcon icon={faUserCircle} className={`${!isHomepage ? 'text-orange-500' : 'text-white'} text-3xl cursor-pointer hover:text-orange-600 transition-colors`} />
          </NavLink>
        ) : (
          <NavLink to='/signup' onClick={closeMenu}>
            <button className={`font-semibold text-base ${!isHomepage ? 'text-orange-500' : 'text-white'} border-2 border-orange-500 py-2 px-6 rounded-full hover:bg-orange-500 hover:text-white transition-colors duration-300`}>Sign Up</button>
          </NavLink>
        )}
        {/* <NavLink to="/book" onClick={closeMenu}>
          <button className={`ml-4 font-semibold text-base bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-full hover:scale-105 transform transition-transform duration-300 hidden md:inline`}>
            BOOK NOW
          </button>
        </NavLink> */}
      </div>
      <div className="md:hidden flex flex-col cursor-pointer" onClick={toggleMenu} aria-label="Toggle menu">
        <div className={`w-6 h-[3px] bg-white mb-1 transition-all ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
        <div className={`w-6 h-[3px] bg-white mb-1 transition-all ${isOpen ? 'opacity-0' : ''}`}></div>
        <div className={`w-6 h-[3px] bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
      </div>
    </header>
  );
};

export default Navbar;

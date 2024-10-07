import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="flex justify-between items-center bg-white/1 backdrop-blur-md p-2 md:p-4 absolute w-full top-0 z-10 box-border">
      <div className="text-2xl font-bold text-white transition-transform transform hover:scale-110">Travel.</div>
      <nav className={`flex md:flex-row flex-col ${isOpen ? 'fixed inset-x-0 top-12 md:static opacity-100 translate-y-0' : 'hidden md:flex'} bg-gray-50 md:bg-transparent text-white md:static md:translate-y-0 md:opacity-100 md:transition-none transition-all duration-500`}>
        <ul className="flex md:flex-row flex-col text-center md:text-left font-semibold text-xl md:text-base space-y-4 md:space-y-0 md:space-x-8 py-4 md:py-0">
          <Link to='/'><li className="cursor-pointer transition-colors hover:text-orange-500">Home</li></Link>
          <li className="cursor-pointer transition-colors hover:text-orange-500">Packages</li>
          <li className="cursor-pointer transition-colors hover:text-orange-500">About</li>
          <li className="cursor-pointer transition-colors hover:text-orange-500">Pages</li>
          <li className="cursor-pointer transition-colors hover:text-orange-500">Contact</li>
        </ul>
      </nav>
      <div className="flex items-center">
        {isAuthenticated ? (
          <Link to='/profile'>
            <FontAwesomeIcon icon={faUserCircle} className="text-white text-3xl cursor-pointer hover:text-orange-500 transition-colors" />
          </Link>
        ) : (
          <Link to='/signup'>
            <button className="font-semibold text-base text-white border-2 border-orange-500 py-2 px-6 rounded-full hover:bg-orange-500 transition-colors duration-300">Sign Up</button>
          </Link>
        )}
        <button className="ml-4 font-semibold text-base bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-full hover:scale-105 transform transition-transform duration-300 hidden md:inline">BOOK NOW</button>
      </div>
      <div className="md:hidden flex flex-col cursor-pointer" onClick={toggleMenu}>
        <div className="w-6 h-[3px] bg-gray-900 mb-1 transition-all"></div>
        <div className="w-6 h-[3px] bg-gray-900 mb-1 transition-all"></div>
        <div className="w-6 h-[3px] bg-gray-900 transition-all"></div>
      </div>
    </header>
  );
};

export default Navbar;

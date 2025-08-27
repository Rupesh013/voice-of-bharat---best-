
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../constants';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Voice of <span className="text-orange-500">Bharat</span>
        </Link>

        <nav className="hidden md:flex space-x-8 items-center">
          {NAV_LINKS.map((link) => (
            <Link key={link.name} to={link.path} className="text-gray-600 hover:text-orange-500 transition duration-300">
              {link.name}
            </Link>
          ))}
          <button className="bg-orange-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300">
            Login
          </button>
        </nav>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4">
          <nav className="flex flex-col items-center space-y-4">
            {NAV_LINKS.map((link) => (
              <Link key={link.name} to={link.path} className="text-gray-600 hover:text-orange-500 transition duration-300" onClick={() => setIsMenuOpen(false)}>
                {link.name}
              </Link>
            ))}
            <button className="bg-orange-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300">
              Login
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
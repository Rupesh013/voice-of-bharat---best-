import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">Voice of <span className="text-orange-500">Bharat</span></h2>
            <p className="text-gray-400 mt-2">Empowering India, One Voice at a Time.</p>
          </div>
          <div className="flex space-x-6">
            <Link to="/about" className="hover:text-orange-500 transition duration-300">About Us</Link>
            <Link to="/contact" className="hover:text-orange-500 transition duration-300">Contact</Link>
            <Link to="/privacy" className="hover:text-orange-500 transition duration-300">Privacy Policy</Link>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Voice of Bharat. A project by students of Sree Vidyanikethan Engineering College. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
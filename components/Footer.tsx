import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">Voice of <span className="text-orange-500">Bharat</span></h2>
            <p className="text-gray-400 mt-2">{t('footer.tagline')}</p>
          </div>
          <div className="flex space-x-6">
            <Link to="/about" className="hover:text-orange-500 transition duration-300">{t('nav.about')}</Link>
            <Link to="/contact" className="hover:text-orange-500 transition duration-300">{t('nav.contact')}</Link>
            <Link to="/privacy" className="hover:text-orange-500 transition duration-300">{t('footer.privacy')}</Link>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
          <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
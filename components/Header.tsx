import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { useTranslation } from '../hooks/useTranslation';
// FIX: Module '"../contexts/LanguageContext"' declares 'Language' locally, but it is not exported. The `Language` type should be imported from `../types` instead.
import { useLanguage } from '../contexts/LanguageContext';
import type { Language } from '../types';

const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const languages: { code: Language; name: string }[] = [
        { code: 'en', name: 'English' },
        { code: 'hi', name: 'हिन्दी' },
        { code: 'bn', name: 'বাংলা' },
        { code: 'mr', name: 'मराठी' },
        { code: 'te', name: 'తెలుగు' },
        { code: 'ta', name: 'தமிழ்' },
        { code: 'gu', name: 'ગુજરાતી' },
        { code: 'ur', name: 'اردو' },
        { code: 'kn', name: 'ಕನ್ನಡ' },
        { code: 'or', name: 'ଓଡ଼ିଆ' },
        { code: 'ml', name: 'മലയാളം' },
    ];

    const handleLanguageChange = (langCode: Language) => {
        setLanguage(langCode);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center text-gray-600 hover:text-orange-500 transition duration-300"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h-6.088a18.022 18.022 0 01-2.924-8.588M18 12a6 6 0 11-12 0 6 6 0 0112 0z" />
                </svg>
                <span className="ml-1 font-semibold uppercase">{language}</span>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
                    <ul className="py-1">
                        {languages.map(lang => (
                            <li key={lang.code}>
                                <button
                                    onClick={() => handleLanguageChange(lang.code)}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-100"
                                >
                                    {lang.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Voice of <span className="text-orange-500">Bharat</span>
        </Link>

        <nav className="hidden md:flex space-x-8 items-center">
          {NAV_LINKS.map((link) => (
            <Link key={link.key} to={link.path} className="text-gray-600 hover:text-orange-500 transition duration-300">
              {t(`nav.${link.key}`)}
            </Link>
          ))}
          <LanguageSwitcher />
          <Link to="/login" className="bg-orange-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300">
            {t('header.login')}
          </Link>
        </nav>

        <div className="md:hidden flex items-center gap-4">
          <LanguageSwitcher />
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
              <Link key={link.key} to={link.path} className="text-gray-600 hover:text-orange-500 transition duration-300" onClick={() => setIsMenuOpen(false)}>
                {t(`nav.${link.key}`)}
              </Link>
            ))}
            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="bg-orange-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300">
              {t('header.login')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';

interface Scheme {
  title: string;
  benefit: string;
  eligibility: string;
  applyProcess: string[];
  link: string;
}

interface SchemeAccordionProps {
  scheme: Scheme;
  isHighlighted?: boolean;
}

const SchemeAccordion: React.FC<SchemeAccordionProps> = ({ scheme, isHighlighted = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <div className={`border border-gray-200 rounded-lg shadow-sm bg-white transition-all duration-300 ${isHighlighted ? 'border-orange-400 shadow-orange-200 shadow-md ring-2 ring-orange-200' : ''}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
        aria-expanded={isOpen}
      >
        <div className="flex-1">
            <div className="flex items-center gap-3">
               <h3 className="text-lg font-semibold text-gray-800">{scheme.title}</h3>
                {isHighlighted && (
                    <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{t('components.schemeAccordion.recommended')}</span>
                )}
            </div>
            <p className="text-sm text-green-700 font-medium mt-1">{scheme.benefit}</p>
        </div>
        <svg
          className={`w-6 h-6 text-orange-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {isOpen && (
        <div className="p-5 border-t border-gray-200 bg-gray-50">
          <div className="mb-4">
            <h4 className="font-semibold text-gray-700 mb-2">{t('components.schemeAccordion.eligibility')}:</h4>
            <p className="text-gray-600">{scheme.eligibility}</p>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold text-gray-700 mb-2">{t('components.schemeAccordion.howToApply')}:</h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              {scheme.applyProcess.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
          <a
            href={scheme.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-orange-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300"
          >
            {t('components.schemeAccordion.visitPortal')} &rarr;
          </a>
        </div>
      )}
    </div>
  );
};

export default SchemeAccordion;
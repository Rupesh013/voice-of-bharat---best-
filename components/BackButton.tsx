import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

const BackButton: React.FC<{ className?: string; to?: string }> = ({ className, to }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-orange-500 transition-colors duration-300 ${className}`}
      aria-label="Go back to previous page"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      {t('components.backButton.back')}
    </button>
  );
};

export default BackButton;
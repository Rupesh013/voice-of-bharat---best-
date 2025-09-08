
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

interface GenericPageProps {
  title: string;
  description: string;
  Icon: React.ElementType;
}

const GenericPage: React.FC<GenericPageProps> = ({ title, description, Icon }) => {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto px-6 py-16 min-h-[60vh] flex items-center justify-center">
      <div className="text-center bg-white p-12 rounded-lg shadow-xl max-w-2xl">
        <Icon className="h-20 w-20 text-orange-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{title}</h1>
        <p className="text-gray-600 text-lg mb-8">{description}</p>
        <div className="bg-orange-100 text-orange-700 p-4 rounded-md">
          <p className="font-semibold">{t('generic.underConstruction')}</p>
        </div>
      </div>
    </div>
  );
};

export default GenericPage;
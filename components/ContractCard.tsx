import React from 'react';
import type { Contract } from '../types';
import { useTranslation } from '../hooks/useTranslation';

interface ContractCardProps {
  contract: Contract;
  onView: (contract: Contract) => void;
}

const ContractCard: React.FC<ContractCardProps> = ({ contract, onView }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-800">{contract.title}</h3>
          {contract.buyerVerified && (
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{t('components.contractCard.verified')}</span>
          )}
        </div>
        <p className="text-gray-500 mt-1">{t('components.contractCard.by')} {contract.buyerName}</p>
        <div className="mt-4 space-y-2 border-t pt-4">
          <p><strong className="font-medium text-gray-600">{t('components.contractCard.crop')}</strong> {contract.crop}</p>
          <p><strong className="font-medium text-gray-600">{t('components.contractCard.quantity')}</strong> {contract.quantity}</p>
          <p><strong className="font-medium text-gray-600">{t('components.contractCard.price')}</strong> <span className="font-bold text-green-700">{contract.price}</span></p>
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={() => onView(contract)}
          className="w-full bg-orange-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300"
        >
          {t('components.contractCard.view')}
        </button>
      </div>
    </div>
  );
};

export default ContractCard;
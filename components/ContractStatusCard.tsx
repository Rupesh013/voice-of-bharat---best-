import React from 'react';
import type { Contract } from '../types';
import { useTranslation } from '../hooks/useTranslation';

interface ContractStatusCardProps {
  contract: Contract;
  onView: (contract: Contract) => void;
}

const ContractStatusCard: React.FC<ContractStatusCardProps> = ({ contract, onView }) => {
  const { t } = useTranslation();

  const statusConfig = {
    Pending: { badge: 'bg-yellow-100 text-yellow-800', label: t('components.contractStatusCard.status.Pending') },
    Active: { badge: 'bg-blue-100 text-blue-800', label: t('components.contractStatusCard.status.Active') },
    Harvesting: { badge: 'bg-indigo-100 text-indigo-800', label: t('components.contractStatusCard.status.Harvesting') },
    Completed: { badge: 'bg-green-100 text-green-800', label: t('components.contractStatusCard.status.Completed') },
    Disputed: { badge: 'bg-red-100 text-red-800', label: t('components.contractStatusCard.status.Disputed') },
  };

  const progressSteps = ['Active', 'Harvesting', 'Completed'];
  const currentStatusInfo = statusConfig[contract.status] || { badge: 'bg-gray-100 text-gray-800', label: 'Unknown' };
  const currentStepIndex = progressSteps.indexOf(contract.status);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{contract.title}</h3>
          <p className="text-gray-500">{t('components.contractStatusCard.with')} {contract.buyerName}</p>
        </div>
        <span className={`${currentStatusInfo.badge} text-sm font-medium px-3 py-1 rounded-full`}>
          {currentStatusInfo.label}
        </span>
      </div>
      
      {currentStepIndex > -1 && (
        <div className="my-6">
          <div className="flex items-center">
            {progressSteps.map((step, index) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${index <= currentStepIndex ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {index < currentStepIndex ? '✓' : '●'}
                  </div>
                  <p className={`text-xs mt-2 w-20 text-center ${index <= currentStepIndex ? 'font-semibold text-gray-800' : 'text-gray-500'}`}>{t(`components.contractStatusCard.steps.${step}`)}</p>
                </div>
                {index < progressSteps.length - 1 && (
                  <div className={`flex-1 h-1 ${index < currentStepIndex ? 'bg-green-600' : 'bg-gray-200'}`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 border-t pt-4 flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
        <button onClick={() => onView(contract)} className="flex-1 text-center bg-gray-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300">
          {t('components.contractStatusCard.view')}
        </button>
        <button className="flex-1 text-center bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
          {t('components.contractStatusCard.contact')}
        </button>
        <button className="flex-1 text-center bg-red-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-600 transition duration-300">
          {t('components.contractStatusCard.report')}
        </button>
      </div>
    </div>
  );
};

export default ContractStatusCard;
import React, { useState } from 'react';
import type { Contract } from '../types';
import { summarizeContract } from '../services/geminiService';
import { useTranslation } from '../hooks/useTranslation';

interface ContractDetailModalProps {
  contract: Contract | null;
  isOpen: boolean;
  onClose: () => void;
  isApplying: boolean;
}

const ContractDetailModal: React.FC<ContractDetailModalProps> = ({ contract, isOpen, onClose, isApplying }) => {
  const [summary, setSummary] = useState('');
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [error, setError] = useState('');
  const { t } = useTranslation();

  const handleSimplify = async () => {
    if (!contract) return;
    setIsLoadingSummary(true);
    setError('');
    setSummary('');
    try {
      const result = await summarizeContract(contract.fullText);
      setSummary(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to generate summary.');
    } finally {
      setIsLoadingSummary(false);
    }
  };
  
  const handleClose = () => {
    setSummary('');
    setError('');
    onClose();
  };

  if (!isOpen || !contract) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={handleClose}>
      <div className="bg-white rounded-lg shadow-2xl p-6 md:p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto transform transition-all" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{contract.title}</h2>
            <button onClick={handleClose} className="text-gray-500 hover:text-gray-800 text-3xl font-light">&times;</button>
        </div>
        
        {/* Key Terms */}
        <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-3">Key Terms</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <p><strong className="font-medium text-gray-600">{t('components.contractCard.by')}</strong> {contract.buyerName} {contract.buyerVerified && <span className="text-green-600 font-semibold">({t('components.contractCard.verified')})</span>}</p>
                <p><strong className="font-medium text-gray-600">{t('components.contractCard.crop')}</strong> {contract.crop}</p>
                <p><strong className="font-medium text-gray-600">{t('components.contractCard.quantity')}</strong> {contract.quantity}</p>
                <p><strong className="font-medium text-gray-600">{t('components.contractCard.price')}</strong> <span className="font-bold text-green-700">{contract.price}</span></p>
                <p><strong className="font-medium text-gray-600">Start Date:</strong> {contract.timeline.startDate}</p>
                <p><strong className="font-medium text-gray-600">End Date:</strong> {contract.timeline.endDate}</p>
            </div>
        </div>

        {/* Additional Clauses */}
        <div className="mb-6">
             <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-3">Additional Clauses</h3>
             <div className="space-y-3 text-sm">
                <p><strong className="font-medium text-gray-600">Produce Specifications:</strong> {contract.produceSpecs}</p>
                <p><strong className="font-medium text-gray-600">Logistics & Delivery:</strong> {contract.logistics}</p>
                <p><strong className="font-medium text-gray-600">Dispute Handling:</strong> {contract.disputeResolution}</p>
             </div>
        </div>


        <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                <h3 className="font-semibold text-lg">Full Contract Text</h3>
                <button onClick={handleSimplify} disabled={isLoadingSummary} className="text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-full hover:bg-orange-200 disabled:opacity-50 mt-2 sm:mt-0">
                    {isLoadingSummary ? t('components.contractDetailModal.analyzing') : `✨ ${t('components.contractDetailModal.simplify')}`}
                </button>
            </div>
            
            {summary && (
              <div className="bg-orange-50 border-l-4 border-orange-400 p-4 my-4 text-gray-700 text-sm">
                <h4 className="font-bold">{t('components.contractDetailModal.summary')}:</h4>
                <p className="whitespace-pre-wrap">{summary}</p>
              </div>
            )}
            {error && <p className="text-red-500 text-sm my-2">{error}</p>}
            {isLoadingSummary && <p className="text-gray-600 text-sm my-2 animate-pulse">Our AI is reading the contract for you...</p>}


            <div className="text-xs text-gray-600 bg-white p-3 rounded mt-2 max-h-48 overflow-y-auto border">
                <p className="whitespace-pre-wrap">{contract.fullText}</p>
            </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button type="button" onClick={handleClose} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">{t('components.contractDetailModal.close')}</button>
          {isApplying && (
            <button type="button" className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700">{t('components.contractDetailModal.apply')}</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContractDetailModal;

import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import type { ProduceListing } from '../types';

interface ProduceCardProps {
  listing: ProduceListing;
  onShowToast: (message: string) => void;
  onViewDetails: (listing: ProduceListing) => void;
}

const ProduceCard: React.FC<ProduceCardProps> = ({ listing, onShowToast, onViewDetails }) => {
  const { t } = useTranslation();
  
  const handleBuyNow = () => {
    onShowToast(`'Buy Now' for "${listing.name}" is a demo feature. In a real app, this would lead to a payment gateway.`);
  };

  const handleContactSeller = () => {
    onShowToast(`To contact ${listing.seller} about "${listing.name}", you would typically be connected via a chat or call feature.`);
  };

  return (
    <div onClick={() => onViewDetails(listing)} className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full">
      <img src={listing.image} alt={listing.name} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-gray-800">{listing.name}</h3>
        <p className="text-gray-500 text-sm mt-1">{listing.location}</p>
        <div className="mt-4 flex-grow">
          <p className="text-lg font-bold text-green-600">{listing.price}</p>
          <p className="text-gray-600">{listing.quantity}</p>
          <p className="text-gray-600 text-sm">{t('components.produceCard.seller')} <span className="font-medium">{listing.seller}</span></p>
        </div>
        <div className="mt-4 flex space-x-2" onClick={(e) => e.stopPropagation()}>
          <button onClick={handleBuyNow} className="flex-1 bg-orange-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300 text-sm">
            {t('components.produceCard.buyNow')}
          </button>
           <button onClick={handleContactSeller} className="flex-1 bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300 text-sm">
            {t('components.produceCard.contactSeller')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProduceCard;
import React from 'react';
import type { ProduceListing } from '../types';
import { useTranslation } from '../hooks/useTranslation';

interface ProduceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: ProduceListing | null;
  onShowToast: (message: string) => void;
}

const DetailItem: React.FC<{ label: string; value: string | string[] }> = ({ label, value }) => (
    <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        {Array.isArray(value) ? (
            <div className="flex flex-wrap gap-2 mt-1">
                {value.map(v => <span key={v} className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded-full">{v}</span>)}
            </div>
        ) : (
            <p className="text-gray-800">{value}</p>
        )}
    </div>
);

const ProduceDetailModal: React.FC<ProduceDetailModalProps> = ({ isOpen, onClose, listing, onShowToast }) => {
    const { t } = useTranslation();
    
    if (!isOpen || !listing) return null;

    const handleBuyNow = () => {
        onShowToast(`'Buy Now' for "${listing.name}" is a demo feature. In a real app, this would lead to a payment gateway.`);
    };

    const handleContactSeller = () => {
        onShowToast(`To contact ${listing.seller} about "${listing.name}", you would typically be connected via a chat or call feature.`);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col transform transition-all" onClick={(e) => e.stopPropagation()}>
                <img src={listing.image} alt={listing.name} className="w-full h-56 object-cover rounded-t-lg" />
                <div className="p-6 overflow-y-auto">
                    <div className="flex justify-between items-start">
                        <h2 className="text-3xl font-bold text-gray-800">{listing.name}</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-3xl">&times;</button>
                    </div>
                    <p className="text-gray-500 mt-1">{listing.location}</p>
                    
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6">
                        <DetailItem label="Price" value={listing.price} />
                        <DetailItem label="Quantity Available" value={listing.quantity} />
                        <DetailItem label="Seller" value={listing.seller} />
                        <DetailItem label="Payment Methods" value={listing.paymentMethods} />
                        <div className="md:col-span-2">
                             <DetailItem label="Logistics" value={listing.logistics} />
                        </div>
                    </div>
                </div>
                <div className="p-6 border-t bg-gray-50 rounded-b-lg flex gap-4">
                    <button onClick={handleBuyNow} className="flex-1 bg-orange-500 text-white font-semibold px-4 py-3 rounded-md hover:bg-orange-600 transition duration-300">
                        {t('components.produceCard.buyNow')}
                    </button>
                    <button onClick={handleContactSeller} className="flex-1 bg-gray-200 text-gray-700 font-semibold px-4 py-3 rounded-md hover:bg-gray-300 transition duration-300">
                        {t('components.produceCard.contactSeller')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProduceDetailModal;

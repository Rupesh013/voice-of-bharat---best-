import React from 'react';
import type { Offer } from '../types';
import { ICONS } from '../constants';

const categoryConfig: { [key in Offer['category']]: { icon: React.ElementType; color: string } } = {
    Students: { icon: ICONS.Student, color: 'border-blue-500' },
    Women: { icon: ICONS.Women, color: 'border-pink-500' },
    Farmers: { icon: ICONS.Farmer, color: 'border-green-500' },
    Workers: { icon: ICONS.Worker, color: 'border-yellow-500' },
    Seniors: { icon: ICONS.Senior, color: 'border-indigo-500' },
    Entrepreneurs: { icon: ICONS.Entrepreneur, color: 'border-purple-500' },
    General: { icon: ICONS.Updates, color: 'border-gray-500' },
};

const typeConfig: { [key in Offer['type']]: string } = {
    Deal: 'bg-green-100 text-green-800',
    Subsidy: 'bg-yellow-100 text-yellow-800',
    Grant: 'bg-blue-100 text-blue-800',
    Freebie: 'bg-purple-100 text-purple-800',
    Info: 'bg-gray-100 text-gray-800',
};

interface OfferCardProps {
  offer: Offer;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {
    const category = categoryConfig[offer.category];
    const type = typeConfig[offer.type];

    return (
        <div className={`bg-white rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col h-full border-t-4 ${category.color}`}>
            <div className="p-6 flex-grow">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-800 flex-1 pr-2">{offer.title}</h3>
                    <category.icon className={`w-8 h-8 ${category.color.replace('border-', 'text-')} flex-shrink-0`} />
                </div>
                <p className="text-sm text-gray-500 mt-1">Provider: {offer.provider}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${type}`}>
                        {offer.type}
                    </span>
                    {offer.expiry && (
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-100 text-red-800">
                            Expires: {offer.expiry}
                        </span>
                    )}
                </div>
                <p className="text-gray-600 mt-4 text-sm">{offer.description}</p>
                <div className="mt-4 pt-3 border-t text-sm space-y-2">
                    <p><strong className="font-semibold text-gray-700">Eligibility:</strong> {offer.eligibility}</p>
                    <p><strong className="font-semibold text-gray-700">How to Redeem:</strong> {offer.redeemMethod}</p>
                </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-b-lg">
                <a href={offer.link} target="_blank" rel="noopener noreferrer" className="w-full text-center block bg-orange-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300">
                    Claim Offer
                </a>
            </div>
        </div>
    );
};

export default OfferCard;
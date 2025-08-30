import React from 'react';
import type { Update } from '../types';
import { ICONS } from '../constants';

const categoryConfig: { [key in Update['category']]: { icon: React.ElementType; color: string } } = {
    Students: { icon: ICONS.Student, color: 'bg-blue-100 text-blue-800' },
    Women: { icon: ICONS.Women, color: 'bg-pink-100 text-pink-800' },
    Farmers: { icon: ICONS.Farmer, color: 'bg-green-100 text-green-800' },
    Workers: { icon: ICONS.Worker, color: 'bg-yellow-100 text-yellow-800' },
    Seniors: { icon: ICONS.Senior, color: 'bg-indigo-100 text-indigo-800' },
    Entrepreneurs: { icon: ICONS.Entrepreneur, color: 'bg-purple-100 text-purple-800' },
    General: { icon: ICONS.Updates, color: 'bg-gray-100 text-gray-800' },
};

interface UpdateCardProps {
  update: Update;
  isPinned?: boolean;
}

const UpdateCard: React.FC<UpdateCardProps> = ({ update, isPinned = false }) => {
    const config = categoryConfig[update.category];

    return (
        <div className={`bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 ${isPinned ? 'border-orange-500 bg-orange-50' : 'border-gray-300'}`}>
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                     <span className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 ${config.color}`}>
                        <config.icon className="w-4 h-4" />
                        {update.category}
                    </span>
                    {isPinned && (
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-orange-500 text-white">
                            Important
                        </span>
                    )}
                </div>
                <span className="text-sm text-gray-500">{update.date}</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mt-4">{update.title}</h3>
            <p className="text-gray-600 mt-2 text-sm">{update.summary}</p>
            <a href={update.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-orange-600 font-semibold hover:underline text-sm">
                Read More &rarr;
            </a>
        </div>
    );
};

export default UpdateCard;

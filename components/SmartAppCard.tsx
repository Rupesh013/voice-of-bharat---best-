import React from 'react';
import type { SmartApp } from '../types';

const SmartAppCard: React.FC<{ app: SmartApp }> = ({ app }) => {
    return (
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 flex flex-col h-full transform hover:scale-105 transition-transform duration-300">
            <div className="flex-grow">
                <h3 className="text-xl font-bold text-white">{app.name}</h3>
                <p className="text-gray-400 text-sm mt-2">{app.purpose}</p>
                {app.use && <p className="text-gray-400 text-xs mt-1"><strong>Use:</strong> {app.use}</p>}
                {app.description && <p className="text-gray-400 text-xs mt-1">{app.description}</p>}
            </div>
            <div className="mt-6 border-t border-gray-700 pt-4 flex justify-between items-center text-sm">
                 <div className="flex space-x-4">
                    <a href={app.appLink} target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 font-semibold">
                        App Link
                    </a>
                    {app.aboutLink && (
                        <a href={app.aboutLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                            About
                        </a>
                    )}
                </div>
                {app.youtubeLink && (
                    <a href={app.youtubeLink} target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                        </svg>
                    </a>
                )}
            </div>
        </div>
    );
};

export default SmartAppCard;
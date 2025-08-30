import React, { useState, useMemo } from 'react';
import { ICONS, MOCK_OFFERS, OFFER_CATEGORIES } from '../constants';
import OfferCard from '../components/OfferCard';
import { getRealTimeOffers } from '../services/geminiService';
import type { AIOfferResult } from '../types';

const OffersPage: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    // AI Feature State
    const [aiQuery, setAiQuery] = useState('');
    const [aiResult, setAiResult] = useState<AIOfferResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const filteredOffers = useMemo(() => {
        return MOCK_OFFERS
            .filter(o => activeCategory === 'All' || o.category === activeCategory)
            .filter(o => o.title.toLowerCase().includes(searchTerm.toLowerCase()) || o.description.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [activeCategory, searchTerm]);
    
    const handleAiSearch = async () => {
        if (!aiQuery.trim()) return;
        setIsLoading(true);
        setError(null);
        setAiResult(null);
        try {
            const result = await getRealTimeOffers(aiQuery);
            setAiResult(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Hero Section */}
            <section className="bg-gray-800 text-white py-16 text-center">
                <ICONS.Offers className="w-16 h-16 mx-auto text-orange-400 mb-4" />
                <h1 className="text-4xl md:text-5xl font-bold">Exclusive Offers & Deals</h1>
                <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                    Find deals, subsidies, and grants tailored for you.
                </p>
            </section>

            {/* Main Content */}
            <main className="container mx-auto px-4 md:px-6 py-12">
                
                 {/* AI Search Section */}
                <section className="mb-12 bg-white p-6 rounded-xl shadow-lg border-t-4 border-orange-500">
                     <h2 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-3">
                        <ICONS.FarmChat className="w-8 h-8 text-orange-500" />
                        Find Real-Time Offers with AI
                    </h2>
                    <p className="text-gray-600 mb-4 text-sm">
                        Looking for a specific deal? Ask our AI assistant to search for the latest offers online.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="text"
                            value={aiQuery}
                            onChange={(e) => setAiQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAiSearch()}
                            placeholder="e.g., discounts on laptops for students, MSME loans..."
                            className="flex-grow border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 p-3 bg-white text-gray-900"
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleAiSearch}
                            className="bg-orange-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-orange-600 transition duration-300 disabled:bg-orange-300"
                            disabled={isLoading || !aiQuery.trim()}
                        >
                            {isLoading ? 'Searching...' : 'Find Offers'}
                        </button>
                    </div>
                    {isLoading && <p className="text-center mt-4 text-gray-600 animate-pulse">Our AI is scanning for the best deals...</p>}
                    {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
                    {aiResult && (
                        <div className="mt-6 p-4 bg-orange-50 border-l-4 border-orange-400 rounded-r-lg">
                            <h3 className="font-bold text-orange-800">AI Generated Summary for "{aiQuery}":</h3>
                            <p className="text-gray-700 whitespace-pre-wrap mt-2 text-sm">{aiResult.summary}</p>
                            {aiResult.sources && aiResult.sources.length > 0 && (
                                <div className="mt-4">
                                    <h4 className="font-semibold text-xs text-gray-600 uppercase">Sources:</h4>
                                    <ul className="list-disc list-inside text-sm mt-1">
                                        {aiResult.sources.map((source, index) => (
                                           source.web && <li key={index}>
                                                <a href={source.web.uri} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                    {source.web.title || source.web.uri}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </section>
                
                {/* All Offers Feed */}
                <section>
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Curated Offers</h2>
                    
                    {/* Filters and Search Bar */}
                    <div className="bg-white p-4 rounded-lg shadow-md mb-8 sticky top-20 z-30">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                             <div className="md:col-span-2">
                                <label htmlFor="search" className="sr-only">Search Offers</label>
                                <input
                                    id="search"
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search by keyword..."
                                    className="w-full border-gray-300 rounded-md shadow-sm p-2 bg-white text-gray-900"
                                />
                            </div>
                            <div>
                                <label htmlFor="category" className="sr-only">Filter by Category</label>
                                <select
                                    id="category"
                                    value={activeCategory}
                                    onChange={(e) => setActiveCategory(e.target.value)}
                                    className="w-full border-gray-300 rounded-md shadow-sm p-2 bg-white text-gray-900"
                                >
                                    {OFFER_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    {filteredOffers.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredOffers.map(offer => (
                                <OfferCard key={offer.id} offer={offer} />
                            ))}
                        </div>
                    ) : (
                         <div className="text-center bg-white p-12 rounded-lg shadow-md">
                            <p className="text-gray-600 font-semibold">No offers found.</p>
                            <p className="text-gray-500 text-sm">Try adjusting your search or filter.</p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default OffersPage;
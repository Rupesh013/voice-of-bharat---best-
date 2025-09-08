
import React, { useState } from 'react';
import { MOCK_MARKET_PRICES } from '../constants';
import type { MarketPrice } from '../types';
import { getMarketPriceInsights } from '../services/geminiService';
import BackButton from '../components/BackButton';

const PriceRow: React.FC<{ item: MarketPrice }> = ({ item }) => {
    const trendConfig = {
        up: { icon: '↑', color: 'text-green-600' },
        down: { icon: '↓', color: 'text-red-600' },
        stable: { icon: '→', color: 'text-gray-600' },
    };
    const trend = trendConfig[item.trend];

    return (
        <tr className="border-b hover:bg-gray-50">
            <td className="py-3 px-4 font-semibold text-gray-800">{item.crop}</td>
            <td className="py-3 px-4 text-gray-600">{item.market}</td>
            <td className="py-3 px-4 font-bold text-gray-800">{item.price}</td>
            <td className={`py-3 px-4 font-semibold ${trend.color}`}>{trend.icon} {item.trend}</td>
        </tr>
    );
};

const MarketPricesPage: React.FC = () => {
    const [insights, setInsights] = useState('');
    const [selectedCrop, setSelectedCrop] = useState(MOCK_MARKET_PRICES[0].crop);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGetInsights = async () => {
        setIsLoading(true);
        setError(null);
        setInsights('');
        try {
            const result = await getMarketPriceInsights(selectedCrop, MOCK_MARKET_PRICES);
            setInsights(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-purple-50 py-12">
            <div className="container mx-auto px-6 max-w-6xl">
                <BackButton className="mb-8" />
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Market Price Intelligence</h1>
                    <p className="text-gray-600 mt-4 text-lg">
                        Track live mandi prices and get AI-powered insights to sell smarter.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Live Mandi Prices</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-100 border-b">
                                        <th className="py-3 px-4">Crop</th>
                                        <th className="py-3 px-4">Market</th>
                                        <th className="py-3 px-4">Price</th>
                                        <th className="py-3 px-4">Trend</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {MOCK_MARKET_PRICES.map((item, index) => <PriceRow key={index} item={item} />)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">✨ AI Market Analyst</h2>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="crop-select" className="block text-sm font-medium text-gray-700 mb-1">Select Crop for Analysis</label>
                                <select id="crop-select" value={selectedCrop} onChange={e => setSelectedCrop(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm p-2 bg-white text-gray-900">
                                    {MOCK_MARKET_PRICES.map(p => <option key={p.crop} value={p.crop}>{p.crop}</option>)}
                                </select>
                            </div>
                            <button onClick={handleGetInsights} disabled={isLoading} className="w-full bg-purple-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-purple-700 transition disabled:bg-gray-400">
                                {isLoading ? 'Analyzing...' : 'Get AI Insights'}
                            </button>
                        </div>
                         {isLoading && <p className="text-center mt-4 animate-pulse">Analyzing market data...</p>}
                         {error && <div className="bg-red-100 text-red-700 p-3 rounded-md mt-4 text-sm">{error}</div>}
                         {insights && (
                             <div className="mt-4 p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-md">
                                 <h3 className="font-bold text-purple-800">Analysis for {selectedCrop}:</h3>
                                 <p className="text-gray-700 text-sm whitespace-pre-wrap mt-2">{insights}</p>
                             </div>
                         )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketPricesPage;


import React, { useState, useEffect, useCallback } from 'react';
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

const LoadingSkeleton: React.FC = () => (
    <tbody>
        {Array.from({ length: 4 }).map((_, index) => (
            <tr key={index} className="border-b animate-pulse">
                <td className="py-3 px-4"><div className="h-4 bg-gray-200 rounded w-2/3"></div></td>
                <td className="py-3 px-4"><div className="h-4 bg-gray-200 rounded w-1/2"></div></td>
                <td className="py-3 px-4"><div className="h-4 bg-gray-200 rounded w-1/3"></div></td>
                <td className="py-3 px-4"><div className="h-4 bg-gray-200 rounded w-1/4"></div></td>
            </tr>
        ))}
    </tbody>
);

const MarketPricesPage: React.FC = () => {
    const [marketPrices, setMarketPrices] = useState<MarketPrice[]>([]);
    const [isRefreshing, setIsRefreshing] = useState(true);
    const [insights, setInsights] = useState('');
    const [selectedCrop, setSelectedCrop] = useState(MOCK_MARKET_PRICES[0].crop);
    const [isLoadingInsights, setIsLoadingInsights] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchMarketPrices = useCallback(async () => {
        setIsRefreshing(true);
        setError(null);
        await new Promise(resolve => setTimeout(resolve, 700)); // Simulate network delay
        
        try {
            const newPrices = MOCK_MARKET_PRICES.map(item => {
                const priceValue = parseInt(item.price.replace(/[^0-9]/g, ''));
                const randomFactor = 1 + (Math.random() - 0.5) * 0.1; // +/- 5% change
                const newPriceValue = Math.round(priceValue * randomFactor);
                // FIX: Explicitly type `newTrend` to satisfy the `MarketPrice['trend']` union type.
                const newTrend: 'up' | 'down' | 'stable' = newPriceValue > priceValue ? 'up' : newPriceValue < priceValue ? 'down' : 'stable';

                return {
                    ...item,
                    price: `₹${newPriceValue.toLocaleString('en-IN')} / quintal`,
                    trend: newTrend,
                };
            });
            setMarketPrices(newPrices);
        } catch (e) {
            setError("Failed to fetch market prices.");
        } finally {
            setIsRefreshing(false);
        }
    }, []);

    useEffect(() => {
        fetchMarketPrices();
    }, [fetchMarketPrices]);

    const handleGetInsights = async () => {
        setIsLoadingInsights(true);
        setError(null);
        setInsights('');
        try {
            const result = await getMarketPriceInsights(selectedCrop, marketPrices);
            setInsights(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred.");
        } finally {
            setIsLoadingInsights(false);
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
                        <div className="flex justify-between items-center mb-4">
                             <h2 className="text-2xl font-bold">Live Mandi Prices</h2>
                             <button onClick={fetchMarketPrices} disabled={isRefreshing} className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 text-sm font-semibold rounded-full shadow-md hover:shadow-lg hover:text-purple-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-wait">
                                <svg className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0M2.985 19.644A8.25 8.25 0 0116.023 9.348" />
                                </svg>
                                {isRefreshing ? 'Refreshing...' : 'Refresh Prices'}
                            </button>
                        </div>
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
                                {isRefreshing ? <LoadingSkeleton /> : (
                                    <tbody>
                                        {marketPrices.map((item, index) => <PriceRow key={index} item={item} />)}
                                    </tbody>
                                )}
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
                            <button onClick={handleGetInsights} disabled={isLoadingInsights || isRefreshing} className="w-full bg-purple-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-purple-700 transition disabled:bg-gray-400">
                                {isLoadingInsights ? 'Analyzing...' : 'Get AI Insights'}
                            </button>
                        </div>
                         {isLoadingInsights && <p className="text-center mt-4 animate-pulse">Analyzing market data...</p>}
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

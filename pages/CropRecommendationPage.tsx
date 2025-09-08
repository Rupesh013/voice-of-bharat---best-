import React, { useState } from 'react';
import { getCropRecommendation } from '../services/geminiService';
import type { CropRecommendation } from '../types';
import BackButton from '../components/BackButton';

const soilTypes = ["Alluvial", "Black", "Red", "Laterite", "Arid", "Forest & Mountainous"];
const marketPreferences = ["High Value", "Staple Food", "Drought Resistant", "Quick Yield"];

const RecommendationCard: React.FC<{ rec: CropRecommendation }> = ({ rec }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
        <div className="flex justify-between items-start">
            <h3 className="text-2xl font-bold text-gray-800">{rec.cropName}</h3>
            <div className="text-right">
                <p className="text-lg font-semibold text-green-600">Suitability: {rec.suitabilityScore}/100</p>
                <p className={`text-sm font-medium px-2 py-0.5 rounded-full mt-1 ${rec.marketPotential === 'High' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    Market: {rec.marketPotential}
                </p>
            </div>
        </div>
        <p className="text-gray-600 my-3">{rec.reasoning}</p>
        <div>
            <h4 className="font-semibold text-gray-700">Suggested Varieties:</h4>
            <p className="text-gray-600 text-sm">{rec.suggestedVarieties.join(', ')}</p>
        </div>
    </div>
);


const CropRecommendationPage: React.FC = () => {
    const [location, setLocation] = useState('');
    const [soilType, setSoilType] = useState(soilTypes[0]);
    const [marketPreference, setMarketPreference] = useState(marketPreferences[0]);
    const [climateData, setClimateData] = useState('');
    const [geographicalData, setGeographicalData] = useState('');
    const [historicalData, setHistoricalData] = useState('');
    const [environmentalFactors, setEnvironmentalFactors] = useState('');
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [recommendations, setRecommendations] = useState<CropRecommendation[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setRecommendations(null);
        setIsSuccess(false);
        try {
            const result = await getCropRecommendation(
                location,
                soilType,
                marketPreference,
                climateData,
                geographicalData,
                historicalData,
                environmentalFactors
            );
            setRecommendations(result);
            setIsSuccess(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-yellow-50 py-12">
            <div className="container mx-auto px-6 max-w-4xl">
                <BackButton className="mb-8" />
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800">AI Crop Recommender</h1>
                    <p className="text-gray-600 mt-4 text-lg">
                        Discover the most profitable and suitable crops for your land.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Your Location (District, State)*</label>
                                <input type="text" id="location" value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g., Nashik, Maharashtra" className="w-full bg-white border-gray-300 rounded-md shadow-sm p-2 text-gray-900" required />
                            </div>
                            <div>
                                <label htmlFor="soil" className="block text-sm font-medium text-gray-700 mb-1">Predominant Soil Type*</label>
                                <select id="soil" value={soilType} onChange={e => setSoilType(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm p-2 bg-white text-gray-900" required>
                                    {soilTypes.map(type => <option key={type} value={type}>{type}</option>)}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="market" className="block text-sm font-medium text-gray-700 mb-1">Market Preference</label>
                            <select id="market" value={marketPreference} onChange={e => setMarketPreference(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm p-2 bg-white text-gray-900">
                                {marketPreferences.map(type => <option key={type} value={type}>{type}</option>)}
                            </select>
                        </div>

                        <div>
                            <button type="button" onClick={() => setShowAdvanced(!showAdvanced)} className="text-sm text-orange-600 hover:underline">
                                {showAdvanced ? 'Hide Advanced Details' : 'Add More Details for Better Recommendations (Optional)'}
                            </button>
                        </div>

                        {showAdvanced && (
                            <div className="space-y-6 border-t pt-6 animate-fade-in">
                                <div>
                                    <label htmlFor="climateData" className="block text-sm font-medium text-gray-700 mb-1">Climate Data</label>
                                    <input type="text" id="climateData" value={climateData} onChange={e => setClimateData(e.target.value)} placeholder="e.g., Tropical, average rainfall 800mm" className="w-full bg-white border-gray-300 rounded-md shadow-sm p-2 text-gray-900" />
                                </div>
                                <div>
                                    <label htmlFor="geographicalData" className="block text-sm font-medium text-gray-700 mb-1">Geographical Data</label>
                                    <input type="text" id="geographicalData" value={geographicalData} onChange={e => setGeographicalData(e.target.value)} placeholder="e.g., Altitude: 500m, plain region" className="w-full bg-white border-gray-300 rounded-md shadow-sm p-2 text-gray-900" />
                                </div>
                                <div>
                                    <label htmlFor="historicalData" className="block text-sm font-medium text-gray-700 mb-1">Historical Crop Data</label>
                                    <input type="text" id="historicalData" value={historicalData} onChange={e => setHistoricalData(e.target.value)} placeholder="e.g., Last year grew cotton, yield was good" className="w-full bg-white border-gray-300 rounded-md shadow-sm p-2 text-gray-900" />
                                </div>
                                <div>
                                    <label htmlFor="environmentalFactors" className="block text-sm font-medium text-gray-700 mb-1">Environmental Factors</label>
                                    <input type="text" id="environmentalFactors" value={environmentalFactors} onChange={e => setEnvironmentalFactors(e.target.value)} placeholder="e.g., Good water availability, low pest incidence" className="w-full bg-white border-gray-300 rounded-md shadow-sm p-2 text-gray-900" />
                                </div>
                            </div>
                        )}

                        <div>
                            <button type="submit" disabled={isLoading} className="w-full bg-orange-500 text-white font-semibold py-3 px-4 rounded-md hover:bg-orange-600 transition disabled:bg-gray-400">
                                {isLoading ? 'Analyzing...' : 'Get Recommendations'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="mt-12 bg-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">How Our AI Recommender Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-3">🧠 AI Features</h3>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2 mt-1">✓</span>
                                    <span><strong>Predictive Analysis:</strong> Analyzes soil, weather, and market data to forecast crop performance.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2 mt-1">✓</span>
                                    <span><strong>Profitability Forecasting:</strong> Estimates market potential and profitability for suggested crops.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2 mt-1">✓</span>
                                    <span><strong>Risk Assessment:</strong> Considers factors like drought resistance and pest incidence to recommend resilient crops.</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-3">📊 Key Data Requirements</h3>
                            <p className="text-xs text-gray-500 mb-3">Our AI model considers several key data points for accurate recommendations:</p>
                            <ul className="space-y-2 text-gray-600">
                                <li><strong>Soil Data:</strong> Nutrient levels (N, P, K), pH, texture, moisture.</li>
                                <li><strong>Climate Data:</strong> Temperature, rainfall, humidity, sunlight hours.</li>
                                <li><strong>Geographical Data:</strong> Location coordinates, altitude.</li>
                                <li><strong>Historical Crop Data:</strong> Past crop yields in the area.</li>
                                <li><strong>Environmental Factors:</strong> Water availability, disease/pest incidence.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {isLoading && <p className="text-center mt-6 animate-pulse">Our AI is analyzing your farm's potential...</p>}
                {error && <div className="bg-red-100 text-red-700 p-4 rounded-md mt-6">{error}</div>}
                
                {isSuccess && !isLoading && (
                    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md mt-6" role="alert">
                        <p className="font-bold">Success!</p>
                        <p>Your crop recommendations are ready below.</p>
                    </div>
                )}
                
                {recommendations && (
                    <div className="mt-8">
                         <h2 className="text-2xl font-bold text-center mb-6">Top 3 Crop Recommendations</h2>
                        <div className="space-y-6">
                            {recommendations.map((rec, index) => <RecommendationCard key={index} rec={rec} />)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CropRecommendationPage;

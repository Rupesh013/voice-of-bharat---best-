
import React, { useState } from 'react';
import { getFertilizerRecommendation } from '../services/geminiService';
import type { FertilizerRecommendation } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import BackButton from '../components/BackButton';

const soilTypes = ["Alluvial", "Black", "Red", "Laterite", "Arid", "Forest & Mountainous", "Other"];

const RecommendationDisplay: React.FC<{ recommendation: FertilizerRecommendation }> = ({ recommendation }) => {
    const { t } = useTranslation();
    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-8 animate-fade-in">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">{t('pages.fertilizerOptimizer.results.title')}</h3>
            
            <div className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-lg text-gray-700 mb-2">{t('pages.fertilizerOptimizer.results.nutrientAnalysis')}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                    <p className="font-medium text-gray-600">{t('pages.fertilizerOptimizer.results.primaryNutrients')}</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 pl-2">
                        {recommendation.nutrientAnalysis.primary.map((n, i) => <li key={i}>{n}</li>)}
                    </ul>
                    </div>
                    <div>
                    <p className="font-medium text-gray-600">{t('pages.fertilizerOptimizer.results.secondaryNutrients')}</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 pl-2">
                        {recommendation.nutrientAnalysis.secondary.map((n, i) => <li key={i}>{n}</li>)}
                    </ul>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-lg text-gray-700 mb-2">{t('pages.fertilizerOptimizer.results.products')}</h4>
                <ul className="space-y-3 text-gray-600">
                {recommendation.recommendedProducts.map((p, i) => (
                    <li key={i}>
                    <span className="font-semibold text-gray-800">{p.productName}:</span> {p.reason}
                    </li>
                ))}
                </ul>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-lg text-gray-700 mb-2">{t('pages.fertilizerOptimizer.results.schedule')}</h4>
                <div className="space-y-4">
                {recommendation.applicationSchedule.map((s, i) => (
                    <div key={i} className="p-3 border rounded-md bg-green-50 border-green-200 flex justify-between items-center">
                    <div>
                        <p className="font-semibold text-green-800">{s.stage}</p>
                        <p className="text-gray-600 mt-1 text-sm">{s.instructions}</p>
                    </div>
                    <button
                        onClick={() => alert(`Reminder set for: ${s.stage}`)}
                        className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-md hover:bg-green-700 transition duration-300"
                    >
                        {t('pages.fertilizerOptimizer.results.setReminder')}
                    </button>
                    </div>
                ))}
                </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-lg text-gray-700 mb-2">{t('pages.fertilizerOptimizer.results.vendors')}</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600 pl-2">
                    {recommendation.vendorRecommendations.map((v, i) => <li key={i}>{v}</li>)}
                </ul>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg">
                <h4 className="font-semibold text-lg mb-2">{t('pages.fertilizerOptimizer.results.notes')}</h4>
                <p>{recommendation.notes}</p>
            </div>
            </div>
        </div>
    );
};

const FertilizerOptimizerPage: React.FC = () => {
  const [crop, setCrop] = useState('');
  const [soil, setSoil] = useState(soilTypes[0]);
  const [region, setRegion] = useState('');
  const [soilDetails, setSoilDetails] = useState('');
  const [weather, setWeather] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [recommendation, setRecommendation] = useState<FertilizerRecommendation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!crop || !soil || !region) {
      setError("Please fill in all the required fields.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setRecommendation(null);
    setIsSuccess(false);

    try {
      const result = await getFertilizerRecommendation(crop, soil, region, soilDetails, weather);
      setRecommendation(result);
      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <BackButton className="mb-8" />
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">{t('pages.fertilizerOptimizer.title')}</h1>
          <p className="text-gray-600 mt-4 text-lg">
            {t('pages.fertilizerOptimizer.subtitle')}
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="crop" className="block text-sm font-medium text-gray-700 mb-1">{t('pages.fertilizerOptimizer.form.crop')}</label>
                <input type="text" id="crop" value={crop} onChange={e => setCrop(e.target.value)} placeholder="e.g., Rice, Wheat, Cotton" className="w-full bg-white border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 p-2 text-gray-900" required />
              </div>
               <div>
                <label htmlFor="soil" className="block text-sm font-medium text-gray-700 mb-1">{t('pages.fertilizerOptimizer.form.soil')}</label>
                <select id="soil" value={soil} onChange={e => setSoil(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 p-2 bg-white text-gray-900" required>
                  {soilTypes.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>
            </div>
             <div>
              <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">{t('pages.fertilizerOptimizer.form.region')}</label>
              <input type="text" id="region" value={region} onChange={e => setRegion(e.target.value)} placeholder="e.g., Punjab, Andhra Pradesh" className="w-full bg-white border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 p-2 text-gray-900" required />
            </div>

            <div>
                <button type="button" onClick={() => setShowAdvanced(!showAdvanced)} className="text-sm text-orange-600 hover:underline">
                    {showAdvanced ? t('pages.fertilizerOptimizer.form.advancedToggleHide') : t('pages.fertilizerOptimizer.form.advancedToggleShow')}
                </button>
            </div>

            {showAdvanced && (
                <div className="space-y-6 border-t pt-6 animate-fade-in">
                    <div>
                        <label htmlFor="soilDetails" className="block text-sm font-medium text-gray-700 mb-1">{t('pages.fertilizerOptimizer.form.soilDetails')}</label>
                        <input type="text" id="soilDetails" value={soilDetails} onChange={e => setSoilDetails(e.target.value)} placeholder="e.g., pH: 6.5, N: low, P: medium, K: high" className="w-full bg-white border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 p-2 text-gray-900" />
                    </div>
                     <div>
                        <label htmlFor="weather" className="block text-sm font-medium text-gray-700 mb-1">{t('pages.fertilizerOptimizer.form.weather')}</label>
                        <input type="text" id="weather" value={weather} onChange={e => setWeather(e.target.value)} placeholder="e.g., Monsoon season, light rainfall expected" className="w-full bg-white border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 p-2 text-gray-900" />
                    </div>
                </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-green-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? t('pages.fertilizerOptimizer.form.loading') : t('pages.fertilizerOptimizer.form.submit')}
              </button>
            </div>
          </form>
        </div>
        
        {isLoading && (
          <div className="text-center mt-6">
            <p className="text-lg text-gray-700 animate-pulse">{t('pages.fertilizerOptimizer.analyzing')}</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mt-6" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        {isSuccess && !isLoading && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md mt-6" role="alert">
                <p className="font-bold">{t('pages.fertilizerOptimizer.success.title')}</p>
                <p>{t('pages.fertilizerOptimizer.success.description')}</p>
            </div>
        )}

        {recommendation && <RecommendationDisplay recommendation={recommendation} />}
        
      </div>
    </div>
  );
};

export default FertilizerOptimizerPage;

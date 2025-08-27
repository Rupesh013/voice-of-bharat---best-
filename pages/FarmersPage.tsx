import React, { useState } from 'react';
import SectionCard from '../components/SectionCard';
import SchemeAccordion from '../components/SchemeAccordion';
import { FARMER_FEATURES, CATEGORIZED_SCHEMES } from '../constants';
import { recommendSchemes } from '../services/geminiService';
import type { SchemeRecommendation } from '../types';
import FarmAssistant from '../components/FarmAssistant';

const FarmersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(CATEGORIZED_SCHEMES[0].category);
  const [recommenderInput, setRecommenderInput] = useState('');
  const [recommendations, setRecommendations] = useState<SchemeRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetRecommendations = async () => {
    if (!recommenderInput.trim()) return;
    setIsLoading(true);
    setError(null);
    setRecommendations([]);
    try {
      const result = await recommendSchemes(recommenderInput);
      setRecommendations(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const recommendedSchemeTitles = recommendations.map(r => r.schemeTitle);

  return (
    <div className="min-h-screen bg-green-50">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center text-white py-20 md:py-32" style={{backgroundImage: "url('https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1974&auto=format&fit=crop')"}}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">Farm Connect</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
            Your AI-powered partner for modern, profitable, and sustainable agriculture.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Tools for Modern Farming</h2>
            <p className="text-gray-600 mt-2">Leverage technology to improve your yield and income.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FARMER_FEATURES.map((feature) => (
              <SectionCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                path={feature.path}
                Icon={feature.Icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Government Schemes Section */}
      <section id="government-schemes" className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Government Schemes & Support</h2>
            <p className="text-gray-600 mt-2">Find the right financial support and insurance for your needs.</p>
          </div>

          {/* AI Recommender */}
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">✨ AI Scheme Recommender</h3>
            <p className="text-gray-600 mb-4 text-sm">Describe your situation, and our AI will suggest the most relevant schemes for you. (e.g., "I am a small farmer from Maharashtra and I need a loan for buying seeds.")</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={recommenderInput}
                onChange={(e) => setRecommenderInput(e.target.value)}
                placeholder="Tell us what you need..."
                className="flex-grow border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 p-2 bg-white text-gray-900"
                disabled={isLoading}
              />
              <button
                onClick={handleGetRecommendations}
                className="bg-orange-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-orange-600 transition duration-300 disabled:bg-orange-300"
                disabled={isLoading}
              >
                {isLoading ? 'Thinking...' : 'Get Recommendations'}
              </button>
            </div>
             {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
             {recommendations.length > 0 && (
                <div className="mt-6">
                    <h4 className="font-semibold text-lg text-gray-800 mb-3 text-center">✨ Our AI Recommends These Schemes For You ✨</h4>
                    <div className="space-y-4">
                        {recommendations.map((rec, index) => (
                            <div key={index} className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg shadow-sm">
                                <p className="font-bold text-gray-900">{rec.schemeTitle}</p>
                                {rec.benefit && <p className="text-sm text-green-800 font-medium mt-1">{rec.benefit}</p>}
                                <p className="text-sm text-gray-700 mt-2">
                                    <span className="font-semibold">Why it's for you:</span> {rec.reason}
                                </p>
                                {rec.link && (
                                    <a href={rec.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline font-semibold mt-2 inline-block">
                                        Learn More &rarr;
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
          </div>

          {/* Scheme Tabs */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap border-b border-gray-300 mb-4">
              {CATEGORIZED_SCHEMES.map(({ category }) => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`px-4 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none ${
                    activeTab === category
                      ? 'border-b-2 border-orange-500 text-orange-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="space-y-4">
              {CATEGORIZED_SCHEMES
                .find(({ category }) => category === activeTab)
                ?.schemes.map((scheme, index) => (
                   <SchemeAccordion
                      key={index}
                      scheme={scheme}
                      isHighlighted={recommendedSchemeTitles.includes(scheme.title)}
                    />
                ))}
            </div>
          </div>
        </div>
      </section>
      <FarmAssistant />
    </div>
  );
};

export default FarmersPage;
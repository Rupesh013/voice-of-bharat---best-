import React, { useState } from 'react';
import SectionCard from '../components/SectionCard';
import SchemeAccordion from '../components/SchemeAccordion';
import { FARMER_FEATURES, CATEGORIZED_SCHEMES } from '../constants';
import { recommendSchemes } from '../services/geminiService';
import type { SchemeRecommendation } from '../types';
import FarmAssistant from '../components/FarmAssistant';
import { useTranslation } from '../hooks/useTranslation';
import BackButton from '../components/BackButton';

const FarmersPage: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(t(CATEGORIZED_SCHEMES[0].categoryKey));
  const [recommenderInput, setRecommenderInput] = useState('');
  const [recommendations, setRecommendations] = useState<SchemeRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleGetRecommendations = async () => {
    if (!recommenderInput.trim()) return;
    setIsLoading(true);
    setError(null);
    setRecommendations([]);
    setIsSuccess(false);
    try {
      const result = await recommendSchemes(recommenderInput);
      setRecommendations(result);
      setIsSuccess(true);
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
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">{t('pages.farmers.heroTitle')}</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
            {t('pages.farmers.heroSubtitle')}
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <BackButton to="/" className="mb-8" />
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{t('pages.farmers.toolsTitle')}</h2>
            <p className="text-gray-600 mt-2">{t('pages.farmers.toolsSubtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FARMER_FEATURES.map((feature) => (
              <SectionCard
                key={feature.path}
                title={t(feature.titleKey)}
                description={t(feature.descriptionKey)}
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{t('pages.farmers.schemesTitle')}</h2>
            <p className="text-gray-600 mt-2">{t('pages.farmers.schemesSubtitle')}</p>
          </div>

          {/* AI Recommender */}
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">{t('pages.farmers.recommender.title')}</h3>
            <p className="text-gray-600 mb-4 text-sm">{t('pages.farmers.recommender.description')}</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={recommenderInput}
                onChange={(e) => setRecommenderInput(e.target.value)}
                placeholder={t('pages.farmers.recommender.placeholder')}
                className="flex-grow border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 p-2 bg-white text-gray-900"
                disabled={isLoading}
              />
              <button
                onClick={handleGetRecommendations}
                className="bg-orange-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-orange-600 transition duration-300 disabled:bg-orange-300"
                disabled={isLoading}
              >
                {isLoading ? t('pages.farmers.recommender.loading') : t('pages.farmers.recommender.button')}
              </button>
            </div>
             {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
             {isSuccess && !isLoading && (
                <div className="mt-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md">
                    <p className="font-bold">{t('pages.farmers.recommender.success.title')}</p>
                    <p>{t('pages.farmers.recommender.success.description')}</p>
                </div>
              )}
             {recommendations.length > 0 && (
                <div className="mt-6">
                    <h4 className="font-semibold text-lg text-gray-800 mb-3 text-center">{t('pages.farmers.recommender.resultsTitle')}</h4>
                    <div className="space-y-4">
                        {recommendations.map((rec, index) => (
                            <div key={index} className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg shadow-sm">
                                <p className="font-bold text-gray-900">{rec.schemeTitle}</p>
                                {rec.benefit && <p className="text-sm text-green-800 font-medium mt-1">{rec.benefit}</p>}
                                <p className="text-sm text-gray-700 mt-2">
                                    <span className="font-semibold">{t('pages.farmers.recommender.reasonLabel')}:</span> {rec.reason}
                                </p>
                                {rec.link && (
                                    <a href={rec.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline font-semibold mt-2 inline-block">
                                        {t('components.schemeAccordion.visitPortal')} &rarr;
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
              {CATEGORIZED_SCHEMES.map(({ categoryKey }) => {
                  const category = t(categoryKey);
                  return (
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
                  );
                })}
            </div>
            <div className="space-y-4">
              {CATEGORIZED_SCHEMES
                .find(({ categoryKey }) => t(categoryKey) === activeTab)
                ?.schemes.map((scheme, index) => (
                   <SchemeAccordion
                      key={index}
                      scheme={{
                        ...scheme,
                        benefit: t(scheme.benefitKey),
                        eligibility: t(scheme.eligibilityKey),
                        applyProcess: scheme.applyProcessKeys.map(key => t(key)),
                      }}
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
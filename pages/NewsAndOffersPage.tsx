import React, { useState, useEffect, useCallback } from 'react';
import { ICONS } from '../constants';
import { getCategorizedNews, getCategorizedOffers } from '../services/geminiService';
import type { NewsArticle, CategorizedOffer } from '../types';
import BackButton from '../components/BackButton';

const TabButton: React.FC<{ label: string; isActive: boolean; onClick: () => void; }> = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-6 py-3 font-semibold text-lg transition-colors duration-300 ${isActive ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-500'}`}
    >
        {label}
    </button>
);

const NewsArticleCard: React.FC<{ article: NewsArticle }> = ({ article }) => (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-orange-400 flex flex-col h-full">
        <div className="flex-grow">
            <h4 className="font-bold text-lg text-gray-800 leading-tight">{article.title}</h4>
            <p className="text-xs text-gray-500 my-1">Source: {article.source}</p>
            <p className="text-sm text-gray-600 leading-relaxed mt-2">{article.summary}</p>
        </div>
        <a href={article.link} target="_blank" rel="noopener noreferrer" className="text-sm text-orange-600 font-semibold hover:underline mt-3 inline-block self-start">
            Read Full Story &rarr;
        </a>
    </div>
);

const CategorizedOfferCard: React.FC<{ offer: CategorizedOffer }> = ({ offer }) => (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-purple-500 flex flex-col h-full">
        <div className="flex-grow">
            <h4 className="font-bold text-lg text-gray-800 leading-tight">{offer.title}</h4>
            <p className="text-xs text-gray-500 my-1">Source: {offer.source}</p>
            <p className="text-sm text-gray-600 leading-relaxed mt-2">{offer.description}</p>
            {offer.eligibility && <p className="text-xs text-gray-500 mt-2"><strong>Eligibility:</strong> {offer.eligibility}</p>}
            {offer.expiry && <p className="text-xs text-red-600 mt-1"><strong>Expires:</strong> {offer.expiry}</p>}
        </div>
        <a href={offer.link} target="_blank" rel="noopener noreferrer" className="text-sm text-purple-600 font-semibold hover:underline mt-3 inline-block self-start">
            View Offer &rarr;
        </a>
    </div>
);

const LoadingSkeleton: React.FC<{ type: 'news' | 'offers' }> = ({ type }) => {
    const colorClass = type === 'news' ? 'border-orange-400' : 'border-purple-500';
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${colorClass}`}>
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
            ))}
        </div>
    );
};

const NEWS_CATEGORIES = ['National', 'Business', 'Technology', 'Sports', 'Health', 'Entertainment'];
const OFFER_CATEGORIES = ['Seasonal & Festive', 'Electronics', 'Travel', 'Food & Dining', 'Fashion', 'Government Subsidies'];


const NewsAndOffersPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'Updates' | 'Offers'>('Updates');
    
    // State for "Updates" tab
    const [activeNewsCategory, setActiveNewsCategory] = useState(NEWS_CATEGORIES[0]);
    const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
    const [isNewsLoading, setIsNewsLoading] = useState(true);
    const [newsError, setNewsError] = useState<string | null>(null);

    // State for "Offers" tab
    const [activeOfferCategory, setActiveOfferCategory] = useState(OFFER_CATEGORIES[0]);
    const [offers, setOffers] = useState<CategorizedOffer[]>([]);
    const [isOffersLoading, setIsOffersLoading] = useState(true);
    const [offersError, setOffersError] = useState<string | null>(null);

    const fetchNews = useCallback(async (category: string) => {
        setIsNewsLoading(true);
        setNewsError(null);
        try {
            const result = await getCategorizedNews(category);
            setNewsArticles(result || []);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'An error occurred fetching news.';
            setNewsError(message);
            setNewsArticles([]);
        } finally {
            setIsNewsLoading(false);
        }
    }, []);

    const fetchOffers = useCallback(async (category: string) => {
        setIsOffersLoading(true);
        setOffersError(null);
        try {
            const result = await getCategorizedOffers(category);
            setOffers(result || []);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'An error occurred fetching offers.';
            setOffersError(message);
            setOffers([]);
        } finally {
            setIsOffersLoading(false);
        }
    }, []);
    
    useEffect(() => {
        if (activeTab === 'Updates') {
            fetchNews(activeNewsCategory);
        } else {
            fetchOffers(activeOfferCategory);
        }
    }, [activeTab, activeNewsCategory, activeOfferCategory, fetchNews, fetchOffers]);

    return (
        <div className="min-h-screen bg-gray-100">
            <section className="bg-gray-800 text-white py-16 text-center">
                <ICONS.Updates className="w-16 h-16 mx-auto text-orange-400 mb-4" />
                <h1 className="text-4xl md:text-5xl font-bold">News & Offers</h1>
                <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                    Stay informed with real-time updates and find exclusive deals, powered by AI.
                </p>
            </section>

            <main className="container mx-auto px-4 md:px-6 py-12">
                <BackButton to="/" className="mb-8" />
                
                <div className="bg-white rounded-t-lg shadow-md">
                    <div className="flex justify-center border-b">
                        <TabButton label="Latest Updates" isActive={activeTab === 'Updates'} onClick={() => setActiveTab('Updates')} />
                        <TabButton label="Latest Offers" isActive={activeTab === 'Offers'} onClick={() => setActiveTab('Offers')} />
                    </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-b-lg shadow-md">
                    {activeTab === 'Updates' && (
                        <div className="animate-fade-in">
                            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Latest News Updates</h2>
                            <div className="flex flex-wrap justify-center gap-3 mb-8">
                                {NEWS_CATEGORIES.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setActiveNewsCategory(category)}
                                        className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                                            activeNewsCategory === category
                                                ? 'bg-orange-500 text-white shadow-md'
                                                : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-200'
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                            <div className="text-center mb-6">
                                <button onClick={() => fetchNews(activeNewsCategory)} disabled={isNewsLoading} className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-gray-700 text-sm font-semibold rounded-full shadow-md hover:shadow-lg hover:bg-gray-50 hover:text-orange-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-wait mx-auto">
                                    <svg className={`w-4 h-4 ${isNewsLoading ? 'animate-spin' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0M2.985 19.644A8.25 8.25 0 0116.023 9.348" />
                                    </svg>
                                    {isNewsLoading ? `Refreshing ${activeNewsCategory}...` : `Refresh ${activeNewsCategory}`}
                                </button>
                            </div>
                            
                            {isNewsLoading && <LoadingSkeleton type="news" />}
                            {newsError && <div className="text-center text-red-500 bg-red-100 p-4 rounded-lg">{newsError}</div>}
                            {!isNewsLoading && !newsError && newsArticles.length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {newsArticles.map((article, index) => <NewsArticleCard key={index} article={article} />)}
                                </div>
                            )}
                            {!isNewsLoading && !newsError && newsArticles.length === 0 && (
                                <div className="text-center text-gray-500 bg-white p-8 rounded-lg">No news articles found for this category.</div>
                            )}
                        </div>
                    )}
                    {activeTab === 'Offers' && (
                        <div className="animate-fade-in">
                            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Latest Deals & Offers</h2>
                            <div className="flex flex-wrap justify-center gap-3 mb-8">
                                {OFFER_CATEGORIES.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setActiveOfferCategory(category)}
                                        className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                                            activeOfferCategory === category
                                                ? 'bg-purple-600 text-white shadow-md'
                                                : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-200'
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                             <div className="text-center mb-6">
                                <button onClick={() => fetchOffers(activeOfferCategory)} disabled={isOffersLoading} className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-gray-700 text-sm font-semibold rounded-full shadow-md hover:shadow-lg hover:bg-gray-50 hover:text-purple-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-wait mx-auto">
                                    <svg className={`w-4 h-4 ${isOffersLoading ? 'animate-spin' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0M2.985 19.644A8.25 8.25 0 0116.023 9.348" />
                                    </svg>
                                    {isOffersLoading ? `Refreshing ${activeOfferCategory}...` : `Refresh ${activeOfferCategory}`}
                                </button>
                            </div>

                            {isOffersLoading && <LoadingSkeleton type="offers" />}
                            {offersError && <div className="text-center text-red-500 bg-red-100 p-4 rounded-lg">{offersError}</div>}
                            {!isOffersLoading && !offersError && offers.length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {offers.map((offer, index) => <CategorizedOfferCard key={index} offer={offer} />)}
                                </div>
                            )}
                            {!isOffersLoading && !offersError && offers.length === 0 && (
                                <div className="text-center text-gray-500 bg-white p-8 rounded-lg">No offers found for this category.</div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default NewsAndOffersPage;
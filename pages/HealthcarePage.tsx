import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { findHealthSchemes, getNutritionAdvice, getDiseaseInfo } from '../services/geminiService';
import type { SchemeRecommendation, DiseaseInfo } from '../types';
import BackButton from '../components/BackButton';
import { diseaseCategories } from '../data/diseaseData';

const AccordionItem: React.FC<{ title: string; children: React.ReactNode; isOpen: boolean; onToggle: () => void; }> = ({ title, children, isOpen, onToggle }) => (
    <div className="mb-4 bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300">
        <button
            onClick={onToggle}
            className="w-full flex justify-between items-center p-5 text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            aria-expanded={isOpen}
        >
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">{title}</h2>
            <svg className={`w-6 h-6 text-gray-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
        </button>
        {isOpen && (
            <div className="px-6 pb-6 pt-4 border-t border-gray-200 bg-gray-50">
                {children}
            </div>
        )}
    </div>
);

const ResourceLink: React.FC<{ titleKey: string; href: string; }> = ({ titleKey, href }) => {
    const { t } = useTranslation();
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="block bg-white p-3 rounded-md shadow-sm hover:shadow-md transition-shadow border-l-4 border-orange-400">
            <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-800">{t(titleKey)}</span>
                <span className="text-orange-500 text-xs font-bold">&rarr;</span>
            </div>
        </a>
    );
};

const DiseaseInfoDisplay: React.FC<{ info: DiseaseInfo | null; error: string; isLoading: boolean; }> = ({ info, error, isLoading }) => {
    const { t } = useTranslation();

    if (isLoading) {
        return <p className="text-center text-gray-600 animate-pulse mt-4">{t('pages.healthcare.diseases.search.loading')}</p>;
    }
    if (error) {
        return <p className="text-center text-red-600 mt-4">{error}</p>;
    }
    if (!info) {
        return null;
    }

    return (
        <div className="mt-6 bg-white p-5 rounded-lg shadow-md animate-fade-in border-t-4 border-orange-500">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('pages.healthcare.diseases.results.title')} {info.name}</h3>
            
            <div className="space-y-4 text-sm">
                <div>
                    <h4 className="font-semibold text-gray-700">{t('pages.healthcare.diseases.results.symptoms')}</h4>
                    <ul className="list-disc list-inside text-gray-600 pl-4">
                        {info.symptoms.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                </div>
                 <div>
                    <h4 className="font-semibold text-gray-700">{t('pages.healthcare.diseases.results.causes')}</h4>
                    <ul className="list-disc list-inside text-gray-600 pl-4">
                        {info.causes.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-700">{t('pages.healthcare.diseases.results.diagnosis')}</h4>
                    <ul className="list-disc list-inside text-gray-600 pl-4">
                        {info.diagnosis.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-700">{t('pages.healthcare.diseases.results.treatment')}</h4>
                    <ul className="list-disc list-inside text-gray-600 pl-4">
                        {info.treatment.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-700">{t('pages.healthcare.diseases.results.prevention')}</h4>
                    <ul className="list-disc list-inside text-gray-600 pl-4">
                        {info.prevention.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                </div>
                 <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                    <h4 className="font-semibold text-yellow-800">{t('pages.healthcare.diseases.results.medications')}</h4>
                    <p className="text-gray-700 mt-1">{info.medications}</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg mt-4">
                    <p className="font-bold text-red-800">{t('pages.healthcare.diseases.results.disclaimer')}</p>
                </div>
            </div>
        </div>
    );
};


const HealthcarePage: React.FC = () => {
    const { t } = useTranslation();
    const [openAccordion, setOpenAccordion] = useState<string>('diseases');
    const toggleAccordion = (key: string) => setOpenAccordion(openAccordion === key ? '' : key);

    const [schemeState, setSchemeState] = useState({ query: '', recs: [] as SchemeRecommendation[], isLoading: false, error: '' });
    const [nutritionState, setNutritionState] = useState({ query: '', answer: '', isLoading: false, error: '' });
    const [diseaseState, setDiseaseState] = useState<{ query: string; info: DiseaseInfo | null; isLoading: boolean; error: string }>({
        query: '',
        info: null,
        isLoading: false,
        error: ''
    });
    
    const handleSchemeCheck = async (e: React.FormEvent) => {
        e.preventDefault();
        setSchemeState(s => ({ ...s, isLoading: true, error: '', recs: [] }));
        try {
            const recs = await findHealthSchemes(schemeState.query);
            setSchemeState(s => ({ ...s, recs, isLoading: false }));
        } catch (err) {
            setSchemeState(s => ({ ...s, error: err instanceof Error ? err.message : 'An error occurred', isLoading: false }));
        }
    };
    
    const handleNutritionAsk = async (e: React.FormEvent) => {
        e.preventDefault();
        setNutritionState(s => ({ ...s, isLoading: true, error: '', answer: '' }));
        try {
            const answer = await getNutritionAdvice(nutritionState.query);
            setNutritionState(s => ({ ...s, answer, isLoading: false }));
        } catch (err) {
            setNutritionState(s => ({ ...s, error: err instanceof Error ? err.message : 'An error occurred', isLoading: false }));
        }
    };

    const handleGetDiseaseInfo = async (diseaseName: string) => {
        if (!diseaseName.trim()) return;
        setDiseaseState(s => ({ ...s, isLoading: true, error: '', info: null, query: diseaseName }));
        try {
            const info = await getDiseaseInfo(diseaseName);
            setDiseaseState(s => ({ ...s, info, isLoading: false }));
        } catch (err) {
            setDiseaseState(s => ({ ...s, error: err instanceof Error ? err.message : 'An error occurred', isLoading: false }));
        }
    };

    const handleDiseaseSearch = (e: React.FormEvent) => {
        e.preventDefault();
        handleGetDiseaseInfo(diseaseState.query);
    };

    return (
        <div className="min-h-screen bg-blue-50">
            {/* Hero Section */}
            <section className="relative bg-cover bg-center text-white py-20 md:py-32" style={{backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop')"}}>
                <div className="absolute inset-0 bg-black opacity-60"></div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">{t('pages.healthcare.heroTitle')}</h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">{t('pages.healthcare.heroSubtitle')}</p>
                </div>
            </section>

            {/* Main Content */}
            <main id="main-content" className="container mx-auto px-4 md:px-6 py-12">
                <BackButton to="/" className="mb-8" />
                <AccordionItem title={t('pages.healthcare.accordion.schemes.title')} isOpen={openAccordion === 'schemes'} onToggle={() => toggleAccordion('schemes')}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-orange-400">
                            <h3 className="text-lg font-bold text-gray-800">{t('pages.healthcare.schemes.ai.title')}</h3>
                            <p className="text-gray-600 text-sm mt-2">{t('pages.healthcare.schemes.ai.description')}</p>
                            <form onSubmit={handleSchemeCheck} className="mt-4 space-y-3">
                                <input value={schemeState.query} onChange={e => setSchemeState(s => ({ ...s, query: e.target.value }))} placeholder={t('pages.healthcare.schemes.ai.placeholder')} className="w-full bg-white border-gray-300 rounded-md p-2 text-gray-900"/>
                                <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300" disabled={schemeState.isLoading}>
                                    {schemeState.isLoading ? t('pages.healthcare.schemes.ai.loading') : t('pages.healthcare.schemes.ai.button')}
                                </button>
                            </form>
                            {schemeState.error && <p className="text-red-500 text-sm mt-2">{schemeState.error}</p>}
                            {schemeState.recs.length > 0 && (
                                <div className="mt-4 space-y-3">
                                    <h4 className="font-bold">{t('pages.healthcare.schemes.ai.resultsTitle')}</h4>
                                    {schemeState.recs.map((rec, i) => (
                                        <div key={i} className="p-3 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                                            <p className="font-bold text-gray-900">{rec.schemeTitle}</p>
                                            <p className="text-sm text-gray-700 mt-1">{rec.reason}</p>
                                            <a href={rec.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline font-semibold mt-2 inline-block">Learn More &rarr;</a>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="space-y-3">
                            <ResourceLink titleKey="pages.healthcare.schemes.ayushman" href="https://www.pmjay.gov.in/" />
                            <ResourceLink titleKey="pages.healthcare.schemes.janAushadhi" href="https://janaushadhi.gov.in/" />
                            <ResourceLink titleKey="pages.healthcare.schemes.nhm" href="https://nhm.gov.in/" />
                            <ResourceLink titleKey="pages.healthcare.schemes.rashtriyaBal" href="https://rbsk.gov.in/" />
                        </div>
                    </div>
                </AccordionItem>
                
                <AccordionItem title={t('pages.healthcare.accordion.services.title')} isOpen={openAccordion === 'services'} onToggle={() => toggleAccordion('services')}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ResourceLink titleKey="pages.healthcare.services.abha" href="https://abha.abdm.gov.in/"/>
                        <ResourceLink titleKey="pages.healthcare.services.nhp" href="https://www.nhp.gov.in/"/>
                        <ResourceLink titleKey="pages.healthcare.services.practo" href="https://www.practo.com/"/>
                        <ResourceLink titleKey="pages.healthcare.services.blood" href="https://www.eraktkosh.in/"/>
                    </div>
                </AccordionItem>

                <AccordionItem title={t('pages.healthcare.accordion.nutrition.title')} isOpen={openAccordion === 'nutrition'} onToggle={() => toggleAccordion('nutrition')}>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-orange-400">
                           <h3 className="text-lg font-bold text-gray-800">{t('pages.healthcare.nutrition.ai.title')}</h3>
                            <form onSubmit={handleNutritionAsk} className="mt-4 space-y-3">
                                <textarea value={nutritionState.query} onChange={e => setNutritionState(s => ({ ...s, query: e.target.value }))} rows={3} placeholder={t('pages.healthcare.nutrition.ai.placeholder')} className="w-full bg-white border-gray-300 rounded-md p-2 text-gray-900" />
                                <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300" disabled={nutritionState.isLoading}>
                                    {nutritionState.isLoading ? t('pages.healthcare.nutrition.ai.loading') : t('pages.healthcare.nutrition.ai.button')}
                                </button>
                            </form>
                             {nutritionState.error && <p className="text-red-500 text-sm mt-2">{nutritionState.error}</p>}
                             {nutritionState.answer && (
                                <div className="mt-4 p-3 bg-blue-50 border rounded-md">
                                    <h4 className="font-semibold text-gray-800 mb-2">{t('pages.healthcare.nutrition.ai.resultsTitle')}</h4>
                                    <p className="text-gray-700 text-sm whitespace-pre-wrap">{nutritionState.answer}</p>
                                </div>
                             )}
                        </div>
                        <div className="space-y-3">
                             <ResourceLink titleKey="pages.healthcare.nutrition.poshan" href="https://poshanabhiyaan.gov.in/" />
                             <ResourceLink titleKey="pages.healthcare.nutrition.eatRight" href="https://eatrightindia.gov.in/" />
                             <ResourceLink titleKey="pages.healthcare.nutrition.mentalHealth" href="https://www.nimhans.ac.in/" />
                        </div>
                    </div>
                </AccordionItem>
                 <AccordionItem title={t('pages.healthcare.accordion.diseases.title')} isOpen={openAccordion === 'diseases'} onToggle={() => toggleAccordion('diseases')}>
                    <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-orange-400 mb-6">
                        <h3 className="text-lg font-bold text-gray-800">{t('pages.healthcare.diseases.search.title')}</h3>
                        <form onSubmit={handleDiseaseSearch} className="mt-4 flex flex-col sm:flex-row gap-2">
                            <input 
                                value={diseaseState.query} 
                                onChange={e => setDiseaseState(s => ({ ...s, query: e.target.value }))}
                                placeholder={t('pages.healthcare.diseases.search.placeholder')} 
                                className="flex-grow bg-white border-gray-300 rounded-md p-2 text-gray-900"/>
                            <button type="submit" className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300" disabled={diseaseState.isLoading || !diseaseState.query.trim()}>
                                {diseaseState.isLoading ? t('pages.healthcare.diseases.search.loading') : t('pages.healthcare.diseases.search.button')}
                            </button>
                        </form>
                    </div>

                    <div className="space-y-6">
                        {Object.values(diseaseCategories).map((category) => (
                            <div key={category.titleKey}>
                                <h3 className="text-lg font-semibold text-gray-700 mb-3">{t(category.titleKey)}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {category.diseases.map(disease => (
                                        <button 
                                            key={disease}
                                            onClick={() => handleGetDiseaseInfo(disease)}
                                            className="bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full hover:bg-orange-200 hover:text-orange-800 transition-colors"
                                        >
                                            {disease}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <DiseaseInfoDisplay 
                        info={diseaseState.info}
                        error={diseaseState.error}
                        isLoading={diseaseState.isLoading}
                    />
                </AccordionItem>

                <AccordionItem title={t('pages.healthcare.accordion.emergency.title')} isOpen={openAccordion === 'emergency'} onToggle={() => toggleAccordion('emergency')}>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <ResourceLink titleKey="pages.healthcare.emergency.ambulance" href="tel:108" />
                        <ResourceLink titleKey="pages.healthcare.emergency.healthHelpline" href="tel:104" />
                        <ResourceLink titleKey="pages.healthcare.emergency.emergency" href="tel:112" />
                    </div>
                </AccordionItem>
            </main>
        </div>
    );
};

export default HealthcarePage;

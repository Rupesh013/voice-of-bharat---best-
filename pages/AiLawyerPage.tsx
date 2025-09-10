import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import BackButton from '../components/BackButton';
import { getLegalAnalysis, generateLegalDraft } from '../services/geminiService';
import type { LegalAnalysisResult } from '../types';

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

const LegalQuery: React.FC = () => {
    const { t } = useTranslation();
    const [issue, setIssue] = useState('');
    const [analysis, setAnalysis] = useState<LegalAnalysisResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setAnalysis(null);
        try {
            const result = await getLegalAnalysis(issue);
            setAnalysis(result);
        } catch(err) {
            setError(err instanceof Error ? err.message : 'Failed to get analysis.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <p className="text-gray-600 text-sm">{t('pages.aiLawyer.legalQuery.ai.description')}</p>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-lg shadow-sm">
                 <textarea value={issue} onChange={e => setIssue(e.target.value)} rows={4} placeholder={t('pages.aiLawyer.legalQuery.ai.placeholder')} className="w-full bg-white border-gray-300 rounded-md shadow-sm p-3 text-gray-900" required />
                 <button type="submit" disabled={isLoading} className="w-full bg-orange-500 text-white font-semibold py-3 px-4 rounded-md hover:bg-orange-600 disabled:bg-orange-300">
                    {isLoading ? t('pages.aiLawyer.legalQuery.ai.loading') : t('pages.aiLawyer.legalQuery.ai.button')}
                </button>
            </form>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            {analysis && (
                <div className="space-y-4 mt-4 animate-fade-in">
                    <h4 className="font-bold text-xl text-center">{t('pages.aiLawyer.legalQuery.ai.resultsTitle')}</h4>
                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                        <h5 className="font-bold text-green-800">{t('pages.aiLawyer.legalQuery.ai.simpleAdviceTitle')}</h5>
                        <p className="text-sm text-gray-700 mt-2 whitespace-pre-wrap">{analysis.generalAdvice}</p>
                    </div>
                     <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                        <h5 className="font-bold text-blue-800">{t('pages.aiLawyer.legalQuery.ai.lawAdviceTitle')}</h5>
                        <p className="text-sm text-gray-700 mt-2 whitespace-pre-wrap">{analysis.legalProvisions}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

const DraftGenerator: React.FC = () => {
    const { t } = useTranslation();
    const [description, setDescription] = useState('');
    const [draft, setDraft] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setDraft('');
        try {
            const result = await generateLegalDraft(description);
            setDraft(result);
        } catch(err) {
            setError(err instanceof Error ? err.message : 'Failed to generate draft.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleCopy = () => {
        navigator.clipboard.writeText(draft);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
         <div className="space-y-6">
            <p className="text-gray-600 text-sm">{t('pages.aiLawyer.draftGenerator.ai.description')}</p>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-lg shadow-sm">
                 <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} placeholder={t('pages.aiLawyer.draftGenerator.ai.placeholder')} className="w-full bg-white border-gray-300 rounded-md shadow-sm p-3 text-gray-900" required />
                 <button type="submit" disabled={isLoading} className="w-full bg-orange-500 text-white font-semibold py-3 px-4 rounded-md hover:bg-orange-600 disabled:bg-orange-300">
                    {isLoading ? t('pages.aiLawyer.draftGenerator.ai.loading') : t('pages.aiLawyer.draftGenerator.ai.button')}
                </button>
            </form>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            {draft && (
                <div className="bg-gray-100 p-4 rounded-lg mt-4 animate-fade-in">
                    <h4 className="font-bold text-gray-800">{t('pages.aiLawyer.draftGenerator.ai.resultsTitle')}</h4>
                    <textarea readOnly value={draft} rows={15} className="w-full bg-white border-gray-300 rounded-md p-2 mt-2 text-sm text-gray-800 font-mono" />
                    <button onClick={handleCopy} className="mt-2 bg-blue-600 text-white font-semibold px-4 py-2 rounded-md text-sm hover:bg-blue-700">
                        {copied ? 'Copied!' : t('pages.aiLawyer.draftGenerator.ai.copyButton')}
                    </button>
                </div>
            )}
        </div>
    );
};

const ConnectLawyer: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div className="text-center">
            <h3 className="text-xl font-bold text-gray-800">{t('pages.aiLawyer.connect.title')}</h3>
            <p className="text-gray-600 my-4 max-w-xl mx-auto">{t('pages.aiLawyer.connect.description')}</p>
            <a href="https://www.justdial.com/Tirupati/Lawyers/nct-10296083" target="_blank" rel="noopener noreferrer" className="inline-block bg-green-600 text-white font-bold px-8 py-3 rounded-md hover:bg-green-700 transition-transform transform hover:scale-105">
                {t('pages.aiLawyer.connect.linkText')}
            </a>
        </div>
    );
};

const AiLawyerPage: React.FC = () => {
    const { t } = useTranslation();
    const [openAccordion, setOpenAccordion] = useState<string>('legalQuery');
    const toggleAccordion = (key: string) => setOpenAccordion(openAccordion === key ? '' : key);

    return (
        <div className="min-h-screen bg-gray-100">
            <section className="relative bg-cover bg-center text-white py-20 text-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1589216532372-1c2a36790039?q=80&w=2070&auto=format&fit=crop')"}}>
                <div className="absolute inset-0 bg-black opacity-60"></div>
                 <div className="container mx-auto px-6 relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold">{t('pages.aiLawyer.heroTitle')}</h1>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-gray-300">
                        {t('pages.aiLawyer.heroSubtitle')}
                    </p>
                </div>
            </section>
            
            <main className="container mx-auto px-4 md:px-6 py-12">
                <BackButton to="/" className="mb-8" />
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md mb-8" role="alert">
                    <p className="font-bold">{t('pages.aiLawyer.disclaimer')}</p>
                </div>
                <AccordionItem title={t('pages.aiLawyer.accordion.legalQuery.title')} isOpen={openAccordion === 'legalQuery'} onToggle={() => toggleAccordion('legalQuery')}>
                   <LegalQuery />
                </AccordionItem>
                 <AccordionItem title={t('pages.aiLawyer.accordion.draftGenerator.title')} isOpen={openAccordion === 'draftGenerator'} onToggle={() => toggleAccordion('draftGenerator')}>
                   <DraftGenerator />
                </AccordionItem>
                 <AccordionItem title={t('pages.aiLawyer.accordion.connect.title')} isOpen={openAccordion === 'connect'} onToggle={() => toggleAccordion('connect')}>
                   <ConnectLawyer />
                </AccordionItem>
            </main>
        </div>
    );
};

export default AiLawyerPage;

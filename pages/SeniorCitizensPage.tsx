import React, { useState } from 'react';
import { ICONS } from '../constants';
import { getSeniorCitizenAIResponse } from '../services/geminiService';
import { useTranslation } from '../hooks/useTranslation';
import BackButton from '../components/BackButton';

// --- Reusable Components ---

const AccordionSection: React.FC<{ title: string; Icon: React.ElementType; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, Icon, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="mb-4 bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-5 text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                aria-expanded={isOpen}
            >
                <div className="flex items-center">
                    <Icon className="h-10 w-10 text-orange-500 mr-4" />
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800">{title}</h2>
                </div>
                <svg className={`w-6 h-6 text-gray-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            {isOpen && (
                <div className="px-6 pb-6 pt-4 border-t border-gray-200">
                    {children}
                </div>
            )}
        </div>
    );
};

const FeatureCard: React.FC<{ title: string; description: string; links: { name: string; url: string }[] }> = ({ title, description, links }) => (
    <div className="bg-gray-50 p-5 rounded-lg shadow-sm border-l-4 border-orange-400 h-full flex flex-col justify-between">
        <div>
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
            <p className="text-gray-600 text-base mt-2">{description}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
            {links.map(link => (
                <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm bg-orange-500 text-white font-semibold px-3 py-1 rounded-md hover:bg-orange-600 transition duration-300">
                    {link.name} &rarr;
                </a>
            ))}
        </div>
    </div>
);

const AIQueryBox: React.FC<{ title: string; description: string; placeholder: string; systemInstruction: string; buttonText: string; }> = ({ title, description, placeholder, systemInstruction, buttonText }) => {
    const { t } = useTranslation();
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        if (!input.trim()) return;
        setIsLoading(true);
        setError('');
        setResponse('');
        try {
            const result = await getSeniorCitizenAIResponse(input, systemInstruction);
            setResponse(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-blue-50 p-5 rounded-lg shadow-sm border-l-4 border-blue-400">
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
            <p className="text-gray-600 text-base mt-2 mb-4">{description}</p>
            <div className="flex flex-col sm:flex-row gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={placeholder}
                    className="flex-grow border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 p-3 bg-white text-gray-900 text-base"
                    disabled={isLoading}
                />
                <button onClick={handleSubmit} disabled={isLoading} className="bg-blue-600 text-white font-bold px-6 py-3 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400">
                    {isLoading ? t('pages.seniors.common.loading') : buttonText}
                </button>
            </div>
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            {response && (
                <div className="mt-4 p-4 bg-white border rounded-md max-h-60 overflow-y-auto">
                    <h4 className="font-semibold text-gray-800 mb-2">{t('pages.seniors.common.assistantSays')}</h4>
                    <p className="text-gray-700 text-base whitespace-pre-wrap">{response}</p>
                </div>
            )}
        </div>
    );
};

const SeniorCitizensPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-blue-50">
        {/* Hero Section */}
        <section className="relative bg-cover bg-center text-white py-20 text-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1543269664-76bc3997d9ea?q=80&w=2070&auto=format&fit=crop')"}}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="container mx-auto px-6 relative z-10">
                <h1 className="text-4xl md:text-6xl font-bold">{t('pages.seniors.heroTitle')}</h1>
                <p className="mt-4 text-xl text-gray-200 max-w-3xl mx-auto">
                    {t('pages.seniors.heroSubtitle')}
                </p>
            </div>
        </section>

        <main className="container mx-auto px-4 md:px-6 py-12">
            <BackButton to="/" className="mb-8" />
            <AccordionSection title={t('pages.seniors.servicesTitle')} Icon={ICONS.Shield} defaultOpen>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FeatureCard 
                        title={t('pages.seniors.features.healthcare.title')}
                        description={t('pages.seniors.features.healthcare.description')}
                        links={[
                            { name: t('pages.seniors.features.healthcare.link1'), url: 'https://www.practo.com/' },
                            { name: t('pages.seniors.features.healthcare.link2'), url: 'https://www.apollo247.com/' }
                        ]}
                    />
                    <AIQueryBox 
                        title={t('pages.seniors.features.healthAssistant.title')}
                        description={t('pages.seniors.features.healthAssistant.description')}
                        placeholder={t('pages.seniors.features.healthAssistant.placeholder')}
                        buttonText={t('pages.seniors.features.healthAssistant.button')}
                        systemInstruction="You are a helpful health assistant for senior citizens in India. Provide general, easy-to-understand health information and tips. Be encouraging. Always include a disclaimer to consult a real doctor for medical advice."
                    />
                     <AIQueryBox 
                        title={t('pages.seniors.features.schemeFinder.title')}
                        description={t('pages.seniors.features.schemeFinder.description')}
                        placeholder={t('pages.seniors.features.schemeFinder.placeholder')}
                        buttonText={t('pages.seniors.features.healthAssistant.button')}
                        systemInstruction="You are an expert on Indian government schemes for senior citizens. Based on user input, identify and explain relevant schemes. Provide eligibility and benefits in simple, large-font friendly terms."
                    />
                    <AIQueryBox 
                        title={t('pages.seniors.features.legalAid.title')}
                        description={t('pages.seniors.features.legalAid.description')}
                        placeholder={t('pages.seniors.features.legalAid.placeholder')}
                        buttonText={t('pages.seniors.features.healthAssistant.button')}
                        systemInstruction="You are a legal assistant providing basic information on Indian laws relevant to senior citizens. Explain concepts clearly and simply. Always state that this is not legal advice and a professional lawyer should be consulted for any legal matter."
                    />
                </div>
            </AccordionSection>

            <AccordionSection title={t('pages.seniors.communityTitle')} Icon={ICONS.Student}>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <FeatureCard 
                        title={t('pages.seniors.features.hobbies.title')}
                        description={t('pages.seniors.features.hobbies.description')}
                        links={[
                            { name: t('pages.seniors.features.hobbies.link1'), url: 'https://www.youtube.com/' },
                            { name: t('pages.seniors.features.hobbies.link2'), url: 'https://www.coursera.org/' }
                        ]}
                    />
                     <AIQueryBox 
                        title={t('pages.seniors.features.hobbyFinder.title')}
                        description={t('pages.seniors.features.hobbyFinder.description')}
                        placeholder={t('pages.seniors.features.hobbyFinder.placeholder')}
                        buttonText={t('pages.seniors.features.healthAssistant.button')}
                        systemInstruction="You are a friendly and creative assistant suggesting safe and engaging hobbies for senior citizens in India based on their interests. Provide a few ideas with simple steps to get started."
                    />
                </div>
            </AccordionSection>

            <AccordionSection title={t('pages.seniors.independenceTitle')} Icon={ICONS.Lightbulb}>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <AIQueryBox 
                        title={t('pages.seniors.features.digitalTutor.title')}
                        description={t('pages.seniors.features.digitalTutor.description')}
                        placeholder={t('pages.seniors.features.digitalTutor.placeholder')}
                        buttonText={t('pages.seniors.features.healthAssistant.button')}
                        systemInstruction="You are a patient and clear digital tutor for senior citizens. Explain how to use technology (like smartphones, WhatsApp, Google Pay) in very simple, numbered steps. Avoid technical jargon and be encouraging."
                    />
                    <AIQueryBox 
                        title={t('pages.seniors.features.financeExplainer.title')}
                        description={t('pages.seniors.features.financeExplainer.description')}
                        placeholder={t('pages.seniors.features.financeExplainer.placeholder')}
                        buttonText={t('pages.seniors.features.healthAssistant.button')}
                        systemInstruction="You are a financial literacy guide for senior citizens in India. Explain financial concepts simply and clearly. Use relatable examples. Always include a strong disclaimer that this is educational information, not financial advice, and a professional advisor should be consulted."
                    />
                    <AIQueryBox 
                        title={t('pages.seniors.features.safetyTips.title')}
                        description={t('pages.seniors.features.safetyTips.description')}
                        placeholder={t('pages.seniors.features.safetyTips.placeholder')}
                        buttonText={t('pages.seniors.features.healthAssistant.button')}
                        systemInstruction="You are a safety expert for senior citizens. Provide practical and easy-to-implement safety tips for various situations (home, travel, online). Keep the tone calm and reassuring."
                    />
                     <FeatureCard 
                        title={t('pages.seniors.features.emergency.title')}
                        description={t('pages.seniors.features.emergency.description')}
                        links={[
                            { name: t('pages.seniors.features.emergency.link1'), url: 'tel:14567' },
                            { name: t('pages.seniors.features.emergency.link2'), url: 'tel:100' },
                            { name: t('pages.seniors.features.emergency.link3'), url: 'tel:102' }
                        ]}
                    />
                </div>
            </AccordionSection>

            <div className="mt-12 text-center bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800">{t('pages.seniors.commitment.title')}</h2>
                <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                    {t('pages.seniors.commitment.description')}
                </p>
            </div>
        </main>
    </div>
  );
};

export default SeniorCitizensPage;
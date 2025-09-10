import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import BackButton from '../components/BackButton';
import { generateFitnessPlan } from '../services/geminiService';
import type { FitnessPlan } from '../types';

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

const VideoCard: React.FC<{ title: string; youtubeId: string }> = ({ title, youtubeId }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="aspect-w-16 aspect-h-9" style={{paddingBottom: '56.25%', position: 'relative', height: 0}}>
            <iframe
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded-md"
            ></iframe>
        </div>
        <h4 className="font-semibold text-gray-800 mt-3">{title}</h4>
    </div>
);

const FitnessPage: React.FC = () => {
    const { t } = useTranslation();
    const [openAccordion, setOpenAccordion] = useState<string>('aiPlan');
    const toggleAccordion = (key: string) => setOpenAccordion(openAccordion === key ? '' : key);

    const [planInputs, setPlanInputs] = useState({ age: '', fitnessLevel: 'Beginner', goals: '' });
    const [fitnessPlan, setFitnessPlan] = useState<FitnessPlan | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setPlanInputs(prev => ({ ...prev, [id]: value }));
    };

    const handleGeneratePlan = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setFitnessPlan(null);
        try {
            const result = await generateFitnessPlan(planInputs.age, planInputs.fitnessLevel, planInputs.goals);
            setFitnessPlan(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to generate plan.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-green-50">
            <section className="relative bg-cover bg-center text-white py-20 md:py-32" style={{backgroundImage: "url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2120&auto=format&fit=crop')"}}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">{t('pages.fitness.heroTitle')}</h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">{t('pages.fitness.heroSubtitle')}</p>
                </div>
            </section>

            <main className="container mx-auto px-4 md:px-6 py-12">
                <BackButton to="/" className="mb-8" />

                <AccordionItem title={t('pages.fitness.accordion.aiPlan.title')} isOpen={openAccordion === 'aiPlan'} onToggle={() => toggleAccordion('aiPlan')}>
                    <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-orange-400">
                        <h3 className="text-lg font-bold text-gray-800">{t('pages.fitness.aiPlan.title')}</h3>
                        <p className="text-gray-600 text-sm mt-2">{t('pages.fitness.aiPlan.description')}</p>
                        <form onSubmit={handleGeneratePlan} className="mt-4 space-y-4">
                            <input id="age" type="number" value={planInputs.age} onChange={handleInputChange} placeholder={t('pages.fitness.aiPlan.agePlaceholder')} className="w-full bg-white border-gray-300 rounded-md p-2 text-gray-900" required />
                            <select id="fitnessLevel" value={planInputs.fitnessLevel} onChange={handleInputChange} className="w-full bg-white border-gray-300 rounded-md p-2 text-gray-900">
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                            </select>
                            <input id="goals" type="text" value={planInputs.goals} onChange={handleInputChange} placeholder={t('pages.fitness.aiPlan.goalsPlaceholder')} className="w-full bg-white border-gray-300 rounded-md p-2 text-gray-900" required />
                            <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300" disabled={isLoading}>
                                {isLoading ? t('pages.fitness.aiPlan.loading') : t('pages.fitness.aiPlan.button')}
                            </button>
                        </form>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        {fitnessPlan && (
                            <div className="mt-6 space-y-4 animate-fade-in">
                                <h4 className="font-bold text-center text-xl">{t('pages.fitness.aiPlan.resultsTitle')}</h4>
                                <p className="text-center text-gray-600 italic">"{fitnessPlan.summary}"</p>
                                <div className="p-4 bg-green-50 rounded-lg">
                                    <h5 className="font-semibold text-green-800">{t('pages.fitness.aiPlan.morning')} - {fitnessPlan.dailyRoutine.morning.title}</h5>
                                    <ul className="list-disc list-inside text-sm text-gray-700 pl-2 mt-1">{fitnessPlan.dailyRoutine.morning.activities.map((act, i) => <li key={i}>{act}</li>)}</ul>
                                </div>
                                <div className="p-4 bg-yellow-50 rounded-lg">
                                    <h5 className="font-semibold text-yellow-800">{t('pages.fitness.aiPlan.afternoon')} - {fitnessPlan.dailyRoutine.afternoon.title}</h5>
                                    <ul className="list-disc list-inside text-sm text-gray-700 pl-2 mt-1">{fitnessPlan.dailyRoutine.afternoon.activities.map((act, i) => <li key={i}>{act}</li>)}</ul>
                                </div>
                                <div className="p-4 bg-indigo-50 rounded-lg">
                                    <h5 className="font-semibold text-indigo-800">{t('pages.fitness.aiPlan.evening')} - {fitnessPlan.dailyRoutine.evening.title}</h5>
                                     <ul className="list-disc list-inside text-sm text-gray-700 pl-2 mt-1">{fitnessPlan.dailyRoutine.evening.activities.map((act, i) => <li key={i}>{act}</li>)}</ul>
                                </div>
                                 <div className="p-4 bg-blue-50 rounded-lg">
                                    <h5 className="font-semibold text-blue-800">{t('pages.fitness.aiPlan.diet')}</h5>
                                     <ul className="list-disc list-inside text-sm text-gray-700 pl-2 mt-1">{fitnessPlan.dietTips.map((tip, i) => <li key={i}>{tip}</li>)}</ul>
                                </div>
                                <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-800 rounded-r-lg">
                                    <h5 className="font-bold">{t('pages.fitness.aiPlan.disclaimer')}</h5>
                                    <p className="text-sm mt-1">{fitnessPlan.disclaimer}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </AccordionItem>

                <AccordionItem title={t('pages.fitness.accordion.sports.title')} isOpen={openAccordion === 'sports'} onToggle={() => toggleAccordion('sports')}>
                    <p className="text-gray-600 mb-4">{t('pages.fitness.sports.description')}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <VideoCard title={t('pages.fitness.sports.cricket')} youtubeId="snRt3Cnw7nc" />
                        <VideoCard title={t('pages.fitness.sports.badminton')} youtubeId="1UIhKZCPMYM" />
                        <VideoCard title={t('pages.fitness.sports.running')} youtubeId="qZGf8CScUao" />
                    </div>
                </AccordionItem>
                
                <AccordionItem title={t('pages.fitness.accordion.yoga.title')} isOpen={openAccordion === 'yoga'} onToggle={() => toggleAccordion('yoga')}>
                    <p className="text-gray-600 mb-4">{t('pages.fitness.yoga.description')}</p>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <VideoCard title={t('pages.fitness.yoga.suryaNamaskar')} youtubeId="b1XNTuIBsIo" />
                        <VideoCard title={t('pages.fitness.yoga.pranayama')} youtubeId="io5VdgwD2gk" />
                        <VideoCard title={t('pages.fitness.yoga.meditation')} youtubeId="DaHH--jJBtg" />
                    </div>
                </AccordionItem>

                <AccordionItem title={t('pages.fitness.accordion.tracker.title')} isOpen={openAccordion === 'tracker'} onToggle={() => toggleAccordion('tracker')}>
                    <div className="text-center bg-white p-8 rounded-lg shadow-sm">
                        <p className="text-gray-600">{t('pages.fitness.tracker.description')}</p>
                        <div className="mt-4 text-2xl font-bold text-orange-500 bg-orange-100 inline-block px-6 py-2 rounded-full">
                            {t('pages.fitness.tracker.comingSoon')}
                        </div>
                    </div>
                </AccordionItem>

            </main>
        </div>
    );
};

export default FitnessPage;
import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import {
  matchJobsToProfile,
  calculateWagesAndEntitlements,
  getWorkerSchemeRecommendations,
  getLaborRightsInfo
} from '../services/geminiService';
import type { Job, WageInfo, SchemeRecommendation } from '../types';

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

const FeatureContainer: React.FC<{ title: string; description: string; children: React.ReactNode }> = ({ title, description, children }) => (
    <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-orange-400 h-full flex flex-col justify-between">
        <div>
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
            <p className="text-gray-600 text-sm mt-2">{description}</p>
            <div className="mt-4">{children}</div>
        </div>
    </div>
);

const WorkersPage: React.FC = () => {
    const { t } = useTranslation();
    const [openAccordion, setOpenAccordion] = useState<string>('jobs');

    const [jobProfile, setJobProfile] = useState({ skills: '', location: '', experience: '' });
    const [matchedJobs, setMatchedJobs] = useState<Job[]>([]);
    const [isJobMatching, setIsJobMatching] = useState(false);
    const [jobMatchError, setJobMatchError] = useState('');
    
    const [schemeInput, setSchemeInput] = useState('');
    const [schemeRecs, setSchemeRecs] = useState<SchemeRecommendation[]>([]);
    const [isFindingSchemes, setIsFindingSchemes] = useState(false);
    const [schemeError, setSchemeError] = useState('');
    
    const [wageInput, setWageInput] = useState({ skill: '', city: '' });
    const [wageInfo, setWageInfo] = useState<WageInfo | null>(null);
    const [isCalculatingWage, setIsCalculatingWage] = useState(false);
    const [wageError, setWageError] = useState('');

    const [legalQuery, setLegalQuery] = useState('');
    const [legalAnswer, setLegalAnswer] = useState('');
    const [isAskingLegal, setIsAskingLegal] = useState(false);
    const [legalError, setLegalError] = useState('');

    const toggleAccordion = (key: string) => {
        setOpenAccordion(openAccordion === key ? '' : key);
    };

    const handleJobMatch = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsJobMatching(true);
        setJobMatchError('');
        setMatchedJobs([]);
        try {
            const jobs = await matchJobsToProfile(jobProfile);
            setMatchedJobs(jobs);
        } catch(err) {
            setJobMatchError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsJobMatching(false);
        }
    };

    const handleSchemeFind = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsFindingSchemes(true);
        setSchemeError('');
        setSchemeRecs([]);
        try {
            const recs = await getWorkerSchemeRecommendations(schemeInput);
            setSchemeRecs(recs);
        } catch(err) {
            setSchemeError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsFindingSchemes(false);
        }
    };
    
    const handleWageCalculate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsCalculatingWage(true);
        setWageError('');
        setWageInfo(null);
        try {
            const info = await calculateWagesAndEntitlements(wageInput.skill, wageInput.city);
            setWageInfo(info);
        } catch(err) {
            setWageError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsCalculatingWage(false);
        }
    };

    const handleLegalAsk = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsAskingLegal(true);
        setLegalError('');
        setLegalAnswer('');
        try {
            const answer = await getLaborRightsInfo(legalQuery);
            setLegalAnswer(answer);
        } catch(err) {
            setLegalError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsAskingLegal(false);
        }
    };
    
    const renderJobResults = () => (
        <div className="mt-4 space-y-3">
            <h4 className="font-bold">{t('pages.workers.jobs.aiMatching.resultsTitle')}</h4>
            {matchedJobs.map((job, index) => (
                <div key={index} className="p-3 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                    <p className="font-bold text-gray-900">{job.title} at {job.company}</p>
                    <p className="text-sm text-gray-700">{job.location} | {job.type}</p>
                    <p className="text-sm font-semibold text-green-700">{job.wage}</p>
                    <div className="mt-2 flex gap-2">
                        <a href={`tel:${job.contact}`} className="text-xs bg-green-600 text-white font-semibold px-3 py-1 rounded-md hover:bg-green-700">{t('pages.workers.jobs.listings.callButton')}</a>
                        <a href={`https://wa.me/${job.contact.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-xs bg-blue-600 text-white font-semibold px-3 py-1 rounded-md hover:bg-blue-700">{t('pages.workers.jobs.listings.whatsappButton')}</a>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderSchemeResults = () => (
         <div className="mt-4 space-y-3">
            <h4 className="font-bold">{t('pages.workers.schemes.aiFinder.resultsTitle')}</h4>
            {schemeRecs.map((rec, index) => (
                <div key={index} className="p-3 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                    <p className="font-bold text-gray-900">{rec.schemeTitle}</p>
                    <p className="text-sm text-gray-700 mt-1">{rec.reason}</p>
                    <a href={rec.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline font-semibold mt-2 inline-block">Learn More &rarr;</a>
                </div>
            ))}
        </div>
    );
    
    const renderWageResults = () => (
        <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
             <h4 className="font-bold">{t('pages.workers.rights.aiCalculator.resultsTitle')}</h4>
             <p className="mt-2"><strong>Skill:</strong> {wageInfo?.skill}</p>
             <p><strong>City:</strong> {wageInfo?.city}</p>
             <p><strong>Minimum Wage:</strong> <span className="font-bold text-green-700">{wageInfo?.minimumWage}</span></p>
             <h5 className="font-semibold mt-2">Key Entitlements:</h5>
             <ul className="list-disc list-inside text-sm">
                {wageInfo?.entitlements.map((e, i) => <li key={i}>{e}</li>)}
             </ul>
        </div>
    );

    const renderLegalAnswer = () => (
        <div className="mt-4 p-4 bg-blue-50 border rounded-md">
            <h4 className="font-semibold text-gray-800 mb-2">{t('pages.workers.tools.aiChatbot.resultsTitle')}</h4>
            <p className="text-gray-700 text-sm whitespace-pre-wrap">{legalAnswer}</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-blue-50">
            <section className="relative bg-cover bg-center text-white py-20 md:py-32" style={{backgroundImage: "url('https://images.unsplash.com/photo-1598453434026-c9a214b2d244?q=80&w=2070&auto=format&fit=crop')"}}>
                <div className="absolute inset-0 bg-black opacity-60"></div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">{t('pages.workers.heroTitle')}</h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">{t('pages.workers.heroSubtitle')}</p>
                    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                        <a href="#main-content" onClick={() => setOpenAccordion('jobs')} className="bg-white text-gray-800 font-semibold px-8 py-3 rounded-md hover:bg-gray-200 transition duration-300 text-lg">{t('pages.workers.findJobButton')}</a>
                        <a href="#main-content" onClick={() => setOpenAccordion('schemes')} className="bg-orange-500 text-white font-semibold px-8 py-3 rounded-md hover:bg-orange-600 transition duration-300 text-lg">{t('pages.workers.exploreSchemesButton')}</a>
                    </div>
                </div>
            </section>

            <main id="main-content" className="container mx-auto px-4 md:px-6 py-12">
                <AccordionItem title={t('pages.workers.accordion.jobs.title')} isOpen={openAccordion === 'jobs'} onToggle={() => toggleAccordion('jobs')}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FeatureContainer title={t('pages.workers.jobs.aiMatching.title')} description={t('pages.workers.jobs.aiMatching.description')}>
                            <form onSubmit={handleJobMatch} className="space-y-3">
                                <input value={jobProfile.skills} onChange={e => setJobProfile({...jobProfile, skills: e.target.value})} placeholder={t('pages.workers.jobs.aiMatching.skillsPlaceholder')} className="w-full bg-white border-gray-300 rounded-md p-2 text-gray-900"/>
                                <input value={jobProfile.location} onChange={e => setJobProfile({...jobProfile, location: e.target.value})} placeholder={t('pages.workers.jobs.aiMatching.locationPlaceholder')} className="w-full bg-white border-gray-300 rounded-md p-2 text-gray-900"/>
                                <input value={jobProfile.experience} onChange={e => setJobProfile({...jobProfile, experience: e.target.value})} placeholder={t('pages.workers.jobs.aiMatching.experiencePlaceholder')} className="w-full bg-white border-gray-300 rounded-md p-2 text-gray-900"/>
                                <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300" disabled={isJobMatching}>
                                    {isJobMatching ? t('pages.workers.jobs.aiMatching.loading') : t('pages.workers.jobs.aiMatching.button')}
                                </button>
                            </form>
                             {jobMatchError && <p className="text-red-500 text-sm mt-2">{jobMatchError}</p>}
                             {matchedJobs.length > 0 && renderJobResults()}
                        </FeatureContainer>
                        <FeatureContainer title={t('pages.workers.jobs.marketplace.title')} description={t('pages.workers.jobs.marketplace.description')}>
                            <p className="italic text-gray-500">{t('pages.workers.jobs.marketplace.example')}</p>
                            <button className="mt-4 w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700">{t('pages.workers.jobs.marketplace.button')}</button>
                        </FeatureContainer>
                    </div>
                </AccordionItem>
                
                <AccordionItem title={t('pages.workers.accordion.schemes.title')} isOpen={openAccordion === 'schemes'} onToggle={() => toggleAccordion('schemes')}>
                     <FeatureContainer title={t('pages.workers.schemes.aiFinder.title')} description={t('pages.workers.schemes.aiFinder.description')}>
                        <form onSubmit={handleSchemeFind} className="space-y-3">
                            <textarea value={schemeInput} onChange={e => setSchemeInput(e.target.value)} rows={3} placeholder={t('pages.workers.schemes.aiFinder.placeholder')} className="w-full bg-white border-gray-300 rounded-md p-2 text-gray-900" />
                             <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300" disabled={isFindingSchemes}>
                                {isFindingSchemes ? t('pages.workers.schemes.aiFinder.loading') : t('pages.workers.schemes.aiFinder.button')}
                            </button>
                        </form>
                         {schemeError && <p className="text-red-500 text-sm mt-2">{schemeError}</p>}
                         {schemeRecs.length > 0 && renderSchemeResults()}
                     </FeatureContainer>
                </AccordionItem>
                 
                <AccordionItem title={t('pages.workers.accordion.rights.title')} isOpen={openAccordion === 'rights'} onToggle={() => toggleAccordion('rights')}>
                     <FeatureContainer title={t('pages.workers.rights.aiCalculator.title')} description={t('pages.workers.rights.aiCalculator.description')}>
                        <form onSubmit={handleWageCalculate} className="space-y-3">
                           <input value={wageInput.skill} onChange={e => setWageInput({...wageInput, skill: e.target.value})} placeholder={t('pages.workers.rights.aiCalculator.skillPlaceholder')} className="w-full bg-white border-gray-300 rounded-md p-2 text-gray-900"/>
                           <input value={wageInput.city} onChange={e => setWageInput({...wageInput, city: e.target.value})} placeholder={t('pages.workers.rights.aiCalculator.cityPlaceholder')} className="w-full bg-white border-gray-300 rounded-md p-2 text-gray-900"/>
                            <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300" disabled={isCalculatingWage}>
                                {isCalculatingWage ? t('pages.workers.rights.aiCalculator.loading') : t('pages.workers.rights.aiCalculator.button')}
                            </button>
                        </form>
                         {wageError && <p className="text-red-500 text-sm mt-2">{wageError}</p>}
                         {wageInfo && renderWageResults()}
                     </FeatureContainer>
                </AccordionItem>

                <AccordionItem title={t('pages.workers.accordion.tools.title')} isOpen={openAccordion === 'tools'} onToggle={() => toggleAccordion('tools')}>
                    <FeatureContainer title={t('pages.workers.tools.aiChatbot.title')} description={t('pages.workers.tools.aiChatbot.description')}>
                        <form onSubmit={handleLegalAsk} className="space-y-3">
                           <textarea value={legalQuery} onChange={e => setLegalQuery(e.target.value)} rows={3} placeholder={t('pages.workers.tools.aiChatbot.placeholder')} className="w-full bg-white border-gray-300 rounded-md p-2 text-gray-900"/>
                           <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300" disabled={isAskingLegal}>
                                {isAskingLegal ? t('pages.workers.tools.aiChatbot.loading') : t('pages.workers.tools.aiChatbot.button')}
                            </button>
                        </form>
                         {legalError && <p className="text-red-500 text-sm mt-2">{legalError}</p>}
                         {legalAnswer && renderLegalAnswer()}
                    </FeatureContainer>
                </AccordionItem>

                <AccordionItem title={t('pages.workers.accordion.upskilling.title')} isOpen={openAccordion === 'upskilling'} onToggle={() => toggleAccordion('upskilling')}>
                    <p>Coming Soon: Free courses and links to government skilling programs.</p>
                </AccordionItem>
                <AccordionItem title={t('pages.workers.accordion.health.title')} isOpen={openAccordion === 'health'} onToggle={() => toggleAccordion('health')}>
                    <p>Coming Soon: Safety guides, health benefit information, and an emergency SOS button.</p>
                </AccordionItem>
                <AccordionItem title={t('pages.workers.accordion.community.title')} isOpen={openAccordion === 'community'} onToggle={() => toggleAccordion('community')}>
                    <p>Coming Soon: Q&amp;A forums, chatbot support, and a directory of helpful NGOs.</p>
                </AccordionItem>
            </main>
        </div>
    );
};

export default WorkersPage;

import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { 
    suggestWomenSchemes,
    getWomenSafetyInfo,
    calculateWagesAndEntitlements,
    getWomenHealthInfo,
    findFamilyBenefits
} from '../services/geminiService';
import type { SchemeRecommendation, WageInfo } from '../types';
import BackButton from '../components/BackButton';
import { ICONS } from '../constants';

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

const ResourceLink: React.FC<{ titleKey: string; href: string; type?: 'scheme' | 'helpline' | 'app' | 'legal' | 'job' | 'finance' | 'health' | 'education' | 'ngo' }> = ({ titleKey, href }) => {
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

const SOSModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { t } = useTranslation();
    const [location, setLocation] = useState<string | null>(null);
    const [locationError, setLocationError] = useState('');
    const [copied, setCopied] = useState(false);

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation(`Lat: ${latitude.toFixed(5)}, Long: ${longitude.toFixed(5)}`);
                    setLocationError('');
                },
                (error) => {
                    setLocationError(t('pages.women.safety.sos.locationNotAvailable'));
                }
            );
        } else {
            setLocationError('Geolocation is not supported by this browser.');
        }
    };

    const handleCopy = () => {
        const textToCopy = `Emergency! My location is: ${location}. Please send help.`;
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    React.useEffect(() => {
        handleGetLocation();
    }, []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md text-center" onClick={e => e.stopPropagation()}>
                <ICONS.SOS className="w-16 h-16 mx-auto text-red-500" />
                <h3 className="text-2xl font-bold text-gray-800 mt-4">{t('pages.women.safety.sos.modalTitle')}</h3>
                <p className="text-gray-600 mt-2 text-sm">{t('pages.women.safety.sos.modalDescription')}</p>
                
                <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-semibold">{t('pages.women.safety.sos.yourLocation')}</h4>
                    {location && <p className="text-lg font-mono my-2 text-gray-800">{location}</p>}
                    {locationError && <p className="text-sm text-red-600 my-2">{locationError}</p>}
                    {location && (
                        <button onClick={handleCopy} className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md text-sm hover:bg-blue-600">
                            {copied ? t('pages.women.safety.sos.detailsCopied') : t('pages.women.safety.sos.copyDetails')}
                        </button>
                    )}
                </div>

                <div className="mt-6 space-y-3">
                    <ResourceLink titleKey="pages.women.safety.helplines.emergency" href="tel:112" />
                    <ResourceLink titleKey="pages.women.safety.helplines.women" href="tel:181" />
                    <ResourceLink titleKey="pages.women.safety.helplines.police" href="tel:1091" />
                </div>
                 <div className="mt-6 text-left text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg">
                    <h4 className="font-bold text-yellow-800">{t('pages.women.safety.sos.safetyTipsTitle')}</h4>
                    <ul className="list-disc list-inside pl-2 mt-1">
                        <li>{t('pages.women.safety.sos.safetyTip1')}</li>
                        <li>{t('pages.women.safety.sos.safetyTip2')}</li>
                        <li>{t('pages.women.safety.sos.safetyTip3')}</li>
                    </ul>
                </div>
                <button onClick={onClose} className="mt-6 w-full bg-gray-200 text-gray-800 font-semibold py-2 rounded-md">Close</button>
            </div>
        </div>
    );
};


const WomenEmpowermentPage: React.FC = () => {
    const { t } = useTranslation();
    const [openAccordion, setOpenAccordion] = useState<string>('safety');
    const toggleAccordion = (key: string) => setOpenAccordion(openAccordion === key ? '' : key);

    // State for AI Features
    const [schemeState, setSchemeState] = useState({ state: '', recs: [] as SchemeRecommendation[], isLoading: false, error: '' });
    const [safetyState, setSafetyState] = useState({ query: '', answer: '', isLoading: false, error: '' });
    const [wageState, setWageState] = useState({ skill: '', city: '', info: null as WageInfo | null, isLoading: false, error: '' });
    const [healthState, setHealthState] = useState({ query: '', answer: '', isLoading: false, error: '' });
    const [familyState, setFamilyState] = useState({ info: '', recs: [] as SchemeRecommendation[], isLoading: false, error: '' });
    const [isSosModalOpen, setIsSosModalOpen] = useState(false);

    // Handlers for AI Features
    const handleSchemeCheck = async (e: React.FormEvent) => {
        e.preventDefault();
        setSchemeState(s => ({ ...s, isLoading: true, error: '', recs: [] }));
        try {
            const recs = await suggestWomenSchemes({ state: schemeState.state });
            setSchemeState(s => ({ ...s, recs, isLoading: false }));
        } catch (err) {
            setSchemeState(s => ({ ...s, error: err instanceof Error ? err.message : 'An error occurred', isLoading: false }));
        }
    };
    
    const handleSafetyAsk = async (e: React.FormEvent) => {
        e.preventDefault();
        setSafetyState(s => ({ ...s, isLoading: true, error: '', answer: '' }));
        try {
            const answer = await getWomenSafetyInfo(safetyState.query);
            setSafetyState(s => ({ ...s, answer, isLoading: false }));
        } catch (err) {
            setSafetyState(s => ({ ...s, error: err instanceof Error ? err.message : 'An error occurred', isLoading: false }));
        }
    };

    const handleWageCalculate = async (e: React.FormEvent) => {
        e.preventDefault();
        setWageState(s => ({ ...s, isLoading: true, error: '', info: null }));
        try {
            const info = await calculateWagesAndEntitlements(wageState.skill, wageState.city);
            setWageState(s => ({ ...s, info, isLoading: false }));
        } catch(err) {
            setWageState(s => ({ ...s, error: err instanceof Error ? err.message : 'An error occurred', isLoading: false }));
        }
    };
    
    const handleHealthAsk = async (e: React.FormEvent) => {
        e.preventDefault();
        setHealthState(s => ({ ...s, isLoading: true, error: '', answer: '' }));
        try {
            const answer = await getWomenHealthInfo(healthState.query);
            setHealthState(s => ({ ...s, answer, isLoading: false }));
        } catch (err) {
            setHealthState(s => ({ ...s, error: err instanceof Error ? err.message : 'An error occurred', isLoading: false }));
        }
    };

    const handleFamilyCheck = async (e: React.FormEvent) => {
        e.preventDefault();
        setFamilyState(s => ({ ...s, isLoading: true, error: '', recs: [] }));
        try {
            const recs = await findFamilyBenefits(familyState.info);
            setFamilyState(s => ({ ...s, recs, isLoading: false }));
        } catch (err) {
            setFamilyState(s => ({ ...s, error: err instanceof Error ? err.message : 'An error occurred', isLoading: false }));
        }
    };

    return (
        <div className="min-h-screen bg-pink-50">
            {isSosModalOpen && <SOSModal onClose={() => setIsSosModalOpen(false)} />}
            {/* Hero Section */}
            <section className="relative bg-cover bg-center text-white py-20 md:py-32" style={{backgroundImage: "url('https://images.unsplash.com/photo-1573496130407-57329f01f769?q=80&w=2069&auto=format&fit=crop')"}}>
                <div className="absolute inset-0 bg-black opacity-60"></div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">{t('pages.women.heroTitle')}</h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">{t('pages.women.heroSubtitle')}</p>
                </div>
            </section>

            {/* Main Content */}
            <main id="main-content" className="container mx-auto px-4 md:px-6 py-12">
                <BackButton to="/" className="mb-8" />
                <AccordionItem title={t('pages.women.accordion.schemes.title')} isOpen={openAccordion === 'schemes'} onToggle={() => toggleAccordion('schemes')}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* AI Feature */}
                        <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-orange-400">
                            <h3 className="text-lg font-bold text-gray-800">{t('pages.women.schemes.ai.title')}</h3>
                            <p className="text-gray-600 text-sm mt-2">{t('pages.women.schemes.ai.description')}</p>
                            <form onSubmit={handleSchemeCheck} className="mt-4 space-y-3">
                                <input value={schemeState.state} onChange={e => setSchemeState(s => ({ ...s, state: e.target.value }))} placeholder={t('pages.women.schemes.ai.placeholder')} className="w-full bg-white border-gray-300 rounded-md p-2 text-gray-900"/>
                                <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300" disabled={schemeState.isLoading}>
                                    {schemeState.isLoading ? t('pages.women.schemes.ai.loading') : t('pages.women.schemes.ai.button')}
                                </button>
                            </form>
                            {schemeState.error && <p className="text-red-500 text-sm mt-2">{schemeState.error}</p>}
                            {schemeState.recs.length > 0 && (
                                <div className="mt-4 space-y-3">
                                    <h4 className="font-bold">{t('pages.women.schemes.ai.resultsTitle')}</h4>
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
                        {/* Static Links */}
                        <div className="space-y-3">
                            <ResourceLink titleKey="pages.women.schemes.standup" href="https://www.standupmitra.in/" />
                            <ResourceLink titleKey="pages.women.schemes.mudra" href="https://www.mudra.org.in/" />
                            <ResourceLink titleKey="pages.women.schemes.ehaat" href="http://mahilaehaat-rmk.gov.in/" />
                            <ResourceLink titleKey="pages.women.schemes.bbbp" href="https://wcd.nic.in/bbbp-schemes" />
                            <ResourceLink titleKey="pages.women.schemes.step" href="https://wcd.nic.in/schemes/support-training-and-employment-programme-women-step" />
                            <ResourceLink titleKey="pages.women.schemes.pmmvy" href="https://wcd.nic.in/schemes/pradhan-mantri-matru-vandana-yojana" />
                            <ResourceLink titleKey="pages.women.schemes.ayushman" href="https://www.pmjay.gov.in/" />
                            <ResourceLink titleKey="pages.women.schemes.sukanya" href="https://www.indiapost.gov.in/Financial/Pages/Content/sukanya-samriddhi-yojana.aspx" />
                            <ResourceLink titleKey="pages.women.schemes.sakhi" href="https://wcd.nic.in/schemes/one-stop-centre-scheme-1" />
                        </div>
                    </div>
                </AccordionItem>
                
                <AccordionItem title={t('pages.women.accordion.safety.title')} isOpen={openAccordion === 'safety'} onToggle={() => toggleAccordion('safety')}>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* SOS Button */}
                        <div className="bg-red-50 p-5 rounded-lg shadow-sm border-l-4 border-red-400 text-center flex flex-col justify-center">
                            <h3 className="text-lg font-bold text-gray-800">{t('pages.women.safety.sos.title')}</h3>
                            <p className="text-gray-600 text-sm mt-2">{t('pages.women.safety.sos.description')}</p>
                            <button onClick={() => setIsSosModalOpen(true)} className="mt-4 bg-red-600 text-white font-bold py-3 px-6 rounded-md hover:bg-red-700 transition-transform transform hover:scale-105">
                                {t('pages.women.safety.sos.button')}
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-lg">{t('pages.women.safety.helplines.title')}</h3>
                                <div className="mt-2 space-y-2">
                                    <ResourceLink titleKey="pages.women.safety.helplines.women" href="tel:181" />
                                    <ResourceLink titleKey="pages.women.safety.helplines.police" href="tel:1091" />
                                    <ResourceLink titleKey="pages.women.safety.helplines.emergency" href="tel:112" />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">{t('pages.women.safety.apps.title')}</h3>
                                <div className="mt-2 space-y-2">
                                    <ResourceLink titleKey="pages.women.safety.apps.app112" href="https://play.google.com/store/apps/details?id=in.gov.dmer.disha.care" />
                                    <ResourceLink titleKey="pages.women.safety.apps.shebox" href="https://shebox.nic.in/" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* AI Feature */}
                     <div className="mt-8 bg-white p-5 rounded-lg shadow-sm border-l-4 border-orange-400">
                        <h3 className="text-lg font-bold text-gray-800">{t('pages.women.safety.ai.title')}</h3>
                        <form onSubmit={handleSafetyAsk} className="mt-4 space-y-3">
                            <textarea value={safetyState.query} onChange={e => setSafetyState(s => ({ ...s, query: e.target.value }))} rows={3} placeholder={t('pages.women.safety.ai.placeholder')} className="w-full bg-white border-gray-300 rounded-md p-2 text-gray-900" />
                            <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300" disabled={safetyState.isLoading}>
                                {safetyState.isLoading ? t('pages.women.safety.ai.loading') : t('pages.women.safety.ai.button')}
                            </button>
                        </form>
                        {safetyState.error && <p className="text-red-500 text-sm mt-2">{safetyState.error}</p>}
                        {safetyState.answer && (
                            <div className="mt-4 p-3 bg-blue-50 border rounded-md">
                                <h4 className="font-semibold text-gray-800 mb-2">{t('pages.women.safety.ai.resultsTitle')}</h4>
                                <p className="text-gray-700 text-sm whitespace-pre-wrap">{safetyState.answer}</p>
                            </div>
                        )}
                    </div>
                </AccordionItem>

                 <AccordionItem title={t('pages.women.accordion.jobs.title')} isOpen={openAccordion === 'jobs'} onToggle={() => toggleAccordion('jobs')}>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-orange-400">
                           <h3 className="text-lg font-bold text-gray-800">{t('pages.women.jobs.ai.title')}</h3>
                            <form onSubmit={handleWageCalculate} className="mt-4 space-y-3">
                               <input value={wageState.skill} onChange={e => setWageState(s => ({...s, skill: e.target.value}))} placeholder={t('pages.women.jobs.ai.skillPlaceholder')} className="w-full bg-white border-gray-300 rounded-md p-2 text-gray-900"/>
                               <input value={wageState.city} onChange={e => setWageState(s => ({...s, city: e.target.value}))} placeholder={t('pages.women.jobs.ai.cityPlaceholder')} className="w-full bg-white border-gray-300 rounded-md p-2 text-gray-900"/>
                                <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300" disabled={wageState.isLoading}>
                                    {wageState.isLoading ? t('pages.women.jobs.ai.loading') : t('pages.women.jobs.ai.button')}
                                </button>
                            </form>
                            {wageState.error && <p className="text-red-500 text-sm mt-2">{wageState.error}</p>}
                            {wageState.info && (
                                <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                                     <h4 className="font-bold">{t('pages.women.jobs.ai.resultsTitle')}</h4>
                                     <p className="mt-2"><strong>Skill:</strong> {wageState.info.skill}</p>
                                     <p><strong>City:</strong> {wageState.info.city}</p>
                                     <p><strong>Minimum Wage:</strong> <span className="font-bold text-green-700">{wageState.info.minimumWage}</span></p>
                                     <h5 className="font-semibold mt-2">Key Entitlements:</h5>
                                     <ul className="list-disc list-inside text-sm">
                                        {wageState.info.entitlements.map((e, i) => <li key={i}>{e}</li>)}
                                     </ul>
                                </div>
                            )}
                        </div>
                        <div className="space-y-3">
                            <h3 className="font-semibold text-lg">{t('pages.women.jobs.platforms.title')}</h3>
                             <ResourceLink titleKey="pages.women.jobs.platforms.jobsforher" href="https://www.jobsforher.com/" />
                             <ResourceLink titleKey="pages.women.jobs.platforms.sheroes" href="https://sheroes.com/" />
                        </div>
                    </div>
                </AccordionItem>
                 <AccordionItem title={t('pages.women.accordion.health.title')} isOpen={openAccordion === 'health'} onToggle={() => toggleAccordion('health')}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-orange-400">
                           <h3 className="text-lg font-bold text-gray-800">{t('pages.women.health.ai.title')}</h3>
                            <form onSubmit={handleHealthAsk} className="mt-4 space-y-3">
                                <textarea value={healthState.query} onChange={e => setHealthState(s => ({ ...s, query: e.target.value }))} rows={3} placeholder={t('pages.women.health.ai.placeholder')} className="w-full bg-white border-gray-300 rounded-md p-2 text-gray-900" />
                                <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300" disabled={healthState.isLoading}>
                                    {healthState.isLoading ? t('pages.women.health.ai.loading') : t('pages.women.health.ai.button')}
                                </button>
                            </form>
                             {healthState.error && <p className="text-red-500 text-sm mt-2">{healthState.error}</p>}
                             {healthState.answer && (
                                <div className="mt-4 p-3 bg-blue-50 border rounded-md">
                                    <h4 className="font-semibold text-gray-800 mb-2">{t('pages.women.health.ai.resultsTitle')}</h4>
                                    <p className="text-gray-700 text-sm whitespace-pre-wrap">{healthState.answer}</p>
                                </div>
                             )}
                        </div>
                        <div className="space-y-3">
                            <h3 className="font-semibold text-lg">{t('pages.women.health.resources.title')}</h3>
                            <ResourceLink titleKey="pages.women.health.resources.nhm" href="https://nhm.gov.in/"/>
                            <ResourceLink titleKey="pages.women.health.resources.goonj" href="https://goonj.org/njpc/"/>
                        </div>
                    </div>
                </AccordionItem>

                 <AccordionItem title={t('pages.women.accordion.family.title')} isOpen={openAccordion === 'family'} onToggle={() => toggleAccordion('family')}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-orange-400">
                           <h3 className="text-lg font-bold text-gray-800">{t('pages.women.family.ai.title')}</h3>
                           <form onSubmit={handleFamilyCheck} className="mt-4 space-y-3">
                                <textarea value={familyState.info} onChange={e => setFamilyState(s => ({ ...s, info: e.target.value }))} rows={3} placeholder={t('pages.women.family.ai.placeholder')} className="w-full bg-white border-gray-300 rounded-md p-2 text-gray-900" />
                                <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300" disabled={familyState.isLoading}>
                                    {familyState.isLoading ? t('pages.women.family.ai.loading') : t('pages.women.family.ai.button')}
                                </button>
                           </form>
                           {familyState.error && <p className="text-red-500 text-sm mt-2">{familyState.error}</p>}
                            {familyState.recs.length > 0 && (
                                <div className="mt-4 space-y-3">
                                    <h4 className="font-bold">{t('pages.women.family.ai.resultsTitle')}</h4>
                                    {familyState.recs.map((rec, i) => (
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
                            <ResourceLink titleKey="pages.women.schemes.pmmvy" href="https://wcd.nic.in/schemes/pradhan-mantri-matru-vandana-yojana" />
                            <ResourceLink titleKey="pages.women.schemes.sukanya" href="https://www.indiapost.gov.in/Financial/Pages/Content/sukanya-samriddhi-yojana.aspx" />
                            <ResourceLink titleKey="pages.women.family.widowpension" href="https://nsap.nic.in/nsap/Programme-guidelines.html" />
                            <ResourceLink titleKey="pages.women.family.nmms" href="https://scholarships.gov.in/" />
                        </div>
                     </div>
                </AccordionItem>
            </main>
        </div>
    );
};

export default WomenEmpowermentPage;

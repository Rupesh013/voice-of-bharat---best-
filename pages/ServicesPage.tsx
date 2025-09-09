import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import BackButton from '../components/BackButton';
import { findBillerPortal, draftGrievanceLetter, findLocalServices } from '../services/geminiService';
import type { PortalInfo, ServiceProvider } from '../types';

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

const BillPayments: React.FC = () => {
    const [biller, setBiller] = useState('');
    const [state, setState] = useState('');
    const [portal, setPortal] = useState<PortalInfo | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setPortal(null);
        try {
            const result = await findBillerPortal(biller, state);
            setPortal(result);
        } catch(err) {
            setError(err instanceof Error ? err.message : 'Failed to find portal.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <p className="text-gray-600 text-sm">Pay your electricity, water, gas, and other utility bills online. Use our AI assistant to find the official payment portal for your provider.</p>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-lg shadow-sm">
                 <input type="text" value={biller} onChange={e => setBiller(e.target.value)} placeholder="Biller Name (e.g., TNEB, BWSSB)" className="w-full bg-white border-gray-300 rounded-md shadow-sm p-3 text-gray-900" required />
                 <input type="text" value={state} onChange={e => setState(e.target.value)} placeholder="Your State (e.g., Tamil Nadu, Karnataka)" className="w-full bg-white border-gray-300 rounded-md shadow-sm p-3 text-gray-900" required />
                 <button type="submit" disabled={isLoading} className="w-full bg-orange-500 text-white font-semibold py-3 px-4 rounded-md hover:bg-orange-600 disabled:bg-orange-300">
                    {isLoading ? 'Searching...' : '✨ Find Payment Portal'}
                </button>
            </form>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            {portal && (
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500 mt-4">
                    <h4 className="font-bold text-green-800">Portal Found: {portal.portalName}</h4>
                    <p className="text-sm text-gray-700 mt-2">{portal.notes}</p>
                    <a href={portal.url} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 bg-green-600 text-white font-semibold px-4 py-2 rounded-md text-sm hover:bg-green-700">
                        Go to Portal &rarr;
                    </a>
                </div>
            )}
        </div>
    );
};

const GrievanceRedressal: React.FC = () => {
    const [details, setDetails] = useState('');
    const [draft, setDraft] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setDraft('');
        try {
            const result = await draftGrievanceLetter(details);
            setDraft(result);
        } catch(err) {
            setError(err instanceof Error ? err.message : 'Failed to draft grievance.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
         <div className="space-y-6">
            <p className="text-gray-600 text-sm">Facing an issue with a government service? Describe your problem, and our AI will help you draft a formal grievance letter.</p>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-lg shadow-sm">
                 <textarea value={details} onChange={e => setDetails(e.target.value)} rows={5} placeholder="Describe your issue in detail. Include department, location, and what happened." className="w-full bg-white border-gray-300 rounded-md shadow-sm p-3 text-gray-900" required />
                 <button type="submit" disabled={isLoading} className="w-full bg-orange-500 text-white font-semibold py-3 px-4 rounded-md hover:bg-orange-600 disabled:bg-orange-300">
                    {isLoading ? 'Drafting...' : '✨ Draft Grievance with AI'}
                </button>
            </form>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            {draft && (
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 mt-4">
                    <h4 className="font-bold text-blue-800">AI-Generated Grievance Draft</h4>
                    <textarea readOnly value={draft} rows={10} className="w-full bg-white border-gray-300 rounded-md p-2 mt-2 text-sm text-gray-800" />
                    <button onClick={() => navigator.clipboard.writeText(draft)} className="mt-2 bg-blue-600 text-white font-semibold px-4 py-2 rounded-md text-sm hover:bg-blue-700">
                        Copy Text
                    </button>
                </div>
            )}
        </div>
    );
};

const SevaConnect: React.FC = () => {
    const [service, setService] = useState('');
    const [location, setLocation] = useState('');
    const [providers, setProviders] = useState<ServiceProvider[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
     const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setProviders(null);
        try {
            const result = await findLocalServices(service, location);
            setProviders(result);
        } catch(err) {
            setError(err instanceof Error ? err.message : 'Failed to find providers.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <p className="text-gray-600 text-sm">Need a reliable local service provider? Use our AI-powered search to find electricians, plumbers, mechanics, and more in your area.</p>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-lg shadow-sm">
                 <input type="text" value={service} onChange={e => setService(e.target.value)} placeholder="Service needed (e.g., Electrician, Plumber)" className="w-full bg-white border-gray-300 rounded-md shadow-sm p-3 text-gray-900" required />
                 <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Your City or Area (e.g., Koramangala, Bangalore)" className="w-full bg-white border-gray-300 rounded-md shadow-sm p-3 text-gray-900" required />
                 <button type="submit" disabled={isLoading} className="w-full bg-orange-500 text-white font-semibold py-3 px-4 rounded-md hover:bg-orange-600 disabled:bg-orange-300">
                    {isLoading ? 'Searching...' : '✨ Find Providers'}
                </button>
            </form>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            {providers && (
                <div className="space-y-4 mt-4">
                    {providers.map((p, i) => (
                        <div key={i} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-500">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-bold text-gray-800">{p.name}</h4>
                                    <p className="text-sm text-purple-700 font-semibold">{p.service}</p>
                                    <p className="text-xs text-gray-500 mt-1">{p.address}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-lg">⭐ {p.rating.toFixed(1)}</p>
                                    <a href={`tel:${p.phone}`} className="text-sm text-blue-600 hover:underline">{p.phone}</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


const ServicesPage: React.FC = () => {
    const { t } = useTranslation();
    const [openAccordion, setOpenAccordion] = useState<string>('bills');
    const toggleAccordion = (key: string) => setOpenAccordion(openAccordion === key ? '' : key);

    return (
        <div className="min-h-screen bg-gray-100">
            <section className="bg-orange-500 text-white py-20 text-center">
                <h1 className="text-4xl md:text-5xl font-bold">Civic Services Hub</h1>
                <p className="mt-4 text-lg max-w-2xl mx-auto">
                    Your one-stop destination for essential citizen services, simplified with AI.
                </p>
            </section>
            
            <main className="container mx-auto px-4 md:px-6 py-12">
                <BackButton to="/" className="mb-8" />
                <AccordionItem title="Utility Bill Payments" isOpen={openAccordion === 'bills'} onToggle={() => toggleAccordion('bills')}>
                   <BillPayments />
                </AccordionItem>
                 <AccordionItem title="Grievance Redressal" isOpen={openAccordion === 'grievance'} onToggle={() => toggleAccordion('grievance')}>
                   <GrievanceRedressal />
                </AccordionItem>
                 <AccordionItem title="Seva Connect: Find Local Services" isOpen={openAccordion === 'seva'} onToggle={() => toggleAccordion('seva')}>
                   <SevaConnect />
                </AccordionItem>
            </main>
        </div>
    );
};

export default ServicesPage;

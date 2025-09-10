import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import BackButton from '../components/BackButton';
import { ICONS } from '../constants';
import { analyzeCivicIssue, findBillerPortal, draftGrievanceLetter, findLocalServices } from '../services/geminiService';
import type { CivicIssueAnalysis, CivicIssueReport, PortalInfo, ServiceProvider } from '../types';

const severityConfig: { [key in 'Low' | 'Medium' | 'High'] : { color: string, label: string } } = {
  Low: { color: 'bg-blue-100 text-blue-800', label: 'Low' },
  Medium: { color: 'bg-yellow-100 text-yellow-800', label: 'Medium' },
  High: { color: 'bg-red-100 text-red-800', label: 'High' },
};

const statusConfig: { [key in CivicIssueReport['status']] : { color: string, label: string } } = {
  Submitted: { color: 'bg-gray-200 text-gray-800', label: 'Submitted' },
  'In Review': { color: 'bg-blue-200 text-blue-800', label: 'In Review' },
  Resolved: { color: 'bg-green-200 text-green-800', label: 'Resolved' },
};

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

const ReportIssue: React.FC<{ onReportSubmitted: (report: CivicIssueReport) => void }> = ({ onReportSubmitted }) => {
    const { t } = useTranslation();
    const [image, setImage] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [description, setDescription] = useState('');
    const [analysis, setAnalysis] = useState<CivicIssueAnalysis | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFile(file);
            const reader = new FileReader();
            reader.onloadend = () => { setImage(reader.result as string); setAnalysis(null); setError(''); };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !image || !description) return;
        setIsLoading(true);
        setError('');
        setAnalysis(null);
        try {
            const base64String = image.split(',')[1];
            const result = await analyzeCivicIssue(base64String, file.type, description);
            setAnalysis(result);
            onReportSubmitted({
                id: Date.now(),
                userDescription: description,
                image,
                dateReported: new Date().toLocaleDateString('en-IN'),
                status: 'Submitted',
                ...result
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('pages.localGovernance.reportIssue.title')}</h2>
                <p className="text-gray-600 text-sm mb-6">{t('pages.localGovernance.reportIssue.description')}</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* ... form content from original component ... */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('pages.localGovernance.reportIssue.uploadLabel')}</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                {image ? <img src={image} alt="Issue preview" className="mx-auto h-32 w-auto rounded-md" /> : <ICONS.Upload className="mx-auto h-12 w-12 text-gray-400" />}
                                <div className="flex text-sm text-gray-600 justify-center">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500">
                                        <span>{t('pages.localGovernance.reportIssue.uploadButton')}</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                                    </label>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">{t('pages.localGovernance.reportIssue.descriptionLabel')}</label>
                        <textarea id="description" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm p-3 text-gray-900 focus:ring-orange-500 focus:border-orange-500" placeholder={t('pages.localGovernance.reportIssue.descriptionPlaceholder')} required />
                    </div>
                    <div>
                        <button type="submit" disabled={isLoading || !image} className="w-full bg-orange-500 text-white font-semibold py-3 px-4 rounded-md hover:bg-orange-600 disabled:bg-orange-300 transition-colors">
                            {isLoading ? t('pages.localGovernance.reportIssue.loading') : t('pages.localGovernance.reportIssue.submitButton')}
                        </button>
                    </div>
                </form>
            </div>
            {analysis && !isLoading && (
                <div className="bg-white p-6 rounded-xl shadow-lg animate-fade-in">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('pages.localGovernance.aiAnalysis.title')}</h2>
                    {/* ... analysis display content from original component ... */}
                    <div className="space-y-4">
                        <p><strong>{t('pages.localGovernance.aiAnalysis.category')}:</strong> <span className="font-semibold text-orange-700">{analysis.issueCategory}</span></p>
                        <p><strong>{t('pages.localGovernance.aiAnalysis.severity')}:</strong> <span className={`text-xs font-bold px-3 py-1 rounded-full ${severityConfig[analysis.severity].color}`}>{analysis.severity}</span></p>
                        <div>
                            <h4 className="font-semibold text-gray-700 mb-2">{t('pages.localGovernance.aiAnalysis.complaint')}:</h4>
                            <textarea readOnly value={analysis.draftedComplaint} rows={8} className="w-full bg-gray-100 border-gray-300 rounded-md p-2 text-sm text-gray-800 font-mono" />
                        </div>
                        <div className="flex gap-4">
                            <button onClick={() => navigator.clipboard.writeText(analysis.draftedComplaint)} className="flex-1 bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 text-sm">{t('pages.localGovernance.aiAnalysis.copyButton')}</button>
                            <button disabled className="flex-1 bg-gray-400 text-white font-semibold px-4 py-2 rounded-md cursor-not-allowed text-sm">{t('pages.localGovernance.aiAnalysis.submitToAuthority')}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const BillPayments: React.FC = () => {
    const { t } = useTranslation();
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
            <p className="text-gray-600 text-sm">{t('pages.localGovernance.bills.description')}</p>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-lg shadow-sm">
                 <input type="text" value={biller} onChange={e => setBiller(e.target.value)} placeholder={t('pages.localGovernance.bills.billerPlaceholder')} className="w-full bg-white border-gray-300 rounded-md shadow-sm p-3 text-gray-900" required />
                 <input type="text" value={state} onChange={e => setState(e.target.value)} placeholder={t('pages.localGovernance.bills.statePlaceholder')} className="w-full bg-white border-gray-300 rounded-md shadow-sm p-3 text-gray-900" required />
                 <button type="submit" disabled={isLoading} className="w-full bg-orange-500 text-white font-semibold py-3 px-4 rounded-md hover:bg-orange-600 disabled:bg-orange-300">
                    {isLoading ? t('pages.localGovernance.bills.loading') : t('pages.localGovernance.bills.button')}
                </button>
            </form>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            {portal && (
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500 mt-4">
                    <h4 className="font-bold text-green-800">{t('pages.localGovernance.bills.portalFound')} {portal.portalName}</h4>
                    <p className="text-sm text-gray-700 mt-2">{portal.notes}</p>
                    <a href={portal.url} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 bg-green-600 text-white font-semibold px-4 py-2 rounded-md text-sm hover:bg-green-700">
                        {t('pages.localGovernance.bills.goToPortal')}
                    </a>
                </div>
            )}
        </div>
    );
};

const GrievanceRedressal: React.FC = () => {
    const { t } = useTranslation();
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
            <p className="text-gray-600 text-sm">{t('pages.localGovernance.grievance.description')}</p>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-lg shadow-sm">
                 <textarea value={details} onChange={e => setDetails(e.target.value)} rows={5} placeholder={t('pages.localGovernance.grievance.placeholder')} className="w-full bg-white border-gray-300 rounded-md shadow-sm p-3 text-gray-900" required />
                 <button type="submit" disabled={isLoading} className="w-full bg-orange-500 text-white font-semibold py-3 px-4 rounded-md hover:bg-orange-600 disabled:bg-orange-300">
                    {isLoading ? t('pages.localGovernance.grievance.loading') : t('pages.localGovernance.grievance.button')}
                </button>
            </form>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            {draft && (
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 mt-4">
                    <h4 className="font-bold text-blue-800">{t('pages.localGovernance.grievance.draftTitle')}</h4>
                    <textarea readOnly value={draft} rows={10} className="w-full bg-white border-gray-300 rounded-md p-2 mt-2 text-sm text-gray-800" />
                    <button onClick={() => navigator.clipboard.writeText(draft)} className="mt-2 bg-blue-600 text-white font-semibold px-4 py-2 rounded-md text-sm hover:bg-blue-700">
                        {t('pages.localGovernance.grievance.copyButton')}
                    </button>
                </div>
            )}
        </div>
    );
};

const SevaConnect: React.FC = () => {
    const { t } = useTranslation();
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
            <p className="text-gray-600 text-sm">{t('pages.localGovernance.seva.description')}</p>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-lg shadow-sm">
                 <input type="text" value={service} onChange={e => setService(e.target.value)} placeholder={t('pages.localGovernance.seva.servicePlaceholder')} className="w-full bg-white border-gray-300 rounded-md shadow-sm p-3 text-gray-900" required />
                 <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder={t('pages.localGovernance.seva.locationPlaceholder')} className="w-full bg-white border-gray-300 rounded-md shadow-sm p-3 text-gray-900" required />
                 <button type="submit" disabled={isLoading} className="w-full bg-orange-500 text-white font-semibold py-3 px-4 rounded-md hover:bg-orange-600 disabled:bg-orange-300">
                    {isLoading ? t('pages.localGovernance.seva.loading') : t('pages.localGovernance.seva.button')}
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

const LocalGovernancePage: React.FC = () => {
    const { t } = useTranslation();
    const [openAccordion, setOpenAccordion] = useState<string>('report');
    const [myReports, setMyReports] = useState<CivicIssueReport[]>([]);

    const handleReportSubmitted = (report: CivicIssueReport) => {
        setMyReports(prev => [report, ...prev]);
    };

    const toggleAccordion = (key: string) => setOpenAccordion(openAccordion === key ? '' : key);

    return (
        <div className="min-h-screen bg-gray-100">
            <section className="relative bg-cover bg-center text-white py-20 text-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1528495612343-9ca924a45826?q=80&w=2070&auto=format&fit=crop')"}}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold">{t('pages.localGovernance.heroTitle')}</h1>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-gray-300">{t('pages.localGovernance.heroSubtitle')}</p>
                </div>
            </section>

            <main className="container mx-auto px-4 md:px-6 py-12">
                <BackButton to="/" className="mb-8" />
                
                <AccordionItem title={t('pages.localGovernance.accordion.report.title')} isOpen={openAccordion === 'report'} onToggle={() => toggleAccordion('report')}>
                   <ReportIssue onReportSubmitted={handleReportSubmitted} />
                </AccordionItem>
                 <AccordionItem title={t('pages.localGovernance.accordion.bills.title')} isOpen={openAccordion === 'bills'} onToggle={() => toggleAccordion('bills')}>
                   <BillPayments />
                </AccordionItem>
                 <AccordionItem title={t('pages.localGovernance.accordion.grievance.title')} isOpen={openAccordion === 'grievance'} onToggle={() => toggleAccordion('grievance')}>
                   <GrievanceRedressal />
                </AccordionItem>
                 <AccordionItem title={t('pages.localGovernance.accordion.seva.title')} isOpen={openAccordion === 'seva'} onToggle={() => toggleAccordion('seva')}>
                   <SevaConnect />
                </AccordionItem>

                {/* My Reports Section */}
                <div className="bg-white p-6 rounded-xl shadow-lg mt-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('pages.localGovernance.myReports.title')}</h2>
                    <div className="space-y-4 max-h-[80vh] overflow-y-auto">
                        {myReports.length > 0 ? myReports.map(report => (
                            <div key={report.id} className="bg-gray-50 p-4 rounded-lg flex items-start gap-4">
                                <img src={report.image} alt="Reported issue" className="w-20 h-20 rounded-md object-cover flex-shrink-0" />
                                <div className="flex-grow">
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold text-orange-800">{report.issueCategory}</p>
                                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusConfig[report.status].color}`}>{report.status}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{report.userDescription}</p>
                                    <p className="text-xs text-gray-500 mt-2">Reported on: {report.dateReported}</p>
                                </div>
                            </div>
                        )) : (
                            <p className="text-gray-500 text-center py-8">{t('pages.localGovernance.myReports.noReports')}</p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LocalGovernancePage;
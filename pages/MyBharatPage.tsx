import React, { useState, useEffect } from 'react';
import { Link }from 'react-router-dom';
import BackButton from '../components/BackButton';
import { ICONS } from '../constants';
import type { LifeMilestone, ProactiveAction, Opportunity, RiskAlert, Document } from '../types';
import { getMyBharatSuggestions, generateLifeTimeline } from '../services/geminiService';
import { useUserProfile } from '../contexts/UserProfileContext';

const mockNextStep: ProactiveAction = {
    title: "Your 'Campus to Corporate' plan is ready",
    description: "Based on your final year status, it's the perfect time to build your placement resume and start applying for top tech internships. We've prepared a checklist for you.",
    cta: "Start Transition Plan",
    link: "/students/internships-placements",
    icon: 'Student',
};

const mockDocuments: Document[] = [
    { id: 1, name: "Aadhaar Card", type: "Aadhaar", dateAdded: "2023-01-15" },
    { id: 2, name: "PAN Card", type: "PAN Card", dateAdded: "2023-02-20" },
    { id: 3, name: "Diploma Certificate", type: "Other", dateAdded: "2023-06-10" }
];

const LifeTimeline: React.FC<{ timeline: LifeMilestone[] }> = ({ timeline }) => {
    const statusConfig = {
        completed: { bg: 'bg-green-500', border: 'border-green-600', text: 'text-green-700' },
        current: { bg: 'bg-orange-500', border: 'border-orange-600', text: 'text-orange-700' },
        upcoming: { bg: 'bg-gray-400', border: 'border-gray-500', text: 'text-gray-700' },
    };
    
    return (
        <div className="relative border-l-2 border-orange-200 ml-6 pl-10 py-4">
            {timeline.map((milestone, index) => {
                const config = statusConfig[milestone.status];
                const IconComponent = ICONS[milestone.icon as keyof typeof ICONS] || ICONS.Lightbulb;
                return (
                    <div key={index} className={`relative ${index < timeline.length - 1 ? 'pb-12' : ''}`}>
                        <div className={`absolute -left-[54px] top-0 w-12 h-12 rounded-full ${config.bg} flex items-center justify-center ring-4 ring-white`}>
                            <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                             <div className="flex justify-between items-center">
                                <h4 className={`font-bold text-lg ${config.text}`}>{milestone.name}</h4>
                                <span className="text-xs font-semibold text-gray-500">{milestone.date}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const SarathiNextStep: React.FC<{ action: ProactiveAction }> = ({ action }) => {
    const IconComponent = ICONS[action.icon as keyof typeof ICONS] || ICONS.Lightbulb;
    return (
        <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-6 rounded-xl shadow-2xl flex flex-col md:flex-row items-center gap-6">
            <div className="bg-white/20 p-4 rounded-full">
                <IconComponent className="w-12 h-12" />
            </div>
            <div className="flex-grow text-center md:text-left">
                <h2 className="text-2xl font-bold">{action.title}</h2>
                <p className="mt-2 text-orange-100">{action.description}</p>
            </div>
            <Link to={action.link} className="flex-shrink-0 bg-white text-orange-600 font-bold px-6 py-3 rounded-lg hover:bg-orange-100 transition-transform transform hover:scale-105">
                {action.cta}
            </Link>
        </div>
    );
};

const OpportunityCard: React.FC<{ item: Opportunity }> = ({ item }) => {
    const IconComponent = ICONS[item.icon as keyof typeof ICONS] || ICONS.Offers;
    return (
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start gap-3">
                <IconComponent className="w-8 h-8 text-green-500 flex-shrink-0 mt-1" />
                <div>
                    <span className="text-xs font-bold uppercase text-green-700">{item.category}</span>
                    <h4 className="font-semibold text-gray-800">{item.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    <Link to={item.link} className="text-sm text-green-600 font-semibold hover:underline mt-2 inline-block">View &rarr;</Link>
                </div>
            </div>
        </div>
    );
};

const RiskCard: React.FC<{ item: RiskAlert }> = ({ item }) => {
    const severityClasses = { High: 'border-red-500', Medium: 'border-yellow-500', Low: 'border-blue-500' };
    const severityText = { High: 'text-red-700', Medium: 'text-yellow-700', Low: 'text-blue-700' };
    const IconComponent = ICONS[item.icon as keyof typeof ICONS] || ICONS.Shield;
    return (
        <div className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${severityClasses[item.severity]} hover:shadow-xl transition-shadow duration-300`}>
            <div className="flex items-start gap-3">
                <IconComponent className={`w-8 h-8 ${severityText[item.severity]} flex-shrink-0 mt-1`} />
                <div>
                    <span className={`text-xs font-bold uppercase ${severityText[item.severity]}`}>{item.severity} Risk</span>
                    <h4 className="font-semibold text-gray-800">{item.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    <p className="text-sm text-gray-800 font-medium mt-2 bg-gray-100 p-2 rounded">Recommendation: {item.recommendation}</p>
                    <Link to={item.link} className={`text-sm ${severityText[item.severity]} font-semibold hover:underline mt-2 inline-block`}>Take Action &rarr;</Link>
                </div>
            </div>
        </div>
    );
}

const DigiSarathiVault: React.FC = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <ICONS.DigiLocker className="w-8 h-8 text-blue-500" />
                My Digi-Sarathi Vault
            </h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-md hover:bg-blue-600 transition">
                <ICONS.Upload className="w-4 h-4" />
                Upload Document
            </button>
        </div>
        <div className="space-y-3">
            {mockDocuments.map(doc => (
                <div key={doc.id} className="bg-gray-50 p-3 rounded-md flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <ICONS.Document className="w-6 h-6 text-gray-500" />
                        <div>
                            <p className="font-semibold text-gray-800">{doc.name}</p>
                            <p className="text-xs text-gray-500">Type: {doc.type} | Added: {doc.dateAdded}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                         <button onClick={() => alert(`Viewing ${doc.name}`)} className="p-2 text-gray-500 hover:text-blue-600" aria-label={`View ${doc.name}`}>
                            <ICONS.View className="w-5 h-5" />
                        </button>
                        <button onClick={() => alert(`Deleting ${doc.name}`)} className="p-2 text-gray-500 hover:text-red-600" aria-label={`Delete ${doc.name}`}>
                            <ICONS.Delete className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const SuggestionSkeleton: React.FC = () => (
    <div className="space-y-4 animate-pulse">
        {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="bg-gray-200 p-4 rounded-lg h-24"></div>
        ))}
    </div>
);

const TimelineSkeleton: React.FC = () => (
     <div className="space-y-4 animate-pulse">
        {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-gray-200 p-4 rounded-lg h-20"></div>
        ))}
    </div>
);

const MyBharatPage: React.FC = () => {
    const { userProfile } = useUserProfile();
    const [timeline, setTimeline] = useState<LifeMilestone[]>([]);
    const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
    const [risks, setRisks] = useState<RiskAlert[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAllData = async () => {
            setIsLoading(true);
            setError('');
            try {
                const [suggestions, timelineData] = await Promise.all([
                    getMyBharatSuggestions(userProfile),
                    generateLifeTimeline(userProfile)
                ]);
                setOpportunities(suggestions.opportunities);
                setRisks(suggestions.risks);
                setTimeline(timelineData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchAllData();
    }, [userProfile]);

    return (
        <div className="min-h-screen bg-gray-100">
            <section className="bg-gray-800 text-white py-12">
                 <div className="container mx-auto px-6">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <div className="flex items-center gap-4">
                            <img src={userProfile.profilePictureUrl} alt="User Profile" className="w-16 h-16 rounded-full border-4 border-orange-400" />
                            <div>
                                <h1 className="text-3xl font-bold">My Bharat</h1>
                                <p className="text-gray-300">Your proactive life-cycle dashboard, {userProfile.fullName}.</p>
                            </div>
                        </div>
                        <Link to="/profile" className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white text-sm font-semibold rounded-md hover:bg-gray-600 transition-colors">
                            <ICONS.Settings className="w-5 h-5" />
                            Profile Settings
                        </Link>
                    </div>
                </div>
            </section>
            
            <main className="container mx-auto px-4 md:px-6 py-12">
                <BackButton to="/" className="mb-8" />
                
                <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-800 p-4 rounded-md mb-8" role="alert">
                    <p className="font-bold">Profile Calibrated</p>
                    <p>Your life journey and suggestions are personalized based on your latest profile details.</p>
                </div>

                <div className="space-y-12">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Modern Life Journey</h2>
                        {isLoading && <TimelineSkeleton />}
                        {!isLoading && error && <p className="text-red-500 text-center">{error}</p>}
                        {!isLoading && !error && <LifeTimeline timeline={timeline} />}
                    </div>

                    <SarathiNextStep action={mockNextStep} />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3 mb-4">
                                <ICONS.Offers className="w-8 h-8 text-green-500" />
                                Opportunities Radar
                            </h2>
                            {isLoading && <SuggestionSkeleton />}
                            {!isLoading && error && <p className="text-red-500 text-center">{error}</p>}
                            {!isLoading && !error && (
                                <div className="space-y-4">
                                    {opportunities.map((item, index) => <OpportunityCard key={index} item={item} />)}
                                </div>
                            )}
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3 mb-4">
                                <ICONS.Shield className="w-8 h-8 text-red-500" />
                                Risk Shield
                            </h2>
                             {isLoading && <SuggestionSkeleton />}
                             {!isLoading && error && <p className="text-red-500 text-center">{error}</p>}
                             {!isLoading && !error && (
                                <div className="space-y-4">
                                    {risks.map((item, index) => <RiskCard key={index} item={item} />)}
                                </div>
                             )}
                        </div>
                    </div>
                    
                    <DigiSarathiVault />
                </div>
            </main>
        </div>
    );
};

export default MyBharatPage;
import React from 'react';
import { Link }from 'react-router-dom';
import BackButton from '../components/BackButton';
import { ICONS } from '../constants';
import type { LifeMilestone, ProactiveAction, Opportunity, RiskAlert, Document } from '../types';

const mockUserProfile = {
    fullName: 'Rupesh Reddy',
    profilePictureUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop'
};

const mockTimeline: LifeMilestone[] = [
    { name: 'Secondary Education', date: 'Completed 2020', status: 'completed', description: 'Completed SSC with a focus on science and mathematics.', icon: ICONS.Services },
    { name: 'Diploma in CSE', date: '2023 - 2026', status: 'current', description: 'Currently in the final year, specializing in AI and full-stack development.', icon: ICONS.Student },
    { name: 'First Internship', date: 'Predicted: 2025', status: 'upcoming', description: 'AI suggests applying for internships at product-based startups.', icon: ICONS.Worker },
    { name: 'Graduation', date: 'Predicted: 2026', status: 'upcoming', description: 'Projected to graduate with a first-class distinction.', icon: ICONS.Student },
    { name: 'First Job', date: 'Predicted: 2026', status: 'upcoming', description: 'Targeting a Software Development Engineer role in a leading tech company.', icon: ICONS.Worker },
];

const mockNextStep: ProactiveAction = {
    title: "Your 'Campus to Corporate' plan is ready",
    description: "Based on your final year status, it's the perfect time to build your placement resume and start applying for top tech internships. We've prepared a checklist for you.",
    cta: "Start Transition Plan",
    link: "/students/internships-placements",
    icon: ICONS.Student,
};

const mockOpportunities: Opportunity[] = [
    { category: 'Scheme', title: 'AICTE Pragati Scholarship', description: 'You have a 90% eligibility score for this scholarship for diploma students.', link: '/students/scholarships', icon: ICONS.Trophy },
    { category: 'Upskilling', title: 'Advanced React Course', description: 'To match your "Full Stack Developer" goal, learning React Hooks is the next step.', link: '/students/learning-paths', icon: ICONS.Lightbulb },
    { category: 'Job', title: 'Jr. Developer Internship', description: 'A new remote internship at TechCorp matches your Java and Python skills.', link: '/students/internships-placements', icon: ICONS.Worker },
    { category: 'Financial', title: 'Start a ₹500 SIP', description: 'Your savings pattern allows for a small SIP. Potential corpus in 5 years: ₹35,000.', link: '/students/financial-management', icon: ICONS.EarningChat },
];

const mockRisks: RiskAlert[] = [
    { severity: 'Medium', title: 'Skill Gap Identified', description: 'The demand for "Cloud Computing" skills in your desired roles is high. Your profile currently lacks this.', recommendation: 'Start a free course on AWS or Azure.', link: '/students/free-resources', icon: ICONS.Services },
    { severity: 'Low', title: 'Digital Footprint', description: 'Your public project repositories could be better documented to attract recruiters.', recommendation: 'Update your GitHub READMEs.', link: '/students/coding-toolkit', icon: ICONS.GitHub },
];

const mockDocuments: Document[] = [
    { id: 1, name: "Aadhaar Card", type: "Aadhaar", dateAdded: "2023-01-15" },
    { id: 2, name: "PAN Card", type: "PAN Card", dateAdded: "2023-02-20" },
    { id: 3, name: "Diploma Certificate", type: "Other", dateAdded: "2023-06-10" }
];

const LifeTimeline: React.FC = () => {
    const statusConfig = {
        completed: { bg: 'bg-green-500', border: 'border-green-600', text: 'text-green-700' },
        current: { bg: 'bg-orange-500', border: 'border-orange-600', text: 'text-orange-700' },
        upcoming: { bg: 'bg-gray-400', border: 'border-gray-500', text: 'text-gray-700' },
    };
    
    return (
        <div className="relative border-l-2 border-orange-200 ml-6 pl-10 py-4">
            {mockTimeline.map((milestone, index) => {
                const config = statusConfig[milestone.status];
                return (
                    <div key={index} className={`relative ${index < mockTimeline.length - 1 ? 'pb-12' : ''}`}>
                        <div className={`absolute -left-[54px] top-0 w-12 h-12 rounded-full ${config.bg} flex items-center justify-center ring-4 ring-white`}>
                            <milestone.icon className="w-6 h-6 text-white" />
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

const SarathiNextStep: React.FC<{ action: ProactiveAction }> = ({ action }) => (
    <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-6 rounded-xl shadow-2xl flex flex-col md:flex-row items-center gap-6">
        <div className="bg-white/20 p-4 rounded-full">
            <action.icon className="w-12 h-12" />
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

const OpportunityCard: React.FC<{ item: Opportunity }> = ({ item }) => (
    <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-start gap-3">
            <item.icon className="w-8 h-8 text-green-500 flex-shrink-0 mt-1" />
            <div>
                <span className="text-xs font-bold uppercase text-green-700">{item.category}</span>
                <h4 className="font-semibold text-gray-800">{item.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                <Link to={item.link} className="text-sm text-green-600 font-semibold hover:underline mt-2 inline-block">View &rarr;</Link>
            </div>
        </div>
    </div>
);

const RiskCard: React.FC<{ item: RiskAlert }> = ({ item }) => {
    const severityClasses = {
        High: 'border-red-500',
        Medium: 'border-yellow-500',
        Low: 'border-blue-500',
    };
    const severityText = {
        High: 'text-red-700',
        Medium: 'text-yellow-700',
        Low: 'text-blue-700',
    }
    return (
        <div className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${severityClasses[item.severity]} hover:shadow-xl transition-shadow duration-300`}>
            <div className="flex items-start gap-3">
                <item.icon className={`w-8 h-8 ${severityText[item.severity]} flex-shrink-0 mt-1`} />
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

const MyBharatPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <section className="bg-gray-800 text-white py-12">
                 <div className="container mx-auto px-6">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <div className="flex items-center gap-4">
                            <img src={mockUserProfile.profilePictureUrl} alt="User Profile" className="w-16 h-16 rounded-full border-4 border-orange-400" />
                            <div>
                                <h1 className="text-3xl font-bold">AI Jeevan Chakra</h1>
                                <p className="text-gray-300">Your proactive life-cycle dashboard, {mockUserProfile.fullName}.</p>
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
                    <p>Your life journey is re-calibrated based on your latest profile details.</p>
                </div>

                <div className="space-y-12">
                    {/* Section 1: Life Timeline */}
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Modern Life Journey</h2>
                        <LifeTimeline />
                    </div>

                    {/* Section 2: Proactive Next Step */}
                    <SarathiNextStep action={mockNextStep} />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Section 3: Opportunities Radar */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3 mb-4">
                                <ICONS.Offers className="w-8 h-8 text-green-500" />
                                Opportunities Radar
                            </h2>
                            <div className="space-y-4">
                                {mockOpportunities.map((item, index) => <OpportunityCard key={index} item={item} />)}
                            </div>
                        </div>

                        {/* Section 4: Risk Shield */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3 mb-4">
                                <ICONS.Shield className="w-8 h-8 text-red-500" />
                                Risk Shield
                            </h2>
                             <div className="space-y-4">
                                {mockRisks.map((item, index) => <RiskCard key={index} item={item} />)}
                            </div>
                        </div>
                    </div>
                    
                    {/* Section 5: Digi-Sarathi Vault */}
                    <DigiSarathiVault />
                </div>
            </main>
        </div>
    );
};

export default MyBharatPage;
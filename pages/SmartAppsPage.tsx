import React, { useState } from 'react';
import SmartAppCard from '../components/SmartAppCard';
import {
    GOVERNMENT_APPS,
    UTILITY_APPS,
    EDUCATIONAL_APPS_LIST,
    YOUTH_APPS,
    WOMEN_APPS,
    ENVIRONMENT_APPS
} from '../constants';

const TABS = [
    "Home",
    "Government Apps",
    "Regular Utility Apps",
    "Educational Apps",
    "Youth & Students",
    "Women Empowerment & SHGs",
    "Environment & Energy",
    "Support"
];

const GOV_SUB_TABS = Object.keys(GOVERNMENT_APPS);

const TabButton: React.FC<{ label: string; isActive: boolean; onClick: () => void; }> = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 rounded-md whitespace-nowrap ${
            isActive
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-gray-300 hover:bg-gray-700'
        }`}
    >
        {label}
    </button>
);

const SmartAppsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState(TABS[0]);
    const [activeGovTab, setActiveGovTab] = useState(GOV_SUB_TABS[0]);

    const renderContent = () => {
        switch (activeTab) {
            case "Home":
                return (
                    <div className="text-center py-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Welcome to the Smart App Directory</h2>
                        <p className="text-gray-300 max-w-3xl mx-auto">
                            From DigiLocker to Canva, we bring you all the essential apps every Indian needs for governance, learning, transport, finance, safety, and beyond. Simplify your digital life with our curated directory.
                        </p>
                    </div>
                );
            case "Government Apps":
                return (
                    <div>
                        <div className="flex flex-wrap justify-center gap-2 mb-8">
                            {GOV_SUB_TABS.map(tab => (
                                <TabButton key={tab} label={tab} isActive={activeGovTab === tab} onClick={() => setActiveGovTab(tab)} />
                            ))}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {GOVERNMENT_APPS[activeGovTab].map(app => <SmartAppCard key={app.name} app={app} />)}
                        </div>
                    </div>
                );
            case "Regular Utility Apps":
                return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{UTILITY_APPS.map(app => <SmartAppCard key={app.name} app={app} />)}</div>;
            case "Educational Apps":
                return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{EDUCATIONAL_APPS_LIST.map(app => <SmartAppCard key={app.name} app={app} />)}</div>;
            case "Youth & Students":
                return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{YOUTH_APPS.map(app => <SmartAppCard key={app.name} app={app} />)}</div>;
            case "Women Empowerment & SHGs":
                return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{WOMEN_APPS.map(app => <SmartAppCard key={app.name} app={app} />)}</div>;
            case "Environment & Energy":
                return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{ENVIRONMENT_APPS.map(app => <SmartAppCard key={app.name} app={app} />)}</div>;
            case "Support":
                 return (
                    <div className="text-center py-12">
                        <h2 className="text-3xl font-bold text-white mb-4">Need Help?</h2>
                        <p className="text-gray-300">
                            For any questions, issues, or suggestions regarding the app directory, please contact our support team.
                        </p>
                        <a href="mailto:voiceofbharat.help@gmail.com" className="mt-4 inline-block bg-orange-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-orange-600">
                            Email: voiceofbharat.help@gmail.com
                        </a>
                    </div>
                );
            default: return null;
        }
    };
    
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <section className="bg-gray-800 py-20 text-center">
                <h1 className="text-4xl md:text-5xl font-bold">🌑 SMART APP Directory</h1>
                <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-300">
                    Explore Government + Essential Utility Apps All in One Place.
                </p>
            </section>

            <main className="container mx-auto px-4 sm:px-6 py-12">
                 <div className="overflow-x-auto pb-4">
                    <div className="flex justify-center space-x-2">
                        {TABS.map(tab => (
                            <TabButton
                                key={tab}
                                label={tab}
                                isActive={activeTab === tab}
                                onClick={() => setActiveTab(tab)}
                            />
                        ))}
                    </div>
                </div>
                <div className="mt-8">
                   {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default SmartAppsPage;
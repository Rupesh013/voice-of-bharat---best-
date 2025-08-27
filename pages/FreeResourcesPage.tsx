import React, { useState } from 'react';
import PlatformTable from '../components/PlatformTable';
import {
    INDIAN_GOV_PLATFORMS,
    GLOBAL_PLATFORMS,
    CODING_PLATFORMS,
    SOFT_SKILLS_PLATFORMS,
    EXAM_PREP_PLATFORMS,
    TEACHER_PLATFORMS,
    JOB_PORTALS,
    LEARNING_ARTICLES
} from '../constants';

const TABS = [
    "Indian Government",
    "Global Platforms",
    "Coding & Development",
    "Soft Skills & Career",
    "Competitive Exams",
    "For Teachers",
    "Jobs & Certifications",
    "Articles"
];

const TabButton: React.FC<{ label: string; isActive: boolean; onClick: () => void; }> = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-3 py-2 text-sm md:text-base font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-300 rounded-t-lg whitespace-nowrap ${
            isActive
                ? 'bg-white border-gray-200 border-t border-x -mb-px text-green-600'
                : 'text-gray-500 hover:text-gray-700 bg-gray-100'
        }`}
    >
        {label}
    </button>
);

const ArticleCard: React.FC<{ article: typeof LEARNING_ARTICLES[0] }> = ({ article }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
        <h3 className="text-xl font-bold text-gray-800">{article.title}</h3>
        <div className="text-gray-600 text-sm mt-2 space-y-2">
            {Array.isArray(article.content) ? (
                <ul className="list-disc list-inside">
                    {article.content.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            ) : <p>{article.content}</p>}
        </div>
    </div>
);

const FreeResourcesPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState(TABS[0]);

    const renderContent = () => {
        switch (activeTab) {
            case "Indian Government": return <PlatformTable platforms={INDIAN_GOV_PLATFORMS} />;
            case "Global Platforms": return <PlatformTable platforms={GLOBAL_PLATFORMS} />;
            case "Coding & Development": return <PlatformTable platforms={CODING_PLATFORMS} />;
            case "Soft Skills & Career": return <PlatformTable platforms={SOFT_SKILLS_PLATFORMS} />;
            case "Competitive Exams": return <PlatformTable platforms={EXAM_PREP_PLATFORMS} />;
            case "For Teachers": return <PlatformTable platforms={TEACHER_PLATFORMS} />;
            case "Jobs & Certifications": return <PlatformTable platforms={JOB_PORTALS} />;
            case "Articles":
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {LEARNING_ARTICLES.map(article => <ArticleCard key={article.id} article={article} />)}
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <section className="bg-green-700 text-white py-20 text-center">
                <h1 className="text-4xl md:text-5xl font-bold">Free Learning Hub</h1>
                <p className="mt-4 text-lg max-w-3xl mx-auto">
                    India's largest directory of free, high-quality educational resources for every learner.
                </p>
            </section>

            <main className="container mx-auto px-2 sm:px-4 py-12">
                <div className="overflow-x-auto">
                    <div className="flex border-b border-gray-200">
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
                <div className="bg-white p-4 md:p-6 rounded-b-lg shadow-md">
                   {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default FreeResourcesPage;

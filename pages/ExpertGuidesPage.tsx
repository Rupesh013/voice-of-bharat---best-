
import React from 'react';
import { MOCK_EXPERT_GUIDES } from '../constants';
import type { ExpertGuide } from '../types';
import ExpertGuideAssistant from '../components/ExpertGuideAssistant';
import BackButton from '../components/BackButton';

const GuideCard: React.FC<{ guide: ExpertGuide }> = ({ guide }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
        <img src={guide.thumbnail} alt={guide.title} className="w-full h-48 object-cover" />
        <div className="p-6">
            <p className="text-sm font-semibold text-orange-600">{guide.category}</p>
            <h3 className="text-xl font-bold text-gray-800 mt-2">{guide.title}</h3>
            <p className="text-gray-600 mt-2 text-sm">{guide.summary}</p>
            <button className="mt-4 text-orange-500 font-semibold hover:underline">Read More &rarr;</button>
        </div>
    </div>
);

const ExpertGuidesPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-teal-50">
            <section className="relative bg-cover bg-center text-white py-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=1974&auto=format&fit=crop')" }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">Expert Farming Guides</h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
                        Your knowledge hub for sustainable and profitable farming. Have a question? Ask our AI expert!
                    </p>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-6">
                    <BackButton className="mb-8" />
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800">Knowledge Base</h2>
                        <p className="text-gray-600 mt-2">Browse our collection of guides and tutorials.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {MOCK_EXPERT_GUIDES.map(guide => (
                            <GuideCard key={guide.id} guide={guide} />
                        ))}
                    </div>
                </div>
            </section>

            <ExpertGuideAssistant />
        </div>
    );
};

export default ExpertGuidesPage;

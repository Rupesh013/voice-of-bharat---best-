
import React, { useState, useMemo } from 'react';
import { MOCK_PROJECTS, ICONS, REFERRAL_PARTNERS } from '../constants';
import type { Project } from '../types';
import ProjectCard from '../components/ProjectCard';
import SubmitIdeaModal from '../components/SubmitIdeaModal';
import BackButton from '../components/BackButton';

type FilterType = 'All' | 'Tech' | 'Agri' | 'Social' | 'Health';
type SortType = 'Votes' | 'Recent' | 'Funding';

const ProjectIdeasPage: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
    const [filter, setFilter] = useState<FilterType>('All');
    const [sort, setSort] = useState<SortType>('Votes');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showSuccessBanner, setShowSuccessBanner] = useState(false);

    const handleVote = (projectId: number) => {
        setProjects(projects.map(p =>
            p.id === projectId ? { ...p, votes: p.votes + 1 } : p
        ));
    };

    const handleSubmitProject = (newProjectData: Omit<Project, 'id' | 'votes' | 'status'>) => {
        const newProject: Project = {
            ...newProjectData,
            id: projects.length + 1,
            votes: 0,
            status: 'under_review',
        };
        setProjects([newProject, ...projects]);
        setShowSuccessBanner(true);
        setTimeout(() => setShowSuccessBanner(false), 5000);
    };

    const filteredAndSortedProjects = useMemo(() => {
        return projects
            .filter(p => filter === 'All' || p.category === filter)
            .sort((a, b) => {
                switch (sort) {
                    case 'Votes': return b.votes - a.votes;
                    case 'Recent': return b.id - a.id; // Assuming higher ID is newer
                    case 'Funding': return b.fundingNeeded - a.fundingNeeded;
                    default: return 0;
                }
            });
    }, [projects, filter, sort]);

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Hero Section */}
            <section className="bg-gray-800 text-center py-20 relative">
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold">Student Innovation Portal</h1>
                    <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                        Turn your ideas into action. Submit your project, get community feedback, and find funding support.
                    </p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-8 bg-orange-500 text-white font-bold px-8 py-3 rounded-md hover:bg-orange-600 transition-transform transform hover:scale-105"
                    >
                        Submit Your Idea
                    </button>
                </div>
            </section>

            {/* Main Content: Leaderboard */}
            <main className="container mx-auto px-6 py-12">
                <BackButton className="mb-8" />
                {showSuccessBanner && (
                    <div className="mb-6 bg-green-900 border border-green-600 text-green-200 px-4 py-3 rounded-lg relative text-center" role="alert">
                        <strong className="font-bold">Success!</strong>
                        <span className="block sm:inline"> Your idea has been successfully submitted. You will get a response soon.</span>
                    </div>
                )}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h2 className="text-3xl font-bold">Project Leaderboard</h2>
                    <div className="flex flex-wrap gap-2">
                        {/* Filters */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-400">Category:</span>
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value as FilterType)}
                                className="bg-gray-800 text-white border border-gray-700 rounded-md p-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                            >
                                {['All', 'Tech', 'Agri', 'Social', 'Health'].map(f => <option key={f} value={f}>{f}</option>)}
                            </select>
                        </div>
                         {/* Sorting */}
                         <div className="flex items-center gap-2">
                             <span className="text-sm font-medium text-gray-400">Sort by:</span>
                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value as SortType)}
                                className="bg-gray-800 text-white border border-gray-700 rounded-md p-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                            >
                                 {['Votes', 'Recent', 'Funding'].map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredAndSortedProjects.map(project => (
                        <ProjectCard key={project.id} project={project} onVote={handleVote} />
                    ))}
                </div>
            </main>
            
            {/* High-Funding Support Section */}
            <section className="bg-gray-800 py-16">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold">Need More Than ₹1 Lakh? We Guide & Support.</h2>
                    <p className="mt-4 text-gray-400 max-w-3xl mx-auto">For high-potential projects, we provide a guided pathway to connect with national startup ecosystems.</p>
                    <div className="mt-8 flex flex-wrap justify-center gap-6">
                        <button className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-600">Download Pitch Deck Template</button>
                        <button className="bg-green-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-green-600">Generate Sample Referral Letter</button>
                    </div>
                    <p className="mt-12 text-sm text-gray-500 uppercase tracking-wider">Referral Partners</p>
                    <div className="flex flex-wrap justify-center items-center gap-8 mt-6">
                        {REFERRAL_PARTNERS.map(partner => (
                             <img key={partner.name} src={partner.logo} alt={partner.name} className="h-12 bg-white p-2 rounded-md object-contain" />
                        ))}
                    </div>
                </div>
            </section>

            <SubmitIdeaModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmitProject}
            />
        </div>
    );
};

export default ProjectIdeasPage;

import React, { useState } from 'react';
import type { CareerRoadmap } from '../types';
import { generateCareerRoadmap } from '../services/geminiService';

const RoadmapDisplay: React.FC<{ roadmap: CareerRoadmap }> = ({ roadmap }) => (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8 animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">{roadmap.title}</h2>
        <p className="text-center text-gray-600 mb-8">{roadmap.introduction}</p>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-orange-200 ml-6 pl-8 space-y-10">
            {roadmap.steps.map((step, index) => (
                <div key={index} className="relative">
                    <div className="absolute -left-[42px] top-1 w-8 h-8 bg-orange-500 rounded-full text-white flex items-center justify-center font-bold">
                        {index + 1}
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
                        <p className="text-gray-600 mt-2">{step.description}</p>
                        {step.resources.length > 0 && (
                            <div className="mt-4">
                                <h4 className="font-semibold text-sm text-gray-700">📚 Recommended Resources:</h4>
                                <ul className="list-disc list-inside text-sm mt-2 space-y-1 pl-2">
                                    {step.resources.map((res, i) => (
                                        <li key={i}>
                                            <a href={res.link} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">{res.name}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
        
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                <h4 className="font-semibold text-lg text-green-800 mb-2">💼 Potential Entry-Level Roles</h4>
                <p className="text-gray-700">{roadmap.potentialRoles.join(', ')}</p>
             </div>
              <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                <h4 className="font-semibold text-lg text-blue-800 mb-2">💰 Expected Salary (Entry-Level)</h4>
                <p className="text-gray-700">{roadmap.salaryExpectation}</p>
             </div>
        </div>
    </div>
);


const CareerRoadmapsPage: React.FC = () => {
    const [formData, setFormData] = useState({
        interests: '',
        skills: '',
        education: '',
        experience: '',
        desiredRoles: '',
        industries: '',
    });
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [roadmap, setRoadmap] = useState<CareerRoadmap | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({...prev, [id]: value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setRoadmap(null);
        setIsSuccess(false);
        try {
            const result = await generateCareerRoadmap(formData);
            setRoadmap(result);
            setIsSuccess(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-orange-50 min-h-screen py-12">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800">AI Career Roadmaps</h1>
                    <p className="text-gray-600 mt-4 text-lg">
                        Get a personalized, step-by-step guide to your dream career.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-1">Your Interests *</label>
                                <input type="text" id="interests" value={formData.interests} onChange={handleInputChange} placeholder="e.g., building apps, data analysis, gaming" className="w-full bg-white border-gray-300 rounded-md shadow-sm p-2 text-gray-900" required />
                            </div>
                            <div>
                                <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">Your Existing Skills *</label>
                                <input type="text" id="skills" value={formData.skills} onChange={handleInputChange} placeholder="e.g., Python, communication" className="w-full bg-white border-gray-300 rounded-md shadow-sm p-2 text-gray-900" required />
                            </div>
                        </div>

                        <div>
                            <button type="button" onClick={() => setShowAdvanced(!showAdvanced)} className="text-sm text-orange-600 hover:underline">
                                {showAdvanced ? 'Hide Optional Details' : 'Add More Details for a Better Roadmap (Optional)'}
                            </button>
                        </div>
                        
                        {showAdvanced && (
                            <div className="space-y-6 border-t pt-6 animate-fade-in">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">Current Education</label>
                                        <input type="text" id="education" value={formData.education} onChange={handleInputChange} placeholder="e.g., 3rd year B.Tech CSE" className="w-full bg-white border-gray-300 rounded-md shadow-sm p-2 text-gray-900" />
                                    </div>
                                    <div>
                                        <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Past Experience / Internships</label>
                                        <input type="text" id="experience" value={formData.experience} onChange={handleInputChange} placeholder="e.g., Web Dev Intern at XYZ" className="w-full bg-white border-gray-300 rounded-md shadow-sm p-2 text-gray-900" />
                                    </div>
                                </div>
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="desiredRoles" className="block text-sm font-medium text-gray-700 mb-1">Desired Job Roles</label>
                                        <input type="text" id="desiredRoles" value={formData.desiredRoles} onChange={handleInputChange} placeholder="e.g., ML Engineer, Data Scientist" className="w-full bg-white border-gray-300 rounded-md shadow-sm p-2 text-gray-900" />
                                    </div>
                                    <div>
                                        <label htmlFor="industries" className="block text-sm font-medium text-gray-700 mb-1">Industries of Interest</label>
                                        <input type="text" id="industries" value={formData.industries} onChange={handleInputChange} placeholder="e.g., Healthcare, Finance, Agri-tech" className="w-full bg-white border-gray-300 rounded-md shadow-sm p-2 text-gray-900" />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div>
                            <button type="submit" disabled={isLoading} className="w-full bg-orange-500 text-white font-semibold py-3 px-4 rounded-md hover:bg-orange-600 transition disabled:bg-gray-400">
                                {isLoading ? 'Generating Roadmap...' : 'Create My Roadmap'}
                            </button>
                        </div>
                    </form>
                </div>
                 {isLoading && <p className="text-center mt-6 animate-pulse">Our AI is charting your career path...</p>}
                 {error && <div className="bg-red-100 text-red-700 p-4 rounded-md mt-6">{error}</div>}
                 {isSuccess && !isLoading && (
                    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md mt-6" role="alert">
                        <p className="font-bold">Success!</p>
                        <p>Your career roadmap has been generated below.</p>
                    </div>
                )}
                 {roadmap && <RoadmapDisplay roadmap={roadmap} />}
            </div>
        </div>
    );
};

export default CareerRoadmapsPage;

import React, { useState } from 'react';
import type { LearningPath } from '../types';
import { generateLearningPath } from '../services/geminiService';
import BackButton from '../components/BackButton';

const LearningPathDisplay: React.FC<{ path: LearningPath }> = ({ path }) => (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8 animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">{path.title}</h2>
        <p className="text-center text-gray-500 mb-2 font-semibold">{path.duration}</p>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">{path.introduction}</p>

        <div className="relative border-l-2 border-orange-200 ml-6 pl-8 space-y-12">
            {path.steps.map((step, index) => (
                <div key={index} className="relative">
                    <div className="absolute -left-[42px] top-1 w-8 h-8 bg-orange-500 rounded-full text-white flex items-center justify-center font-bold ring-4 ring-white">
                        {index + 1}
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
                        <div className="mt-3">
                            <h4 className="font-semibold text-sm text-gray-700 mb-1">Topics to Cover:</h4>
                            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 pl-2">
                                {step.topics.map((topic, i) => <li key={i}>{topic}</li>)}
                            </ul>
                        </div>
                        <div className="mt-4">
                            <h4 className="font-semibold text-sm text-gray-700 mb-2">📚 Recommended Resources:</h4>
                            <div className="space-y-2">
                                {step.resources.map((res, i) => (
                                    <a key={i} href={res.link} target="_blank" rel="noopener noreferrer" className="flex items-center p-2 bg-white rounded-md border hover:bg-orange-50 transition">
                                        <span className="text-xs font-semibold uppercase text-white bg-orange-400 px-2 py-0.5 rounded-full mr-3">{res.type}</span>
                                        <span className="text-sm text-orange-600 font-medium hover:underline">{res.name}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="mt-4 p-3 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                            <h4 className="font-semibold text-sm text-green-800">🛠️ Mini-Project: {step.project.name}</h4>
                            <p className="text-sm text-gray-700 mt-1">{step.project.description}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        
        <div className="mt-10 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
            <h4 className="font-semibold text-lg text-blue-800 mb-2">💡 Final Career Advice</h4>
            <p className="text-gray-700">{path.careerAdvice}</p>
        </div>
    </div>
);


const LearningPathsPage: React.FC = () => {
    const [formData, setFormData] = useState({
        goal: '',
        skillLevel: 'Beginner',
        interests: '',
        timeCommitment: '',
    });
    const [learningPath, setLearningPath] = useState<LearningPath | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({...prev, [id]: value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setLearningPath(null);
        setIsSuccess(false);
        try {
            const result = await generateLearningPath(formData);
            setLearningPath(result);
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
                <BackButton className="mb-8" />
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800">AI Personalized Learning Paths</h1>
                    <p className="text-gray-600 mt-4 text-lg">
                        Your personal AI tutor for creating a custom study plan, tailored just for you.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-1">What is your primary learning goal? *</label>
                            <input type="text" id="goal" value={formData.goal} onChange={handleInputChange} placeholder="e.g., Become a Data Scientist, Learn Web Development" className="w-full bg-white border-gray-300 rounded-md shadow-sm p-2 text-gray-900" required />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="skillLevel" className="block text-sm font-medium text-gray-700 mb-1">Current Skill Level *</label>
                                <select id="skillLevel" value={formData.skillLevel} onChange={handleInputChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 bg-white text-gray-900" required>
                                    <option>Beginner (just starting)</option>
                                    <option>Intermediate (know some basics)</option>
                                    <option>Advanced (have some experience)</option>
                                </select>
                            </div>
                             <div>
                                <label htmlFor="timeCommitment" className="block text-sm font-medium text-gray-700 mb-1">How much time can you commit weekly? *</label>
                                <input type="text" id="timeCommitment" value={formData.timeCommitment} onChange={handleInputChange} placeholder="e.g., 5-7 hours per week" className="w-full bg-white border-gray-300 rounded-md shadow-sm p-2 text-gray-900" required />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-1">Any specific interests or technologies?</label>
                            <textarea id="interests" value={formData.interests} onChange={handleInputChange} rows={2} placeholder="e.g., interested in healthcare tech, Python, React" className="w-full bg-white border-gray-300 rounded-md shadow-sm p-2 text-gray-900" />
                        </div>

                        <div>
                            <button type="submit" disabled={isLoading} className="w-full bg-orange-500 text-white font-semibold py-3 px-4 rounded-md hover:bg-orange-600 transition disabled:bg-gray-400">
                                {isLoading ? 'Generating Your Personal Path...' : '✨ Create My Learning Path'}
                            </button>
                        </div>
                    </form>
                </div>
                 {isLoading && <p className="text-center mt-6 animate-pulse text-lg text-gray-700">Our AI is designing your personalized curriculum...</p>}
                 {error && <div className="bg-red-100 text-red-700 p-4 rounded-md mt-6">{error}</div>}
                 {isSuccess && !isLoading && (
                    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md mt-6" role="alert">
                        <p className="font-bold">Success!</p>
                        <p>Your personalized learning path has been generated below.</p>
                    </div>
                )}
                 {learningPath && <LearningPathDisplay path={learningPath} />}
            </div>
        </div>
    );
};

export default LearningPathsPage;

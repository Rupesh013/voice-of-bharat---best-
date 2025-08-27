import React, { useState } from 'react';
import { solveAcademicDoubt } from '../services/geminiService';
import { ICONS } from '../constants';

const DoubtSolvingPage: React.FC = () => {
    // AI Solver State
    const [aiDoubt, setAiDoubt] = useState('');
    const [aiSolution, setAiSolution] = useState('');
    const [isAiLoading, setIsAiLoading] = useState(false);
    const [aiError, setAiError] = useState('');

    // Mentor Submission State
    const [mentorSubject, setMentorSubject] = useState('Physics');
    const [mentorDoubt, setMentorDoubt] = useState('');
    const [isMentorSubmitting, setIsMentorSubmitting] = useState(false);
    const [mentorSubmissionStatus, setMentorSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleAiSubmit = async () => {
        if (!aiDoubt.trim()) return;
        setIsAiLoading(true);
        setAiError('');
        setAiSolution('');
        try {
            const solution = await solveAcademicDoubt(aiDoubt);
            setAiSolution(solution);
        } catch (err) {
            setAiError(err instanceof Error ? err.message : 'Failed to get AI solution. Please try again.');
        } finally {
            setIsAiLoading(false);
        }
    };

    const handleMentorSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!mentorDoubt.trim()) return;
        setIsMentorSubmitting(true);
        setMentorSubmissionStatus('idle');
        
        // Simulate an API call to a backend
        setTimeout(() => {
            setIsMentorSubmitting(false);
            setMentorSubmissionStatus('success');
            setMentorDoubt('');
            setMentorSubject('Physics');
        }, 1500);
    };


    return (
        <div className="min-h-screen bg-gray-100">
            {/* Hero Section */}
            <section className="bg-blue-600 text-white py-20 text-center">
                 <div className="container mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-bold">Doubt Solving Hub</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-blue-100">
                        Stuck on a problem? Get instant AI-powered solutions or ask our expert mentors.
                    </p>
                </div>
            </section>
            
            <main className="container mx-auto px-4 sm:px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    
                    {/* AI Solver */}
                    <div className="bg-white p-6 rounded-xl shadow-lg h-full flex flex-col">
                        <div className="flex items-center mb-4">
                            <ICONS.Farmer className="h-10 w-10 text-orange-500 mr-3" />
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Instant AI Solver</h2>
                                <p className="text-gray-500 text-sm">Get immediate, 24/7 help from our AI tutor.</p>
                            </div>
                        </div>
                        <div className="flex-grow flex flex-col">
                            <textarea
                                value={aiDoubt}
                                onChange={(e) => setAiDoubt(e.target.value)}
                                placeholder="Ask your question here... e.g., 'Explain Newton's third law with an example.'"
                                className="w-full h-32 bg-white border-gray-300 rounded-md shadow-sm p-3 focus:ring-orange-500 focus:border-orange-500 flex-grow text-gray-900"
                                disabled={isAiLoading}
                            />
                            <button
                                onClick={handleAiSubmit}
                                disabled={isAiLoading || !aiDoubt.trim()}
                                className="mt-4 w-full bg-orange-500 text-white font-semibold py-3 px-4 rounded-md hover:bg-orange-600 transition disabled:bg-orange-300 disabled:cursor-not-allowed"
                            >
                                {isAiLoading ? 'Getting Solution...' : 'Solve with AI'}
                            </button>
                        </div>
                        {aiError && <p className="text-red-500 text-sm mt-2 text-center">{aiError}</p>}
                        {aiSolution && (
                            <div className="mt-6 p-4 bg-gray-50 border rounded-md max-h-80 overflow-y-auto">
                                <h3 className="font-semibold text-gray-800 mb-2">AI Solution:</h3>
                                <p className="text-gray-700 text-sm whitespace-pre-wrap">{aiSolution}</p>
                            </div>
                        )}
                    </div>

                    {/* Ask a Mentor */}
                    <div className="bg-white p-6 rounded-xl shadow-lg h-full flex flex-col">
                         <div className="flex items-center mb-4">
                            <ICONS.Student className="h-10 w-10 text-blue-500 mr-3" />
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Ask an Expert Mentor</h2>
                                <p className="text-gray-500 text-sm">Submit your doubt for a detailed, human-verified answer.</p>
                            </div>
                        </div>
                        {mentorSubmissionStatus === 'success' ? (
                             <div className="text-center p-6 bg-green-50 rounded-lg flex-grow flex flex-col justify-center items-center">
                                <h3 className="text-xl font-semibold text-green-800">Doubt Submitted!</h3>
                                <p className="text-green-700 mt-2">An expert mentor will review your question. You'll receive the solution via email soon.</p>
                                <button onClick={() => setMentorSubmissionStatus('idle')} className="mt-4 bg-green-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-green-700">
                                    Ask Another Question
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleMentorSubmit} className="space-y-4 flex-grow flex flex-col">
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                                    <select
                                        id="subject"
                                        value={mentorSubject}
                                        onChange={(e) => setMentorSubject(e.target.value)}
                                        className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                    >
                                        <option>Physics</option>
                                        <option>Chemistry</option>
                                        <option>Mathematics</option>
                                        <option>Biology</option>
                                        <option>Computer Science</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="flex-grow flex flex-col">
                                   <label htmlFor="mentor-doubt" className="block text-sm font-medium text-gray-700">Your Doubt</label>
                                    <textarea
                                        id="mentor-doubt"
                                        value={mentorDoubt}
                                        onChange={(e) => setMentorDoubt(e.target.value)}
                                        placeholder="Describe your problem in detail. You can also mention the chapter or topic."
                                        className="mt-1 w-full bg-white border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 flex-grow text-gray-900"
                                        rows={5}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isMentorSubmitting || !mentorDoubt.trim()}
                                    className="w-full bg-blue-500 text-white font-semibold py-3 px-4 rounded-md hover:bg-blue-600 transition disabled:bg-blue-300 disabled:cursor-not-allowed"
                                >
                                    {isMentorSubmitting ? 'Submitting...' : 'Submit to Mentor'}
                                </button>
                            </form>
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
};

export default DoubtSolvingPage;
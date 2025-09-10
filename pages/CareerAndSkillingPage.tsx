import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import BackButton from '../components/BackButton';
import { ICONS } from '../constants';
import type { CareerPathResult, UserProfile, Job } from '../types';
import { generateCareerPath } from '../services/geminiService';

const mockUserProfile: UserProfile = {
    fullName: 'Rupesh Reddy',
    email: 'rupesh.reddy@example.com',
    phone: '+91 7997401678',
    dateOfBirth: '2004-05-15',
    address: { street: '123 Tech Park Road', city: 'Tirupati', state: 'Andhra Pradesh', pincode: '517502' },
    language: 'en',
    occupation: 'Student',
    annualIncome: '₹1-3 Lakh',
    profilePictureUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto.format&fit=crop',
    gender: 'Male',
    educationLevel: 'College',
    stream: 'IT',
    skills: 'Java, Python, React',
    careerGoal: 'Job',
};


const CareerPathDisplay: React.FC<{ result: CareerPathResult }> = ({ result }) => {
    const { t } = useTranslation();
    return (
        <div className="mt-8 bg-white p-6 rounded-xl shadow-lg animate-fade-in space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800">{result.roadmapTitle}</h2>
                <p className="mt-2 text-gray-600 max-w-2xl mx-auto">{result.summary}</p>
            </div>

            {/* Skill Gap Analysis */}
            <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('pages.career.results.skillGap.title')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-green-100 p-4 rounded">
                        <h4 className="font-semibold text-green-800">{t('pages.career.results.skillGap.have')}</h4>
                        <ul className="text-sm mt-2">{result.skillAnalysis.userSkills.map(s => <li key={s}>✅ {s}</li>)}</ul>
                    </div>
                    <div className="bg-blue-100 p-4 rounded">
                        <h4 className="font-semibold text-blue-800">{t('pages.career.results.skillGap.need')}</h4>
                        <ul className="text-sm mt-2">{result.skillAnalysis.requiredSkills.map(s => <li key={s}>- {s}</li>)}</ul>
                    </div>
                    <div className="bg-orange-100 p-4 rounded">
                        <h4 className="font-semibold text-orange-800">{t('pages.career.results.skillGap.gap')}</h4>
                        <ul className="text-sm mt-2">{result.skillAnalysis.gapSkills.map(s => <li key={s}>🎯 {s}</li>)}</ul>
                    </div>
                </div>
            </div>

            {/* Learning Plan */}
            <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('pages.career.results.learningPlan.title')}</h3>
                <div className="relative border-l-2 border-orange-200 ml-6 pl-8 space-y-10">
                    {result.learningPath.map((step) => (
                         <div key={step.step} className="relative">
                            <div className="absolute -left-[42px] top-1 w-8 h-8 bg-orange-500 rounded-full text-white flex items-center justify-center font-bold">{step.step}</div>
                            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                                <h4 className="text-xl font-semibold">{step.title} <span className="text-sm text-gray-500">({step.duration})</span></h4>
                                <p className="text-gray-600 mt-2 text-sm">{step.description}</p>
                                <div className="mt-3">
                                    <h5 className="font-semibold text-xs text-gray-700 uppercase">{t('pages.career.results.learningPlan.resources')}</h5>
                                    <div className="space-y-2 mt-2">
                                        {step.resources.map((res, i) => (
                                            <a key={i} href={res.link} target="_blank" rel="noopener noreferrer" className="flex items-center p-2 bg-white rounded-md border hover:bg-orange-50 transition">
                                                <span className={`text-xs font-semibold uppercase text-white ${res.type === 'Govt. Free Course' ? 'bg-green-500' : 'bg-orange-400'} px-2 py-0.5 rounded-full mr-3`}>{res.type}</span>
                                                <span className="text-sm text-orange-600 font-medium hover:underline">{res.name}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Interview Prep */}
            <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('pages.career.results.interviewPrep.title')}</h3>
                <p className="text-sm text-gray-600 mb-4">{t('pages.career.results.interviewPrep.intro')}</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm pl-4">
                    {result.interviewQuestions.map((q, i) => <li key={i}>{q}</li>)}
                </ul>
                <button className="mt-6 w-full md:w-auto bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 transition">
                    {t('pages.career.results.interviewPrep.start')}
                </button>
            </div>

            {/* Job Matches */}
            <div>
                 <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('pages.career.results.jobMatches.title')}</h3>
                 <p className="text-sm text-gray-600 mb-4">{t('pages.career.results.jobMatches.description')}</p>
                 <div className="space-y-4">
                     {result.suggestedJobs.map((job, i) => (
                         <a key={i} href={job.link} target="_blank" rel="noopener noreferrer" className="block bg-white p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow border">
                             <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-bold text-gray-900">{job.title}</p>
                                    <p className="text-sm text-gray-600">{job.company} - {job.location}</p>
                                </div>
                                <span className="text-orange-500 font-semibold">&rarr;</span>
                            </div>
                         </a>
                     ))}
                 </div>
            </div>
        </div>
    );
}


const CareerAndSkillingPage: React.FC = () => {
    const { t } = useTranslation();
    const [dreamJob, setDreamJob] = useState('');
    const [careerPath, setCareerPath] = useState<CareerPathResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setCareerPath(null);
        try {
            const result = await generateCareerPath(mockUserProfile, dreamJob);
            setCareerPath(result);
        } catch (err) {
            setError(t('pages.career.results.error'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <section className="relative bg-cover bg-center text-white py-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto.format&fit=crop')" }}>
                <div className="absolute inset-0 bg-black opacity-60"></div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">{t('pages.career.heroTitle')}</h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">{t('pages.career.heroSubtitle')}</p>
                </div>
            </section>

            <main className="container mx-auto px-4 md:px-6 py-12">
                <BackButton to="/" className="mb-8" />
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white p-8 rounded-xl shadow-lg">
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">{t('pages.career.form.title')}</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="text"
                                value={dreamJob}
                                onChange={e => setDreamJob(e.target.value)}
                                placeholder={t('pages.career.form.placeholder')}
                                className="flex-grow w-full bg-white border-gray-300 rounded-md shadow-sm p-4 text-gray-900 text-lg focus:ring-2 focus:ring-orange-500"
                                required
                            />
                            <button type="submit" disabled={isLoading} className="bg-orange-500 text-white font-bold px-8 py-4 rounded-md hover:bg-orange-600 transition disabled:bg-orange-300">
                                {isLoading ? t('pages.career.form.loading') : t('pages.career.form.button')}
                            </button>
                        </form>
                    </div>

                    {isLoading && <p className="text-center mt-8 text-lg text-gray-700 animate-pulse">{t('pages.career.form.loading')}</p>}
                    {error && <div className="mt-8 text-center p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>}
                    {careerPath && <CareerPathDisplay result={careerPath} />}
                </div>
            </main>
        </div>
    );
};

export default CareerAndSkillingPage;

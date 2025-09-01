import React, { useState } from 'react';
import { ICONS } from '../constants';
import { getSeniorCitizenAIResponse } from '../services/geminiService';

// --- Reusable Components ---

const AccordionSection: React.FC<{ title: string; Icon: React.ElementType; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, Icon, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="mb-4 bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-5 text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                aria-expanded={isOpen}
            >
                <div className="flex items-center">
                    <Icon className="h-10 w-10 text-orange-500 mr-4" />
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800">{title}</h2>
                </div>
                <svg className={`w-6 h-6 text-gray-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            {isOpen && (
                <div className="px-6 pb-6 pt-4 border-t border-gray-200">
                    {children}
                </div>
            )}
        </div>
    );
};

const FeatureCard: React.FC<{ title: string; description: string; links: { name: string; url: string }[] }> = ({ title, description, links }) => (
    <div className="bg-gray-50 p-5 rounded-lg shadow-sm border-l-4 border-orange-400 h-full flex flex-col justify-between">
        <div>
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
            <p className="text-gray-600 text-base mt-2">{description}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
            {links.map(link => (
                <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm bg-orange-500 text-white font-semibold px-3 py-1 rounded-md hover:bg-orange-600 transition duration-300">
                    {link.name} &rarr;
                </a>
            ))}
        </div>
    </div>
);

const AIQueryBox: React.FC<{ title: string; description: string; placeholder: string; systemInstruction: string; }> = ({ title, description, placeholder, systemInstruction }) => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        if (!input.trim()) return;
        setIsLoading(true);
        setError('');
        setResponse('');
        try {
            const result = await getSeniorCitizenAIResponse(input, systemInstruction);
            setResponse(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-blue-50 p-5 rounded-lg shadow-sm border-l-4 border-blue-400">
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
            <p className="text-gray-600 text-base mt-2 mb-4">{description}</p>
            <div className="flex flex-col sm:flex-row gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={placeholder}
                    className="flex-grow border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 p-3 bg-white text-gray-900 text-base"
                    disabled={isLoading}
                />
                <button onClick={handleSubmit} disabled={isLoading} className="bg-blue-600 text-white font-bold px-6 py-3 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400">
                    {isLoading ? 'Thinking...' : 'Ask'}
                </button>
            </div>
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            {response && (
                <div className="mt-4 p-4 bg-white border rounded-md max-h-60 overflow-y-auto">
                    <h4 className="font-semibold text-gray-800 mb-2">Assistant says:</h4>
                    <p className="text-gray-700 text-base whitespace-pre-wrap">{response}</p>
                </div>
            )}
        </div>
    );
};

const SeniorCitizensPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-blue-50">
        {/* Hero Section */}
        <section className="relative bg-cover bg-center text-white py-20 text-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1543269664-76bc3997d9ea?q=80&w=2070&auto=format&fit=crop')"}}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="container mx-auto px-6 relative z-10">
                <h1 className="text-4xl md:text-6xl font-bold">Golden Years Gateway</h1>
                <p className="mt-4 text-xl text-gray-200 max-w-3xl mx-auto">
                    Your trusted hub for health, community, and services to support a vibrant senior life.
                </p>
            </div>
        </section>

        <main className="container mx-auto px-4 md:px-6 py-12">
            <AccordionSection title="Useful Services" Icon={ICONS.Shield} defaultOpen>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FeatureCard 
                        title="Healthcare Services"
                        description="Book doctor appointments, get medicine reminders, and find local health resources."
                        links={[
                            { name: 'Book on Practo', url: 'https://www.practo.com/' },
                            { name: 'Apollo 24/7', url: 'https://www.apollo247.com/' }
                        ]}
                    />
                    <AIQueryBox 
                        title="Health Assistant"
                        description="Ask general health questions. Note: This is not medical advice. Always consult a doctor."
                        placeholder="e.g., What are some light exercises for knee pain?"
                        systemInstruction="You are a helpful health assistant for senior citizens in India. Provide general, easy-to-understand health information and tips. Be encouraging. Always include a disclaimer to consult a real doctor for medical advice."
                    />
                     <AIQueryBox 
                        title="Pension & Scheme Finder"
                        description="Describe your situation to find relevant government schemes and pension information."
                        placeholder="e.g., I am 68 and live in Kerala, what schemes apply to me?"
                        systemInstruction="You are an expert on Indian government schemes for senior citizens. Based on user input, identify and explain relevant schemes. Provide eligibility and benefits in simple, large-font friendly terms."
                    />
                    <AIQueryBox 
                        title="Legal Aid"
                        description="Get simple explanations for legal questions about senior rights, property, and wills. This is not legal advice."
                        placeholder="e.g., Explain what a will is in simple terms."
                        systemInstruction="You are a legal assistant providing basic information on Indian laws relevant to senior citizens. Explain concepts clearly and simply. Always state that this is not legal advice and a professional lawyer should be consulted for any legal matter."
                    />
                </div>
            </AccordionSection>

            <AccordionSection title="Community & Learning" Icon={ICONS.Student}>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <FeatureCard 
                        title="Hobbies & Learning"
                        description="Find online classes, workshops, and video tutorials for hobbies like gardening, music, or arts & crafts."
                        links={[
                            { name: 'Learn on YouTube', url: 'https://www.youtube.com/' },
                            { name: 'Online Courses', url: 'https://www.coursera.org/' }
                        ]}
                    />
                     <AIQueryBox 
                        title="Hobby & Activity Finder"
                        description="Tell us what you like, and our assistant will suggest new hobbies and activities for you to try."
                        placeholder="e.g., I enjoy reading and quiet activities."
                        systemInstruction="You are a friendly and creative assistant suggesting safe and engaging hobbies for senior citizens in India based on their interests. Provide a few ideas with simple steps to get started."
                    />
                </div>
            </AccordionSection>

            <AccordionSection title="Resources for Independence" Icon={ICONS.Lightbulb}>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <AIQueryBox 
                        title="Digital Tutor"
                        description="Get simple, step-by-step instructions for using smartphones, apps, and websites."
                        placeholder="e.g., How do I make a WhatsApp video call?"
                        systemInstruction="You are a patient and clear digital tutor for senior citizens. Explain how to use technology (like smartphones, WhatsApp, Google Pay) in very simple, numbered steps. Avoid technical jargon and be encouraging."
                    />
                    <AIQueryBox 
                        title="Finance Explainer"
                        description="Understand financial topics like online banking, digital wallets, and savings plans. This is not financial advice."
                        placeholder="e.g., What is a fixed deposit?"
                        systemInstruction="You are a financial literacy guide for senior citizens in India. Explain financial concepts simply and clearly. Use relatable examples. Always include a strong disclaimer that this is educational information, not financial advice, and a professional advisor should be consulted."
                    />
                    <AIQueryBox 
                        title="Safety Tips"
                        description="Ask for safety tips for living independently at home or while traveling."
                        placeholder="e.g., Home safety tips for living alone."
                        systemInstruction="You are a safety expert for senior citizens. Provide practical and easy-to-implement safety tips for various situations (home, travel, online). Keep the tone calm and reassuring."
                    />
                     <FeatureCard 
                        title="Emergency Contacts"
                        description="Quick access to essential emergency numbers for immediate help."
                        links={[
                            { name: 'National Helpline: 14567', url: 'tel:14567' },
                            { name: 'Police: 100', url: 'tel:100' },
                            { name: 'Ambulance: 102', url: 'tel:102' }
                        ]}
                    />
                </div>
            </AccordionSection>

            <div className="mt-12 text-center bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800">A Trusted & Accessible Space</h2>
                <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                    We are committed to providing verified information in a simple, secure, and accessible way. Our design uses large fonts, high contrast, and easy navigation to ensure a comfortable experience for all our senior users.
                </p>
            </div>
        </main>
    </div>
  );
};

export default SeniorCitizensPage;
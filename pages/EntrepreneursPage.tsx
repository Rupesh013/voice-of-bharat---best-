import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import BackButton from '../components/BackButton';

// --- Reusable Components ---

const AccordionSection: React.FC<{ title: string; level: number; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, level, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="mb-4 bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-5 text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-orange-500 rounded-lg"
            >
                <h2 className="text-xl md:text-2xl font-bold text-orange-400 flex items-center">
                    <span className="bg-orange-500 text-white rounded-full h-8 w-8 text-base inline-flex items-center justify-center mr-4 flex-shrink-0">{level}</span>
                    {title}
                </h2>
                <svg className={`w-6 h-6 text-gray-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            {isOpen && (
                <div className="px-6 pb-6 text-gray-300 animate-fade-in border-t border-gray-700">
                    {children}
                </div>
            )}
        </div>
    );
};

const Module: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mt-6 border-t border-gray-700 pt-5">
        <h3 className="text-lg md:text-xl font-semibold text-white mb-3">{title}</h3>
        <div className="space-y-4 text-sm md:text-base">{children}</div>
    </div>
);

const ResourceCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
     <div className="mt-8 bg-gray-900 p-4 rounded-lg border border-gray-700">
        <h3 className="text-xl font-bold text-orange-300 mb-4">{title}</h3>
        <div className="space-y-4">{children}</div>
    </div>
);

const ResourceLink: React.FC<{ href: string; title: string; description?: string; links?: {name: string, url: string}[] }> = ({ href, title, description, links }) => (
    <div className="block bg-gray-700 p-4 rounded-md hover:bg-gray-600 transition-colors">
        <a href={href} target="_blank" rel="noopener noreferrer">
            <h4 className="font-semibold text-cyan-400 hover:underline">{title}</h4>
            {description && <p className="text-xs text-gray-400 mt-1">{description}</p>}
        </a>
        {links && (
             <div className="flex flex-wrap gap-2 mt-2">
                {links.map(link => (
                    <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="text-xs bg-gray-600 px-2 py-1 rounded-full hover:bg-gray-500">{link.name}</a>
                ))}
            </div>
        )}
    </div>
);

const EntrepreneursPage: React.FC = () => {
    const { t } = useTranslation();
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Hero Section */}
        <section className="bg-gray-800 text-center py-20 relative overflow-hidden" style={{backgroundImage: "url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2832&auto=format&fit=crop')"}}>
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="container mx-auto px-6 relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold">{t('pages.entrepreneurs.heroTitle')}</h1>
                <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
                    {t('pages.entrepreneurs.heroSubtitle')}
                </p>
            </div>
        </section>

        <main className="container mx-auto px-4 md:px-6 py-12">
            <BackButton to="/" className="mb-8" />
            
            {/* Level 1 */}
            <AccordionSection level={1} title={t('pages.entrepreneurs.level1Title')} defaultOpen>
                <p className="font-semibold text-lg mb-4 text-gray-200">🔹 {t('pages.entrepreneurs.level1Goal')}</p>
                <Module title="1. What is Entrepreneurship? (Myths vs Reality)">
                    <p className="bg-gray-700 p-3 rounded-md"><strong>Definition:</strong> Entrepreneurship is the process of identifying, developing, and bringing a business idea to life by taking financial, strategic, and personal risks.</p>
                    <h4 className="font-semibold mt-4">Common Myths vs. Reality</h4>
                    <div className="overflow-x-auto mt-2">
                        <table className="min-w-full text-sm">
                           <thead className="bg-gray-700"><tr className="text-left"><th className="p-2">Myth</th><th className="p-2">Reality</th></tr></thead>
                           <tbody className="divide-y divide-gray-700">
                                <tr className="bg-gray-800/50"><td className="p-2 align-top">Entrepreneurs are born, not made.</td><td className="p-2 align-top">Skills like leadership, negotiation, and innovation can be learned and developed.</td></tr>
                                <tr className="bg-gray-800/50"><td className="p-2 align-top">You need a lot of money to start.</td><td className="p-2 align-top">Many startups begin small with bootstrapping, side hustles, or crowdfunding.</td></tr>
                                <tr className="bg-gray-800/50"><td className="p-2 align-top">Entrepreneurship = instant success & freedom.</td><td className="p-2 align-top">Reality is long working hours, failures, and persistence before stability.</td></tr>
                                <tr className="bg-gray-800/50"><td className="p-2 align-top">Good ideas guarantee success.</td><td className="p-2 align-top">Execution, timing, and team matter more than just the idea.</td></tr>
                                <tr className="bg-gray-800/50"><td className="p-2 align-top">Entrepreneurs work alone.</td><td className="p-2 align-top">Networks, mentors, co-founders, and teams drive success.</td></tr>
                           </tbody>
                        </table>
                    </div>
                </Module>
                <Module title="2. Traits of Successful Entrepreneurs">
                    <ul className="list-disc list-inside space-y-1">
                        <li>✅ <strong>Resilience:</strong> Ability to bounce back after failures (failure is feedback).</li>
                        <li>✅ <strong>Risk-taking:</strong> Calculated risks, not blind gambles.</li>
                        <li>✅ <strong>Creativity & Innovation:</strong> Seeing gaps in the market and building unique solutions.</li>
                        <li>✅ <strong>Vision:</strong> Clear long-term goal & mission.</li>
                        <li>✅ <strong>Adaptability:</strong> Pivoting when the market changes.</li>
                        <li>✅ <strong>Networking skills:</strong> Building strong relationships.</li>
                        <li>✅ <strong>Execution:</strong> Turning ideas into actionable results.</li>
                    </ul>
                </Module>
                <Module title="3. Business Models 101">
                     <ul className="list-disc list-inside space-y-2">
                        <li><strong>B2C (Business-to-Consumer):</strong> Sell directly to consumers. (e.g., Amazon, Swiggy).</li>
                        <li><strong>B2B (Business-to-Business):</strong> Sell products/services to other businesses. (e.g., Salesforce).</li>
                        <li><strong>SaaS (Software-as-a-Service):</strong> Subscription-based software. (e.g., Zoom, Canva).</li>
                        <li><strong>Marketplace Model:</strong> Connects buyers & sellers, earns via commissions. (e.g., Airbnb, Flipkart).</li>
                        <li><strong>D2C (Direct-to-Consumer):</strong> Brands sell directly to customers online. (e.g., Mamaearth, boAt).</li>
                    </ul>
                </Module>
                <Module title="4. Problem-Solving Frameworks">
                     <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-700 p-4 rounded-lg">
                            <h4 className="font-bold">Design Thinking</h4>
                            <ol className="list-decimal list-inside mt-2"><li>Empathize</li><li>Define</li><li>Ideate</li><li>Prototype</li><li>Test</li></ol>
                        </div>
                         <div className="bg-gray-700 p-4 rounded-lg">
                            <h4 className="font-bold">Lean Startup</h4>
                            <ol className="list-decimal list-inside mt-2"><li>Build (MVP)</li><li>Measure</li><li>Learn</li></ol>
                        </div>
                    </div>
                </Module>
                <Module title="5. Identifying Market Opportunities">
                    <p>Find ideas from pain points, new trends, market gaps, or policy shifts. Validate with tools like Google Trends, surveys, and competitor analysis.</p>
                </Module>
                 <ResourceCard title="📌 Resources">
                    <ResourceLink href="https://youtu.be/pC5l5j2u9SQ" title="🎥 What is Entrepreneurship? (Myths vs Reality)" />
                    <ResourceLink href="https://en.wikipedia.org/wiki/The_Lean_Startup?utm_source=chatgpt.com" title="📘 Book: The Lean Startup (Eric Ries)" links={[{name: 'PDF Summary', url: 'https://alumni.lincolncollege.ac.uk/files/2016/11/The-Lean-Startup-by-Eric-Ries-Book-Summary.pdf?utm_source=chatgpt.com'}, {name: 'Slides', url: 'https://www.slideshare.net/slideshow/summary-of-the-lean-startup-book-by-eric-ries/270534942?utm_source=chatgpt.com'}]} />
                    <ResourceLink href="https://mitxonline.mit.edu/courses/course-v1%3AMITxT%2BBootcamp1?utm_source=chatgpt.com" title="🎓 Free Course: MIT Entrepreneurship 101" />
                    <ResourceLink href="https://www.canva.com/graphs/business-model-canvas/?utm_source=chatgpt.com" title="🛠️ Business Model Canvas Generators" links={[{name: 'Canvanizer', url: '#'}, {name: 'Miro', url: 'https://miro.com/templates/business-model-canvas/?utm_source=chatgpt.com'}]} />
                </ResourceCard>
            </AccordionSection>

            {/* Level 2 */}
            <AccordionSection level={2} title="Idea Validation & Market Research">
                <p className="font-semibold text-lg mb-4 text-gray-200">🔹 Goal: Test if your idea has demand before building.</p>
                <Module title="1. Customer Discovery & MVP Creation">
                    <p>Before building, talk to potential customers to validate the problem. Then, create an MVP (Minimum Viable Product) - the simplest version of your product to test the solution.</p>
                    <p>👉 <strong>Example:</strong> Dropbox’s first MVP was just a video showing how it would work. It got thousands of signups before they built the software.</p>
                </Module>
                <Module title="2. Competitive Analysis & SWOT">
                    <p>Analyze your competitors to find gaps. Use SWOT (Strengths, Weaknesses, Opportunities, Threats) to understand your position.</p>
                    <p>👉 <strong>Example:</strong> Ola used “cash payments” as a strength in India, an opportunity competitors missed.</p>
                </Module>
                <Module title="3. Defining Target Audience">
                    <p>Don’t sell to everyone. Define your ideal customer using Personas and estimate your market size with TAM-SAM-SOM (Total, Serviceable, and Obtainable Market).</p>
                    <p>👉 <strong>Example:</strong> Mamaearth focused on young parents (SOM) before expanding.</p>
                </Module>
                 <ResourceCard title="📌 Resources">
                    <ResourceLink href="https://trends.google.com/?utm_source=chatgpt.com" title="🛠️ Free Tool: Google Trends" description="Analyze what people are searching for."/>
                    <ResourceLink href="https://www.typeform.com/?utm_source=chatgpt.com" title="🛠️ Free Tool: Typeform" description="Create engaging surveys for customer feedback."/>
                    <ResourceLink href="https://www.youtube.com/watch?v=7QmCUDHpNzE" title="📊 Case Study: Dropbox MVP Video" description="See the video that validated the idea overnight."/>
                </ResourceCard>
            </AccordionSection>
        </main>
      </div>
    );
};

// FIX: Added default export for the EntrepreneursPage component.
export default EntrepreneursPage;
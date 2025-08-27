
import React, { useState } from 'react';
import { INTERNSHIPS, POPULAR_INTERNSHIPS, PLACEMENTS } from '../constants';

const TABS = ["Internships", "Placements", "Resource Sheet", "Roadmap"];

const TabButton: React.FC<{ label: string; isActive: boolean; onClick: () => void; }> = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm md:text-base font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-300 rounded-t-lg ${
            isActive
                ? 'bg-white border-gray-200 border-t border-x -mb-px text-orange-600'
                : 'text-gray-500 hover:text-gray-700 bg-gray-100'
        }`}
    >
        {label}
    </button>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-orange-200">{title}</h2>
    {children}
  </div>
);

const InternshipTable: React.FC<{ data: typeof INTERNSHIPS[keyof typeof INTERNSHIPS] }> = ({ data }) => (
    <div className="overflow-x-auto">
        <table className="min-w-full bg-white text-sm">
            <thead className="bg-gray-100">
                <tr>
                    {['Company', 'Eligibility', 'Application Period', 'Monthly Stipend (₹)', 'Website'].map(h => <th key={h} className="py-3 px-4 text-left font-semibold text-gray-600">{h}</th>)}
                </tr>
            </thead>
            <tbody className="text-gray-700">
                {data.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-semibold">{item.company}</td>
                        <td className="py-3 px-4">{item.eligibility}</td>
                        <td className="py-3 px-4">{item.period}</td>
                        <td className="py-3 px-4">{item.stipend}</td>
                        <td className="py-3 px-4"><a href={item.link} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline font-semibold">Apply</a></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const InternshipsPlacementsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState(TABS[0]);

    const renderContent = () => {
        switch (activeTab) {
            case "Internships":
                return (
                    <div>
                        {Object.entries(INTERNSHIPS).map(([category, data]) => (
                            <Section key={category} title={category}>
                                <InternshipTable data={data} />
                            </Section>
                        ))}
                         <Section title="Other Popular Internships">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {POPULAR_INTERNSHIPS.map(item => (
                                    <div key={item.company} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-orange-500">
                                        <h3 className="font-bold text-lg">{item.company} - {item.program}</h3>
                                        <p className="text-sm text-gray-600 mt-1"><strong>Eligibility:</strong> {item.eligibility}</p>
                                        <p className="text-sm text-gray-600"><strong>Period:</strong> {item.period}</p>
                                        <p className="font-semibold text-green-600 mt-2">Stipend: {item.stipend}</p>
                                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm text-orange-600 hover:underline font-semibold mt-2 inline-block">More Details &rarr;</a>
                                    </div>
                                ))}
                            </div>
                        </Section>
                    </div>
                );
            case "Placements":
                 return (
                    <Section title="Off-Campus Placement Drives">
                        <p className="text-gray-600 mb-6">Many high-paying companies conduct placement drives during specific times. Here are links to some of the most popular ones.</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {PLACEMENTS.map(p => (
                                <a key={p.company} href={p.link} target="_blank" rel="noopener noreferrer" className="bg-white p-4 rounded-lg shadow-sm text-center font-bold text-gray-800 hover:shadow-lg hover:text-orange-600 transition">
                                    {p.company}
                                </a>
                            ))}
                        </div>
                         <a href="https://takeuforward.org/interviews/sde-off-campus-placement-calendar-freshers/" target="_blank" rel="noopener noreferrer" className="mt-8 inline-block bg-orange-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-orange-600">
                            View Full Off-Campus Placement Calendar
                        </a>
                    </Section>
                );
             case "Resource Sheet":
                return (
                    <div>
                        <Section title="Data Structures and Algorithms (DSA)">
                             <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li><a href="https://youtube.com/playlist?list=PLhQjrBD2T381WAHyx1pq-sBfykqMBI7V4" className="text-orange-600 hover:underline">CS50's Introduction to Computer Science by Harvard University</a> (Beginner)</li>
                                <li><a href="https://youtube.com/playlist?list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz" className="text-orange-600 hover:underline">Striver DSA Playlist</a> (Beginner to Intermediate)</li>
                                <li><a href="https://www.coursera.org/specializations/data-structures-algorithms" className="text-orange-600 hover:underline">Data Structures and Algorithms Specialization by UC San Diego</a> (Intermediate)</li>
                             </ul>
                        </Section>
                         <Section title="Web Development">
                             <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li><a href="https://youtube.com/playlist?list=PLu0W_9lII9agq5TrH9XLIKQvv0iaF2X3w" className="text-orange-600 hover:underline">Code with Harry Sigma Course</a> (Full Stack)</li>
                                <li><a href="https://www.freecodecamp.org/news/learn-web-development-with-this-free-20-hour-course/" className="text-orange-600 hover:underline">Free Code Camp Web Development Course</a></li>
                             </ul>
                        </Section>
                    </div>
                );
            case "Roadmap":
                 return (
                    <Section title="100-Day Internship/Placement Roadmap">
                        <div className="space-y-8">
                            <div>
                                <h3 className="font-bold text-xl text-gray-800">Days 1-25: Aptitude & Reasoning</h3>
                                <p className="text-gray-600 mt-2">Focus on Quantitative Aptitude, Logical Reasoning, and Verbal Ability. This is crucial for the first round of most placement drives.</p>
                                <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                                    <li>Resource: <a href="https://www.indiabix.com/" className="text-orange-600 hover:underline">IndiaBix</a> for practice.</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-xl text-gray-800">Days 26-70: Coding & DSA Problem-Solving</h3>
                                <p className="text-gray-600 mt-2">This is the most critical phase. Dedicate around 6 hours a day if possible. Start with patterns and core topics, then move to advanced concepts.</p>
                                 <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                                    <li>Core Topics: Arrays, Strings, Linked List, Stacks, Queues.</li>
                                    <li>Advanced Topics: Greedy, Recursion, Trees, Graphs, Dynamic Programming.</li>
                                    <li>Platform: <a href="https://leetcode.com/problemset/" className="text-orange-600 hover:underline">Leetcode</a>.</li>
                                    <li>Structured Sheet: <a href="https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/" className="text-orange-600 hover:underline">Striver A2Z DSA Sheet</a> (Highly Recommended).</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-xl text-gray-800">Days 71-100: Core CS Fundamentals & Revision</h3>
                                <p className="text-gray-600 mt-2">Revise OOPS, DBMS, and Operating Systems. These are frequently asked in technical interviews.</p>
                                 <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                                    <li>Resource: <a href="https://www.geeksforgeeks.org/operating-systems/" className="text-orange-600 hover:underline">GeeksForGeeks for OS concepts</a>.</li>
                                </ul>
                            </div>
                        </div>
                    </Section>
                );
            default: return null;
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <section className="bg-orange-600 text-white py-20 text-center">
                <h1 className="text-4xl md:text-5xl font-bold">Internships & Placements Hub</h1>
                <p className="mt-4 text-lg max-w-3xl mx-auto">
                    Your complete guide to landing top internships and placements.
                </p>
            </section>
            
            <main className="container mx-auto px-4 sm:px-6 py-12">
                <div className="flex flex-wrap border-b border-gray-200">
                    {TABS.map(tab => (
                        <TabButton
                            key={tab}
                            label={tab}
                            isActive={activeTab === tab}
                            onClick={() => setActiveTab(tab)}
                        />
                    ))}
                </div>
                <div className="bg-white p-6 rounded-b-lg shadow-md">
                   {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default InternshipsPlacementsPage;

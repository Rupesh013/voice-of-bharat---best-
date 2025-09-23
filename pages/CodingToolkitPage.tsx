import React, { useState } from 'react';
import BackButton from '../components/BackButton';

// A helper component for sections
const Section: React.FC<{ title: string; children: React.ReactNode, titleClassName?: string }> = ({ title, children, titleClassName = 'text-orange-400' }) => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${titleClassName}`}>{title}</h2>
        {children}
    </div>
);

// Helper for list items with links
const ListItemLink: React.FC<{ href: string, title: string, description?: string }> = ({ href, title, description }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block bg-gray-700 p-4 rounded-md hover:bg-gray-600 transition-colors">
        <h4 className="font-semibold text-white">{title}</h4>
        {description && <p className="text-sm text-gray-400">{description}</p>}
    </a>
);


const TabButton: React.FC<{ label: string; isActive: boolean; onClick: () => void; }> = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-6 py-3 font-semibold text-lg transition-colors duration-300 ${isActive ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-400 hover:text-orange-500'}`}
    >
        {label}
    </button>
);


// --- LINKEDIN CONTENT ---
const linkedInUses = [
    { emoji: '✅', title: 'Builds Your Online Resume & Personal Brand', points: ['Education', 'Projects', 'Skills', 'Certifications', 'Achievements', 'Portfolio or GitHub/Dribbble links'] },
    { emoji: '🤝', title: 'Connects You with Alumni, Seniors, and Industry Experts', link: 'https://www.linkedin.com/school/', linkText: 'Use LinkedIn Alumni Tool' },
    { emoji: '💼', title: 'Discover Internships & Jobs', link: 'https://www.linkedin.com/jobs/', linkText: 'Find Jobs' },
    { emoji: '📚', title: 'Learn In-Demand Skills with LinkedIn Learning', link: 'https://www.linkedin.com/learning', linkText: 'Explore LinkedIn Learning', bonusLink: 'https://premium.linkedin.com/', bonusText: '1-Month Free Premium for Students' },
    { emoji: '💬', title: 'Find Mentors & Career Advice', description: 'Use Career Advice feature to connect with professionals.' },
    { emoji: '🎯', title: 'Showcase Achievements to a Professional Audience', description: 'Share Hackathon wins, Projects, Certificates, Internships.' },
    { emoji: '🧠', title: 'Personal Growth & Motivation', description: 'Follow career leaders like Ankur Warikoo, Harsh Goenka, Kunal Shah.' },
    { emoji: '🌍', title: 'Get International Exposure', description: 'Connect with Stanford, MIT students, Google employees, International mentors.' },
    { emoji: '💡', title: 'Get Inspired by Other Students', description: 'Learn from peers who cracked Google, Microsoft internships.' },
    { emoji: '🧑‍🎨', title: 'Freelancing & Side Hustles', description: 'Use your profile to get freelance work in Graphic Design, Web Development, Content Writing, Marketing.' }
];
const realExamples = [
    { useCase: 'Final-year B.Tech Student', result: 'Got internship at Accenture via LinkedIn job' },
    { useCase: 'Design Student', result: 'Found freelance clients through UI posts' },
    { useCase: 'First-year B.Com Student', result: 'Connected with CA mentors for assistantship' },
    { useCase: 'Self-taught coder', result: 'Used LinkedIn Learning + networking to get a referral' },
    { useCase: 'B.Sc Student', result: 'Found research internships shared by IIT mentors' }
];
const ultimateToolkit = [
    { title: '1. GitHub Student Developer Pack', description: '100+ free premium tools for students', link: 'https://education.github.com/pack' },
    { title: '2. LinkedIn Learning – Premium Courses', description: 'Learn coding, soft skills, business, etc.', link: 'https://www.linkedin.com/learning' },
    { title: '3. Google Career Certificates', description: 'Learn Data Analytics, IT, UX, etc.', link: 'https://grow.google/certificates/' },
    { title: '4. Internshala – Internships & Trainings', description: 'Apply for remote/on-site internships', link: 'https://internshala.com' },
    { title: '5. TCS iON Career Edge: Soft Skills', description: 'Free certification course on communication & soft skills', link: 'https://learning.tcsionhub.in/courses/career-edge/' },
    { title: '6. Microsoft Learn for Students', description: 'Learn Azure, GitHub, certifications, and career paths', link: 'https://learn.microsoft.com/en-us/training/students/' },
    { title: '7. LeetCode / HackerRank', description: 'DSA, interview prep, contests', link: 'https://leetcode.com' },
    { title: '8. Notion – Student Plan Free', description: 'Notes, tasks, resume, portfolio', link: 'https://www.notion.so/students' },
    { title: '9. Resume & Portfolio Builders', description: 'Canva, Reactive Resume, LinkedIn Portfolio', link: 'https://www.canva.com/resumes/' },
    { title: '10. Join College Tech Communities', description: 'GDSC, Microsoft Learn Ambassadors, MLH', link: 'https://gdsc.community.dev/' }
];
const studentApps = [
    { name: 'Forest', purpose: 'Study Timer (Pomodoro)', link: 'https://www.forestapp.cc/' },
    { name: 'Anki', purpose: 'Flashcards', link: 'https://apps.ankiweb.net/' },
    { name: 'Notion', purpose: 'Notes + Planner', link: 'https://www.notion.so/' },
    { name: 'Grammarly', purpose: 'Grammar + Resume Help', link: 'https://www.grammarly.com/' },
    { name: 'Zotero', purpose: 'Research + Citations', link: 'https://www.zotero.org/' },
    { name: 'Scholarships.com', purpose: 'Scholarships', link: 'https://www.scholarships.com/' }
];
const roadmapSteps = [
    { year: '1st Year', title: 'Foundation & Awareness', tasks: ['Create profile, add photo, college info', 'Add basic skills', 'Connect with classmates, seniors', 'First post: “Excited to begin my B.Tech/BBA journey…”', 'Bonus: Explore 2-3 LinkedIn Learning courses'], color: 'text-green-400' },
    { year: '2nd Year', title: 'Skills & Smart Networking', tasks: ['Add projects, certifications', 'Join groups, follow creators', 'Comment and post once a month', 'Take skill assessments'], color: 'text-blue-400' },
    { year: '3rd Year', title: 'Internship Hunt', tasks: ['Enable “Open to Internship”', 'Update profile headline and featured links', 'Message recruiters', 'Share achievements and projects'], color: 'text-yellow-400' },
    { year: '4th Year', title: 'Job-Ready & Placement Focus', tasks: ['Update ‘About’ section with your story', 'Add all internships and achievements', 'Get recommendations', 'Connect with HRs from dream companies', 'Turn on Creator Mode and post stories'], color: 'text-red-400' }
];
const youtubeVideos = [
    { title: 'How to Master LinkedIn as a Student (Step-by-Step)', link: 'https://www.youtube.com/watch?v=3m0T4YwOE4g' },
    { title: 'LinkedIn Tips for College Students (by CareerVidz)', link: 'https://www.youtube.com/watch?v=QTCqJQwNIiI' },
    { title: 'How to Use LinkedIn Effectively for Career Growth', link: 'https://www.youtube.com/watch?v=9zvPNsDlnw8' },
    { title: 'LinkedIn Profile Tips for Students with No Experience', link: 'https://www.youtube.com/watch?v=apG6jv5g3xw' },
    { title: 'LinkedIn for Students: Build a Powerful Profile (Kunal Kushwaha)', link: 'https://www.youtube.com/watch?v=V3iKDY7pI-s' },
    { title: 'How to Get Internships Using LinkedIn (Strategy + Examples)', link: 'https://www.youtube.com/watch?v=U9aLTSGBSwg' },
    { title: 'LinkedIn Networking for Students (Step-by-Step DM Guide)', link: 'https://www.youtube.com/watch?v=vqfLgYkVnJQ' },
    { title: 'LinkedIn Learning – Best Courses for Students', link: 'https://www.youtube.com/watch?v=bLv-dcL1TYo' },
    { title: 'LinkedIn Resume + Portfolio Buiding for Students', link: 'https://www.youtube.com/watch?v=Nj2nnURCIGI' },
    { title: 'How I Got My Job Through LinkedIn (Student Case Study)', link: 'https://www.youtube.com/watch?v=dOwkeXwY6fg' },
];
const supportLinks = [
    { title: 'Official LinkedIn Help Center', link: 'https://www.linkedin.com/help/' },
    { title: 'Contact LinkedIn Support (Submit a Ticket)', link: 'https://www.linkedin.com/help/linkedin/ask' },
    { title: 'Account Recovery / Forgot Password', link: 'https://www.linkedin.com/checkpoint/rp/request-password-reset' },
    { title: 'LinkedIn Student Support Articles', link: 'https://www.linkedin.com/help/linkedin/answer/a550938' },
    { title: 'LinkedIn Learning Support', link: 'https://www.linkedin.com/help/learning' },
    { title: 'Report a Problem or Bug', link: 'https://www.linkedin.com/help/linkedin/ask/TS-Networking' },
    { title: 'LinkedIn Status Page (for Downtime Issues)', link: 'https://www.linkedin-status.com/' }
];

const LinkedInContent = () => (
    <div className="animate-fade-in">
        <Section title="Why LinkedIn is Your #1 Career Tool">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {linkedInUses.map(item => (
                    <div key={item.title} className="bg-gray-700 p-4 rounded-lg">
                        <h3 className="font-semibold text-lg text-white"><span className="mr-2">{item.emoji}</span>{item.title}</h3>
                        {item.points && <ul className="list-disc list-inside text-sm text-gray-300 mt-2 space-y-1">{item.points.map(p => <li key={p}>{p}</li>)}</ul>}
                        {item.description && <p className="text-sm text-gray-300 mt-2">{item.description}</p>}
                        {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-400 hover:underline mt-2 inline-block">{item.linkText} &rarr;</a>}
                        {item.bonusLink && <a href={item.bonusLink} target="_blank" rel="noopener noreferrer" className="text-sm text-yellow-400 hover:underline ml-2 inline-block">{item.bonusText} &rarr;</a>}
                    </div>
                ))}
            </div>
        </Section>
        <Section title="Real Student Success Stories">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {realExamples.map(ex => (
                    <div key={ex.useCase} className="bg-gray-700 p-4 rounded-lg">
                        <p className="font-semibold text-white">{ex.useCase}</p>
                        <p className="text-green-400">Result: {ex.result}</p>
                    </div>
                ))}
            </div>
        </Section>
        <Section title="The Ultimate Student Career Toolkit (FREE)">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ultimateToolkit.map(tool => <ListItemLink key={tool.title} href={tool.link} title={tool.title} description={tool.description} />)}
            </div>
        </Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Section title="Useful Apps for Students">
                <div className="space-y-3">{studentApps.map(app => <ListItemLink key={app.name} href={app.link} title={app.name} description={app.purpose} />)}</div>
            </Section>
            <Section title="Year-by-Year LinkedIn Roadmap">
                <div className="space-y-4">{roadmapSteps.map(step => (
                    <div key={step.year}>
                        <h3 className={`font-bold text-lg ${step.color}`}>{step.year}: {step.title}</h3>
                        <ul className="list-disc list-inside text-sm text-gray-300 mt-1">{step.tasks.map(t => <li key={t}>{t}</li>)}</ul>
                    </div>
                ))}</div>
            </Section>
        </div>
        <Section title="Top 10 YouTube Videos to Master LinkedIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{youtubeVideos.map(video => <ListItemLink key={video.title} href={video.link} title={video.title} />)}</div>
        </Section>
        <Section title="LinkedIn Support">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{supportLinks.map(link => <ListItemLink key={link.title} href={link.link} title={link.title} />)}</div>
        </Section>
    </div>
);

// --- LEETCODE CONTENT ---
const LeetCodeContent = () => (
    <div className="animate-fade-in text-white">
        {/* Hero Section */}
        <div className="bg-gray-900 text-center py-16 px-6 rounded-lg mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                🚀 Your Path to Coding Excellence
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-orange-400">Master Coding with LeetCode</h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                From Zero to Tech Hero – Practice, Learn, Succeed. Join thousands of developers who've landed their dream jobs.
            </p>
            <div className="my-6 text-xl font-bold bg-white/10 inline-block px-4 py-2 rounded-md">2500+ Problems</div>
             <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <a 
                href="https://www.youtube.com/watch?v=Nx4bvwU0DqE" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-gray-800 font-semibold px-8 py-3 rounded-md hover:bg-gray-200 transition duration-300 text-lg"
                >
                Watch Demo
                </a>
                <a 
                href="https://leetcode.com/problemset/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-orange-500 text-white font-semibold px-8 py-3 rounded-md hover:bg-orange-600 transition duration-300 text-lg"
                >
                Start LeetCode
                </a>
            </div>
        </div>

        {/* Uses Section */}
        <Section title="Why LeetCode is Essential for Your Daily Coding Life">
            <p className="text-gray-300 mb-6">LeetCode isn't just about passing interviews – it's about becoming a better developer and problem solver in your everyday work.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {['Real-world Coding Practice', 'FAANG/MNC Interview Success', 'Boost Problem-solving & Logic', 'Build Confidence & Consistency', 'Used by Top Companies Worldwide'].map(text => (
                    <div key={text} className="bg-gray-700 p-4 rounded-lg text-center font-semibold">{text}</div>
                ))}
            </div>
             <p className="text-center text-lg italic text-orange-300 mb-8">"LeetCode isn’t just a platform — it’s your personal launchpad to tech success."</p>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-xl font-bold mb-2">✅ 1. Real-World Problem Solving</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                        <li>🧠 Improves logical and analytical thinking</li>
                        <li>📦 Prepares you for real-world job scenarios</li>
                        <li>⛓ Builds structured thinking via algorithms</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-2">💼 2. Get Hired by Top Tech Companies</h3>
                     <ul className="list-disc list-inside text-gray-300 space-y-1">
                        <li>💬 90% of tech interviews today include LeetCode-style questions</li>
                        <li>🏢 Used for hiring by FAANG and top MNCs</li>
                        <li>🧪 Includes company-specific mock interviews (with Premium)</li>
                    </ul>
                </div>
                 <div>
                    <h3 className="text-xl font-bold mb-2">🎯 3. Perfect for All Levels</h3>
                     <ul className="list-disc list-inside text-gray-300 space-y-1">
                        <li>👶 Beginners: Start with guided Explore cards</li>
                        <li>🎓 Students: Build your DSA foundation</li>
                        <li>👨‍💼 Professionals: Crack your next role confidently</li>
                    </ul>
                </div>
                 <div>
                    <h3 className="text-xl font-bold mb-2">🔁 4. Build Daily Coding Discipline</h3>
                     <ul className="list-disc list-inside text-gray-300 space-y-1">
                        <li>Solve 1 problem per day</li>
                        <li>Join contests and track your rank</li>
                        <li>Stay consistent, and see your growth 📈</li>
                    </ul>
                </div>
                 <div>
                    <h3 className="text-xl font-bold mb-2">📚 5. Learn Multiple Tech Subjects</h3>
                     <ul className="list-disc list-inside text-gray-300 space-y-1">
                        <li>SQL, Databases, System Design</li>
                        <li>Concurrency, Backend & Frontend questions</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-2">🌍 6. Join a Global Coding Community</h3>
                     <ul className="list-disc list-inside text-gray-300 space-y-1">
                        <li>Collaborate in the Discuss Forum</li>
                        <li>Read optimized solutions by others</li>
                        <li>Share your knowledge and get feedback</li>
                    </ul>
                </div>
             </div>
        </Section>

        {/* Roadmap Section */}
        <Section title="🗺 LeetCode Roadmap – From Beginner to Pro">
            <p className="text-center text-gray-300 mb-8">A complete path to crack coding interviews with LeetCode.</p>
            <div className="space-y-8">
                {[
                    { level: 1, title: 'Get Comfortable with Basics', description: 'Start with fundamentals. Learn and practice basic data structures.', links: [{ name: 'Arrays', url: 'https://leetcode.com/tag/array/' }, { name: 'Strings', url: 'https://leetcode.com/tag/string/' }, { name: 'Hash Maps', url: 'https://leetcode.com/tag/hash-table/' }], video: { name: 'LeetCode Tutorial for Beginners (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=8hly31xKli0' } },
                    { level: 2, title: 'Solve Core Easy Questions', description: 'Improve your thinking and problem-solving speed.', links: [{ name: 'Two Pointers', url: 'https://leetcode.com/tag/two-pointers/' }, { name: 'Stack', url: 'https://leetcode.com/tag/stack/' }, { name: 'Queue', url: 'https://leetcode.com/tag/queue/' }], video: { name: 'How to Use LeetCode Effectively (NeetCode)', url: 'https://www.youtube.com/watch?v=WRlWj1n6yWE' } },
                    { level: 3, title: 'LeetCode 75 Challenge', description: 'The best curated 75-question set covering key interview topics.', links: [{ name: 'Start LeetCode 75 Challenge', url: 'https://leetcode.com/study-plan/leetcode-75/' }], video: { name: 'LeetCode 75 Explained (TechTFQ)', url: 'https://www.youtube.com/watch?v=92pDr4g7YOo' } },
                    { level: 4, title: 'Medium-Level Mastery', description: 'Tackle intermediate concepts and patterns.', links: [{ name: 'Dynamic Programming', url: 'https://leetcode.com/tag/dynamic-programming/' }, { name: 'Graph – DFS & BFS', url: 'https://leetcode.com/tag/graph/' }], video: { name: 'DP for Beginners (NeetCode)', url: 'https://www.youtube.com/watch?v=oBt53YbR9Kk' } },
                    { level: 5, title: 'Mock Interviews & Premium Prep', description: 'Simulate real interviews and study company-specific questions.', links: [{ name: 'Mock Interview Simulator (Premium)', url: 'https://leetcode.com/mock-interview/' }, { name: 'Company-Specific Problems (Premium)', url: 'https://leetcode.com/problemset/all/?topicSlugs=google' }], video: { name: 'How I Got Offers from Google & Amazon (Clément)', url: 'https://www.youtube.com/watch?v=Y8V93fDq4m4' } },
                    { level: 6, title: 'Contests, Profile & Resume', description: 'Build your public profile and enter global contests.', links: [{ name: 'Weekly Contest Page', url: 'https://leetcode.com/contest/' }, { name: 'My LeetCode Profile', url: 'https://leetcode.com/profile/' }], video: { name: 'Google Mock Interview (TechLead)', url: 'https://www.youtube.com/watch?v=AxNNVECce8c' } }
                ].map(step => (
                    <div key={step.level} className="bg-gray-700 p-4 rounded-lg">
                        <h3 className="text-xl font-bold text-orange-300">✅ Level {step.level}: {step.title}</h3>
                        <p className="text-gray-300 mt-2">{step.description}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                            {step.links.map(link => <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="text-xs bg-gray-600 px-2 py-1 rounded-full hover:bg-gray-500">{link.name}</a>)}
                        </div>
                        <a href={step.video.url} target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-400 hover:underline mt-3 inline-block">🎥 {step.video.name}</a>
                    </div>
                ))}
            </div>
        </Section>
        
        {/* Features Section */}
        <Section title="🎯 LeetCode Features">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { icon: '🧠', title: '2500+ Quality Coding Problems', link: 'https://leetcode.com/problemset/all/' },
                    { icon: '💬', title: 'Global Discussion Forum', link: 'https://leetcode.com/discuss/' },
                    { icon: '🧪', title: 'Real-Time Code Testing' },
                    { icon: '🏢', title: 'Company-Specific Questions', link: 'https://leetcode.com/company/' },
                    { icon: '📚', title: 'Structured Learning Paths', link: 'https://leetcode.com/explore/' },
                    { icon: '🧩', title: 'LeetCode 75 & Study Plans', link: 'https://leetcode.com/study-plan/leetcode-75/' },
                    { icon: '🏆', title: 'Contests & Leaderboards', link: 'https://leetcode.com/contest/' },
                    { icon: '📊', title: 'Profile, Stats & Resume Integration', link: 'https://leetcode.com/dashboard/' },
                    { icon: '🔐', title: 'Premium Subscription (Optional)', link: 'https://leetcode.com/subscribe/' },
                ].map(feature => (
                    <div key={feature.title} className="bg-gray-700 p-4 rounded-lg">
                        <h3 className="font-semibold text-lg"><span className="mr-2">{feature.icon}</span>{feature.title}</h3>
                        {feature.link && <a href={feature.link} target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-400 hover:underline mt-1 inline-block">Explore &rarr;</a>}
                    </div>
                ))}
            </div>
        </Section>

        {/* Videos Section */}
        <Section title="🎬 Top 10 Videos to Master LeetCode">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                    { title: "How I Would Learn LeetCode if I Could Start Over – NeetCodeIO", url: "https://www.youtube.com/watch?v=aHZW7TuY_yo" },
                    { title: "LeetCode from ZERO in 2025 – Ashish Pratap Singh", url: "https://www.youtube.com/watch?v=G5_Q2_yRFsY" },
                    { title: "How to Use LeetCode Effectively – LeetJourney", url: "https://www.youtube.com/watch?v=4vcncZSJM_4" },
                    { title: "70 LeetCode Problems in 5 Hours – Stoney Codes", url: "https://www.youtube.com/watch?v=lvO88XxNAzs" },
                    { title: "LeetCode Beginner’s Guide 2024 – Ashish Pratap Singh", url: "https://www.youtube.com/watch?v=Nx4bvwU0DqE" },
                    { title: "Start LeetCode in 2025 – Code In Motion", url: "https://www.youtube.com/watch?v=3wJUcFoTSNo" },
                    { title: "90-Day DSA & LeetCode Master Plan – Nishant Chahar", url: "https://www.youtube.com/watch?v=vEVbQ_9Hauw" },
                    { title: "LeetCode in 2024: Roadmap for Job Prep – Matt Guest", url: "https://www.youtube.com/watch?v=qNrDQIu6vWY" },
                    { title: "Top YouTube Channels to Master LeetCode – JustFAANG+", url: "https://www.youtube.com/watch?v=55VmLdp8gW0" },
                    { title: "How to Create & Use a LeetCode Account (in regional language)", url: "https://www.youtube.com/watch?v=vxfs7Ro3HcI" }
                ].map(video => <ListItemLink key={video.title} href={video.url} title={`📹 ${video.title}`} />)}
            </div>
        </Section>

        {/* Offers Section */}
        <Section title="🎁 LeetCode Offers & Benefits">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                    { title: "Free Weekly Contests", url: "https://leetcode.com/contest" },
                    { title: "LeetCode Labs (Experimental Features)", url: "https://leetcode.com/labs" },
                    { title: "Student Discount (via GitHub Education)", url: "https://education.github.com/pack" },
                    { title: "LeetCode Premium", url: "https://leetcode.com/subscribe/" },
                    { title: "Free Interview Crash Course (with Premium)", url: "https://leetcode.com/studyplan/top-interview-150" },
                    { title: "LeetCode 75 (Free Structured Path)", url: "https://leetcode.com/studyplan/leetcode-75" },
                ].map(offer => <ListItemLink key={offer.title} href={offer.url} title={offer.title} />)}
            </div>
        </Section>
        
        {/* Support Section */}
        <Section title="📬 LeetCode Support">
            <div className="space-y-3">
                 <ListItemLink href="https://leetcode.com/contact/" title="🔧 Submit a Ticket (Recommended)" description="For issues related to Premium, Account, Payment, Bug reports."/>
                 <ListItemLink href="mailto:support@leetcode.com" title="📧 Common Support Email (Slower)" description="Use with caution; the ticket system is preferred."/>
                 <ListItemLink href="https://leetcode.com/discuss" title="💬 Community Help Forum" description="Ask questions and get help from other users."/>
                 <ListItemLink href="mailto:business@leetcode.com" title="💼 For Business/Partnership Inquiries" description="Contact for business-related matters."/>
            </div>
        </Section>

    </div>
);

// --- GITHUB CONTENT ---

const githubYoutubeVideos = [
    { title: 'Git & GitHub Crash Course – Traversy Media', link: 'https://www.youtube.com/watch?v=SWYqp7iY_Tc' },
    { title: 'GitHub Explained in 100 Seconds – Fireship', link: 'https://www.youtube.com/watch?v=0fKg7e37bQE' },
    { title: 'GitHub for Students – Full Guide by Kunal Kushwaha', link: 'https://www.youtube.com/watch?v=apGV9Kg7ics' },
    { title: 'GitHub Student Pack – Tools Explained – CodeWithHarry', link: 'https://www.youtube.com/watch?v=w-gSld3q4-A' },
    { title: 'How to Use GitHub Like a Pro – The Primeagen', link: 'https://www.youtube.com/watch?v=3-A7R-0N_8c' },
    { title: 'GitHub Actions in 100 Seconds – Fireship', link: 'https://www.youtube.com/watch?v=R8_veQiY-ac' },
    { title: 'GitHub Copilot Full Tutorial – freeCodeCamp', link: 'https://www.youtube.com/watch?v=71-n_A-1mtk' },
    { title: 'GitHub Pages Website Hosting – Kevin Powell', link: 'https://www.youtube.com/watch?v=QyFcl_Fba-k' }
];

// New Codeblock component for displaying shell commands
const CodeBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="bg-gray-900 text-sm text-cyan-300 p-3 rounded-md my-2 font-mono relative">
        <button 
            onClick={() => navigator.clipboard.writeText(children as string)}
            className="absolute top-2 right-2 text-gray-400 hover:text-white text-xs bg-gray-700 px-2 py-1 rounded"
            aria-label="Copy code"
        >
            Copy
        </button>
        <code>
            {children}
        </code>
    </div>
);


const GitHubContent: React.FC = () => (
    <div className="animate-fade-in text-white">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Welcome to your journey with GitHub</h1>
            <p className="text-gray-300 max-w-3xl mx-auto">
                The world's leading platform for code hosting, version control, collaboration, and open-source development. Whether you're a student, developer, or professional — this site helps you unlock the full power of GitHub.
            </p>
        </div>

        <Section title="❓ What is GitHub?">
            <p className="text-gray-300 mb-4">GitHub is a cloud-based platform that helps developers store, manage, track, and collaborate on code. It uses Git, a powerful version control system, and offers features like version control, team collaboration, open-source contribution, and automation tools.</p>
            <ListItemLink href="https://docs.github.com/en/get-started" title="🔗 Learn more on GitHub Docs" />
        </Section>

        <Section title="💡 GitHub is used for:">
            <div className="space-y-4">
                {[
                    { title: "🚀 Hosting and Managing Code Projects (Public & Private)", links: [{ name: "Creating a Repository", url: "https://docs.github.com/en/get-started/quickstart/create-a-repo" }, { name: "Setting Repository Visibility", url: "https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility" }] },
                    { title: "👨‍💻 Collaborating with Teams in Real-Time", links: [{ name: "About Collaborators", url: "https://docs.github.com/en/organizations/collaborating-with-groups-in-your-organization" }, { name: "Using Pull Requests", url: "https://docs.github.com/en/pull-requests" }] },
                    { title: "📜 Writing Technical Documentation (via Wikis or README)", links: [{ name: "About READMEs", url: "https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes" }, { name: "About Wikis", url: "https://docs.github.com/en/communities/documenting-your-project-with-wikis/about-wikis" }] },
                    { title: "🌐 Hosting Websites with GitHub Pages", links: [{ name: "GitHub Pages Official Site", url: "https://pages.github.com/" }, { name: "GitHub Pages Setup Guide", url: "https://docs.github.com/en/pages/getting-started-with-github-pages" }] },
                    { title: "🔍 Building Public Portfolios and Resumes", links: [{ name: "Create a GitHub Profile README", url: "https://docs.github.com/en/github/setting-up-and-managing-your-github-profile/customizing-your-profile" }, { name: "Host Portfolio with GitHub Pages", url: "https://www.freecodecamp.org/news/github-pages-portfolio/" }] },
                    { title: "🔄 Automating Tasks (Using GitHub Actions)", links: [{ name: "What is GitHub Actions?", url: "https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions" }, { name: "Automate CI/CD Pipelines", url: "https://docs.github.com/en/actions/automating-builds-and-tests/about-continuous-integration" }] },
                    { title: "🌍 Contributing to Open-Source Communities", links: [{ name: "How to Contribute to Open Source", url: "https://opensource.guide/how-to-contribute/" }, { name: "Forking Projects and Making Pull Requests", url: "https://docs.github.com/en/get-started/quickstart/fork-a-repo" }] }
                ].map(use => (
                    <div key={use.title} className="bg-gray-700 p-4 rounded-md">
                        <h3 className="font-semibold text-white">{use.title}</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {use.links.map(link => <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="text-xs bg-gray-600 px-2 py-1 rounded-full hover:bg-gray-500">{link.name}</a>)}
                        </div>
                    </div>
                ))}
            </div>
        </Section>

        <Section title="How Students Can Use GitHub to Create and Manage Projects">
             <div className="space-y-6">
                <div><h3 className="font-semibold">✅ Step 1: Create a GitHub Account</h3><p className="text-sm text-gray-400">🔗 <a href="https://github.com/signup" className="text-cyan-400 hover:underline">Sign Up on GitHub</a>. Tip: Use a real name and photo!</p></div>
                <div><h3 className="font-semibold">✅ Step 2: Install Git</h3><p className="text-sm text-gray-400">🔗 <a href="https://git-scm.com/downloads" className="text-cyan-400 hover:underline">Download Git</a> and verify with `git --version`.</p></div>
                <div><h3 className="font-semibold">✅ Step 3: Create a New Repository</h3><p className="text-sm text-gray-400">🔗 <a href="https://github.com/new" className="text-cyan-400 hover:underline">Create a Repository</a>. Initialize with a README.</p></div>
                <div><h3 className="font-semibold">✅ Step 4: Clone to Your Computer</h3><CodeBlock>git clone https://github.com/your-username/your-repo.git</CodeBlock></div>
                <div><h3 className="font-semibold">✅ Step 5: Write Code + Track Changes</h3><CodeBlock>{`git add .\ngit commit -m "Initial commit"\ngit push origin main`}</CodeBlock></div>
                <div><h3 className="font-semibold">✅ Step 6: Share or Collaborate</h3><p className="text-sm text-gray-400">🔗 <a href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-access-to-your-personal-repositories/inviting-collaborators-to-a-personal-repository" className="text-cyan-400 hover:underline">Invite Collaborators</a> and use Issues for tasks.</p></div>
                <div><h3 className="font-semibold">✅ Step 7: Host Web Projects with GitHub Pages</h3><p className="text-sm text-gray-400">Push your code, go to Settings &gt; Pages to get your free website. 🔗 <a href="https://pages.github.com/" className="text-cyan-400 hover:underline">GitHub Pages Guide</a>.</p></div>
                <div><h3 className="font-semibold">🎁 BONUS: GitHub Student Developer Pack</h3><p className="text-sm text-gray-400">Get free domains, hosting, tools like Canva Pro, and Copilot. 🔗 <a href="https://education.github.com/pack" className="text-cyan-400 hover:underline">Apply Now</a>.</p></div>
             </div>
        </Section>
        
        <Section title="🎥 Top YouTube Videos for GitHub Beginners">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {githubYoutubeVideos.map(video => (
                    <a 
                        key={video.title} 
                        href={video.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-gray-700 p-4 rounded-md hover:bg-gray-600 transition-colors text-left w-full"
                    >
                        <h4 className="font-semibold text-white">📹 {video.title}</h4>
                    </a>
                ))}
            </div>
        </Section>

        <Section title="📬 GitHub Support & Help">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ListItemLink href="https://support.github.com/contact" title="🛠️ Submit a Support Ticket" />
                <ListItemLink href="mailto:support@github.com" title="📧 Email Support" />
                <ListItemLink href="https://docs.github.com" title="📘 GitHub Docs" />
                <ListItemLink href="https://github.com/orgs/community/discussions" title="💬 Community Forum" />
                <ListItemLink href="https://github.com/contact/report-abuse" title="🐞 Report Abuse or Bugs" />
                 <ListItemLink href="mailto:voiceofbharat.help@gmail.com" title="💡 For your project" />
            </div>
        </Section>
    </div>
);

const VSCodeCursorContent: React.FC = () => (
    <div className="animate-fade-in text-white">
        {/* VS Code Section */}
        <Section title="🖥️ Visual Studio Code (VS Code)">
            <p className="text-gray-300 mb-4">Free, lightweight, open-source code editor from Microsoft.</p>
            <ListItemLink href="https://code.visualstudio.com" title="👉 Official Site: code.visualstudio.com" />
            <h3 className="text-xl font-semibold mt-6 mb-4">✅ Why Students Should Use It</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li><strong>Free Forever</strong> – No hidden charges.</li>
                <li><strong>Supports 50+ languages</strong> – Python, C, C++, Java, JS, Go, etc.</li>
                <li><strong>Extensions (like apps for coding):</strong>
                    <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                        <li><a href="https://marketplace.visualstudio.com/items?itemName=ms-python.python" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Python Extension</a></li>
                        <li><a href="https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Prettier (auto-format)</a></li>
                        <li><a href="https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">GitLens (Git made easy)</a></li>
                        <li><a href="https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Live Server (instant web preview)</a></li>
                    </ul>
                </li>
            </ul>
            <h3 className="text-xl font-semibold mt-6 mb-4">🛠️ Features You Must Master</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li><strong>Command Palette</strong> → Ctrl+Shift+P (run anything)</li>
                <li><strong>Terminal</strong> → Run code inside VS Code</li>
                <li><strong>Debugger</strong> → Set breakpoints & debug like a pro</li>
                <li><strong>GitHub Integration</strong> → Clone, commit, push from editor</li>
                <li><strong>Live Share</strong> → Real-time pair programming</li>
            </ul>
            <div className="mt-4">
                <ListItemLink href="https://code.visualstudio.com/docs" title="👉 Learning Path: VS Code Official Docs" />
            </div>
        </Section>

        {/* Cursor Section */}
        <Section title="🤖 Cursor (AI Code Editor)">
             <p className="text-gray-300 mb-4">A next-gen editor (built on VS Code) with AI built-in.</p>
             <ListItemLink href="https://cursor.sh" title="👉 Official Site: cursor.sh" />
             <h3 className="text-xl font-semibold mt-6 mb-4">✅ Why Students Should Use It</h3>
             <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li><strong>AI Chat</strong> → Ask coding questions inside editor.</li>
                <li><strong>Explain Code</strong> → Like a tutor explaining line-by-line.</li>
                <li><strong>Generate Code</strong> → AI writes boilerplate/test cases.</li>
                <li><strong>Search Whole Project</strong> → AI finds logic/functions quickly.</li>
                <li><strong>Debugging Assistant</strong> → Suggests fixes with reasons.</li>
             </ul>
             <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <ListItemLink href="https://docs.cursor.sh" title="👉 Docs: Cursor Documentation" />
                <ListItemLink href="https://discord.gg/cursor" title="👉 Community: Cursor Discord" />
             </div>
        </Section>

        {/* Student Offers Section */}
        <Section title="🎁 Student Offers & Freebies">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-700 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg text-white">1. VS Code</h3>
                    <ul className="list-disc list-inside text-sm text-gray-300 mt-2 space-y-2">
                        <li>Free forever.</li>
                        <li>Pair with <strong>GitHub Student Developer Pack</strong> 🎓
                            <ul className="list-disc list-inside ml-4 mt-1 text-xs">
                                <li>GitHub Pro (free)</li>
                                <li>Free cloud credits (Heroku, DigitalOcean, etc.)</li>
                                <li>Free tools like Namecheap Domain, Canva Pro, JetBrains IDEs.</li>
                            </ul>
                        </li>
                    </ul>
                     <a href="https://education.github.com/pack" target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-400 hover:underline mt-2 inline-block">Apply Here &rarr;</a>
                </div>
                 <div className="bg-gray-700 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg text-white">2. Cursor</h3>
                     <ul className="list-disc list-inside text-sm text-gray-300 mt-2 space-y-2">
                        <li><strong>Free Plan</strong> → Limited AI usage.</li>
                        <li><strong>Pro Plan ($20/mo)</strong> → GPT-4, Claude, longer context (may give student discounts).</li>
                     </ul>
                     <a href="https://cursor.sh/pricing" target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-400 hover:underline mt-2 inline-block">Pricing Page &rarr;</a>
                </div>
            </div>
        </Section>
        
        {/* How to Master Section */}
        <Section title="🎓 How to Master Them (Step-by-Step)">
             <h3 className="text-xl font-semibold mb-4">📅 30-Day Plan</h3>
             <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li><strong>Week 1</strong> → Learn VS Code basics (navigation, extensions).</li>
                <li><strong>Week 2</strong> → Git & GitHub inside VS Code.</li>
                <li><strong>Week 3</strong> → Install Cursor & start using AI for small tasks.</li>
                <li><strong>Week 4</strong> → Build & deploy a project (GitHub Pages / Netlify).</li>
             </ul>
             <div className="mt-4">
                <ListItemLink href="https://code.visualstudio.com/learn" title="👉 Roadmap Resource: VS Code Roadmap Guide" />
             </div>
        </Section>
        
        {/* Comparison Table Section */}
        <Section title="📊 VS Code vs Cursor – Student Comparison">
             <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="p-3">Feature</th>
                            <th className="p-3">VS Code</th>
                            <th className="p-3">Cursor</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        <tr className="bg-gray-800/50"><td className="p-3 font-semibold">Cost</td><td className="p-3">Free</td><td className="p-3">Free (Pro for AI)</td></tr>
                        <tr className="bg-gray-800/50"><td className="p-3 font-semibold">Languages</td><td className="p-3">50+</td><td className="p-3">50+</td></tr>
                        <tr className="bg-gray-800/50"><td className="p-3 font-semibold">AI Support</td><td className="p-3">Extensions only (Copilot, Codeium)</td><td className="p-3">Built-in AI (Chat, Explain, Debug)</td></tr>
                        <tr className="bg-gray-800/50"><td className="p-3 font-semibold">Best For</td><td className="p-3">Beginners → Strong foundation</td><td className="p-3">Intermediate/Advanced → AI boost</td></tr>
                        <tr className="bg-gray-800/50"><td className="p-3 font-semibold">Collaboration</td><td className="p-3">Live Share</td><td className="p-3">Limited, but AI helps code reviews</td></tr>
                        <tr className="bg-gray-800/50"><td className="p-3 font-semibold">Learning Curve</td><td className="p-3">Easy</td><td className="p-3">Easy if you know VS Code</td></tr>
                        <tr className="bg-gray-800/50"><td className="p-3 font-semibold">Use Case</td><td className="p-3">Projects, assignments, open-source</td><td className="p-3">Debugging, learning, faster coding</td></tr>
                    </tbody>
                </table>
             </div>
        </Section>
        
        {/* Learning Resources Section */}
        <Section title="📘 Learning Resources & Tutorials">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-lg font-semibold mb-3">VS Code</h3>
                    <div className="space-y-3">
                        <ListItemLink href="https://code.visualstudio.com/docs" title="Official Docs" />
                        <ListItemLink href="https://www.youtube.com/watch?v=B-s71nIzj2Q" title="Free YouTube Course – VS Code Full Tutorial (freeCodeCamp)" />
                        <ListItemLink href="https://marketplace.visualstudio.com/vscode" title="Extensions Marketplace" />
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-3">Cursor</h3>
                     <div className="space-y-3">
                        <ListItemLink href="https://docs.cursor.sh" title="Official Docs" />
                        <ListItemLink href="https://discord.gg/cursor" title="Community Help – Cursor Discord" />
                        <ListItemLink href="https://cursor.sh/blog" title="Blog on AI Features" />
                    </div>
                </div>
             </div>
             <h3 className="text-xl font-semibold mt-8 mb-4">🎥 Must-Watch Videos</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a href="https://youtu.be/HJxxGKtdEpU" target="_blank" rel="noopener noreferrer" className="block bg-gray-700 p-4 rounded-md hover:bg-gray-600">📹 VS Code Master</a>
                <a href="https://youtu.be/lxRAj1Gijic" target="_blank" rel="noopener noreferrer" className="block bg-gray-700 p-4 rounded-md hover:bg-gray-600">📹 Ultimate VS Code Setup</a>
                <a href="https://youtu.be/uKTNaJRVvzw" target="_blank" rel="noopener noreferrer" className="block bg-gray-700 p-4 rounded-md hover:bg-gray-600">📹 VS Code Tips</a>
                <a href="https://youtu.be/Vn0LYZ8Qepc" target="_blank" rel="noopener noreferrer" className="block bg-gray-700 p-4 rounded-md hover:bg-gray-600">📹 How to Use Git and GitHub with VSCode</a>
                <a href="https://youtu.be/jXp5D5ZnxGM" target="_blank" rel="noopener noreferrer" className="block bg-gray-700 p-4 rounded-md hover:bg-gray-600">📹 GitHub Copilot</a>
             </div>
        </Section>
        
        {/* Final Strategy Section */}
        <Section title="🚀 Final Student Strategy">
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
                <li><strong>Start with VS Code</strong> → Build foundation (Git, debugging, extensions).</li>
                <li><strong>Join GitHub Student Pack</strong> → Get free pro tools.</li>
                <li><strong>Add Cursor</strong> → Use AI for learning, debugging, projects.</li>
                <li><strong>Build Portfolio Projects</strong> → Host on GitHub Pages or Netlify.</li>
                <li><strong>Contribute to Open Source</strong> → Gain real-world experience.</li>
            </ol>
            <p className="mt-4 italic text-gray-400">
                👉 After 3–6 months, you’ll not only code faster with AI, but also understand professional workflows (Git, CI/CD, debugging).
            </p>
        </Section>

    </div>
);


const CodingToolkitPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Master LeetCode');

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200">
            <div className="container mx-auto px-4 sm:px-6 py-12">
                <BackButton className="mb-8" />
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">Coding & Development Toolkit</h1>
                    <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
                        Your all-in-one resource hub for mastering coding, acing interviews, and building a powerful career profile.
                    </p>
                </div>

                <div className="bg-gray-800 rounded-lg shadow-xl">
                    <div className="flex justify-center border-b border-gray-700 overflow-x-auto">
                        <TabButton label="Master LeetCode" isActive={activeTab === 'Master LeetCode'} onClick={() => setActiveTab('Master LeetCode')} />
                        <TabButton label="GitHub Toolkit" isActive={activeTab === 'GitHub Toolkit'} onClick={() => setActiveTab('GitHub Toolkit')} />
                        <TabButton label="LinkedIn Toolkit" isActive={activeTab === 'LinkedIn'} onClick={() => setActiveTab('LinkedIn')} />
                        <TabButton label="VS Code & Cursor" isActive={activeTab === 'VS Code & Cursor'} onClick={() => setActiveTab('VS Code & Cursor')} />
                    </div>
                    <div className="p-4 md:p-8">
                        {activeTab === 'Master LeetCode' && <LeetCodeContent />}
                        {activeTab === 'GitHub Toolkit' && <GitHubContent />}
                        {activeTab === 'LinkedIn' && <LinkedInContent />}
                        {activeTab === 'VS Code & Cursor' && <VSCodeCursorContent />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodingToolkitPage;
import React from 'react';

const Section: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = '' }) => (
  <section className={`py-12 md:py-16 ${className}`}>
    <div className="container mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">{title}</h2>
      {children}
    </div>
  </section>
);

const InfoCard: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => (
  <div className="bg-white p-8 rounded-lg shadow-lg h-full">
    <h3 className="text-2xl font-semibold text-orange-600 mb-4">{title}</h3>
    <div className="text-gray-600 space-y-3">{children}</div>
  </div>
);

const TeamMemberCard: React.FC<{ name: string; role: string; }> = ({ name, role }) => (
  <div className="bg-gray-100 p-6 rounded-lg shadow-sm text-center transform hover:scale-105 hover:shadow-lg transition-transform duration-300">
    <h4 className="text-xl font-bold text-gray-900">{name}</h4>
    <p className="text-gray-600 mt-2">{role}</p>
  </div>
);

const FeatureItem: React.FC<{ icon: string; title: string; description: string; }> = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
    <p className="text-2xl mb-2">{icon}</p>
    <h4 className="font-bold text-lg text-gray-800">{title}</h4>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);


const AboutUsPage: React.FC = () => {
  const teamMembers = [
    { name: 'M. Rupesh Reddy', role: 'Full-stack development, AI integration, vision lead, team lead' },
    { name: 'P. Chanukya', role: 'Backend developer, security and database systems' },
    { name: 'Teja', role: 'UI/UX designer and frontend implementation' },
    { name: 'Karthik', role: 'Firebase, cloud services, and real-time integration' },
    { name: 'Rizzwan', role: 'Voice AI, NLP modules, multilingual support' },
  ];

  const features = [
    { icon: '🎓', title: 'Students', description: 'Scholarships, career roadmaps, AI resume builder, project funding, internships' },
    { icon: '👩‍🌾', title: 'Farmers', description: 'PM-KISAN, fertilizer advisory, crop disease detection, direct market access' },
    { icon: '👷', title: 'Workers', description: 'MNREGA, E-Shram, job alerts, insurance, skill development via PMKVY' },
    { icon: '👩', title: 'Women', description: 'SHG support, Ujjwala Yojana, safety apps (Disha), entrepreneurship, financial literacy' },
    { icon: '👵', title: 'Senior Citizens', description: 'Pension schemes, Ayushman Bharat, healthcare and discounts' },
    { icon: '📲', title: 'Voice Assistant', description: 'Available in Telugu, Hindi, and English' },
    { icon: '🗂️', title: 'Digital Document Vault', description: 'Secure storage of important documents' },
    { icon: '🌐', title: 'Offline Kiosk Access', description: 'Designed for villages and remote users' },
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gray-800 text-white text-center py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop')"}}></div>
        <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold">About Voice of Bharat</h1>
            <p className="text-lg md:text-xl mt-4 max-w-3xl mx-auto text-gray-300">
            An AI-powered digital empowerment platform for every Indian citizen.
            </p>
        </div>
      </div>
      
      {/* Our Story */}
      <Section title="📄 Our Story">
        <div className="max-w-4xl mx-auto text-left md:text-center space-y-4 text-lg text-gray-700">
          <p>
            Rupesh Reddy, a final-year Computer Science diploma student at Sree Vidyanikethan Engineering College, has always been deeply aware of the challenges faced by people in rural and underserved areas of India in accessing vital government services. Despite numerous welfare schemes, many struggled due to language barriers, limited literacy, and a lack of digital skills.
          </p>
          <p>
            Driven by a passion for technology and a desire for social impact, Rupesh envisioned a solution to empower every citizen. He imagined a platform using voice—the most natural form of communication—to bridge the digital divide. This platform would be multilingual, voice-enabled, and mobile-first to ensure inclusivity.
          </p>
          <p>
            In 2025, Rupesh and his team launched "Voice of Bharat" as their capstone project. Their mission: to build an AI-powered platform connecting people to scholarships, welfare schemes, health services, and career guidance, making opportunities accessible to all, regardless of their digital literacy.
          </p>
          <p>
            This project is more than a technical achievement; it's a personal commitment to turn technology into a catalyst for empowerment. Through "Voice of Bharat," Rupesh aspires to create a future where every Indian’s voice is heard, their needs are prioritized, and their journey toward progress is supported with dignity and ease.
          </p>
        </div>
      </Section>
      
      {/* Our Team */}
      <Section title="👨‍💻 Our Team" className="bg-white">
        <div className="max-w-4xl mx-auto text-center mb-10">
            <p className="text-lg text-gray-700">
                We are five aspiring developers and innovators who took on this project to solve a real-world challenge—making technology work for every citizen, regardless of their literacy or access level.
            </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {teamMembers.map(member => <TeamMemberCard key={member.name} name={member.name} role={member.role} />)}
        </div>
      </Section>

      {/* Vision & Mission */}
      <Section title="🌟 Our Vision & Mission">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <InfoCard title="Our Vision">
            <p>To create a digitally inclusive India where every citizen, whether in a remote village or a metro city, can easily access growth opportunities, government schemes, and support services with just their voice.</p>
          </InfoCard>
          <InfoCard title="Our Mission">
            <ul className="list-disc list-inside space-y-2">
                <li>Government schemes and welfare programs</li>
                <li>Scholarships, jobs, and skill training</li>
                <li>Health, pension, and insurance services</li>
                <li>Agricultural tools and support</li>
                <li>Document storage and digital identity tools</li>
            </ul>
          </InfoCard>
        </div>
      </Section>

      {/* What We Offer */}
      <Section title="🔧 What We Offer" className="bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map(feature => (
            <FeatureItem key={feature.title} icon={feature.icon} title={feature.title} description={feature.description} />
          ))}
        </div>
      </Section>

       {/* Our Journey */}
      <Section title="🚀 Our Journey">
        <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-gray-700">
            “Voice of Bharat” began as a college project—but has grown into a potential national platform. We hope to collaborate with government bodies, social organizations, and incubators to scale this into a real-world digital transformation tool for every Indian.
            </p>
        </div>
      </Section>
      
      {/* Powered By */}
      <div className="bg-gray-800 text-white text-center py-10">
        <h3 className="text-2xl font-semibold mb-2">🙌 Powered By</h3>
        <p className="text-lg font-bold tracking-wider">
          Mucheli Rupesh Reddy, P. Chanukya, Teja, Rizzwan, Karthik
        </p>
        <p className="text-gray-400 mt-2">
          Final Year Diploma Students – Computer Science<br />
          Sree Vidyanikethan Engineering College, Andhra Pradesh<br />
          Academic Year: 2023–2026
        </p>
      </div>
    </div>
  );
};

export default AboutUsPage;

import React from 'react';
import SectionCard from '../components/SectionCard';
import { SECTIONS } from '../constants';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-800 text-white py-20 md:py-32" style={{backgroundImage: "url('https://images.unsplash.com/photo-1623862957382-3e214d104527?q=80&w=2070&auto=format&fit=crop')"}}>
        <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">Empowering Every Voice of Bharat</h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            A multilingual, voice-enabled digital platform bridging citizens to opportunities, services, and government schemes.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="#services"
              className="bg-white text-gray-800 font-semibold px-8 py-3 rounded-md hover:bg-gray-200 transition duration-300 text-lg"
            >
              Explore Services
            </a>
            <a 
              href="https://chat.whatsapp.com/CUgovt3Nbmc7zE6FyIHsj1?mode=ems_copy_t" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-orange-500 text-white font-semibold px-8 py-3 rounded-md hover:bg-orange-600 transition duration-300 text-lg"
            >
              Join the Community
            </a>
          </div>
        </div>
      </section>

      {/* Sections Grid */}
      <section id="services" className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Services</h2>
            <p className="text-gray-600 mt-2">Tailored resources for every citizen's needs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SECTIONS.map((section) => (
              <SectionCard
                key={section.title}
                title={section.title}
                description={section.description}
                path={section.path}
                Icon={section.Icon}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

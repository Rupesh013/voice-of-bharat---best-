
import React from 'react';
import { ICONS, WOMEN_EMPOWERMENT_FEATURES, WOMEN_SAFETY_RESOURCES, WOMEN_HEALTH_SCHEMES, WOMEN_SKILLING_PROGRAMS, WOMEN_FINANCIAL_SCHEMES } from '../constants';

interface Resource {
  title: string;
  description: string;
  link: string;
}

const FeatureCard: React.FC<{ title: string; description: string; anchor: string; Icon: React.ElementType }> = ({ title, description, anchor, Icon }) => (
  <a href={`#${anchor}`} className="block group">
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 h-full flex flex-col text-center items-center">
      <Icon className="h-12 w-12 text-orange-500 group-hover:text-orange-600 transition-colors duration-300" />
      <div className="mt-4 flex-grow">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-500 mt-2 text-sm">{description}</p>
      </div>
    </div>
  </a>
);

const ResourceCard: React.FC<{ resource: Resource }> = ({ resource }) => (
  <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-orange-400 flex flex-col justify-between h-full">
    <div>
      <h4 className="text-lg font-bold text-gray-800">{resource.title}</h4>
      <p className="text-gray-600 text-sm mt-2">{resource.description}</p>
    </div>
    <a href={resource.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-sm bg-orange-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300 text-center">
      Access Service
    </a>
  </div>
);

const Section: React.FC<{ title: string; anchor: string; children: React.ReactNode }> = ({ title, anchor, children }) => (
  <section id={anchor} className="py-16">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {children}
      </div>
    </div>
  </section>
);


const WomenEmpowermentPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-pink-50">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center text-white py-20 md:py-32" style={{backgroundImage: "url('https://images.unsplash.com/photo-1609788129015-0a5661b36f1a?q=80&w=2070&auto=format&fit=crop')"}}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">Shakti Connect</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
            Empowering women with resources for safety, health, career, and financial independence.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {WOMEN_EMPOWERMENT_FEATURES.map((feature) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                anchor={feature.anchor}
                Icon={feature.Icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Legal Aid Section */}
      <Section title="Safety & Legal Aid" anchor="safety">
        {WOMEN_SAFETY_RESOURCES.map(resource => <ResourceCard key={resource.title} resource={resource} />)}
      </Section>
      
      {/* Health & Wellness Section */}
      <Section title="Health & Wellness" anchor="health">
        {WOMEN_HEALTH_SCHEMES.map(resource => <ResourceCard key={resource.title} resource={resource} />)}
      </Section>
      
      {/* Skilling & Career Section */}
      <Section title="Skilling & Career" anchor="skilling">
         {WOMEN_SKILLING_PROGRAMS.map(resource => <ResourceCard key={resource.title} resource={resource} />)}
      </Section>

      {/* Financial Independence Section */}
      <Section title="Financial Independence" anchor="finance">
        {WOMEN_FINANCIAL_SCHEMES.map(resource => <ResourceCard key={resource.title} resource={resource} />)}
      </Section>

    </div>
  );
};

export default WomenEmpowermentPage;

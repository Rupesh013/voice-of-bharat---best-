import React from 'react';
import ExpertGuideAssistant from '../components/ExpertGuideAssistant';
import BackButton from '../components/BackButton';

// New data structure for farming topics with detailed resources
const farmingTopics = [
  {
    title: 'Mastering Drip Irrigation',
    description: 'Learn how to set up and maintain a drip irrigation system for maximum water efficiency and crop yield.',
    thumbnail: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto.format&fit=crop',
    resources: [
      { title: 'Drip Irrigation Systems Specialist Training (Pertecnica)', link: 'https://www.pertecnica.net/drip-irrigation-systems-specialist-training-drip-irrigation-courses/', type: 'Course' },
      { title: 'AgriTech Solutions Drip Irrigation Course', link: 'https://agritechsolutions.co.in/courses-consultancy/', type: 'Course' },
      { title: 'Drip Irrigation 101 - Class Recording', link: 'https://www.youtube.com/watch?v=JqyGsS-6C7M', type: 'Video' }
    ]
  },
  {
    title: 'Organic Pest Control',
    description: 'Discover natural and effective methods to control pests without using harmful chemicals.',
    thumbnail: 'https://images.unsplash.com/photo-1595088039384-98442524a1b0?q=80&w=2070&auto.format&fit=crop',
    resources: [
      { title: 'Organic Pest Control Playlist by Angela Judd', link: 'https://www.youtube.com/playlist?list=PLrnbT_X1WuhD_a_cbCixxKYO4mD4HxSBM', type: 'Playlist' },
      { title: 'Next Level Gardening Organic Pest Control Playlist', link: 'https://www.youtube.com/playlist?list=PLu1PucmTrVAlWoBK4X1V3OySz8VpgHyC6', type: 'Playlist' },
      { title: 'Natural Pest Control Tips That Work', link: 'https://www.youtube.com/watch?v=hAryCyoujpc', type: 'Video' }
    ]
  },
  {
    title: 'Improving Soil Health',
    description: 'A guide to composting, crop rotation, and other techniques to enrich your soil naturally.',
    thumbnail: 'https://images.unsplash.com/photo-1553112139-9352e82a3959?q=80&w=1974&auto.format&fit=crop',
    resources: [
      { title: 'Rapidly Rebuild Your Soil Health Webinar', link: 'https://www.youtube.com/watch?v=ZTNuDhQKz3g', type: 'Video' },
      { title: 'Improving Soil Health on a Small Farm: A Case Study', link: 'https://www.youtube.com/watch?v=VZSDAelfZ2s', type: 'Video' },
      { title: 'The Practical Guide to Soil Health', link: 'https://www.youtube.com/watch?v=HQtx00mKBH4', type: 'Video' }
    ]
  }
];

const ResourceLink: React.FC<{ resource: { title: string; link: string; type: string; } }> = ({ resource }) => (
    <a href={resource.link} target="_blank" rel="noopener noreferrer" className="block p-3 bg-gray-50 hover:bg-orange-50 rounded-md transition-colors duration-200">
        <div className="flex items-center">
            <span className="text-xs font-semibold uppercase text-white bg-orange-500 px-2 py-0.5 rounded-full mr-3 flex-shrink-0">{resource.type}</span>
            <span className="text-sm text-orange-700 font-medium hover:underline">{resource.title}</span>
        </div>
    </a>
);

const ExpertGuidesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-teal-50">
      <section className="relative bg-cover bg-center text-white py-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=1974&auto.format&fit=crop')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">Expert Farming Guides</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
            Learn from the best. Access curated courses, video guides, and expert advice on modern farming techniques.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 max-w-5xl">
          <BackButton className="mb-8" />
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Knowledge Base</h2>
          <div className="space-y-12">
            {farmingTopics.map((topic, index) => (
              <div key={index} className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row">
                <div className="md:w-1/3">
                  <img src={topic.thumbnail} alt={topic.title} className="w-full h-48 md:h-full object-cover" />
                </div>
                <div className="p-6 md:w-2/3">
                  <h3 className="text-2xl font-bold text-gray-800">{topic.title}</h3>
                  <p className="text-gray-600 mt-2">{topic.description}</p>
                  <div className="mt-6 space-y-3">
                    <h4 className="font-semibold text-gray-700">Recommended Resources:</h4>
                    {topic.resources.map((res, i) => (
                      <ResourceLink key={i} resource={res} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ExpertGuideAssistant />
    </div>
  );
};

export default ExpertGuidesPage;

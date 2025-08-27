import React, { useState } from 'react';
import ProduceCard from '../components/ProduceCard';
import AddProduceModal from '../components/AddProduceModal';
import MarketAssistant from '../components/MarketAssistant';
import { MOCK_PRODUCE_LISTINGS } from '../constants';

const DirectMarketPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listings, setListings] = useState(MOCK_PRODUCE_LISTINGS);
  
  const handleAddProduce = (newProduce: any) => {
    // In a real app, you'd send this to a backend.
    // Here, we just add it to the local state for demonstration.
    const newListing = {
      ...newProduce,
      id: listings.length + 1,
      // Placeholder image if none is uploaded
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop'
    };
    setListings(prev => [newListing, ...prev]);
  };

  return (
    <div className="min-h-screen bg-yellow-50">
       <section className="relative bg-cover bg-center text-white py-20" style={{backgroundImage: "url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop')"}}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">Direct Market Access</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
            Sell your produce directly to buyers across the nation. No middlemen, better prices.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Fresh from the Farm</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-orange-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-orange-600 transition duration-300 shadow-md"
            >
              + List Your Produce
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {listings.map((listing) => (
              <ProduceCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      <AddProduceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddProduce={handleAddProduce}
      />

      <MarketAssistant />
    </div>
  );
};

export default DirectMarketPage;

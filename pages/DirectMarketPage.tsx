import React, { useState } from 'react';
import ProduceCard from '../components/ProduceCard';
import AddProduceModal from '../components/AddProduceModal';
import MarketAssistant from '../components/MarketAssistant';
import { MOCK_PRODUCE_LISTINGS } from '../constants';
import { useTranslation } from '../hooks/useTranslation';
import BackButton from '../components/BackButton';
import ProduceDetailModal from '../components/ProduceDetailModal';
import type { ProduceListing } from '../types';

const DirectMarketPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listings, setListings] = useState<ProduceListing[]>(MOCK_PRODUCE_LISTINGS);
  const [toastMessage, setToastMessage] = useState('');
  const [selectedListing, setSelectedListing] = useState<ProduceListing | null>(null);
  const { t } = useTranslation();
  
  const handleAddProduce = (newProduce: any) => {
    const newListing: ProduceListing = {
      id: listings.length + 1,
      name: newProduce.name,
      price: newProduce.price,
      quantity: newProduce.quantity,
      seller: 'You (New Listing)',
      location: 'Your Farm',
      image: newProduce.image ? URL.createObjectURL(newProduce.image) : 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto.format&fit=crop',
      paymentMethods: ['UPI', 'Cash on Delivery'],
      logistics: ['Self-pickup from farm']
    };
    setListings(prev => [newListing, ...prev]);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
        setToastMessage('');
    }, 3000); // Hide after 3 seconds
  };
  
  const handleViewDetails = (listing: ProduceListing) => {
      setSelectedListing(listing);
  };


  return (
    <div className="min-h-screen bg-yellow-50">
      {/* Toast Notification */}
      <div 
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 ${toastMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        role="alert"
        aria-live="assertive"
      >
        {toastMessage}
      </div>

       <section className="relative bg-cover bg-center text-white py-20" style={{backgroundImage: "url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto.format&fit=crop')"}}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">{t('pages.directMarket.title')}</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
            {t('pages.directMarket.subtitle')}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <BackButton className="mb-8" />
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">{t('pages.directMarket.fresh')}</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-orange-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-orange-600 transition duration-300 shadow-md"
            >
              {t('pages.directMarket.listProduce')}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {listings.map((listing) => (
              <ProduceCard key={listing.id} listing={listing} onShowToast={showToast} onViewDetails={handleViewDetails} />
            ))}
          </div>
        </div>
      </section>

      <AddProduceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddProduce={handleAddProduce}
      />

      <ProduceDetailModal 
        isOpen={!!selectedListing} 
        onClose={() => setSelectedListing(null)} 
        listing={selectedListing} 
        onShowToast={showToast}
      />

      <MarketAssistant />
    </div>
  );
};

export default DirectMarketPage;
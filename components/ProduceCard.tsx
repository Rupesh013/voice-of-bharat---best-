import React from 'react';

interface ProduceListing {
  id: number;
  name: string;
  price: string;
  quantity: string;
  seller: string;
  location: string;
  image: string;
}

interface ProduceCardProps {
  listing: ProduceListing;
}

const ProduceCard: React.FC<ProduceCardProps> = ({ listing }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
      <img src={listing.image} alt={listing.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{listing.name}</h3>
        <p className="text-gray-500 text-sm mt-1">{listing.location}</p>
        <div className="mt-4">
          <p className="text-lg font-bold text-green-600">{listing.price}</p>
          <p className="text-gray-600">{listing.quantity}</p>
          <p className="text-gray-600 text-sm">Seller: <span className="font-medium">{listing.seller}</span></p>
        </div>
        <div className="mt-4 flex space-x-2">
          <button className="flex-1 bg-orange-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300 text-sm">
            Buy Now
          </button>
           <button className="flex-1 bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300 text-sm">
            Contact Seller
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProduceCard;

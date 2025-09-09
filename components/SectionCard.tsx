import React from 'react';
import { Link } from 'react-router-dom';

interface SectionCardProps {
  title: string;
  description: string;
  path: string;
  Icon: React.ElementType;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, description, path, Icon }) => {
  return (
    <Link to={path} className="block group">
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
        <div className="flex-shrink-0">
          <Icon className="h-12 w-12 text-orange-500 group-hover:text-orange-600 transition-colors duration-300" />
        </div>
        <div className="mt-4 flex-grow">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <p className="text-gray-500 mt-2">{description}</p>
        </div>
        <div className="mt-4">
           <span className="text-orange-500 font-semibold group-hover:underline">Learn More &rarr;</span>
        </div>
      </div>
    </Link>
  );
};

export default SectionCard;

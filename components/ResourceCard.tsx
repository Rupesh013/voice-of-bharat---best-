import React from 'react';
import type { EducationResource } from '../types';

interface ResourceCardProps {
  resource: EducationResource;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  return (
    <a href={resource.link} target="_blank" rel="noopener noreferrer" className="block bg-white p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center">
        <img src={resource.logo} alt={`${resource.name} logo`} className="w-12 h-12 rounded-full mr-4" />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-lg font-semibold text-gray-800">{resource.name}</h4>
              <p className="text-sm text-gray-600">{resource.description}</p>
            </div>
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
              resource.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
              resource.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {resource.difficulty}
            </span>
          </div>
        </div>
        <div className="ml-4 text-gray-400">
          &rarr;
        </div>
      </div>
    </a>
  );
};

export default ResourceCard;
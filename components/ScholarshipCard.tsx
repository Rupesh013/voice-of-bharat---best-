import React from 'react';
import type { Scholarship } from '../types';

interface ScholarshipCardProps {
  scholarship: Scholarship;
}

const ScholarshipCard: React.FC<ScholarshipCardProps> = ({ scholarship }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500 flex flex-col justify-between h-full transform hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div>
        <h3 className="text-xl font-bold text-gray-800">{scholarship.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{scholarship.provider}</p>
        <div className="mt-4 space-y-2 text-gray-700">
          <p><strong className="font-semibold">Award:</strong> {scholarship.award}</p>
          <p><strong className="font-semibold">Eligibility:</strong> {scholarship.eligibility}</p>
          <p><strong className="font-semibold">Deadline:</strong> <span className="text-red-600">{scholarship.deadline}</span></p>
        </div>
      </div>
      <div className="mt-6">
        <a href={scholarship.link} target="_blank" rel="noopener noreferrer" className="w-full text-center block bg-orange-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300">
          Apply Now
        </a>
      </div>
    </div>
  );
};

export default ScholarshipCard;
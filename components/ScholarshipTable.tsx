import React from 'react';
import type { ScholarshipDetail } from '../types';

interface ScholarshipTableProps {
  scholarships: ScholarshipDetail[];
}

const ScholarshipTable: React.FC<ScholarshipTableProps> = ({ scholarships }) => {
  if (!scholarships || scholarships.length === 0) {
    return <p className="text-gray-600 text-center py-8">No scholarships found for this category.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left font-semibold text-gray-600">Scholarship Name</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-600">Eligibility</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-600">Description</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-600">Applicable For</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-600">Link</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {scholarships.map((s, index) => (
            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-4 font-semibold">{s.name}</td>
              <td className="py-3 px-4">{s.eligibility}</td>
              <td className="py-3 px-4">{s.description}</td>
              <td className="py-3 px-4">{s.class}</td>
              <td className="py-3 px-4">
                <a 
                  href={s.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-orange-600 hover:underline font-semibold"
                >
                  Apply Here
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScholarshipTable;
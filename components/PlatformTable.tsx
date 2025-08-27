import React from 'react';
import type { PlatformInfo } from '../types';

interface PlatformTableProps {
  platforms: PlatformInfo[];
}

const PlatformTable: React.FC<PlatformTableProps> = ({ platforms }) => {
  if (!platforms || platforms.length === 0) {
    return <p className="text-gray-600 text-center py-8">No platforms found for this category.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left font-semibold text-gray-600 w-1/4">Platform</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-600 w-3/4">About / Highlights</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {platforms.map((p, index) => (
            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-4 font-semibold">
                <a href={p.website} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">
                  {p.name}
                </a>
              </td>
              <td className="py-3 px-4">
                {p.about || p.highlights}
                {p.courses && <p className="text-xs text-gray-500 mt-1"><strong>Top Courses:</strong> {p.courses}</p>}
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlatformTable;

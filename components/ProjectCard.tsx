import React from 'react';
import type { Project } from '../types';
import { ICONS } from '../constants';

interface ProjectCardProps {
  project: Project;
  onVote: (projectId: number) => void;
}

const statusConfig: { [key in Project['status']]: { badge: string; label: string; icon?: React.ElementType } } = {
  under_review: { badge: 'bg-gray-600 text-gray-200', label: 'Under Review' },
  funded: { badge: 'bg-green-500 text-white', label: 'Funded', icon: ICONS.Trophy },
  referred: { badge: 'bg-blue-500 text-white', label: 'Referred' },
  top_voted: { badge: 'bg-orange-500 text-white', label: 'Top Voted' },
};

const categoryConfig = {
  Tech: 'border-blue-500',
  Agri: 'border-green-500',
  Social: 'border-yellow-500',
  Health: 'border-red-500',
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onVote }) => {
  const status = statusConfig[project.status];
  const categoryBorder = categoryConfig[project.category];

  return (
    <div className={`bg-gray-800 rounded-lg shadow-lg border-t-4 ${categoryBorder} p-6 flex flex-col justify-between transform hover:scale-105 transition-transform duration-300`}>
      <div>
        <div className="flex justify-between items-start">
          <span className="text-sm font-semibold text-orange-400">{project.category}</span>
          {status && (
            <span className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 ${status.badge}`}>
              {status.icon && <status.icon className="w-4 h-4" />}
              {status.label}
            </span>
          )}
        </div>
        <h3 className="text-xl font-bold text-white mt-2">{project.title}</h3>
        {project.team && project.team[0] && (
          <p className="text-sm text-gray-400 mt-1">by <span className="font-semibold">{project.team[0].fullName}</span></p>
        )}
        <p className="text-gray-400 text-sm mt-2 h-20 overflow-hidden">{project.description}</p>
      </div>
      <div className="mt-6 border-t border-gray-700 pt-4 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-400">Funding Needed</p>
          <p className="text-lg font-bold text-green-400">₹{project.fundingNeeded.toLocaleString('en-IN')}</p>
        </div>
        <button
          onClick={() => onVote(project.id)}
          className="flex flex-col items-center justify-center p-2 border-2 border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 hover:border-orange-500 hover:text-white transition-colors"
          aria-label={`Upvote ${project.title}`}
        >
          <ICONS.Upvote className="w-6 h-6" />
          <span className="text-lg font-bold">{project.votes}</span>
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
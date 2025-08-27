import React, { useState } from 'react';
import type { Project, TeamMember } from '../types';

interface SubmitIdeaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (projectData: Omit<Project, 'id' | 'votes' | 'status'>) => void;
}

const initialSubmitterState: TeamMember = {
    fullName: '',
    institution: '',
    academicYear: '',
    course: '',
    email: '',
    phone: '',
};

const SubmitIdeaModal: React.FC<SubmitIdeaModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [submitter, setSubmitter] = useState<TeamMember>(initialSubmitterState);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [problemStatement, setProblemStatement] = useState('');
  const [objectives, setObjectives] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [expectedOutcomes, setExpectedOutcomes] = useState('');
  const [category, setCategory] = useState<'Tech' | 'Agri' | 'Social' | 'Health'>('Tech');
  const [fundingNeeded, setFundingNeeded] = useState('');

  const handleAddTeamMember = () => {
    setTeamMembers([...teamMembers, { ...initialSubmitterState }]);
  };

  const handleRemoveTeamMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const handleTeamMemberChange = (index: number, field: keyof TeamMember, value: string) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index][field] = value;
    setTeamMembers(updatedMembers);
  };
  
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<any>>, field: keyof TeamMember, value: string) => {
      setter((prev: TeamMember) => ({...prev, [field]: value}));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !fundingNeeded || !submitter.fullName) return;
    
    onSubmit({
      title,
      description,
      problemStatement,
      objectives,
      technologies: technologies.split(',').map(t => t.trim()).filter(Boolean),
      expectedOutcomes,
      category,
      fundingNeeded: parseInt(fundingNeeded, 10),
      team: [submitter, ...teamMembers],
    });
    
    // Reset form and close
    setSubmitter(initialSubmitterState);
    setTeamMembers([]);
    setTitle('');
    setDescription('');
    setProblemStatement('');
    setObjectives('');
    setTechnologies('');
    setExpectedOutcomes('');
    setCategory('Tech');
    setFundingNeeded('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-gray-800 text-white rounded-lg shadow-2xl p-8 w-full max-w-2xl transform transition-all" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Submit Your Project Idea</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl">&times;</button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto pr-4">
            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Submitter Details */}
                <fieldset className="border border-gray-600 p-4 rounded-md">
                    <legend className="px-2 font-semibold text-orange-400">Your Details (Team Lead)</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Full Name*</label>
                            <input type="text" value={submitter.fullName} onChange={e => handleInputChange(setSubmitter, 'fullName', e.target.value)} className="mt-1 block w-full bg-gray-700 text-white border-gray-600 rounded-md p-2" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Institution*</label>
                            <input type="text" value={submitter.institution} onChange={e => handleInputChange(setSubmitter, 'institution', e.target.value)} className="mt-1 block w-full bg-gray-700 text-white border-gray-600 rounded-md p-2" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Academic Year/Grade*</label>
                            <input type="text" value={submitter.academicYear} onChange={e => handleInputChange(setSubmitter, 'academicYear', e.target.value)} className="mt-1 block w-full bg-gray-700 text-white border-gray-600 rounded-md p-2" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Course/Department*</label>
                            <input type="text" value={submitter.course} onChange={e => handleInputChange(setSubmitter, 'course', e.target.value)} className="mt-1 block w-full bg-gray-700 text-white border-gray-600 rounded-md p-2" required />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-300">Email*</label>
                            <input type="email" value={submitter.email} onChange={e => handleInputChange(setSubmitter, 'email', e.target.value)} className="mt-1 block w-full bg-gray-700 text-white border-gray-600 rounded-md p-2" required />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-300">Phone*</label>
                            <input type="tel" value={submitter.phone} onChange={e => handleInputChange(setSubmitter, 'phone', e.target.value)} className="mt-1 block w-full bg-gray-700 text-white border-gray-600 rounded-md p-2" required />
                        </div>
                    </div>
                </fieldset>
                
                {/* Project Details */}
                <fieldset className="border border-gray-600 p-4 rounded-md">
                    <legend className="px-2 font-semibold text-orange-400">Project Details</legend>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Project Title*</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full bg-gray-700 text-white border-gray-600 rounded-md p-2" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Brief Description*</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="mt-1 block w-full bg-gray-700 text-white border-gray-600 rounded-md p-2" required></textarea>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-300">Problem Statement*</label>
                            <textarea value={problemStatement} onChange={(e) => setProblemStatement(e.target.value)} rows={3} className="mt-1 block w-full bg-gray-700 text-white border-gray-600 rounded-md p-2" required></textarea>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-300">Objectives & Goals*</label>
                            <textarea value={objectives} onChange={(e) => setObjectives(e.target.value)} rows={3} className="mt-1 block w-full bg-gray-700 text-white border-gray-600 rounded-md p-2" required></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Technologies/Tools Planned (comma-separated)</label>
                            <input type="text" value={technologies} onChange={(e) => setTechnologies(e.target.value)} className="mt-1 block w-full bg-gray-700 text-white border-gray-600 rounded-md p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Expected Outcomes*</label>
                            <textarea value={expectedOutcomes} onChange={(e) => setExpectedOutcomes(e.target.value)} rows={3} className="mt-1 block w-full bg-gray-700 text-white border-gray-600 rounded-md p-2" required></textarea>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300">Category*</label>
                                <select value={category} onChange={(e) => setCategory(e.target.value as any)} className="mt-1 block w-full bg-gray-700 text-white border-gray-600 rounded-md p-2" required>
                                    <option>Tech</option><option>Agri</option><option>Social</option><option>Health</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300">Funding Needed (₹)*</label>
                                <input type="number" value={fundingNeeded} onChange={(e) => setFundingNeeded(e.target.value)} placeholder="e.g., 50000" className="mt-1 block w-full bg-gray-700 text-white border-gray-600 rounded-md p-2" required />
                            </div>
                        </div>
                    </div>
                </fieldset>

                {/* Team Members */}
                <fieldset className="border border-gray-600 p-4 rounded-md">
                    <legend className="px-2 font-semibold text-orange-400">Team Members (Optional)</legend>
                    {teamMembers.map((member, index) => (
                        <div key={index} className="border-b border-gray-700 pb-4 mb-4">
                            <h4 className="text-md font-semibold mb-2">Team Member #{index + 2}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" placeholder="Full Name" value={member.fullName} onChange={e => handleTeamMemberChange(index, 'fullName', e.target.value)} className="bg-gray-700 text-white border-gray-600 rounded-md p-2"/>
                                <input type="text" placeholder="Institution" value={member.institution} onChange={e => handleTeamMemberChange(index, 'institution', e.target.value)} className="bg-gray-700 text-white border-gray-600 rounded-md p-2"/>
                                <input type="email" placeholder="Email" value={member.email} onChange={e => handleTeamMemberChange(index, 'email', e.target.value)} className="bg-gray-700 text-white border-gray-600 rounded-md p-2"/>
                                 <button type="button" onClick={() => handleRemoveTeamMember(index)} className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700">Remove</button>
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddTeamMember} className="mt-2 text-sm text-blue-400 font-semibold hover:text-blue-300">+ Add Team Member</button>
                </fieldset>

                <div className="mt-6 flex justify-end space-x-4">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-500">Cancel</button>
                    <button type="submit" className="px-6 py-2 bg-orange-500 rounded-md hover:bg-orange-600 font-semibold">Submit Project</button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitIdeaModal;
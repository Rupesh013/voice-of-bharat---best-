import React, { useState } from 'react';
import type { ResumeData } from '../types';
import { generateResumeSummary, generateExperiencePoints, generateCoverLetter } from '../services/geminiService';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, convertInchesToTwip } from 'docx';


const initialResumeData: ResumeData = {
  fullName: "Aarav Sharma",
  email: "aarav.sharma@email.com",
  phone: "+91 98765 43210",
  address: "Bengaluru, Karnataka",
  headline: "Aspiring Software Developer | B.Tech CSE Student",
  summary: "A highly motivated Computer Science student with a passion for software development and problem-solving. Eager to apply academic knowledge and skills to a challenging internship role.",
  careerGoal: "Full Stack Developer",
  education: [{ institution: "Indian Institute of Technology, Bombay", degree: "B.Tech in Computer Science", year: "2026", gpa: "8.8/10" }],
  experience: [{ company: "Tech Solutions Inc.", role: "Software Development Intern", duration: "June 2024 - Aug 2024", location: "Remote", points: ["Developed a new feature for the main application using React and Node.js, increasing user engagement by 15%.", "Collaborated with a team of 5 to fix over 30 bugs and improve code quality, reducing application load time by 10%.", "Wrote unit tests, achieving 90% code coverage for new components."] }],
  projects: [{ name: "E-commerce Website", description: "Built a fully functional e-commerce platform with user authentication, product catalog, and payment gateway integration.", link: "github.com/aarav/ecommerce" }],
  certifications: [{ name: "Certified Java Developer", issuer: "Oracle", year: "2024" }],
  skills: ["Java", "Python", "JavaScript", "React", "Node.js", "SQL", "Git", "Docker"]
};

const TabButton: React.FC<{ label: string; isActive: boolean; onClick: () => void; }> = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-6 py-3 font-semibold text-lg transition-colors duration-300 ${isActive ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-500'}`}
    >
        {label}
    </button>
);

const CollapsibleSection: React.FC<{ title: string; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, children, defaultOpen = false }) => {
    return (
        <details open={defaultOpen} className="bg-white border rounded-lg overflow-hidden group">
            <summary className="cursor-pointer font-semibold text-gray-800 p-4 bg-gray-50 hover:bg-gray-100 flex justify-between items-center">
                {title}
                <span className="text-gray-500 text-sm transition-transform transform group-open:rotate-180">▼</span>
            </summary>
            <div className="p-4 border-t">
                {children}
            </div>
        </details>
    );
};

const ResumeSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mt-4">
    <h2 className="text-lg font-bold text-orange-600 border-b-2 border-orange-200 pb-1 mb-2">{title}</h2>
    {children}
  </div>
);


const ResumeBuilderPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('resume');
  const [resume, setResume] = useState<ResumeData>(initialResumeData);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [isGeneratingPoints, setIsGeneratingPoints] = useState<number | null>(null);

  // Cover Letter State
  const [coverLetterInputs, setCoverLetterInputs] = useState({ jobTitle: 'Software Engineer', companyName: 'Google', keySkills: 'React, Node.js, Problem Solving' });
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState('');
  const [isGeneratingCoverLetter, setIsGeneratingCoverLetter] = useState(false);


  const handleGenerateSummary = async () => {
    setIsGeneratingSummary(true);
    try {
      const summary = await generateResumeSummary(resume, resume.careerGoal);
      setResume(prev => ({ ...prev, summary }));
    } catch (error) {
      console.error(error);
      alert("Failed to generate summary.");
    } finally {
      setIsGeneratingSummary(false);
    }
  };
  
  const handleGeneratePoints = async (expIndex: number) => {
    setIsGeneratingPoints(expIndex);
    try {
        const { role, company } = resume.experience[expIndex];
        const points = await generateExperiencePoints(role, company);
        const newExperience = [...resume.experience];
        newExperience[expIndex].points = points;
        setResume(prev => ({ ...prev, experience: newExperience }));
    } catch (error) {
        console.error(error);
        alert("Failed to generate experience points.");
    } finally {
        setIsGeneratingPoints(null);
    }
  };

  const handleInputChange = (section: keyof ResumeData, index: number, field: string, value: string | string[]) => {
    const newResume = { ...resume };
    (newResume[section] as any[])[index][field] = value;
    setResume(newResume);
  };

  const addSectionItem = (section: 'education' | 'experience' | 'projects' | 'certifications') => {
    let newItem;
    switch(section) {
        case 'education': newItem = { institution: '', degree: '', year: '', gpa: '' }; break;
        case 'experience': newItem = { company: '', role: '', duration: '', location: '', points: [''] }; break;
        case 'projects': newItem = { name: '', description: '', link: '' }; break;
        case 'certifications': newItem = { name: '', issuer: '', year: '' }; break;
    }
    setResume(prev => ({ ...prev, [section]: [...(prev[section] as any[]), newItem] }));
  };
  
  const removeSectionItem = (section: keyof ResumeData, index: number) => {
    setResume(prev => ({ ...prev, [section]: (prev[section] as any[]).filter((_, i) => i !== index) }));
  };

  // Resume Download Handlers
  const handleDownloadPdf = () => {
    const input = document.getElementById('resume-preview');
    if (input) {
        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${resume.fullName.replace(' ', '_')}_Resume.pdf`);
        });
    }
  };
  
  const handleDownloadDocx = () => {
      const doc = new Document({
        sections: [{
          children: [
            new Paragraph({ text: resume.fullName, heading: HeadingLevel.TITLE, alignment: AlignmentType.CENTER }),
            new Paragraph({ text: resume.headline, alignment: AlignmentType.CENTER }),
            new Paragraph({ text: `${resume.email} | ${resume.phone} | ${resume.address}`, alignment: AlignmentType.CENTER, spacing: { after: 200 } }),

            new Paragraph({ text: "Summary", heading: HeadingLevel.HEADING_1, border: { bottom: { color: "auto", space: 1, style: "single", size: 6 } } }),
            new Paragraph({ text: resume.summary }),

            new Paragraph({ text: "Experience", heading: HeadingLevel.HEADING_1, border: { bottom: { color: "auto", space: 1, style: "single", size: 6 } }, spacing: {before: 200}}),
            ...resume.experience.flatMap(exp => [
              new Paragraph({ children: [new TextRun({ text: exp.role, bold: true }), new TextRun({ text: ` at ${exp.company}` })], spacing: { before: 200 } }),
              new Paragraph({ children: [new TextRun({ text: `${exp.duration} | ${exp.location}`, italics: true, color: "555555" })] }),
              ...exp.points.map(point => new Paragraph({ text: point, bullet: { level: 0 } }))
            ]),

            new Paragraph({ text: "Education", heading: HeadingLevel.HEADING_1, border: { bottom: { color: "auto", space: 1, style: "single", size: 6 } }, spacing: {before: 200}}),
            ...resume.education.map(edu => 
                 new Paragraph({ children: [new TextRun({ text: edu.institution, bold: true }), new TextRun({ text: ` - ${edu.degree} (${edu.year}) GPA: ${edu.gpa}` })]})
            ),

            new Paragraph({ text: "Projects", heading: HeadingLevel.HEADING_1, border: { bottom: { color: "auto", space: 1, style: "single", size: 6 } }, spacing: {before: 200}}),
            ...resume.projects.map(p => new Paragraph({ children: [new TextRun({text: p.name, bold: true}), new TextRun({text: ` - ${p.description}`})]})),

            new Paragraph({ text: "Certifications", heading: HeadingLevel.HEADING_1, border: { bottom: { color: "auto", space: 1, style: "single", size: 6 } }, spacing: {before: 200}}),
            ...resume.certifications.map(c => new Paragraph({ children: [new TextRun({text: c.name, bold: true}), new TextRun({text: ` - ${c.issuer} (${c.year})`})]})),

            new Paragraph({ text: "Skills", heading: HeadingLevel.HEADING_1, border: { bottom: { color: "auto", space: 1, style: "single", size: 6 } }, spacing: {before: 200}}),
            new Paragraph({ text: resume.skills.join(' • ') }),
          ],
        }],
      });
      Packer.toBlob(doc).then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${resume.fullName.replace(' ', '_')}_Resume.docx`;
        a.click();
        window.URL.revokeObjectURL(url);
      });
  };

  // Cover Letter Handlers
  const handleGenerateCoverLetter = async () => {
    setIsGeneratingCoverLetter(true);
    setGeneratedCoverLetter('');
    try {
        const { jobTitle, companyName, keySkills } = coverLetterInputs;
        const letter = await generateCoverLetter(resume, jobTitle, companyName, keySkills);
        setGeneratedCoverLetter(letter);
    } catch(e) {
        alert("Failed to generate cover letter.");
    } finally {
        setIsGeneratingCoverLetter(false);
    }
  }

  const downloadCoverLetterPdf = () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const lines = pdf.splitTextToSize(generatedCoverLetter, 180); // 180mm width
    pdf.text(lines, 15, 20);
    pdf.save(`${resume.fullName}_Cover_Letter.pdf`);
  };

  const downloadCoverLetterDocx = () => {
    const paragraphs = generatedCoverLetter.split('\n\n').map(p => new Paragraph({ children: [new TextRun(p)] }));
    const doc = new Document({
        sections: [{ children: paragraphs }]
    });
    Packer.toBlob(doc).then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${resume.fullName}_Cover_Letter.docx`;
        a.click();
        window.URL.revokeObjectURL(url);
    });
  };
  

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      <div className="container mx-auto">
        <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Resume, Cover Letter & Portfolio Builder</h1>
            <p className="text-gray-600 mt-4 text-lg">Your complete toolkit for crafting the perfect job application.</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-2 mb-8">
            <div className="flex justify-center border-b">
                <TabButton label="Resume Builder" isActive={activeTab === 'resume'} onClick={() => setActiveTab('resume')} />
                <TabButton label="Cover Letter Generator" isActive={activeTab === 'coverLetter'} onClick={() => setActiveTab('coverLetter')} />
            </div>
        </div>

        {activeTab === 'resume' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Resume Form */}
                <div className="bg-white p-6 rounded-lg shadow-lg overflow-y-auto max-h-[85vh]">
                    <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Edit Your Resume</h2>
                    <div className="space-y-6">
                        <CollapsibleSection title="Personal Details" defaultOpen>
                           {/* Content for personal details */}
                           <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium">Full Name</label>
                                    <input type="text" value={resume.fullName} onChange={(e) => setResume({...resume, fullName: e.target.value})} className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm p-2 text-gray-900"/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Email</label>
                                    <input type="email" value={resume.email} onChange={(e) => setResume({...resume, email: e.target.value})} className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm p-2 text-gray-900"/>
                                </div>
                                 <div>
                                    <label className="block text-sm font-medium">Phone</label>
                                    <input type="tel" value={resume.phone} onChange={(e) => setResume({...resume, phone: e.target.value})} className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm p-2 text-gray-900"/>
                                </div>
                                 <div>
                                    <label className="block text-sm font-medium">Address</label>
                                    <input type="text" value={resume.address} onChange={(e) => setResume({...resume, address: e.target.value})} className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm p-2 text-gray-900"/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Headline</label>
                                    <input type="text" value={resume.headline} onChange={(e) => setResume({...resume, headline: e.target.value})} className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm p-2 text-gray-900"/>
                                </div>
                           </div>
                        </CollapsibleSection>
                         <CollapsibleSection title="Summary & Career Goal">
                            <div className="space-y-4">
                                 <div>
                                    <label className="block text-sm font-medium">Career Goal (for AI)</label>
                                    <input type="text" value={resume.careerGoal} onChange={(e) => setResume({...resume, careerGoal: e.target.value})} className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm p-2 text-gray-900" placeholder="e.g., Software Engineer"/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Summary</label>
                                    <textarea value={resume.summary} onChange={(e) => setResume({...resume, summary: e.target.value})} rows={4} className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm p-2 text-gray-900"/>
                                    <button onClick={handleGenerateSummary} disabled={isGeneratingSummary} className="mt-2 text-sm text-orange-600 hover:underline disabled:opacity-50">
                                        {isGeneratingSummary ? 'Generating...' : '✨ Generate Summary with AI'}
                                    </button>
                                </div>
                            </div>
                        </CollapsibleSection>
                        <CollapsibleSection title="Experience">
                            {resume.experience.map((exp, index) => (
                                <div key={index} className="space-y-3 p-3 border rounded-md mb-3">
                                    <input type="text" placeholder="Company" value={exp.company} onChange={(e) => handleInputChange('experience', index, 'company', e.target.value)} className="w-full bg-white border-gray-300 rounded-md p-2 text-gray-900"/>
                                    <input type="text" placeholder="Role" value={exp.role} onChange={(e) => handleInputChange('experience', index, 'role', e.target.value)} className="w-full bg-white border-gray-300 rounded-md p-2 text-gray-900"/>
                                    <input type="text" placeholder="Duration" value={exp.duration} onChange={(e) => handleInputChange('experience', index, 'duration', e.target.value)} className="w-full bg-white border-gray-300 rounded-md p-2 text-gray-900"/>
                                    <p className="text-sm font-medium mt-2">Bullet Points:</p>
                                    {exp.points.map((point, pIndex) => (
                                        <input key={pIndex} type="text" value={point} onChange={(e) => {
                                            const newPoints = [...exp.points];
                                            newPoints[pIndex] = e.target.value;
                                            handleInputChange('experience', index, 'points', newPoints);
                                        }} className="w-full bg-white border-gray-300 rounded-md p-1 text-sm text-gray-900"/>
                                    ))}
                                     <button onClick={() => handleGeneratePoints(index)} disabled={isGeneratingPoints === index} className="text-xs text-orange-600 hover:underline disabled:opacity-50">
                                        {isGeneratingPoints === index ? 'Generating...' : '✨ Generate Points with AI'}
                                    </button>
                                    <button onClick={() => removeSectionItem('experience', index)} className="text-xs text-red-500 hover:underline">Remove</button>
                                </div>
                            ))}
                            <button onClick={() => addSectionItem('experience')} className="mt-2 text-sm text-blue-600 font-semibold">+ Add Experience</button>
                        </CollapsibleSection>
                        <CollapsibleSection title="Education">
                            {resume.education.map((edu, index) => (
                                 <div key={index} className="space-y-3 p-3 border rounded-md mb-3">
                                    <input type="text" placeholder="Institution" value={edu.institution} onChange={(e) => handleInputChange('education', index, 'institution', e.target.value)} className="w-full bg-white border-gray-300 rounded-md p-2 text-gray-900"/>
                                    <input type="text" placeholder="Degree" value={edu.degree} onChange={(e) => handleInputChange('education', index, 'degree', e.target.value)} className="w-full bg-white border-gray-300 rounded-md p-2 text-gray-900"/>
                                    <input type="text" placeholder="Year" value={edu.year} onChange={(e) => handleInputChange('education', index, 'year', e.target.value)} className="w-full bg-white border-gray-300 rounded-md p-2 text-gray-900"/>
                                     <button onClick={() => removeSectionItem('education', index)} className="text-xs text-red-500 hover:underline">Remove</button>
                                </div>
                            ))}
                             <button onClick={() => addSectionItem('education')} className="mt-2 text-sm text-blue-600 font-semibold">+ Add Education</button>
                        </CollapsibleSection>
                    </div>
                </div>

                {/* Resume Preview */}
                 <div className="bg-white p-2 md:p-6 rounded-lg shadow-lg relative">
                    <div className="absolute top-4 right-4 flex gap-2">
                        <button onClick={handleDownloadPdf} className="bg-orange-500 text-white px-3 py-1 rounded text-sm font-semibold">PDF</button>
                        <button onClick={handleDownloadDocx} className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-semibold">DOCX</button>
                    </div>
                     <div id="resume-preview" className="bg-white p-6 md:p-8 max-h-[80vh] overflow-y-auto">
                        <div className="text-center mb-4">
                            <h1 className="text-3xl font-bold">{resume.fullName}</h1>
                            <p className="text-md text-gray-600">{resume.headline}</p>
                            <p className="text-sm text-gray-500">{resume.email} | {resume.phone} | {resume.address}</p>
                        </div>
                        
                        <ResumeSection title="Summary">
                            <p className="text-sm text-gray-700">{resume.summary}</p>
                        </ResumeSection>

                        <ResumeSection title="Experience">
                            {resume.experience.map((exp, i) => (
                                <div key={i} className="mb-3">
                                    <h3 className="font-semibold text-md">{exp.role} at {exp.company}</h3>
                                    <p className="text-xs text-gray-500">{exp.duration} {exp.location && `| ${exp.location}`}</p>
                                    <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                                        {exp.points.map((p, j) => <li key={j}>{p}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </ResumeSection>
                        
                        <ResumeSection title="Education">
                             {resume.education.map((edu, i) => (
                                <div key={i} className="mb-2">
                                    <h3 className="font-semibold text-md">{edu.institution}</h3>
                                    <p className="text-sm text-gray-700">{edu.degree} - {edu.year}</p>
                                    {edu.gpa && <p className="text-xs text-gray-600">GPA: {edu.gpa}</p>}
                                </div>
                            ))}
                        </ResumeSection>
                        
                        <ResumeSection title="Projects">
                            {resume.projects.map((proj, i) => (
                                <div key={i} className="mb-2">
                                     <h3 className="font-semibold text-md">{proj.name}</h3>
                                     <p className="text-sm text-gray-700">{proj.description}</p>
                                     <a href={`https://${proj.link}`} target="_blank" rel="noreferrer" className="text-xs text-blue-600">{proj.link}</a>
                                </div>
                            ))}
                        </ResumeSection>

                        <ResumeSection title="Skills">
                            <p className="text-sm text-gray-700">{resume.skills.join(' • ')}</p>
                        </ResumeSection>
                    </div>
                </div>
            </div>
        )}
        
        {activeTab === 'coverLetter' && (
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Generate Cover Letter</h2>
                     <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Job Title</label>
                            <input type="text" value={coverLetterInputs.jobTitle} onChange={(e) => setCoverLetterInputs({...coverLetterInputs, jobTitle: e.target.value})} className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm p-2 text-gray-900"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Company Name</label>
                            <input type="text" value={coverLetterInputs.companyName} onChange={(e) => setCoverLetterInputs({...coverLetterInputs, companyName: e.target.value})} className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm p-2 text-gray-900"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Key Skills to Highlight</label>
                            <input type="text" value={coverLetterInputs.keySkills} onChange={(e) => setCoverLetterInputs({...coverLetterInputs, keySkills: e.target.value})} className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm p-2 text-gray-900" placeholder="e.g., React, Python, Teamwork"/>
                        </div>
                         <button onClick={handleGenerateCoverLetter} disabled={isGeneratingCoverLetter} className="w-full bg-orange-500 text-white font-semibold py-3 px-4 rounded-md hover:bg-orange-600 transition disabled:bg-orange-300">
                             {isGeneratingCoverLetter ? 'Generating...' : '✨ Generate with AI'}
                         </button>
                    </div>
                </div>
                {/* Output */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                     <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold">Your Cover Letter</h2>
                         {generatedCoverLetter && (
                            <div className="flex gap-2">
                                <button onClick={downloadCoverLetterPdf} className="bg-orange-500 text-white px-3 py-1 rounded text-sm font-semibold">PDF</button>
                                <button onClick={downloadCoverLetterDocx} className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-semibold">DOCX</button>
                            </div>
                        )}
                    </div>
                    {isGeneratingCoverLetter && <p className="animate-pulse">Writing your cover letter...</p>}
                    <div className="bg-gray-50 p-4 rounded border h-96 overflow-y-auto whitespace-pre-wrap text-sm text-gray-900">
                        {generatedCoverLetter || "Your generated cover letter will appear here."}
                    </div>
                </div>
             </div>
        )}

      </div>
    </div>
  );
};

export default ResumeBuilderPage;
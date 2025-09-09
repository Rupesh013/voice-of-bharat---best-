import React, { useState, useRef } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import BackButton from '../components/BackButton';
import { Link } from 'react-router-dom';
import { ICONS } from '../constants';
import type { Document } from '../types';

const initialDocuments: Document[] = [
    { id: 1, name: 'Aadhaar Card.pdf', type: 'Aadhaar', dateAdded: '15 Aug 2024' },
    { id: 2, name: 'PAN Card.jpg', type: 'PAN Card', dateAdded: '10 Aug 2024' },
    { id: 3, name: 'Driving License.pdf', type: 'Driving License', dateAdded: '05 Aug 2024' },
];

const ApplicationStatusItem: React.FC<{ scheme: string; status: 'Approved' | 'Pending' | 'Rejected'; date: string }> = ({ scheme, status, date }) => {
    const statusClasses = {
        Approved: 'bg-green-100 text-green-800',
        Pending: 'bg-yellow-100 text-yellow-800',
        Rejected: 'bg-red-100 text-red-800',
    };

    return (
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
            <div>
                <p className="font-semibold text-gray-900 text-sm">{scheme}</p>
                <p className="text-xs text-gray-500">Applied on: {date}</p>
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusClasses[status]}`}>
                {status}
            </span>
        </div>
    );
};

const SidebarCard: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b">{title}</h2>
        <div className="space-y-4">{children}</div>
    </div>
);


const MyBharatPage: React.FC = () => {
    const { t } = useTranslation();
    const [documents, setDocuments] = useState<Document[]>(initialDocuments);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const newDocument: Document = {
                id: Date.now(),
                name: file.name,
                type: 'Other', // Or deduce from name/type
                dateAdded: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
            };
            setDocuments(prev => [newDocument, ...prev]);
        }
    };

    const handleDelete = (id: number) => {
        setDocuments(prev => prev.filter(doc => doc.id !== id));
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <section className="relative bg-gray-800 text-white py-20 text-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto.format&fit=crop')"}}>
                 <div className="absolute inset-0 bg-black opacity-60"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.7)' }}>My Bharat Dashboard</h1>
                    <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.7)' }}>
                        Your personal space to manage documents, track applications, and access services.
                    </p>
                </div>
            </section>

            <main className="container mx-auto px-4 md:px-6 py-12">
                <BackButton to="/" className="mb-8" />
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Main Content Column */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 border-b pb-4">
                                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                                    <ICONS.Document className="w-8 h-8 text-orange-500" />
                                    Digital Document Vault
                                </h2>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <button 
                                    onClick={handleUploadClick}
                                    className="mt-4 sm:mt-0 flex items-center gap-2 px-4 py-2 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition duration-300"
                                >
                                    <ICONS.Upload className="w-5 h-5"/>
                                    Upload Document
                                </button>
                            </div>
                            
                            <div className="space-y-4">
                                {documents.length > 0 ? documents.map(doc => (
                                    <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <ICONS.Document className="w-6 h-6 text-gray-500 flex-shrink-0"/>
                                            <div>
                                                <p className="font-semibold text-gray-900">{doc.name}</p>
                                                <p className="text-xs text-gray-500">{doc.type} | Added: {doc.dateAdded}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-100" aria-label={`View ${doc.name}`}>
                                                <ICONS.View className="w-5 h-5"/>
                                            </button>
                                            <button onClick={() => handleDelete(doc.id)} className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-100" aria-label={`Delete ${doc.name}`}>
                                                <ICONS.Delete className="w-5 h-5"/>
                                            </button>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-10 border-2 border-dashed rounded-lg">
                                        <p className="text-gray-500">Your vault is empty.</p>
                                        <p className="text-sm text-gray-400">Upload documents to get started.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Column */}
                    <div className="space-y-8">
                        <SidebarCard title="Track Your Applications">
                             <ApplicationStatusItem scheme="PM-KISAN Scheme" status="Approved" date="15 Aug 2024" />
                             <ApplicationStatusItem scheme="Student Scholarship" status="Pending" date="20 Aug 2024" />
                             <ApplicationStatusItem scheme="Mudra Loan for Business" status="Rejected" date="10 Aug 2024" />
                             <Link to="#" className="text-sm text-center block text-orange-600 font-semibold hover:underline">View All Applications</Link>
                        </SidebarCard>
                        
                        <SidebarCard title="Account & Settings">
                           <Link to="#" className="flex items-center p-3 bg-gray-50 rounded-md hover:bg-orange-50 transition-colors group">
                                <ICONS.DigiLocker className="w-6 h-6 text-gray-500 group-hover:text-orange-600"/>
                                <span className="ml-3 font-semibold text-gray-800">Connect DigiLocker</span>
                           </Link>
                           <Link to="/profile" className="flex items-center p-3 bg-gray-50 rounded-md hover:bg-orange-50 transition-colors group">
                                <ICONS.Settings className="w-6 h-6 text-gray-500 group-hover:text-orange-600"/>
                                <span className="ml-3 font-semibold text-gray-800">Profile Settings</span>
                           </Link>
                        </SidebarCard>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MyBharatPage;
import React, { useState, useRef } from 'react';
import BackButton from '../components/BackButton';
import { ICONS } from '../constants';
import type { UserProfile } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { useUserProfile } from '../contexts/UserProfileContext';

const ProfileSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-gray-50 p-6 rounded-lg border">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
        <div className="space-y-4">{children}</div>
    </div>
);

const ProfileInput: React.FC<{ t: (key: string) => string; id: keyof UserProfile; type?: string; readOnly?: boolean; profile: UserProfile; onChange: (e: any) => void; }> = 
({ t, id, type = 'text', readOnly = false, profile, onChange }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-600">{t(`pages.profile.labels.${id}`)}</label>
        <input
            type={type}
            id={id}
            name={id}
            value={(profile as any)[id] || ''}
            onChange={onChange}
            readOnly={readOnly}
            className={`mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm p-2 text-gray-900 focus:ring-orange-500 focus:border-orange-500 ${readOnly ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        />
    </div>
);

const ProfileSelect: React.FC<{ t: (key: string) => string; id: keyof UserProfile; options: string[]; profile: UserProfile; onChange: (e: any) => void; }> =
({ t, id, options, profile, onChange }) => (
     <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-600">{t(`pages.profile.labels.${id}`)}</label>
        <select id={id} name={id} value={(profile as any)[id] || ''} onChange={onChange} className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm p-2 text-gray-900 focus:ring-orange-500 focus:border-orange-500">
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
);

const ProfileTextarea: React.FC<{ t: (key: string) => string; id: keyof UserProfile; profile: UserProfile; onChange: (e: any) => void; rows?: number }> =
({t, id, profile, onChange, rows=3}) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-600">{t(`pages.profile.labels.${id}`)}</label>
        <textarea id={id} name={id} value={(profile as any)[id] || ''} onChange={onChange} rows={rows} className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm p-2 text-gray-900 focus:ring-orange-500 focus:border-orange-500" />
    </div>
);

const ProfilePage: React.FC = () => {
    const { t } = useTranslation();
    const { userProfile, setUserProfile } = useUserProfile();
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUserProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setSuccessMessage('');
        setTimeout(() => {
            setIsLoading(false);
            setSuccessMessage(t('pages.profile.success'));
            setTimeout(() => setSuccessMessage(''), 3000);
        }, 1500);
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserProfile(prev => ({ ...prev, profilePictureUrl: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const renderOccupationSpecificFields = () => {
        switch (userProfile.occupation) {
            case 'Student':
                return (
                    <ProfileSection title={t('pages.profile.occupationSpecificInfo')}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ProfileSelect t={t} id="educationLevel" options={['School', 'College', 'Graduate', 'Postgraduate']} profile={userProfile} onChange={handleInputChange} />
                            <ProfileSelect t={t} id="stream" options={['Science', 'Commerce', 'Arts', 'IT', 'Vocational']} profile={userProfile} onChange={handleInputChange} />
                            <ProfileInput t={t} id="skills" profile={userProfile} onChange={handleInputChange} />
                            <ProfileSelect t={t} id="careerGoal" options={['Job', 'Higher Studies', 'Entrepreneurship', 'Govt. Exams']} profile={userProfile} onChange={handleInputChange} />
                            <ProfileSelect t={t} id="locationType" options={['Urban', 'Rural']} profile={userProfile} onChange={handleInputChange} />
                            <ProfileSelect t={t} id="incomeBackground" options={['Low', 'Middle', 'High']} profile={userProfile} onChange={handleInputChange} />
                        </div>
                    </ProfileSection>
                );
            case 'Farmer':
                 return (
                    <ProfileSection title={t('pages.profile.occupationSpecificInfo')}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ProfileSelect t={t} id="farmingType" options={['Crop', 'Livestock', 'Fisheries', 'Mixed']} profile={userProfile} onChange={handleInputChange} />
                            <ProfileInput t={t} id="cropsLivestock" profile={userProfile} onChange={handleInputChange} />
                            <ProfileInput t={t} id="landSize" profile={userProfile} onChange={handleInputChange} />
                            <ProfileSelect t={t} id="irrigationSource" options={['Rainfed', 'Canal', 'Borewell', 'Drip']} profile={userProfile} onChange={handleInputChange} />
                        </div>
                         <ProfileTextarea t={t} id="farmerChallenges" profile={userProfile} onChange={handleInputChange} />
                    </ProfileSection>
                );
            case 'Woman':
                return (
                    <ProfileSection title={t('pages.profile.occupationSpecificInfo')}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ProfileSelect t={t} id="maritalStatus" options={['Single', 'Married', 'Widow', 'Divorced']} profile={userProfile} onChange={handleInputChange} />
                            <ProfileSelect t={t} id="employmentStatus" options={['Unemployed', 'Self-employed', 'Working']} profile={userProfile} onChange={handleInputChange} />
                             <ProfileInput t={t} id="interests" profile={userProfile} onChange={handleInputChange} />
                        </div>
                        <ProfileTextarea t={t} id="womanChallenges" profile={userProfile} onChange={handleInputChange} />
                    </ProfileSection>
                );
            case 'Senior Citizen':
                 return (
                    <ProfileSection title={t('pages.profile.occupationSpecificInfo')}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ProfileSelect t={t} id="retired" options={['Yes', 'No']} profile={userProfile} onChange={handleInputChange} />
                            <ProfileSelect t={t} id="pension" options={['Govt.', 'Private', 'None']} profile={userProfile} onChange={handleInputChange} />
                            <ProfileSelect t={t} id="livingSituation" options={['Alone', 'With Family', 'Old Age Home']} profile={userProfile} onChange={handleInputChange} />
                            <ProfileInput t={t} id="healthConditions" profile={userProfile} onChange={handleInputChange} />
                        </div>
                         <ProfileTextarea t={t} id="seniorInterests" profile={userProfile} onChange={handleInputChange} />
                    </ProfileSection>
                );
            case 'Entrepreneur':
                return (
                    <ProfileSection title={t('pages.profile.occupationSpecificInfo')}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ProfileSelect t={t} id="businessStage" options={['Idea', 'Startup', 'Growing', 'Established']} profile={userProfile} onChange={handleInputChange} />
                            <ProfileSelect t={t} id="industry" options={['Agri', 'Tech', 'Retail', 'Manufacturing', 'Services']} profile={userProfile} onChange={handleInputChange} />
                             <ProfileInput t={t} id="annualTurnover" profile={userProfile} onChange={handleInputChange} />
                             <ProfileInput t={t} id="employeeCount" profile={userProfile} onChange={handleInputChange} />
                             <ProfileInput t={t} id="educationBackground" profile={userProfile} onChange={handleInputChange} />
                        </div>
                        <ProfileTextarea t={t} id="entrepreneurChallenges" profile={userProfile} onChange={handleInputChange} />
                    </ProfileSection>
                );
            case 'Worker':
                 return (
                    <ProfileSection title={t('pages.profile.occupationSpecificInfo')}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <ProfileSelect t={t} id="workType" options={['Skilled', 'Semi-skilled', 'Unskilled']} profile={userProfile} onChange={handleInputChange} />
                             <ProfileSelect t={t} id="sector" options={['Construction', 'Factory', 'Domestic', 'Transport', 'Gig Economy', 'Other']} profile={userProfile} onChange={handleInputChange} />
                             <ProfileInput t={t} id="workerSkills" profile={userProfile} onChange={handleInputChange} />
                        </div>
                        <ProfileTextarea t={t} id="workerChallenges" profile={userProfile} onChange={handleInputChange} />
                    </ProfileSection>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12">
            <div className="container mx-auto px-6 max-w-4xl">
                <BackButton to="/my-bharat" className="mb-8" />
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">{t('pages.profile.title')}</h1>
                        <p className="text-gray-500 mt-2">{t('pages.profile.subtitle')}</p>
                    </div>

                    <form onSubmit={handleSave} className="space-y-8">
                        <div className="flex flex-col items-center space-y-4">
                            <img src={userProfile.profilePictureUrl} alt="Profile" className="w-32 h-32 rounded-full object-cover ring-4 ring-orange-200" />
                            <input type="file" ref={fileInputRef} onChange={handlePhotoChange} className="hidden" accept="image/*" />
                            <button type="button" onClick={handleUploadClick} className="text-sm font-semibold text-orange-600 hover:underline">
                                {t('pages.profile.uploadPhoto')}
                            </button>
                        </div>
                        
                        <ProfileSection title={t('pages.profile.personalInfo')}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <ProfileInput t={t} id="fullName" profile={userProfile} onChange={handleInputChange} />
                                <ProfileInput t={t} id="email" profile={userProfile} onChange={handleInputChange} readOnly />
                                <ProfileInput t={t} id="phone" profile={userProfile} onChange={handleInputChange} />
                                <ProfileInput t={t} id="dateOfBirth" type="date" profile={userProfile} onChange={handleInputChange} />
                                <ProfileSelect t={t} id="gender" options={['Male', 'Female', 'Other']} profile={userProfile} onChange={handleInputChange} />
                            </div>
                        </ProfileSection>

                        <ProfileSection title={t('pages.profile.demographicInfo')}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <ProfileSelect t={t} id="occupation" options={['Student', 'Farmer', 'Woman', 'Worker', 'Entrepreneur', 'Senior Citizen', 'Other']} profile={userProfile} onChange={handleInputChange} />
                                <ProfileSelect t={t} id="annualIncome" options={['< ₹1 Lakh', '₹1-3 Lakh', '₹3-5 Lakh', '₹5-10 Lakh', '> ₹10 Lakh']} profile={userProfile} onChange={handleInputChange} />
                            </div>
                        </ProfileSection>

                        {renderOccupationSpecificFields()}

                        <div className="pt-6 border-t flex flex-col items-center">
                            {successMessage && (
                                <div className="mb-4 text-center p-3 w-full rounded-md bg-green-100 text-green-800 text-sm" role="alert">
                                    {successMessage}
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full max-w-xs flex justify-center items-center gap-2 bg-orange-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-orange-700 transition duration-300 disabled:bg-orange-400"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        {t('pages.profile.saving')}
                                    </>
                                ) : (
                                    <>
                                        <ICONS.Save className="w-5 h-5" />
                                        {t('pages.profile.saveButton')}
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
import React, { useState, useRef } from 'react';
import BackButton from '../components/BackButton';
import { ICONS } from '../constants';
import type { UserProfile } from '../types';

const mockUserProfile: UserProfile = {
    fullName: 'Rupesh Reddy',
    email: 'rupesh.reddy@example.com',
    phone: '+91 7997401678',
    dateOfBirth: '2004-05-15',
    address: {
        street: '123 Tech Park Road',
        city: 'Tirupati',
        state: 'Andhra Pradesh',
        pincode: '517502',
    },
    language: 'en',
    occupation: 'Student',
    annualIncome: '₹1-3 Lakh',
    profilePictureUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop'
};

const ProfileSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-gray-50 p-6 rounded-lg border">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
        <div className="space-y-4">{children}</div>
    </div>
);

const ProfileInput: React.FC<{ label: string; id: string; type?: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; readOnly?: boolean }> = 
({ label, id, type = 'text', value, onChange, readOnly = false }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-600">{label}</label>
        <input
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            className={`mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm p-2 text-gray-900 focus:ring-orange-500 focus:border-orange-500 ${readOnly ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        />
    </div>
);

const ProfilePage: React.FC = () => {
    const [profile, setProfile] = useState<UserProfile>(mockUserProfile);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        const keys = id.split('.');
        if (keys.length > 1) {
            setProfile(prev => ({
                ...prev,
                [keys[0]]: {
                    ...(prev as any)[keys[0]],
                    [keys[1]]: value,
                },
            }));
        } else {
            setProfile(prev => ({ ...prev, [id]: value }));
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setSuccessMessage('');
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setSuccessMessage('Profile updated successfully!');
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
                setProfile(prev => ({ ...prev, profilePictureUrl: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12">
            <div className="container mx-auto px-6 max-w-4xl">
                <BackButton to="/my-bharat" className="mb-8" />
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">Edit Your Profile</h1>
                        <p className="text-gray-500 mt-2">Keep your information up to date for better service recommendations.</p>
                    </div>

                    <form onSubmit={handleSave} className="space-y-8">
                        {/* Profile Picture Section */}
                        <div className="flex flex-col items-center space-y-4">
                            <img
                                src={profile.profilePictureUrl}
                                alt="Profile"
                                className="w-32 h-32 rounded-full object-cover ring-4 ring-orange-200"
                            />
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handlePhotoChange}
                                className="hidden"
                                accept="image/*"
                            />
                            <button type="button" onClick={handleUploadClick} className="text-sm font-semibold text-orange-600 hover:underline">
                                Upload New Photo
                            </button>
                        </div>
                        
                        {/* Personal Information */}
                        <ProfileSection title="Personal Information">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <ProfileInput label="Full Name" id="fullName" value={profile.fullName} onChange={handleInputChange} />
                                <ProfileInput label="Email Address" id="email" value={profile.email} onChange={handleInputChange} readOnly />
                                <ProfileInput label="Phone Number" id="phone" value={profile.phone} onChange={handleInputChange} />
                                <ProfileInput label="Date of Birth" id="dateOfBirth" type="date" value={profile.dateOfBirth} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label htmlFor="address.street" className="block text-sm font-medium text-gray-600">Full Address</label>
                                <textarea id="address.street" value={profile.address.street} onChange={handleInputChange} rows={3} className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm p-2 text-gray-900 focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <ProfileInput label="City" id="address.city" value={profile.address.city} onChange={handleInputChange} />
                                <ProfileInput label="State" id="address.state" value={profile.address.state} onChange={handleInputChange} />
                                <ProfileInput label="Pincode" id="address.pincode" value={profile.address.pincode} onChange={handleInputChange} />
                            </div>
                        </ProfileSection>

                        {/* Demographic & Professional Information */}
                        <ProfileSection title="Demographic & Professional Information">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="occupation" className="block text-sm font-medium text-gray-600">Occupation</label>
                                    <select id="occupation" value={profile.occupation} onChange={handleInputChange} className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm p-2 text-gray-900 focus:ring-orange-500 focus:border-orange-500">
                                        <option>Student</option>
                                        <option>Farmer</option>
                                        <option>Worker</option>
                                        <option>Entrepreneur</option>
                                        <option>Senior Citizen</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="annualIncome" className="block text-sm font-medium text-gray-600">Annual Income (approx.)</label>
                                    <select id="annualIncome" value={profile.annualIncome} onChange={handleInputChange} className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm p-2 text-gray-900 focus:ring-orange-500 focus:border-orange-500">
                                        <option>&lt; ₹1 Lakh</option>
                                        <option>₹1-3 Lakh</option>
                                        <option>₹3-5 Lakh</option>
                                        <option>₹5-10 Lakh</option>
                                        <option>&gt; ₹10 Lakh</option>
                                    </select>
                                </div>
                            </div>
                        </ProfileSection>

                        {/* Action Buttons */}
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
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <ICONS.Save className="w-5 h-5" />
                                        Save Changes
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
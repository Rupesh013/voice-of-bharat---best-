import React, { createContext, useState, useContext, ReactNode } from 'react';
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
    profilePictureUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop',
    gender: 'Male',
    educationLevel: 'College',
    stream: 'IT',
    skills: 'Java, Python, React, AI/ML',
    careerGoal: 'Job',
    locationType: 'Urban',
    incomeBackground: 'Middle'
};


interface UserProfileContextType {
    userProfile: UserProfile;
    setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export const UserProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userProfile, setUserProfile] = useState<UserProfile>(mockUserProfile);
    
    return (
        <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
            {children}
        </UserProfileContext.Provider>
    );
};

export const useUserProfile = () => {
    const context = useContext(UserProfileContext);
    if (!context) {
        throw new Error('useUserProfile must be used within a UserProfileProvider');
    }
    return context;
};
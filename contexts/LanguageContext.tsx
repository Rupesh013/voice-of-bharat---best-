import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import type { Language } from '../types';

interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getInitialLanguage = (): Language => {
    try {
        const savedLanguage = window.localStorage.getItem('appLanguage');
        // Type guard to ensure the stored value is a valid Language
        if (savedLanguage && ['en', 'hi', 'te', 'ta', 'bn', 'mr'].includes(savedLanguage)) {
            return savedLanguage as Language;
        }
    } catch (error) {
        console.error("Could not access localStorage:", error);
    }
    return 'en';
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>(getInitialLanguage);
    
    useEffect(() => {
        try {
            window.localStorage.setItem('appLanguage', language);
        } catch (error) {
            console.error("Could not write to localStorage:", error);
        }
    }, [language]);
    
    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
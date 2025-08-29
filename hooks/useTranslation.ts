import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../i18n/locales';

export const useTranslation = () => {
    const { language } = useLanguage();

    const t = (key: string): string => {
        const keys = key.split('.');
        
        const findTranslation = (langObject: any) => {
             let result = langObject;
             for (const k of keys) {
                result = result?.[k];
                if (result === undefined) {
                    return undefined;
                }
            }
            return result;
        }

        let translatedText = findTranslation(translations[language]);

        if (translatedText === undefined && language !== 'en') {
            translatedText = findTranslation(translations['en']);
        }
        
        return translatedText || key;
    };

    return { t, language };
};

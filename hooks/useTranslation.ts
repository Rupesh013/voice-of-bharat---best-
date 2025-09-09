import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../i18n/locales';

export const useTranslation = () => {
    const { language } = useLanguage();

    const t = (key: string, options?: { [key: string]: string | number }): string => {
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
        
        let resultString = translatedText || key;

        if (options && typeof resultString === 'string') {
            Object.keys(options).forEach(optionKey => {
                const regex = new RegExp(`{${optionKey}}`, 'g');
                resultString = resultString.replace(regex, String(options[optionKey]));
            });
        }
        
        return resultString;
    };

    return { t, language };
};

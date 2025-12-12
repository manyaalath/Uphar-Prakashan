import { useI18n } from '../../i18n';
import { Globe } from 'lucide-react';

export default function LanguageToggle() {
    const { language, toggleLanguage } = useI18n();

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-royal-blue group"
            title={language === 'hi' ? 'Switch to English' : 'हिंदी में बदलें'}
        >
            <Globe className="w-4 h-4 text-gray-500 group-hover:text-royal-blue transition-colors" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {language === 'hi' ? 'Hi' : 'En'}
            </span>
        </button>
    );
}

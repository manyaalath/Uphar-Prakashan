import { useI18n } from '../../i18n';

export default function LanguageToggle() {
    const { language, toggleLanguage } = useI18n();

    return (
        <button
            onClick={toggleLanguage}
            className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-royal-blue font-medium text-sm"
            aria-label="Toggle language"
        >
            <span className="text-gray-700 dark:text-gray-300">
                {language === 'hi' ? 'हिन्दी' : 'English'}
            </span>
        </button>
    );
}

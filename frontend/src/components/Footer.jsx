import { useI18n } from '../i18n';

export default function Footer() {
    const { t } = useI18n();

    return (
        <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
                            {t('footer_about')}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                            {t('footer_tagline')}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
                            {t('books')}
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="/books?category=spiritual" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                    {t('spiritual')}
                                </a>
                            </li>
                            <li>
                                <a href="/books?category=education" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                    {t('education')}
                                </a>
                            </li>
                            <li>
                                <a href="/books?category=fiction" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                    {t('fiction')}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
                            {t('footer_contact')}
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li>{t('footer_privacy')}</li>
                            <li>{t('footer_terms')}</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t('copyright')}
                    </p>
                </div>
            </div>
        </footer>
    );
}

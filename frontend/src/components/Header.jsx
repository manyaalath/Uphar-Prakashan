import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import { useThemeStore } from '../store/themeStore';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { useState } from 'react';

export default function Header() {
    const { t, language, toggleLanguage } = useI18n();
    const { theme, toggleTheme } = useThemeStore();
    const cartItemCount = useCartStore(state => state.getItemCount());
    const { user, role, logout } = useAuthStore();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
    };

    return (
        <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                            📚 {language === 'hi' ? 'पुस्तक भंडार' : 'Book Store'}
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors">
                            {t('home')}
                        </Link>
                        <Link to="/books" className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors">
                            {t('books')}
                        </Link>
                        {role === 'admin' && (
                            <Link to="/admin/dashboard" className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors">
                                {t('dashboard')}
                            </Link>
                        )}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center space-x-3">
                        {/* Language Toggle */}
                        <button
                            onClick={toggleLanguage}
                            className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            aria-label={t('toggle_language')}
                        >
                            {language === 'hi' ? 'English' : 'हिन्दी'}
                        </button>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            aria-label={t('toggle_theme')}
                        >
                            {theme === 'dark' ? '🌞' : '🌙'}
                        </button>

                        {/* Cart */}
                        {role !== 'admin' && (
                            <Link
                                to="/cart"
                                className="relative p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                aria-label={t('cart')}
                            >
                                🛒
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        {cartItemCount}
                                    </span>
                                )}
                            </Link>
                        )}

                        {/* User Menu */}
                        {user ? (
                            <div className="flex items-center space-x-3">
                                <span className="hidden md:block text-sm text-gray-700 dark:text-gray-200">
                                    {user.name || user.username}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                                >
                                    {t('logout')}
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Link
                                    to="/login"
                                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                    {t('login')}
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
                                >
                                    {t('signup')}
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                            aria-label="Menu"
                        >
                            {mobileMenuOpen ? '✕' : '☰'}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
                        <nav className="flex flex-col space-y-2">
                            <Link to="/" className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                                {t('home')}
                            </Link>
                            <Link to="/books" className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                                {t('books')}
                            </Link>
                            {role === 'admin' && (
                                <Link to="/admin/dashboard" className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                                    {t('dashboard')}
                                </Link>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}

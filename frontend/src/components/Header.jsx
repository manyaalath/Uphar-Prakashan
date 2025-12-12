import { Link, useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { Search, ShoppingCart, User, LogOut, BookOpen } from 'lucide-react';
import ThemeToggle from './UI/ThemeToggle';
import LanguageToggle from './UI/LanguageToggle';
import { useState } from 'react';

export default function Header() {
    const { t } = useI18n();
    const { user, role, logout } = useAuthStore();
    const { getItemCount } = useCartStore();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/books?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const cartCount = getItemCount();

    return (
        <header className="bg-white dark:bg-[#1E1E1E] border-b border-[#E5E5E5] dark:border-gray-800 sticky top-0 z-50 shadow-soft">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-deep-red hover:text-deep-red-700 transition-colors"
                    >
                        <BookOpen className="w-8 h-8" />
                        <div className="hidden sm:block">
                            <div className="font-bold text-xl leading-tight">पुस्तक भंडार</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Book Store</div>
                        </div>
                    </Link>

                    {/* Search Bar - Desktop */}
                    <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl">
                        <div className="relative w-full">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t('search_books')}
                                className="w-full pl-12 pr-4 py-3 border-2 border-[#E5E5E5] dark:border-gray-700 rounded-lg bg-white dark:bg-[#1E1E1E] text-[#1A1A1A] dark:text-white focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent transition-all text-lg"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                        <button type="submit" className="ml-2 btn-primary-red">
                            {t('search')}
                        </button>
                    </form>

                    {/* Right Section */}
                    <div className="flex items-center gap-3">
                        {/* Language Toggle */}
                        <LanguageToggle />

                        {/* Theme Toggle */}
                        <ThemeToggle />

                        {/* Cart */}
                        {role === 'client' && (
                            <Link
                                to="/cart"
                                className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                aria-label="Shopping cart"
                            >
                                <ShoppingCart className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-deep-red text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        )}

                        {/* User Menu */}
                        {user ? (
                            <div className="flex items-center gap-2">
                                <Link
                                    to={role === 'admin' ? '/admin/dashboard' : '/profile'}
                                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                >
                                    <User className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                    <span className="hidden lg:inline text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {user.username || user.name}
                                    </span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                    aria-label="Logout"
                                >
                                    <LogOut className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="btn-primary-blue">
                                {t('login')}
                            </Link>
                        )}
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="mt-4 flex flex-wrap items-center gap-6 text-sm font-medium">
                    <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-deep-red dark:hover:text-deep-red transition-colors">
                        {t('home')}
                    </Link>
                    <Link to="/books" className="text-gray-700 dark:text-gray-300 hover:text-deep-red dark:hover:text-deep-red transition-colors">
                        {t('all_books')}
                    </Link>
                    <Link to="/books?category=education" className="text-gray-700 dark:text-gray-300 hover:text-deep-red dark:hover:text-deep-red transition-colors">
                        {t('education')}
                    </Link>
                    <Link to="/books?category=spiritual" className="text-gray-700 dark:text-gray-300 hover:text-deep-red dark:hover:text-deep-red transition-colors">
                        {t('spiritual')}
                    </Link>
                    <Link to="/books?category=fiction" className="text-gray-700 dark:text-gray-300 hover:text-deep-red dark:hover:text-deep-red transition-colors">
                        {t('fiction')}
                    </Link>
                </nav>

                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="md:hidden mt-4">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t('search_books')}
                            className="w-full pl-10 pr-4 py-2 border-2 border-[#E5E5E5] dark:border-gray-700 rounded-lg bg-white dark:bg-[#1E1E1E] text-[#1A1A1A] dark:text-white focus:outline-none focus:ring-2 focus:ring-royal-blue"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                </form>
            </div>
        </header>
    );
}

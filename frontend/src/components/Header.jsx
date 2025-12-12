import { Link, useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { Search, ShoppingCart, User, LogOut, BookOpen, UserPlus } from 'lucide-react';
import ThemeToggle from './UI/ThemeToggle';
import LanguageToggle from './UI/LanguageToggle';
import { useState } from 'react';

export default function Header() {
    const { t, language } = useI18n();
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
                    {/* Logo & Name */}
                    <Link
                        to="/"
                        className="flex items-center gap-3 text-deep-red hover:text-deep-red-700 transition-colors flex-shrink-0"
                    >
                        <BookOpen className="w-10 h-10" />
                        <div className="hidden sm:block">
                            <div className="font-bold text-2xl leading-none">
                                {language === 'hi' ? 'उपहार प्रकाशन' : 'Uphar Prakashan'}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium tracking-wide">
                                {language === 'hi' ? 'पुस्तक भंडार' : 'Book Store'}
                            </div>
                        </div>
                    </Link>

                    {/* Search Bar - Desktop */}
                    <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-xl mx-8">
                        <div className="relative w-full group">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t('search_books')}
                                className="w-full pl-12 pr-4 py-2.5 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-royal-blue focus:bg-white dark:focus:bg-[#121212] transition-all shadow-inner hover:shadow-md"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-royal-blue transition-colors" />
                            <div className="absolute inset-y-0 right-0 py-1.5 pr-1.5">
                                <button
                                    type="submit"
                                    className="h-full px-4 rounded-full bg-deep-red hover:bg-red-700 text-white text-sm font-medium transition-colors shadow-sm"
                                >
                                    {t('search')}
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* Right Section */}
                    <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                        {/* Language Toggle */}
                        <LanguageToggle />

                        {/* Theme Toggle */}
                        <ThemeToggle />

                        <div className="w-px h-8 bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>

                        {/* Cart */}
                        {role === 'client' && (
                            <Link
                                to="/cart"
                                className="relative group p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all flex flex-col items-center"
                                aria-label="Shopping cart"
                            >
                                <div className="relative">
                                    <ShoppingCart className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-royal-blue transition-colors" />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-deep-red text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm border-2 border-white dark:border-[#1E1E1E]">
                                            {cartCount}
                                        </span>
                                    )}
                                </div>
                                <span className="text-[10px] font-medium text-gray-500 group-hover:text-royal-blue hidden sm:block">
                                    {language === 'hi' ? 'कार्ट' : 'Cart'}
                                </span>
                            </Link>
                        )}

                        {/* User Menu / Auth Buttons */}
                        {user ? (
                            <div className="flex items-center gap-2">
                                <Link
                                    to={role === 'admin' ? '/admin/dashboard' : '/profile'}
                                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                                >
                                    <div className="w-8 h-8 rounded-full bg-royal-blue/10 flex items-center justify-center">
                                        <User className="w-5 h-5 text-royal-blue" />
                                    </div>
                                    <span className="hidden xl:inline text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {user.username || user.name.split(' ')[0]}
                                    </span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                    title="Logout"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    to="/login"
                                    className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium transition-all"
                                >
                                    <User className="w-4 h-4" />
                                    <span>{t('login')}</span>
                                </Link>
                                <Link
                                    to="/signup"
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-royal-blue hover:bg-blue-700 text-white text-sm font-medium shadow-md hover:shadow-lg transition-all"
                                >
                                    <UserPlus className="w-4 h-4" />
                                    <span className="hidden sm:inline">{language === 'hi' ? 'साइन अप' : 'Sign Up'}</span>
                                    <span className="sm:hidden">{t('signup') || 'Sign Up'}</span>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation Links (Desktop) */}
                <nav className="mt-4 hidden md:flex items-center justify-center gap-8 text-sm font-medium border-t border-gray-100 dark:border-gray-800 pt-3">
                    <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-deep-red dark:hover:text-deep-red transition-colors uppercase tracking-wide">
                        {t('home')}
                    </Link>
                    <Link to="/books" className="text-gray-600 dark:text-gray-400 hover:text-deep-red dark:hover:text-deep-red transition-colors uppercase tracking-wide">
                        {t('all_books')}
                    </Link>
                    <Link to="/books?category=education" className="text-gray-600 dark:text-gray-400 hover:text-deep-red dark:hover:text-deep-red transition-colors uppercase tracking-wide">
                        {t('education')}
                    </Link>
                    <Link to="/books?category=spiritual" className="text-gray-600 dark:text-gray-400 hover:text-deep-red dark:hover:text-deep-red transition-colors uppercase tracking-wide">
                        {t('spiritual')}
                    </Link>
                    <div className="w-px h-4 bg-gray-300 dark:bg-gray-700"></div>
                    <Link to="/admin/login" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors text-xs">
                        Admin Access
                    </Link>
                </nav>

                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="lg:hidden mt-4">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t('search_books')}
                            className="w-full pl-10 pr-4 py-3 border-none bg-gray-100 dark:bg-gray-800 rounded-lg text-[#1A1A1A] dark:text-white focus:ring-2 focus:ring-deep-red"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    </div>
                </form>
            </div>
        </header>
    );
}

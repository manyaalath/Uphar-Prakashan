import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useI18n } from '../../i18n';
import { useAuthStore } from '../../store/authStore';
import { Lock, Mail } from 'lucide-react';

export default function Login() {
    const { t, language } = useI18n();
    const navigate = useNavigate();
    const login = useAuthStore(state => state.login);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await axios.post('/api/v1/clients/login', formData);
            login(res.data.client, res.data.token, 'client');
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || t('login_failed'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#121212] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white dark:bg-[#1E1E1E] p-10 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
                        <Lock className="h-8 w-8 text-deep-red" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-[#1A1A1A] dark:text-white">
                        {t('login')}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {language === 'hi' ? 'अपने खाते में साइन इन करें' : 'Sign in to your account'}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg text-sm relative" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-xs text-blue-800 dark:text-blue-200 mb-4">
                    <p className="font-bold mb-1">Demo Credentials:</p>
                    <p>Email: <span className="font-mono">raj@example.com</span></p>
                    <p>Password: <span className="font-mono">password123</span></p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div className="relative">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                                {t('email')}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-deep-red focus:border-deep-red sm:text-sm bg-white dark:bg-[#2C2C2C] transition-colors"
                                    placeholder={t('email_placeholder')}
                                />
                            </div>
                        </div>
                        <div className="relative">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                                {t('password')}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-deep-red focus:border-deep-red sm:text-sm bg-white dark:bg-[#2C2C2C] transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-deep-red hover:bg-[#B91C1C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-deep-red transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                t('login')
                            )}
                        </button>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <Link to="/" className="font-medium text-gray-600 hover:text-deep-red dark:text-gray-400 dark:hover:text-deep-red transition-colors">
                            ← {t('home')}
                        </Link>
                        <Link to="/signup" className="font-medium text-deep-red hover:text-[#B91C1C] transition-colors">
                            {language === 'hi' ? 'खाता नहीं है? साइन अप करें' : 'Don\'t have an account? Sign up'}
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

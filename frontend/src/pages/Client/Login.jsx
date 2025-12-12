import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useI18n } from '../../i18n';
import { useAuthStore } from '../../store/authStore';
import axios from 'axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Mail, Lock, LogIn } from 'lucide-react';

export default function Login() {
    const { t } = useI18n();
    const { login } = useAuthStore();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('/api/v1/client/login', formData);
            const { client, token } = response.data;
            login(client, token, 'client');
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || t('login_failed'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <div className="flex-grow flex items-center justify-center px-4 py-12 bg-gray-50 dark:bg-[#121212]">
                <div className="max-w-md w-full">
                    {/* Card */}
                    <div className="card p-8">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-deep-red rounded-full flex items-center justify-center mx-auto mb-4">
                                <LogIn className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-3xl font-bold text-[#1A1A1A] dark:text-white mb-2">
                                {t('client_login')}
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                {t('welcome')}
                            </p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-200">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    {t('email')}
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="input-field pl-12"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    {t('password')}
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="password"
                                        required
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="input-field pl-12"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary-red w-full disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? t('loading') : t('login')}
                            </button>
                        </form>

                        {/* Sign Up Link */}
                        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                            {t('dont_have_account')}{' '}
                            <Link to="/signup" className="link font-medium">
                                {t('signup')}
                            </Link>
                        </div>

                        {/* Admin Link */}
                        <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-500">
                            <Link to="/admin/login" className="hover:text-royal-blue transition-colors">
                                {t('admin_login')} →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

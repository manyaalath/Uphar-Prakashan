import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useI18n } from '../../i18n';
import { useAuthStore } from '../../store/authStore';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { UserPlus, User, Mail, Lock } from 'lucide-react';

export default function Signup() {
    const { t } = useI18n();
    const navigate = useNavigate();
    const login = useAuthStore(state => state.login);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        // Client-side validation
        const validationErrors = [];
        if (formData.password.length < 6) {
            validationErrors.push(t('password_too_short'));
        }
        if (formData.password !== formData.confirmPassword) {
            validationErrors.push(t('passwords_not_match'));
        }

        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);

        try {
            const res = await axios.post('/api/v1/client/signup', {
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
            login(res.data.client, res.data.token, 'client');
            navigate('/');
        } catch (err) {
            setErrors([err.response?.data?.error || t('signup_failed')]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <div className="flex-grow flex items-center justify-center py-12 px-4 bg-gray-50 dark:bg-[#121212]">
                <div className="max-w-md w-full">
                    <div className="card p-8">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-deep-red rounded-full flex items-center justify-center mx-auto mb-4">
                                <UserPlus className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-[#1A1A1A] dark:text-white mb-2">
                                {t('create_account')}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                {t('welcome')}
                            </p>
                        </div>

                        {errors.length > 0 && (
                            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-200">
                                {errors.map((error, i) => (
                                    <div key={i}>{error}</div>
                                ))}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    {t('name')}
                                </label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="input-field pl-12"
                                        placeholder={t('name')}
                                    />
                                </div>
                            </div>

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
                                        placeholder={t('password')}
                                    />
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    {t('confirm_password')}
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="password"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        className="input-field pl-12"
                                        placeholder={t('confirm_password')}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary-red w-full disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? t('loading') : t('signup')}
                            </button>
                        </form>

                        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                            {t('already_have_account')}{' '}
                            <Link to="/login" className="link font-medium">
                                {t('login')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

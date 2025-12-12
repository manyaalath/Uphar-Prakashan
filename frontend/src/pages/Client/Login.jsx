import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useI18n } from '../../i18n';
import { useAuthStore } from '../../store/authStore';

export default function Login() {
    const { t } = useI18n();
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
            const res = await axios.post('/api/v1/client/login', formData);
            login(res.data.client, res.data.token, 'client');
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || t('login_failed'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full">
                <div className="card">
                    <div className="card-header">
                        <h2 className="text-2xl font-bold text-center">{t('client_login')}</h2>
                    </div>

                    <div className="card-body">
                        {error && (
                            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block font-medium mb-2">{t('email')}</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="input-field"
                                    placeholder={t('email')}
                                />
                            </div>

                            <div>
                                <label className="block font-medium mb-2">{t('password')}</label>
                                <input
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="input-field"
                                    placeholder={t('password')}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full"
                            >
                                {loading ? t('loading') : t('login')}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-gray-600 dark:text-gray-400">
                                {t('dont_have_account')}{' '}
                                <Link to="/signup" className="link">
                                    {t('signup')}
                                </Link>
                            </p>
                        </div>

                        <div className="mt-4 text-center">
                            <Link to="/admin/login" className="link text-sm">
                                {t('admin_login')} →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

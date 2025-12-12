import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useI18n } from '../../i18n';
import { useAuthStore } from '../../store/authStore';

export default function AdminLogin() {
    const { t } = useI18n();
    const navigate = useNavigate();
    const login = useAuthStore(state => state.login);
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await axios.post('/api/v1/admin/login', formData);
            login(res.data.admin, res.data.token, 'admin');
            navigate('/admin/dashboard');
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
                        <h2 className="text-2xl font-bold text-center">{t('admin_login')}</h2>
                    </div>

                    <div className="card-body">
                        {error && (
                            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block font-medium mb-2">{t('username')}</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    className="input-field"
                                    placeholder={t('username')}
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
                            <a href="/login" className="link text-sm">
                                ← {t('client_login')}
                            </a>
                        </div>

                        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg text-sm">
                            <p className="font-medium">Demo Credentials:</p>
                            <p>Username: admin</p>
                            <p>Password: admin123</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useI18n } from '../../i18n';
import { useAuthStore } from '../../store/authStore';

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
        <div className="min-h-screen flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full">
                <div className="card">
                    <div className="card-header">
                        <h2 className="text-2xl font-bold text-center">{t('create_account')}</h2>
                    </div>

                    <div className="card-body">
                        {errors.length > 0 && (
                            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg">
                                {errors.map((error, i) => (
                                    <div key={i}>{error}</div>
                                ))}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block font-medium mb-2">{t('name')}</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="input-field"
                                    placeholder={t('name')}
                                />
                            </div>

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

                            <div>
                                <label className="block font-medium mb-2">{t('confirm_password')}</label>
                                <input
                                    type="password"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    className="input-field"
                                    placeholder={t('confirm_password')}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full"
                            >
                                {loading ? t('loading') : t('signup')}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-gray-600 dark:text-gray-400">
                                {t('already_have_account')}{' '}
                                <Link to="/login" className="link">
                                    {t('login')}
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

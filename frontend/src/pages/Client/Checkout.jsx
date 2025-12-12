import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useI18n } from '../../i18n';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';

export default function Checkout() {
    const { t, language } = useI18n();
    const navigate = useNavigate();
    const { items, getTotal, clearCart } = useCartStore();
    const { token } = useAuthStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleCheckout = async () => {
        if (!token) {
            navigate('/login');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const orderItems = items.map(item => ({
                bookId: item.id,
                quantity: item.quantity
            }));

            await axios.post(
                '/api/v1/client/order',
                { items: orderItems },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setSuccess(true);
            clearCart();
            setTimeout(() => navigate('/'), 3000);
        } catch (err) {
            setError(err.response?.data?.error || t('order_failed'));
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center">
                    <div className="text-6xl mb-4">✅</div>
                    <h2 className="text-3xl font-bold mb-4">{t('order_success')}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        {language === 'hi' ? 'आपका आर्डर सफलतापूर्वक हो गया है!' : 'Your order has been placed successfully!'}
                    </p>
                    <button onClick={() => navigate('/')} className="btn-primary">
                        {t('home')}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-8">{t('checkout')}</h1>

            {error && (
                <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Order Summary */}
                <div className="card">
                    <div className="card-header">
                        <h2 className="text-xl font-bold">{t('order_total')}</h2>
                    </div>
                    <div className="card-body">
                        <div className="space-y-4 mb-6">
                            {items.map(item => {
                                const title = language === 'hi' ? item.title_hi : item.title_en;
                                return (
                                    <div key={item.id} className="flex justify-between">
                                        <div className="flex-1">
                                            <p className="font-medium">{title}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {t('quantity')}: {item.quantity}
                                            </p>
                                        </div>
                                        <div className="font-medium">
                                            ₹{(item.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                            <div className="flex justify-between text-xl font-bold">
                                <span>{t('total')}</span>
                                <span className="text-primary-600 dark:text-primary-400">
                                    ₹{getTotal().toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment (Dummy) */}
                <div className="card">
                    <div className="card-header">
                        <h2 className="text-xl font-bold">
                            {language === 'hi' ? 'भुगतान विवरण' : 'Payment Details'}
                        </h2>
                    </div>
                    <div className="card-body">
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            {language === 'hi'
                                ? '(यह एक डेमो है - वास्तविक भुगतान नहीं है)'
                                : '(This is a demo - no actual payment will be processed)'}
                        </p>

                        <button
                            onClick={handleCheckout}
                            disabled={loading || items.length === 0}
                            className="btn-primary w-full"
                        >
                            {loading ? t('loading') : t('place_order')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

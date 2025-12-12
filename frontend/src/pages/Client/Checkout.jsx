import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useI18n } from '../../i18n';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import { Check, CreditCard, ShoppingBag } from 'lucide-react';

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
            <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gray-50 dark:bg-[#121212]">
                <div className="text-center card p-12 max-w-lg w-full">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="w-10 h-10 text-green-600 dark:text-green-300" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4 text-[#1A1A1A] dark:text-white">{t('order_success')}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
                        {language === 'hi' ? 'आपका आर्डर सफलतापूर्वक हो गया है!' : 'Your order has been placed successfully!'}
                    </p>
                    <button onClick={() => navigate('/')} className="btn-primary-red w-full">
                        {t('home')}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold mb-8 text-[#1A1A1A] dark:text-white flex items-center gap-3">
                <ShoppingBag className="w-8 h-8" />
                {t('checkout')}
            </h1>

            {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-200">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Order Summary */}
                <div className="card h-fit">
                    <div className="px-6 py-4 border-b border-[#E5E5E5] dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <h2 className="text-xl font-bold text-[#1A1A1A] dark:text-white">{t('order_total')}</h2>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4 mb-6 cursor-default">
                            {items.map(item => {
                                const title = language === 'hi' ? item.title_hi : item.title_en;
                                return (
                                    <div key={item.id} className="flex justify-between items-start gap-4">
                                        <div className="flex bg-gray-50 dark:bg-gray-800 p-2 rounded w-full">
                                            <div className="w-12 h-16 bg-gray-200 dark:bg-gray-700 rounded flex-shrink-0 mr-3">
                                                <img src={item.cover_url} className="w-full h-full object-cover rounded" alt="" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-sm text-[#1A1A1A] dark:text-white line-clamp-2">{title}</p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {t('quantity')}: {item.quantity}
                                                </p>
                                            </div>
                                            <div className="font-bold text-sm text-[#1A1A1A] dark:text-white">
                                                ₹{(item.price * item.quantity).toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="border-t border-[#E5E5E5] dark:border-gray-700 pt-4">
                            <div className="flex justify-between items-center text-xl font-bold">
                                <span className="text-[#1A1A1A] dark:text-white">{t('total')}</span>
                                <span className="text-deep-red">
                                    ₹{getTotal().toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment (Dummy) */}
                <div className="card h-fit">
                    <div className="px-6 py-4 border-b border-[#E5E5E5] dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <h2 className="text-xl font-bold text-[#1A1A1A] dark:text-white flex items-center gap-2">
                            <CreditCard className="w-5 h-5" />
                            {language === 'hi' ? 'भुगतान विवरण' : 'Payment Details'}
                        </h2>
                    </div>
                    <div className="p-6">
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                            <p className="text-sm text-yellow-800 dark:text-yellow-200">
                                {language === 'hi'
                                    ? 'ⓘ यह केवल एक प्रदर्शन है। कोई वास्तविक भुगतान नहीं लिया जाएगा।'
                                    : 'ⓘ This is a demo only. No actual payment will be processed.'}
                            </p>
                        </div>

                        <button
                            onClick={handleCheckout}
                            disabled={loading || items.length === 0}
                            className="btn-primary-red w-full flex items-center justify-center gap-2 py-4 text-lg"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    {t('loading')}
                                </>
                            ) : (
                                t('place_order')
                            )}
                        </button>

                        <div className="mt-4 text-center">
                            <Link to="/cart" className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 underline">
                                {language === 'hi' ? 'कार्ट पर वापस जाएं' : 'Back to Cart'}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

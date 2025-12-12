import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n';
import { useCartStore } from '../../store/cartStore';

export default function Cart() {
    const { t, language } = useI18n();
    const { items, removeItem, updateQuantity, getTotal } = useCartStore();

    if (items.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center">
                    <div className="text-6xl mb-4">🛒</div>
                    <h2 className="text-2xl font-bold mb-4">{t('cart_empty')}</h2>
                    <Link to="/books" className="btn-primary">
                        {t('continue_shopping')}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-8">{t('your_cart')}</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {items.map(item => {
                        const title = language === 'hi' ? item.title_hi : item.title_en;

                        return (
                            <div key={item.id} className="card flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4">
                                <img
                                    src={item.cover_url || 'https://via.placeholder.com/100x150?text=Book'}
                                    alt={title}
                                    className="w-24 h-32 object-cover rounded"
                                />

                                <div className="flex-1">
                                    <Link to={`/books/${item.id}`} className="font-semibold text-lg hover:text-primary-600 dark:hover:text-primary-400">
                                        {title}
                                    </Link>
                                    <p className="text-gray-600 dark:text-gray-400">₹{item.price}</p>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                                        >
                                            -
                                        </button>
                                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                                            disabled={item.quantity >= item.stock}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <div className="font-bold w-24 text-right">
                                        ₹{(item.price * item.quantity).toFixed(2)}
                                    </div>

                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-red-600 hover:text-red-700 dark:text-red-400"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="card card-body sticky top-20">
                        <h2 className="text-xl font-bold mb-4">{t('order_total')}</h2>

                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between">
                                <span>{t('subtotal')}</span>
                                <span className="font-medium">₹{getTotal().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                <span>{t('tax')}</span>
                                <span>₹0.00</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                            <div className="flex justify-between text-lg font-bold">
                                <span>{t('total')}</span>
                                <span className="text-primary-600 dark:text-primary-400">₹{getTotal().toFixed(2)}</span>
                            </div>
                        </div>

                        <Link to="/checkout" className="btn-primary w-full text-center">
                            {t('proceed_to_checkout')}
                        </Link>

                        <Link to="/books" className="btn-secondary w-full text-center mt-2">
                            {t('continue_shopping')}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

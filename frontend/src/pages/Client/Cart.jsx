import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n';
import { useCartStore } from '../../store/cartStore';
import { Trash2, ShoppingCart, ArrowRight } from 'lucide-react';

export default function Cart() {
    const { t, language } = useI18n();
    const { items, removeItem, updateQuantity, getTotal } = useCartStore();

    if (items.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                    <ShoppingCart className="w-12 h-12 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold mb-2 text-[#1A1A1A] dark:text-white">{t('cart_empty')}</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md text-center">
                    {language === 'hi'
                        ? 'लगता है आपने अभी तक कोई पुस्तक नहीं चुनी है। हमारे विशाल संग्रह को देखें।'
                        : 'Looks like you haven\'t added any books yet. Explore our huge collection.'}
                </p>
                <Link to="/books" className="btn-primary-red">
                    {t('continue_shopping')}
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-8 text-[#1A1A1A] dark:text-white">{t('your_cart')}</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-4">
                    {items.map(item => {
                        const title = language === 'hi' ? item.title_hi : item.title_en;

                        return (
                            <div key={item.id} className="card p-4 flex flex-col sm:flex-row gap-4 transition-transform hover:scale-[1.01]">
                                {/* Image */}
                                <div className="w-full sm:w-24 h-32 bg-gray-100 dark:bg-gray-800 rounded-lg flex-shrink-0 overflow-hidden">
                                    <img
                                        src={item.cover_url || 'https://via.placeholder.com/100x150?text=Book'}
                                        alt={title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <Link
                                                to={`/book/${item.id}`}
                                                className="font-bold text-lg text-[#1A1A1A] dark:text-white hover:text-deep-red dark:hover:text-deep-red transition-colors line-clamp-2"
                                            >
                                                {title}
                                            </Link>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-gray-400 hover:text-deep-red transition-colors p-1"
                                                aria-label={t('remove')}
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                                            {t(item.category)}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                                        <div className="flex items-center gap-3">
                                            <label className="text-sm text-gray-500">{t('quantity')}:</label>
                                            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-lg transition-colors"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    -
                                                </button>
                                                <span className="px-3 py-1 font-medium text-[#1A1A1A] dark:text-white">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-lg transition-colors"
                                                    disabled={item.quantity >= item.stock}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div className="font-bold text-xl text-deep-red">
                                            ₹{(item.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Summary Card */}
                <div className="lg:col-span-1">
                    <div className="card p-6 sticky top-24">
                        <h2 className="text-xl font-bold mb-6 text-[#1A1A1A] dark:text-white">
                            {t('order_total')}
                        </h2>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                <span>{t('subtotal')}</span>
                                <span>₹{getTotal().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                <span>{t('tax')} (0%)</span>
                                <span>₹0.00</span>
                            </div>
                            <div className="h-px bg-gray-200 dark:bg-gray-700 my-4"></div>
                            <div className="flex justify-between text-xl font-bold text-[#1A1A1A] dark:text-white">
                                <span>{t('total')}</span>
                                <span className="text-deep-red">₹{getTotal().toFixed(2)}</span>
                            </div>
                        </div>

                        <Link
                            to="/checkout"
                            className="btn-primary-red w-full flex items-center justify-center gap-2 mb-4"
                        >
                            {t('proceed_to_checkout')}
                            <ArrowRight className="w-5 h-5" />
                        </Link>

                        <Link
                            to="/books"
                            className="btn-secondary w-full flex items-center justify-center"
                        >
                            {t('continue_shopping')}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

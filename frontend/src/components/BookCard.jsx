import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import { useCartStore } from '../store/cartStore';
import { useState } from 'react';

export default function BookCard({ book }) {
    const { t, language } = useI18n();
    const addItem = useCartStore(state => state.addItem);
    const [showToast, setShowToast] = useState(false);

    const title = language === 'hi' ? book.title_hi : book.title_en;
    const description = language === 'hi' ? book.short_hi : book.short_en;

    const handleAddToCart = (e) => {
        e.preventDefault();
        addItem(book);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
    };

    const isLowStock = book.stock > 0 && book.stock < 10;
    const isOutOfStock = book.stock === 0;

    return (
        <div className="card group hover:scale-105 transition-transform duration-300">
            <Link to={`/books/${book.id}`}>
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <img
                        src={book.cover_url || 'https://via.placeholder.com/400x600?text=Book'}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                    />

                    {/* Stock Badge */}
                    <div className="absolute top-2 right-2">
                        {isOutOfStock ? (
                            <span className="badge badge-danger">{t('out_of_stock')}</span>
                        ) : isLowStock ? (
                            <span className="badge badge-warning">{t('low_stock')}</span>
                        ) : (
                            <span className="badge badge-success">{t('in_stock')}</span>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="card-body">
                    <h3 className={`text-lg font-semibold mb-2 line-clamp-2 ${language === 'hi' ? 'hindi-text' : ''}`}>
                        {title}
                    </h3>

                    {description && (
                        <p className={`text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 ${language === 'hi' ? 'hindi-text' : ''}`}>
                            {description}
                        </p>
                    )}

                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                                ₹{book.price}
                            </p>
                            {book.ex_tax && (
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {t('ex_tax')}: ₹{book.ex_tax}
                                </p>
                            )}
                        </div>

                        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                            {t(book.category)}
                        </span>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        disabled={isOutOfStock}
                        className={`w-full btn-primary ${isOutOfStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isOutOfStock ? t('out_of_stock') : t('add_to_cart')}
                    </button>
                </div>
            </Link>

            {/* Toast Notification */}
            {showToast && (
                <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in z-50">
                    ✓ {t('added_to_cart')}
                </div>
            )}
        </div>
    );
}

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useI18n } from '../../i18n';
import { useCartStore } from '../../store/cartStore';

export default function ProductDetails() {
    const { id } = useParams();
    const { t, language } = useI18n();
    const addItem = useCartStore(state => state.addItem);
    const [book, setBook] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        fetchBook();
    }, [id]);

    const fetchBook = async () => {
        try {
            const res = await axios.get(`/api/v1/books/${id}`);
            setBook(res.data.book);
        } catch (error) {
            console.error('Error fetching book:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = () => {
        addItem(book, quantity);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="animate-pulse flex space-x-8">
                    <div className="w-1/3 h-96 bg-gray-300 dark:bg-gray-600 rounded-xl"></div>
                    <div className="flex-1 space-y-4">
                        <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!book) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-bold mb-4">{t('no_results')}</h2>
                <Link to="/books" className="link">{t('continue_shopping')}</Link>
            </div>
        );
    }

    const title = language === 'hi' ? book.title_hi : book.title_en;
    const description = language === 'hi' ? book.description_hi : book.description_en;
    const isOutOfStock = book.stock === 0;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link to="/books" className="link inline-block mb-6">← {t('books')}</Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Image */}
                <div>
                    <img
                        src={book.cover_url || 'https://via.placeholder.com/400x600?text=Book'}
                        alt={title}
                        className="w-full rounded-xl shadow-2xl"
                    />
                </div>

                {/* Details */}
                <div>
                    <h1 className={`text-4xl font-bold mb-4 ${language === 'hi' ? 'hindi-text' : ''}`}>
                        {title}
                    </h1>

                    <div className="flex items-center space-x-4 mb-6">
                        <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                            ₹{book.price}
                        </span>
                        {book.ex_tax && (
                            <span className="text-gray-500 dark:text-gray-400">
                                {t('ex_tax')}: ₹{book.ex_tax}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center space-x-4 mb-6">
                        <span className="badge badge-primary">{t(book.category)}</span>
                        <span className="badge badge-secondary">{t(book.language)}</span>
                        {isOutOfStock ? (
                            <span className="badge badge-danger">{t('out_of_stock')}</span>
                        ) : book.stock < 10 ? (
                            <span className="badge badge-warning">{t('low_stock')} ({book.stock})</span>
                        ) : (
                            <span className="badge badge-success">{t('in_stock')}</span>
                        )}
                    </div>

                    {description && (
                        <div className="mb-6">
                            <h2 className="text-xl font-bold mb-2">{t('description')}</h2>
                            <p className={`text-gray-700 dark:text-gray-300 leading-relaxed ${language === 'hi' ? 'hindi-text' : ''}`}>
                                {description}
                            </p>
                        </div>
                    )}

                    {book.tags && book.tags.length > 0 && (
                        <div className="mb-6">
                            <h3 className="font-semibold mb-2">{t('tags')}</h3>
                            <div className="flex flex-wrap gap-2">
                                {book.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {!isOutOfStock && (
                        <div className="mb-6">
                            <label className="block font-medium mb-2">{t('quantity')}</label>
                            <input
                                type="number"
                                min="1"
                                max={book.stock}
                                value={quantity}
                                onChange={(e) => setQuantity(Math.min(Math.max(1, parseInt(e.target.value) || 1), book.stock))}
                                className="input-field w-32"
                            />
                        </div>
                    )}

                    <button
                        onClick={handleAddToCart}
                        disabled={isOutOfStock}
                        className={`btn-primary w-full md:w-auto ${isOutOfStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isOutOfStock ? t('out_of_stock') : t('add_to_cart')}
                    </button>
                </div>
            </div>

            {showToast && (
                <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in z-50">
                    ✓ {t('added_to_cart')}
                </div>
            )}
        </div>
    );
}

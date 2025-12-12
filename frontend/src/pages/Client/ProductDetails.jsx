import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useI18n } from '../../i18n';
import { useCartStore } from '../../store/cartStore';
import { ShoppingCart, Heart, Share2, AlertCircle } from 'lucide-react';
import BookCard from '../../components/BookCard';

export default function ProductDetails() {
    const { id } = useParams();
    const { t, language } = useI18n();
    const addItem = useCartStore(state => state.addItem);
    const navigate = useNavigate();

    const [book, setBook] = useState(null);
    const [relatedBooks, setRelatedBooks] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        fetchBook();
    }, [id]);

    const fetchBook = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/v1/books/${id}`);
            const bookData = res.data.book;
            setBook(bookData);

            // Fetch related books based on category
            if (bookData.category) {
                const relatedRes = await axios.get(`/api/v1/books?category=${bookData.category}&limit=4`);
                setRelatedBooks(relatedRes.data.books.filter(b => b.id !== bookData.id) || []);
            }
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

    const handleBuyNow = () => {
        addItem(book, quantity);
        navigate('/cart');
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-deep-red mx-auto"></div>
            </div>
        );
    }

    if (!book) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-bold mb-4">{t('no_results')}</h2>
                <Link to="/books" className="btn-primary-blue">{t('continue_shopping')}</Link>
            </div>
        );
    }

    const title = language === 'hi' ? book.title_hi : book.title_en;
    const description = language === 'hi' ? book.description_hi : book.description_en;
    const isOutOfStock = book.stock === 0;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
            {/* Breadcrumb */}
            <nav className="text-sm mb-6 text-gray-500 dark:text-gray-400">
                <Link to="/" className="hover:text-deep-red">{t('home')}</Link>
                <span className="mx-2">/</span>
                <Link to={`/books?category=${book.category}`} className="hover:text-deep-red">{t(book.category)}</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900 dark:text-gray-100 font-medium">{title}</span>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                {/* Image Section */}
                <div className="relative">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8 flex items-center justify-center">
                        <img
                            src={book.cover_url || 'https://via.placeholder.com/400x600?text=Book'}
                            alt={title}
                            className="w-full max-w-sm rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    {/* Share Button */}
                    <button className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-700 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                        <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    </button>
                </div>

                {/* Details Section */}
                <div>
                    <h1 className={`text-4xl font-bold mb-2 text-[#1A1A1A] dark:text-white ${language === 'hi' ? 'hindi-text' : ''}`}>
                        {title}
                    </h1>

                    {/* Rating placeholder */}
                    <div className="flex items-center gap-1 mb-6">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className="text-yellow-400">★</span>
                        ))}
                        <span className="text-gray-500 text-sm ml-2">(4.8/5.0)</span>
                    </div>

                    <div className="flex items-end gap-3 mb-6">
                        <span className="text-4xl font-bold text-deep-red">
                            ₹{book.price}
                        </span>
                        {book.ex_tax && (
                            <span className="text-lg text-gray-500 line-through mb-1">
                                ₹{book.ex_tax}
                            </span>
                        )}
                    </div>

                    {/* Stock Status */}
                    <div className="flex items-center gap-2 mb-8">
                        {isOutOfStock ? (
                            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium flex items-center gap-1">
                                <AlertCircle className="w-4 h-4" /> {t('out_of_stock')}
                            </span>
                        ) : (
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                {t('in_stock')}
                            </span>
                        )}
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
                            {t(book.category)}
                        </span>
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                        <h3 className="text-lg font-bold mb-3 text-[#1A1A1A] dark:text-white">
                            {t('description')}
                        </h3>
                        <p className={`text-gray-600 dark:text-gray-300 leading-relaxed text-lg ${language === 'hi' ? 'hindi-text' : ''}`}>
                            {description}
                        </p>
                    </div>

                    {/* Actions */}
                    {!isOutOfStock && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 mb-4">
                                <label className="font-medium text-gray-700 dark:text-gray-300">{t('quantity')}</label>
                                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        -
                                    </button>
                                    <span className="px-3 py-1 font-medium">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(Math.min(book.stock, quantity + 1))}
                                        className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={handleAddToCart}
                                    className="btn-primary-red flex-1 flex items-center justify-center gap-2"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    {t('add_to_cart')}
                                </button>
                                <button
                                    onClick={handleBuyNow}
                                    className="btn-primary-blue flex-1"
                                >
                                    {t('buy_now')}
                                </button>
                                <button className="p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-deep-red hover:text-deep-red transition-colors">
                                    <Heart className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Related Books */}
            {relatedBooks.length > 0 && (
                <div className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-12">
                    <h2 className="text-3xl font-bold mb-8 text-[#1A1A1A] dark:text-white">
                        {t('related_books')}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedBooks.map(book => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                </div>
            )}

            {/* Toast Notification */}
            {showToast && (
                <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in z-50">
                    <div className="bg-white text-green-600 rounded-full p-1">
                        <ShoppingCart className="w-4 h-4" />
                    </div>
                    <div>
                        <p className="font-bold">{t('added_to_cart')}</p>
                        <p className="text-sm opacity-90">{title}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

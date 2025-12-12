import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import { useCartStore } from '../store/cartStore';
import { ShoppingCart } from 'lucide-react';

export default function BookCard({ book }) {
    const { language } = useI18n();
    const { addItem } = useCartStore();

    const title = language === 'hi' ? book.title_hi : book.title_en;
    const shortDesc = language === 'hi' ? book.short_hi : book.short_en;

    const handleAddToCart = (e) => {
        e.preventDefault();
        addItem(book, 1);
    };

    return (
        <Link to={`/book/${book.id}`} className="card group hover:-translate-y-1 transition-all duration-300">
            {/* Book Cover */}
            <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                    src={book.cover_url}
                    alt={title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                />
                {/* Stock Badge */}
                {book.stock < 10 && book.stock > 0 && (
                    <div className="absolute top-2 right-2 bg-lemon-yellow text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                        {language === 'hi' ? `केवल ${book.stock} बचे` : `Only ${book.stock} left`}
                    </div>
                )}
                {book.stock === 0 && (
                    <div className="absolute top-2 right-2 bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-bold">
                        {language === 'hi' ? 'स्टॉक में नहीं' : 'Out of Stock'}
                    </div>
                )}
            </div>

            {/* Book Info */}
            <div className="p-4">
                {/* Title */}
                <h3 className="font-bold text-lg mb-1 text-[#1A1A1A] dark:text-white line-clamp-2 min-h-[3.5rem]">
                    {title}
                </h3>

                {/* Short Description */}
                {shortDesc && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                        {shortDesc}
                    </p>
                )}

                {/* Price and Cart */}
                <div className="flex items-center justify-between mt-4">
                    <div>
                        <div className="text-2xl font-bold text-deep-red">
                            ₹{book.price}
                        </div>
                        {book.ex_tax && book.ex_tax !== book.price && (
                            <div className="text-xs text-gray-500 line-through">
                                ₹{book.ex_tax}
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleAddToCart}
                        disabled={book.stock === 0}
                        className={`p-3 rounded-lg transition-all flex items-center justify-center ${book.stock === 0
                                ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                                : 'bg-deep-red hover:bg-deep-red-700 text-white shadow-soft hover:shadow-soft-lg hover:scale-105'
                            }`}
                        aria-label="Add to cart"
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </div>

                {/* Tags */}
                {book.tags && book.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                        {book.tags.slice(0, 3).map((tag, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </Link>
    );
}

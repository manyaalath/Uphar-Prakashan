import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useI18n } from '../../i18n';
import SearchBar from '../../components/SearchBar';
import BookGrid from '../../components/BookGrid';

export default function Home() {
    const { t, language } = useI18n();
    const [featuredBooks, setFeaturedBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [booksRes, categoriesRes] = await Promise.all([
                axios.get('/api/v1/books?limit=8'),
                axios.get('/api/v1/books/categories')
            ]);

            setFeaturedBooks(booksRes.data.books);
            setCategories(categoriesRes.data.categories);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${language === 'hi' ? 'hindi-text' : ''}`}>
                            {language === 'hi' ? 'पुस्तकों की दुनिया में आपका स्वागत है' : 'Welcome to the World of Books'}
                        </h1>
                        <p className={`text-xl mb-8 ${language === 'hi' ? 'hindi-text' : ''}`}>
                            {t('footer_tagline')}
                        </p>
                        <div className="max-w-2xl mx-auto">
                            <Link to="/books">
                                <SearchBar placeholder={t('search_placeholder')} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-16 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold mb-8 text-center">{t('browse_categories')}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {categories.map(category => (
                            <Link
                                key={category}
                                to={`/books?category=${category}`}
                                className="card text-center p-6 hover:shadow-xl transition-all"
                            >
                                <div className="text-4xl mb-2">
                                    {category === 'spiritual' && '🕉️'}
                                    {category === 'fiction' && '📖'}
                                    {category === 'education' && '📚'}
                                    {category === 'children' && '🧒'}
                                    {category === 'health' && '🧘'}
                                    {category === 'self-help' && '💡'}
                                </div>
                                <h3 className="font-semibold">{t(category)}</h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Books */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold">{t('featured_books')}</h2>
                        <Link to="/books" className="link text-lg">
                            {t('view_details')} →
                        </Link>
                    </div>
                    <BookGrid books={featuredBooks} loading={loading} />
                </div>
            </section>
        </div>
    );
}

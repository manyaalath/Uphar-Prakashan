import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useI18n } from '../../i18n';
import CategoryCard from '../../components/Cards/CategoryCard';
import BookCard from '../../components/BookCard';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { ArrowRight } from 'lucide-react';

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
            const booksRes = await axios.get('/api/v1/books?limit=8');
            setFeaturedBooks(booksRes.data.books || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const categoriesData = [
        { id: 'education', title_hi: 'शिक्षा', title_en: 'Education' },
        { id: 'spiritual', title_hi: 'आध्यात्मिक', title_en: 'Spiritual' },
        { id: 'fiction', title_hi: 'कथा साहित्य', title_en: 'Fiction' },
        { id: 'children', title_hi: 'बच्चों की किताबें', title_en: 'Children' },
        { id: 'health', title_hi: 'स्वास्थ्य', title_en: 'Health' },
        { id: 'self-help', title_hi: 'स्वयं सहायता', title_en: 'Self Help' },
    ];

    return (
        <div className="min-h-screen">
            <Header />

            {/* Hero Banner */}
            <section className="bg-royal-blue text-white py-16 px-4">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        {language === 'hi' ? 'हिंदी और अंग्रेजी पुस्तकों का घर' : 'Home of Hindi and English Books'}
                    </h1>
                    <p className="text-xl mb-6 opacity-90">
                        {language === 'hi' ? 'छात्रों और पाठकों के लिए गुणवत्तापूर्ण पुस्तकें' : 'Quality books for students and readers'}
                    </p>
                    <Link to="/books" className="btn-primary-red bg-white hover:bg-gray-100 text-deep-red inline-flex items-center gap-2">
                        {language === 'hi' ? 'सभी पुस्तकें देखें' : 'Browse All Books'}
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            {/* Categories Grid */}
            <section className="py-16 px-4 bg-gray-50 dark:bg-[#1E1E1E]">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold mb-8 text-center text-[#1A1A1A] dark:text-white">
                        {language === 'hi' ? 'श्रेणियां ब्राउज़ करें' : 'Browse Categories'}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {categoriesData.map((cat) => (
                            <CategoryCard
                                key={cat.id}
                                category={cat.id}
                                title={language === 'hi' ? cat.title_hi : cat.title_en}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Books */}
            <section className="py-16 px-4">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-[#1A1A1A] dark:text-white">
                            {language === 'hi' ? 'लोकप्रिय पुस्तकें' : 'Featured Books'}
                        </h2>
                        <Link to="/books" className="link text-lg">
                            {language === 'hi' ? 'सभी देखें →' : 'View All →'}
                        </Link>
                    </div>
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-deep-red mx-auto"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredBooks.map((book) => (
                                <BookCard key={book.id} book={book} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Promo Banner */}
            <section className="py-12 px-4 bg-lemon-yellow">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">
                        {language === 'hi' ? '🎉 विशेष छूट उपलब्ध!' : '🎉 Special Discounts Available!'}
                    </h2>
                    <p className="text-xl text-gray-800 mb-4">
                        {language === 'hi' ? 'शैक्षणिक पुस्तकों पर 20% तक की छूट' : 'Up to 20% off on educational books'}
                    </p>
                    <Link to="/books?category=education" className="btn-primary-red">
                        {language === 'hi' ? 'अभी खरीदें' : 'Shop Now'}
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}

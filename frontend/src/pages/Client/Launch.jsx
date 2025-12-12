import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n';
import { useEffect, useState } from 'react';
import { ArrowRight, Check, BookOpen, Users, IndianRupee, Languages } from 'lucide-react';
import CategoryCard from '../../components/Cards/CategoryCard';
import BookCard from '../../components/BookCard';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import axios from 'axios';

export default function Launch() {
    const { t, language } = useI18n();
    const [featuredBooks, setFeaturedBooks] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch featured books
        axios.get('/api/v1/books?limit=8')
            .then(res => setFeaturedBooks(res.data.books || []))
            .catch(err => console.error('Error fetching books:', err));

        // Fetch categories
        axios.get('/api/v1/books/categories')
            .then(res => {
                const cats = res.data.categories || [];
                setCategories(cats);
            })
            .catch(err => console.error('Error fetching categories:', err));
    }, []);

    const categories Data = [
        { id: 'education', title_hi: 'शिक्षा', title_en: 'Education' },
        { id: 'spiritual', title_hi: 'आध्यात्मिक', title_en: 'Spiritual' },
        { id: 'fiction', title_hi: 'कथा साहित्य', title_en: 'Fiction' },
        { id: 'children', title_hi: 'बच्चों की किताबें', title_en: 'Children' },
        { id: 'health', title_hi: 'स्वास्थ्य', title_en: 'Health' },
        { id: 'self-help', title_hi: 'स्वयं सहायता', title_en: 'Self Help' },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-[#121212]">
            <Header />

            {/* Hero Section */}
            <section className="gradient-red-blue text-white py-24 px-4">
                <div className="container mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
                        {language === 'hi'
                            ? 'ज्ञान का भंडार, हर घर तक पहुंचे'
                            : 'Treasure of Knowledge, Reaching Every Home'}
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-95">
                        {language === 'hi'
                            ? 'हिंदी और अंग्रेजी में गुणवत्तापूर्ण पुस्तकें - छात्रों, शिक्षकों और पाठकों के लिए'
                            : 'Quality books in Hindi and English - For students, teachers, and readers'}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/books" className="btn-primary-red bg-white hover:bg-gray-100 text-deep-red px-8 py-4 text-lg inline-flex items-center gap-2 shadow-lg hover:shadow-xl">
                            {language === 'hi' ? 'पुस्तकें देखें' : 'Explore Books'}
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link to="/books?category=education" className="btn-secondary border-white text-white hover:bg-white hover:text-royal-blue px-8 py-4 text-lg">
                            {language === 'hi' ? 'श्रेणियां ब्राउज़ करें' : 'Browse Categories'}
                        </Link>
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section className="py-16 px-4 bg-gray-50 dark:bg-[#1E1E1E]">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Left Column - Founder Photo */}
                        <div className="text-center md:text-left">
                            <div className="inline-block">
                                <div className="w-48 h-48 mx-auto md:mx-0 rounded-full bg-gradient-to-br from-deep-red to-royal-blue p-1 mb-4">
                                    <div className="w-full h-full rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-6xl">
                                        👤
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mb-1">
                                    {language === 'hi' ? 'राजेश कुमार' : 'Rajesh Kumar'}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 font-medium">
                                    {language === 'hi' ? 'संस्थापक और निदेशक' : 'Founder & Director'}
                                </p>
                            </div>
                        </div>

                        {/* Right Column - Company Info */}
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1A1A1A] dark:text-white">
                                {language === 'hi' ? 'हमारे बारे में' : 'About Us'}
                            </h2>
                            <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
                                <p>
                                    {language === 'hi'
                                        ? 'पुस्तक भंडार भारत का अग्रणी प्रकाशन गृह है जो हिंदी और अंग्रेजी में गुणवत्तापूर्ण पुस्तकें प्रकाशित करता है।'
                                        : 'Book Store is India\'s leading publishing house that publishes quality books in Hindi and English.'}
                                </p>
                                <p className="font-semibold text-deep-red">
                                    {language === 'hi'
                                        ? '🎯 हमारा मिशन: हर छात्र और पाठक तक ज्ञान पहुंचाना'
                                        : '🎯 Our Mission: Bringing knowledge to every student and reader'}
                                </p>
                                <p>
                                    {language === 'hi'
                                        ? 'हम मानते हैं कि शिक्षा सभी के लिए सुलभ होनी चाहिए। इसलिए हम किफायती कीमतों पर उच्च गुणवत्ता की पुस्तकें प्रदान करते हैं।'
                                        : 'We believe education should be accessible to all. That\'s why we provide high-quality books at affordable prices.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-16 px-4">
                <div className="container mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1A1A1A] dark:text-white">
                        {language === 'hi' ? 'हमें क्यों चुनें' : 'Why Choose Us'}
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: Check,
                                title_hi: 'विश्वसनीय प्रकाशन',
                                title_en: 'Trusted Publishing',
                                desc_hi: '25+ वर्षों का अनुभव',
                                desc_en: '25+ years of experience',
                            },
                            {
                                icon: Users,
                                title_hi: 'छात्रों के लिए आसान',
                                title_en: 'Easy for Students',
                                desc_hi: 'सरल भाषा और बेहतर समझ',
                                desc_en: 'Simple language and better understanding',
                            },
                            {
                                icon: IndianRupee,
                                title_hi: 'किफायती कीमतें',
                                title_en: 'Affordable Prices',
                                desc_hi: 'सबके लिए सुलभ',
                                desc_en: 'Accessible to everyone',
                            },
                            {
                                icon: Languages,
                                title_hi: 'द्विभाषी समर्थन',
                                title_en: 'Bilingual Support',
                                desc_hi: 'हिंदी और अंग्रेजी दोनों',
                                desc_en: 'Both Hindi and English',
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="card p-6 text-center hover:scale-105 transition-transform"
                            >
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-lemon-yellow flex items-center justify-center">
                                    <item.icon className="w-8 h-8 text-gray-800" />
                                </div>
                                <h3 className="font-bold text-xl mb-2 text-[#1A1A1A] dark:text-white">
                                    {language === 'hi' ? item.title_hi : item.title_en}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {language === 'hi' ? item.desc_hi : item.desc_en}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Categories */}
            <section className="py-16 px-4 bg-gray-50 dark:bg-[#1E1E1E]">
                <div className="container mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1A1A1A] dark:text-white">
                        {language === 'hi' ? 'लोकप्रिय श्रेणियां' : 'Popular Categories'}
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
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] dark:text-white">
                            {language === 'hi' ? 'लोकप्रिय पुस्तकें' : 'Featured Books'}
                        </h2>
                        <Link to="/books" className="link text-lg">
                            {language === 'hi' ? 'सभी देखें →' : 'View All →'}
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredBooks.slice(0, 8).map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

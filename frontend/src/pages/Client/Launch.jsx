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

    // Using static data for categories on Launch page to ensure proper translations/ids
    const staticCategories = [
        { id: 'education', title_hi: 'शिक्षा', title_en: 'Education' },
        { id: 'spiritual', title_hi: 'आध्यात्मिक', title_en: 'Spiritual' },
        { id: 'fiction', title_hi: 'कथा साहित्य', title_en: 'Fiction' },
        { id: 'children', title_hi: 'बच्चों की किताबें', title_en: 'Children' },
        { id: 'health', title_hi: 'स्वास्थ्य', title_en: 'Health' },
        { id: 'self-help', title_hi: 'स्वयं सहायता', title_en: 'Self Help' },
    ];

    useEffect(() => {
        // Fetch featured books
        axios.get('/api/v1/books?limit=8')
            .then(res => setFeaturedBooks(res.data.books || []))
            .catch(err => console.error('Error fetching books:', err));
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-[#121212]">
            <Header />

            {/* Hero Section */}
            <section className="gradient-red-blue text-white py-24 px-4 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="container mx-auto text-center relative z-10">
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-fade-in tracking-tight">
                        {language === 'hi' ? 'उपहार प्रकाशन' : 'Uphar Prakashan'}
                    </h1>
                    <p className="text-2xl md:text-3xl mb-4 font-light opacity-90">
                        {language === 'hi'
                            ? 'ज्ञान का अनमोल खजाना'
                            : 'The Precious Treasure of Knowledge'}
                    </p>
                    <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-blue-100">
                        {language === 'hi'
                            ? 'हिंदी और अंग्रेजी में गुणवत्तापूर्ण पुस्तकें - छात्रों, शिक्षकों और पाठकों के लिए'
                            : 'Quality books in Hindi and English - For students, teachers, and readers'}
                    </p>

                    <div className="flex justify-center">
                        <Link to="/books" className="btn-primary-red bg-white hover:bg-gray-100 text-deep-red px-10 py-4 text-xl rounded-full inline-flex items-center gap-3 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                            {language === 'hi' ? 'पुस्तकें देखें' : 'Explore Books'}
                            <ArrowRight className="w-6 h-6" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section className="py-20 px-4 bg-gray-50 dark:bg-[#1E1E1E]">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        {/* Left Column - Founder Photo */}
                        <div className="text-center md:text-left relative">
                            <div className="absolute top-[-20px] left-[-20px] w-24 h-24 bg-dots-pattern opacity-20"></div>
                            <div className="inline-block relative z-10">
                                <div className="w-56 h-56 mx-auto md:mx-0 rounded-full bg-gradient-to-br from-deep-red to-royal-blue p-1.5 shadow-xl">
                                    <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                                        {/* Placeholder for founder image */}
                                        <div className="text-7xl">👤</div>
                                    </div>
                                </div>
                                <div className="mt-6 text-center md:text-left">
                                    <h3 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mb-1">
                                        {language === 'hi' ? 'राजेश कुमार' : 'Rajesh Kumar'}
                                    </h3>
                                    <p className="text-deep-red font-semibold uppercase tracking-wider text-sm">
                                        {language === 'hi' ? 'संस्थापक और निदेशक' : 'Founder & Director'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Company Info */}
                        <div>
                            <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-royal-blue rounded-full text-sm font-semibold mb-4">
                                {language === 'hi' ? 'हमारे बारे में' : 'About Us'}
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1A1A1A] dark:text-white leading-tight">
                                {language === 'hi'
                                    ? 'उपहार प्रकाशन: 25 वर्षों से विश्वास का प्रतीक'
                                    : 'Uphar Prakashan: A Symbol of Trust for 25 Years'}
                            </h2>
                            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300">
                                <p>
                                    {language === 'hi'
                                        ? 'उपहार प्रकाशन भारत का एक प्रतिष्ठित प्रकाशन गृह है, जो शिक्षा और साहित्य के क्षेत्र में उल्लेखनीय योगदान दे रहा है।'
                                        : 'Uphar Prakashan is a prestigious publishing house in India, making significant contributions to the fields of education and literature.'}
                                </p>
                                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-deep-red shadow-sm">
                                    <p className="italic font-medium text-gray-800 dark:text-gray-200">
                                        {language === 'hi'
                                            ? '" हमारा उद्देश्य केवल पुस्तकें बेचना नहीं, बल्कि ज्ञान की लौ जलाना है। "'
                                            : '" Our aim is not just to sell books, but to light the flame of knowledge. "'}
                                    </p>
                                </div>
                                <p>
                                    {language === 'hi'
                                        ? 'हम किफायती मूल्यों पर उच्च गुणवत्ता वाली शिक्षण सामग्री उपलब्ध कराने के लिए प्रतिबद्ध हैं।'
                                        : 'We are committed to providing high-quality educational material at affordable prices.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 px-4 bg-white dark:bg-[#121212]">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] dark:text-white mb-4">
                            {language === 'hi' ? 'हमें क्यों चुनें?' : 'Why Choose Us?'}
                        </h2>
                        <div className="w-20 h-1 bg-deep-red mx-auto rounded-full"></div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
                                title_en: 'Student Friendly',
                                desc_hi: 'सरल भाषा और बेहतर समझ',
                                desc_en: 'Simple language content',
                            },
                            {
                                icon: IndianRupee,
                                title_hi: 'किफायती कीमतें',
                                title_en: 'Affordable',
                                desc_hi: 'सबके लिए सुलभ',
                                desc_en: 'Accessible to everyone',
                            },
                            {
                                icon: Languages,
                                title_hi: 'द्विभाषी समर्थन',
                                title_en: 'Bilingual',
                                desc_hi: 'हिंदी और अंग्रेजी पुस्तकें',
                                desc_en: 'Books in Hindi & English',
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="group p-8 rounded-2xl bg-gray-50 dark:bg-[#1E1E1E] hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 dark:hover:border-gray-700"
                            >
                                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-lemon-yellow/20 flex items-center justify-center group-hover:bg-lemon-yellow group-hover:scale-110 transition-all duration-300">
                                    <item.icon className="w-8 h-8 text-gray-800" />
                                </div>
                                <h3 className="font-bold text-xl mb-3 text-[#1A1A1A] dark:text-white group-hover:text-deep-red transition-colors">
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
            <section className="py-20 px-4 bg-gray-50 dark:bg-[#1E1E1E] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-royal-blue opacity-5 rounded-full blur-3xl"></div>
                <div className="container mx-auto relative z-10">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <span className="text-royal-blue font-semibold uppercase tracking-wider text-sm">
                                {language === 'hi' ? 'संग्रह' : 'Collections'}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] dark:text-white mt-2">
                                {language === 'hi' ? 'लोकप्रिय श्रेणियां' : 'Popular Categories'}
                            </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {staticCategories.map((cat) => (
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
            <section className="py-20 px-4 bg-white dark:bg-[#121212]">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center mb-12">
                        <div>
                            <span className="text-deep-red font-semibold uppercase tracking-wider text-sm">
                                {language === 'hi' ? 'बेस्ट सेलर्स' : 'Best Sellers'}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] dark:text-white mt-2">
                                {language === 'hi' ? 'लोकप्रिय पुस्तकें' : 'Featured Books'}
                            </h2>
                        </div>
                        <Link to="/books" className="hidden sm:flex items-center gap-2 text-royal-blue font-semibold hover:text-blue-800 transition-colors">
                            {language === 'hi' ? 'सभी देखें' : 'View All'}
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredBooks.slice(0, 8).map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                    <div className="mt-12 text-center sm:hidden">
                        <Link to="/books" className="btn-secondary w-full justify-center">
                            View All Books
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

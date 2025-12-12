import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Youtube } from 'lucide-react';

export default function Footer() {
    const { t, language } = useI18n();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300 mt-16">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">
                            {language === 'hi' ? 'पुस्तक भंडार' : 'Book Store'}
                        </h3>
                        <p className="text-sm leading-relaxed mb-4">
                            {language === 'hi'
                                ? 'हिंदी और अंग्रेजी पुस्तकों का विश्वसनीय प्रकाशन गृह। छात्रों और पाठकों के लिए गुणवत्तापूर्ण पुस्तकें।'
                                : 'Trusted publishing house for Hindi and English books. Quality books for students and readers.'}
                        </p>
                        {/* Social Icons */}
                        <div className="flex gap-3">
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-gray-800 hover:bg-pink-600 rounded-lg transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-gray-800 hover:bg-blue-600 rounded-lg transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-gray-800 hover:bg-red-600 rounded-lg transition-colors"
                                aria-label="YouTube"
                            >
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">
                            {language === 'hi' ? 'त्वरित लिंक' : 'Quick Links'}
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/launch" className="hover:text-white transition-colors">
                                    {language === 'hi' ? 'हमारे बारे में' : 'About Us'}
                                </Link>
                            </li>
                            <li>
                                <Link to="/books" className="hover:text-white transition-colors">
                                    {language === 'hi' ? 'सभी पुस्तकें' : 'All Books'}
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-white transition-colors">
                                    {language === 'hi' ? 'संपर्क करें' : 'Contact'}
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="hover:text-white transition-colors">
                                    {language === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy'}
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="hover:text-white transition-colors">
                                    {language === 'hi' ? 'नियम और शर्तें' : 'Terms & Conditions'}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Details */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">
                            {language === 'hi' ? 'संपर्क विवरण' : 'Contact Details'}
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3">
                                <Phone className="w-5 h-5 text-lemon-yellow flex-shrink-0 mt-0.5" />
                                <div>
                                    <div className="font-medium text-white">
                                        {language === 'hi' ? 'फ़ोन' : 'Phone'}
                                    </div>
                                    <a href="tel:+919876543210" className="hover:text-white transition-colors">
                                        +91-9876543210
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-lemon-yellow flex-shrink-0 mt-0.5" />
                                <div>
                                    <div className="font-medium text-white">
                                        {language === 'hi' ? 'ईमेल' : 'Email'}
                                    </div>
                                    <a href="mailto:info@publishingfirm.com" className="hover:text-white transition-colors">
                                        info@publishingfirm.com
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <Clock className="w-5 h-5 text-lemon-yellow flex-shrink-0 mt-0.5" />
                                <div>
                                    <div className="font-medium text-white">
                                        {language === 'hi' ? 'समय' : 'Support Hours'}
                                    </div>
                                    <div>
                                        {language === 'hi' ? 'सोम - शनि: 9:00 - 18:00' : 'Mon - Sat: 9:00 AM - 6:00 PM'}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Address */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">
                            {language === 'hi' ? 'पता' : 'Address'}
                        </h3>
                        <div className="flex items-start gap-3 text-sm mb-4">
                            <MapPin className="w-5 h-5 text-lemon-yellow flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="leading-relaxed">
                                    {language === 'hi'
                                        ? '123, पुस्तक मार्ग, शिक्षा नगर, नई दिल्ली - 110001, भारत'
                                        : '123, Book Street, Education Nagar, New Delhi - 110001, India'}
                                </p>
                                <a
                                    href="https://maps.google.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block mt-2 text-lemon-yellow hover:text-lemon-yellow-600 transition-colors"
                                >
                                    {language === 'hi' ? 'नक्शे पर देखें →' : 'View on Map →'}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
                    <p>
                        &copy; {currentYear} {language === 'hi' ? 'पुस्तक भंडार' : 'Book Store'}.
                        {language === 'hi' ? ' सर्वाधिकार सुरक्षित।' : ' All rights reserved.'}
                    </p>
                    <p className="mt-2 text-gray-500">
                        {language === 'hi'
                            ? 'हिंदी और अंग्रेजी पाठकों के लिए ❤️ के साथ बनाया गया'
                            : 'Built with ❤️ for Hindi and English readers'}
                    </p>
                </div>
            </div>
        </footer>
    );
}

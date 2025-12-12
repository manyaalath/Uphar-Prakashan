import { useState } from 'react';
import { useI18n } from '../../i18n';
import { Filter, X } from 'lucide-react';

export default function FiltersSidebar({ filters, onChange, onClear }) {
    const { language } = useI18n();
    const [isOpen, setIsOpen] = useState(false);

    const categories = [
        { id: 'education', label_hi: 'शिक्षा', label_en: 'Education' },
        { id: 'spiritual', label_hi: 'आध्यात्मिक', label_en: 'Spiritual' },
        { id: 'fiction', label_hi: 'कथा साहित्य', label_en: 'Fiction' },
        { id: 'children', label_hi: 'बच्चों की किताबें', label_en: 'Children' },
        { id: 'health', label_hi: 'स्वास्थ्य', label_en: 'Health' },
        { id: 'self-help', label_hi: 'स्वयं सहायता', label_en: 'Self Help' },
    ];

    const languages = [
        { id: 'hindi', label_hi: 'हिंदी', label_en: 'Hindi' },
        { id: 'english', label_en: 'English', label_hi: 'अंग्रेजी' },
        { id: 'both', label_hi: 'दोनों', label_en: 'Both' },
    ];

    const FilterContent = () => (
        <div className="space-y-6">
            {/* Category Filter */}
            <div>
                <h3 className="font-bold text-lg mb-3 text-[#1A1A1A] dark:text-white">
                    {language === 'hi' ? 'श्रेणी' : 'Category'}
                </h3>
                <div className="space-y-2">
                    {categories.map((cat) => (
                        <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="category"
                                value={cat.id}
                                checked={filters.category === cat.id}
                                onChange={(e) => onChange({ ...filters, category: e.target.value })}
                                className="w-4 h-4 text-deep-red focus:ring-deep-red"
                            />
                            <span className="text-gray-700 dark:text-gray-300">
                                {language === 'hi' ? cat.label_hi : cat.label_en}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Language Filter */}
            <div>
                <h3 className="font-bold text-lg mb-3 text-[#1A1A1A] dark:text-white">
                    {language === 'hi' ? 'भाषा' : 'Language'}
                </h3>
                <div className="space-y-2">
                    {languages.map((lang) => (
                        <label key={lang.id} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="language"
                                value={lang.id}
                                checked={filters.language === lang.id}
                                onChange={(e) => onChange({ ...filters, language: e.target.value })}
                                className="w-4 h-4 text-deep-red focus:ring-deep-red"
                            />
                            <span className="text-gray-700 dark:text-gray-300">
                                {language === 'hi' ? lang.label_hi : lang.label_en}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div>
                <h3 className="font-bold text-lg mb-3 text-[#1A1A1A] dark:text-white">
                    {language === 'hi' ? 'मूल्य सीमा' : 'Price Range'}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    <input
                        type="number"
                        placeholder={language === 'hi' ? 'न्यूनतम' : 'Min'}
                        value={filters.minPrice || ''}
                        onChange={(e) => onChange({ ...filters, minPrice: e.target.value })}
                        className="input-field !py-2 !text-base"
                    />
                    <input
                        type="number"
                        placeholder={language === 'hi' ? 'अधिकतम' : 'Max'}
                        value={filters.maxPrice || ''}
                        onChange={(e) => onChange({ ...filters, maxPrice: e.target.value })}
                        className="input-field !py-2 !text-base"
                    />
                </div>
            </div>

            {/* Clear Filters */}
            <button onClick={onClear} className="btn-secondary w-full">
                {language === 'hi' ? 'फ़िल्टर साफ़ करें' : 'Clear Filters'}
            </button>
        </div>
    );

    return (
        <>
            {/* Mobile Filter Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden btn-primary-blue mb-4 w-full flex items-center justify-center gap-2"
            >
                <Filter className="w-5 h-5" />
                {language === 'hi' ? 'फ़िल्टर' : 'Filters'}
            </button>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block card p-6 sticky top-24">
                <FilterContent />
            </div>

            {/* Mobile Drawer */}
            {isOpen && (
                <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsOpen(false)}>
                    <div
                        className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-[#1E1E1E] p-6 overflow-y-auto animate-slide-in"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-[#1A1A1A] dark:text-white">
                                {language === 'hi' ? 'फ़िल्टर' : 'Filters'}
                            </h2>
                            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <FilterContent />
                    </div>
                </div>
            )}
        </>
    );
}

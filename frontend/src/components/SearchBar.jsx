import { useState, useEffect } from 'react';
import { useI18n } from '../i18n';

export default function SearchBar({ onSearch, placeholder }) {
    const { t } = useI18n();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const debounce = setTimeout(() => {
            if (onSearch) {
                onSearch(searchTerm);
            }
        }, 500);

        return () => clearTimeout(debounce);
    }, [searchTerm, onSearch]);

    return (
        <div className="relative">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={placeholder || t('search_placeholder')}
                className="input-field pl-12 pr-10"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
                🔍
            </span>
            {searchTerm && (
                <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                    ✕
                </button>
            )}
        </div>
    );
}

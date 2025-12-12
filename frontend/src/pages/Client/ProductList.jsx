import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useI18n } from '../../i18n';
import BookGrid from '../../components/BookGrid';
import Pagination from '../../components/Pagination';
import FiltersSidebar from '../../components/Filters/FiltersSidebar';

export default function ProductList() {
    const { t, language } = useI18n();
    const [searchParams, setSearchParams] = useSearchParams();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ total: 0, page: 1, totalPages: 1 });
    const [filters, setFilters] = useState({
        search: searchParams.get('search') || '',
        category: searchParams.get('category') || '',
        language: searchParams.get('language') || '',
        minPrice: searchParams.get('minPrice') || '',
        maxPrice: searchParams.get('maxPrice') || '',
        sort: searchParams.get('sort') || ''
    });

    useEffect(() => {
        const params = new URLSearchParams(searchParams);

        // Update local filters state from URL
        setFilters({
            search: params.get('search') || '',
            category: params.get('category') || '',
            language: params.get('language') || '',
            minPrice: params.get('minPrice') || '',
            maxPrice: params.get('maxPrice') || '',
            sort: params.get('sort') || ''
        });

        fetchBooks(params);
    }, [searchParams]);

    const fetchBooks = async (params) => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/v1/books?${params.toString()}`);
            setBooks(res.data.books);
            setPagination(res.data.pagination);
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        const params = new URLSearchParams();
        Object.keys(newFilters).forEach(k => {
            if (newFilters[k]) params.set(k, newFilters[k]);
        });
        // Reset page to 1 when filters change
        params.set('page', '1');
        setSearchParams(params);
    };

    const clearFilters = () => {
        setFilters({
            search: '',
            category: '',
            language: '',
            minPrice: '',
            maxPrice: '',
            sort: ''
        });
        setSearchParams({});
    };

    const handleSortChange = (e) => {
        handleFilterChange({ ...filters, sort: e.target.value });
    };

    const handlePageChange = (page) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page);
        setSearchParams(params);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-8 text-[#1A1A1A] dark:text-white">{t('books')}</h1>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filters Sidebar */}
                <aside className="lg:col-span-1">
                    <FiltersSidebar
                        filters={filters}
                        onChange={handleFilterChange}
                        onClear={clearFilters}
                    />
                </aside>

                {/* Books Grid */}
                <div className="lg:col-span-3">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                        <div className="text-gray-600 dark:text-gray-400">
                            {t('showing')} {books.length} {t('results')}
                        </div>

                        {/* Sort Dropdown */}
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium whitespace-nowrap text-gray-700 dark:text-gray-300">
                                {t('sort')}:
                            </label>
                            <select
                                value={filters.sort}
                                onChange={handleSortChange}
                                className="input-field !py-2 !text-sm w-48"
                            >
                                <option value="">{t('sort_newest')}</option>
                                <option value="price_low">{t('sort_price_low')}</option>
                                <option value="price_high">{t('sort_price_high')}</option>
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-deep-red"></div>
                        </div>
                    ) : (
                        <>
                            {books.length > 0 ? (
                                <BookGrid books={books} />
                            ) : (
                                <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <p className="text-lg text-gray-600 dark:text-gray-400">
                                        {t('no_results')}
                                    </p>
                                    <button
                                        onClick={clearFilters}
                                        className="mt-4 text-royal-blue hover:underline"
                                    >
                                        {language === 'hi' ? 'सभी फ़िल्टर साफ़ करें' : 'Clear all filters'}
                                    </button>
                                </div>
                            )}

                            {pagination.totalPages > 1 && (
                                <div className="mt-12">
                                    <Pagination
                                        currentPage={pagination.page}
                                        totalPages={pagination.totalPages}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

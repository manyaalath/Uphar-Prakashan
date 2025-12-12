import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useI18n } from '../../i18n';
import SearchBar from '../../components/SearchBar';
import BookGrid from '../../components/BookGrid';
import Pagination from '../../components/Pagination';

export default function ProductList() {
    const { t } = useI18n();
    const [searchParams, setSearchParams] = useSearchParams();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ total: 0, page: 1, totalPages: 1 });
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState({
        search: searchParams.get('search') || '',
        category: searchParams.get('category') || '',
        language: searchParams.get('language') || '',
        minPrice: searchParams.get('minPrice') || '',
        maxPrice: searchParams.get('maxPrice') || '',
        sort: searchParams.get('sort') || ''
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchBooks();
    }, [searchParams]);

    const fetchCategories = async () => {
        try {
            const res = await axios.get('/api/v1/books/categories');
            setCategories(res.data.categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams(searchParams);
            const res = await axios.get(`/api/v1/books?${params.toString()}`);
            setBooks(res.data.books);
            setPagination(res.data.pagination);
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateFilter = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);

        const params = new URLSearchParams();
        Object.keys(newFilters).forEach(k => {
            if (newFilters[k]) params.set(k, newFilters[k]);
        });
        setSearchParams(params);
    };

    const handlePageChange = (page) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page);
        setSearchParams(params);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-8">{t('books')}</h1>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filters Sidebar */}
                <aside className="lg:col-span-1">
                    <div className="card card-body sticky top-20">
                        <h2 className="text-xl font-bold mb-4">{t('filter')}</h2>

                        {/* Category Filter */}
                        <div className="mb-6">
                            <label className="block font-medium mb-2">{t('category')}</label>
                            <select
                                value={filters.category}
                                onChange={(e) => updateFilter('category', e.target.value)}
                                className="input-field"
                            >
                                <option value="">{t('all_categories')}</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{t(cat)}</option>
                                ))}
                            </select>
                        </div>

                        {/* Language Filter */}
                        <div className="mb-6">
                            <label className="block font-medium mb-2">{t('language')}</label>
                            <select
                                value={filters.language}
                                onChange={(e) => updateFilter('language', e.target.value)}
                                className="input-field"
                            >
                                <option value="">{t('both')}</option>
                                <option value="hindi">{t('hindi')}</option>
                                <option value="english">{t('english')}</option>
                            </select>
                        </div>

                        {/* Price Range */}
                        <div className="mb-6">
                            <label className="block font-medium mb-2">{t('price_range')}</label>
                            <div className="flex space-x-2">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={filters.minPrice}
                                    onChange={(e) => updateFilter('minPrice', e.target.value)}
                                    className="input-field"
                                />
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={filters.maxPrice}
                                    onChange={(e) => updateFilter('maxPrice', e.target.value)}
                                    className="input-field"
                                />
                            </div>
                        </div>

                        {/* Sort */}
                        <div className="mb-6">
                            <label className="block font-medium mb-2">{t('sort')}</label>
                            <select
                                value={filters.sort}
                                onChange={(e) => updateFilter('sort', e.target.value)}
                                className="input-field"
                            >
                                <option value="">{t('sort_newest')}</option>
                                <option value="price_low">{t('sort_price_low')}</option>
                                <option value="price_high">{t('sort_price_high')}</option>
                            </select>
                        </div>
                    </div>
                </aside>

                {/* Books Grid */}
                <div className="lg:col-span-3">
                    <div className="mb-6">
                        <SearchBar
                            onSearch={(term) => updateFilter('search', term)}
                            placeholder={t('search_placeholder')}
                        />
                    </div>

                    <div className="mb-4 text-gray-600 dark:text-gray-400">
                        {t('showing')} {books.length} {t('results')}
                    </div>

                    <BookGrid books={books} loading={loading} />

                    <Pagination
                        currentPage={pagination.page}
                        totalPages={pagination.totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
}

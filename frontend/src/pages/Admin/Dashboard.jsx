import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useI18n } from '../../i18n';
import { useAuthStore } from '../../store/authStore';

export default function Dashboard() {
    const { t, language } = useI18n();
    const { token } = useAuthStore();
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBooks();
    }, [search]);

    const fetchBooks = async () => {
        try {
            const res = await axios.get(`/api/v1/admin/books?search=${search}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBooks(res.data.books);
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm(t('delete_book') + '?')) return;

        try {
            await axios.delete(`/api/v1/admin/books/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchBooks();
        } catch (error) {
            console.error('Error deleting book:', error);
            alert(t('error'));
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">{t('dashboard')}</h1>
                <Link to="/admin/add-book" className="btn-primary">
                    + {t('add_book')}
                </Link>
            </div>

            <div className="mb-6">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={t('search')}
                    className="input-field max-w-md"
                />
            </div>

            <div className="card overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                {t('title')}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                {t('category')}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                {t('price')}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                {t('stock')}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                {t('edit')}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center">{t('loading')}</td>
                            </tr>
                        ) : books.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center">{t('no_results')}</td>
                            </tr>
                        ) : (
                            books.map(book => (
                                <tr key={book.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{book.id}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <div className={language === 'hi' ? 'hindi-text' : ''}>
                                            {language === 'hi' ? book.title_hi : book.title_en}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className="badge badge-primary">{t(book.category)}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        ₹{book.price}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`badge ${book.stock === 0 ? 'badge-danger' : book.stock < 10 ? 'badge-warning' : 'badge-success'}`}>
                                            {book.stock}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                                        <Link to={`/admin/edit-book/${book.id}`} className="text-blue-600 hover:text-blue-800">
                                            ✏️
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(book.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useI18n } from '../../i18n';
import { useAuthStore } from '../../store/authStore';
import AdminLayout from '../../components/Admin/AdminLayout';
import AdminBookTable from '../../components/Admin/AdminBookTable';
import { Plus, Search } from 'lucide-react';

export default function Dashboard() {
    const { t } = useI18n();
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
        <AdminLayout>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('manage_books')}</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        View and manage your book inventory
                    </p>
                </div>
                <Link
                    to="/admin/books/add"
                    className="flex items-center gap-2 px-4 py-2 bg-royal-blue text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                    <Plus className="w-5 h-5" />
                    {t('add_book')}
                </Link>
            </div>

            <div className="mb-6 relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={t('search_placeholder')}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-royal-blue focus:border-royal-blue outline-none transition-all"
                />
            </div>

            <AdminBookTable
                books={books}
                loading={loading}
                onDelete={handleDelete}
            />
        </AdminLayout>
    );
}

import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n';
import { Edit2, Trash2 } from 'lucide-react';

export default function AdminBookTable({ books, loading, onDelete }) {
    const { t, language } = useI18n();

    if (loading) {
        return (
            <div className="flex justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (books.length === 0) {
        return (
            <div className="p-8 text-center text-gray-500">
                {t('no_results')}
            </div>
        );
    }

    return (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            {t('title')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            {t('category')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            {t('price')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            {t('stock')}
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            {t('edit')}
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {books.map((book) => (
                        <tr key={book.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                {book.id}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <img
                                        src={book.cover_url || 'https://via.placeholder.com/40x60?text=Book'}
                                        alt=""
                                        className="h-10 w-8 object-cover rounded mr-3 bg-gray-100 dark:bg-gray-700"
                                    />
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                        {language === 'hi' ? book.title_hi : book.title_en}
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 capitalize">
                                    {t(book.category)}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-medium">
                                ₹{book.price}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${book.stock === 0 ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                                        book.stock < 10 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                                            'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                    }`}>
                                    {book.stock}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                <Link
                                    to={`/admin/books/${book.id}/edit`}
                                    className="text-royal-blue hover:text-blue-900 dark:hover:text-blue-400 p-1 inline-block"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </Link>
                                <button
                                    onClick={() => onDelete(book.id)}
                                    className="text-red-600 hover:text-red-900 dark:hover:text-red-400 p-1 inline-block"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

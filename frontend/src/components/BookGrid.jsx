import BookCard from './BookCard';
import { useI18n } from '../i18n';

export default function BookGrid({ books, loading = false }) {
    const { t } = useI18n();

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="card animate-pulse">
                        <div className="h-64 bg-gray-300 dark:bg-gray-600"></div>
                        <div className="card-body space-y-3">
                            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
                            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!books || books.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-xl text-gray-500 dark:text-gray-400">{t('no_results')}</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map(book => (
                <BookCard key={book.id} book={book} />
            ))}
        </div>
    );
}

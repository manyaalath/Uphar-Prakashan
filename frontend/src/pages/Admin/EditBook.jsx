import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useI18n } from '../../i18n';
import { useAuthStore } from '../../store/authStore';
import AdminLayout from '../../components/Admin/AdminLayout';
import BookForm from '../../components/Admin/BookForm';
import { ArrowLeft } from 'lucide-react';

export default function EditBook() {
    const { id } = useParams();
    const { t } = useI18n();
    const navigate = useNavigate();
    const { token } = useAuthStore();
    const [loading, setLoading] = useState(false);
    const [initialData, setInitialData] = useState(null);
    const [fetchError, setFetchError] = useState('');

    useEffect(() => {
        fetchBook();
    }, [id]);

    const fetchBook = async () => {
        try {
            const res = await axios.get(`/api/v1/books/${id}`);
            setInitialData(res.data.book);
        } catch (error) {
            console.error('Error fetching book:', error);
            setFetchError('Book not found');
        }
    };

    const handleSubmit = async (formData) => {
        setLoading(true);
        try {
            const bookData = {
                ...formData,
                price: parseFloat(formData.price),
                ex_tax: formData.ex_tax ? parseFloat(formData.ex_tax) : null,
                stock: parseInt(formData.stock),
                tags: typeof formData.tags === 'string'
                    ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
                    : formData.tags
            };

            await axios.put(`/api/v1/admin/books/${id}`, bookData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            navigate('/admin/dashboard');
        } catch (error) {
            console.error('Error updating book:', error);
            alert(error.response?.data?.error || t('error'));
        } finally {
            setLoading(false);
        }
    };

    if (fetchError) {
        return (
            <AdminLayout>
                <div className="text-center py-12">
                    <h2 className="text-xl font-bold text-red-600 mb-4">{fetchError}</h2>
                    <Link to="/admin/dashboard" className="btn-secondary">
                        Back to Dashboard
                    </Link>
                </div>
            </AdminLayout>
        );
    }

    if (!initialData) {
        return (
            <AdminLayout>
                <div className="flex justify-center p-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-royal-blue"></div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="mb-8">
                <Link to="/admin/dashboard" className="inline-flex items-center text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 mb-4 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                </Link>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('edit_book')}</h1>
            </div>

            <BookForm
                initialData={initialData}
                onSubmit={handleSubmit}
                loading={loading}
                onCancel={() => navigate('/admin/dashboard')}
            />
        </AdminLayout>
    );
}

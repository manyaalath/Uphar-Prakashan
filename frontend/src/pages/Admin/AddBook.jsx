import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useI18n } from '../../i18n';
import { useAuthStore } from '../../store/authStore';
import AdminLayout from '../../components/Admin/AdminLayout';
import BookForm from '../../components/Admin/BookForm';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AddBook() {
    const { t } = useI18n();
    const navigate = useNavigate();
    const { token } = useAuthStore();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (formData) => {
        setLoading(true);
        try {
            const bookData = {
                ...formData,
                price: parseFloat(formData.price),
                ex_tax: formData.ex_tax ? parseFloat(formData.ex_tax) : null,
                stock: parseInt(formData.stock),
                tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
            };

            await axios.post('/api/v1/admin/books', bookData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Show success message or toast here if needed
            navigate('/admin/dashboard');
        } catch (error) {
            console.error('Error adding book:', error);
            alert(error.response?.data?.error || t('error'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="mb-8">
                <Link to="/admin/dashboard" className="inline-flex items-center text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 mb-4 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                </Link>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('add_book')}</h1>
            </div>

            <BookForm
                onSubmit={handleSubmit}
                loading={loading}
                onCancel={() => navigate('/admin/dashboard')}
            />
        </AdminLayout>
    );
}

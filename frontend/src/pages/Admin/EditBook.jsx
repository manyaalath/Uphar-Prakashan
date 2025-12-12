import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useI18n } from '../../i18n';
import { useAuthStore } from '../../store/authStore';

export default function EditBook() {
    const { id } = useParams();
    const { t } = useI18n();
    const navigate = useNavigate();
    const { token } = useAuthStore();
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [formData, setFormData] = useState({
        slug: '',
        title_hi: '',
        title_en: '',
        short_hi: '',
        short_en: '',
        description_hi: '',
        description_en: '',
        price: '',
        ex_tax: '',
        category: 'education',
        tags: '',
        language: 'both',
        stock: '',
        cover_url: ''
    });

    useEffect(() => {
        fetchBook();
    }, [id]);

    const fetchBook = async () => {
        try {
            const res = await axios.get(`/api/v1/books/${id}`);
            const book = res.data.book;
            setFormData({
                slug: book.slug,
                title_hi: book.title_hi,
                title_en: book.title_en,
                short_hi: book.short_hi || '',
                short_en: book.short_en || '',
                description_hi: book.description_hi || '',
                description_en: book.description_en || '',
                price: book.price,
                ex_tax: book.ex_tax || '',
                category: book.category,
                tags: Array.isArray(book.tags) ? book.tags.join(', ') : '',
                language: book.language,
                stock: book.stock,
                cover_url: book.cover_url || ''
            });
        } catch (error) {
            console.error('Error fetching book:', error);
            alert(t('error'));
        } finally {
            setFetchLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const bookData = {
                ...formData,
                price: parseFloat(formData.price),
                ex_tax: formData.ex_tax ? parseFloat(formData.ex_tax) : null,
                stock: parseInt(formData.stock),
                tags: formData.tags.split(',').map(t => t.trim()).filter(t => t)
            };

            await axios.put(`/api/v1/admin/books/${id}`, bookData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert(t('book_updated'));
            navigate('/admin/dashboard');
        } catch (error) {
            console.error('Error updating book:', error);
            alert(error.response?.data?.error || t('error'));
        } finally {
            setLoading(false);
        }
    };

    if (fetchLoading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                <p>{t('loading')}</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-8">{t('edit_book')}</h1>

            <form onSubmit={handleSubmit} className="card card-body space-y-6">
                {/* Same form fields as AddBook */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block font-medium mb-2">{t('title')} (Hindi) *</label>
                        <input
                            type="text"
                            required
                            value={formData.title_hi}
                            onChange={(e) => setFormData({ ...formData, title_hi: e.target.value })}
                            className="input-field hindi-text"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-2">{t('title')} (English) *</label>
                        <input
                            type="text"
                            required
                            value={formData.title_en}
                            onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                            className="input-field"
                        />
                    </div>
                </div>

                <div>
                    <label className="block font-medium mb-2">Slug *</label>
                    <input
                        type="text"
                        required
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="input-field"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block font-medium mb-2">{t('price')} *</label>
                        <input
                            type="number"
                            required
                            min="0"
                            step="0.01"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            className="input-field"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-2">{t('stock')} *</label>
                        <input
                            type="number"
                            required
                            min="0"
                            value={formData.stock}
                            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                            className="input-field"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-2">{t('category')} *</label>
                        <select
                            required
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="input-field"
                        >
                            <option value="spiritual">{t('spiritual')}</option>
                            <option value="fiction">{t('fiction')}</option>
                            <option value="education">{t('education')}</option>
                            <option value="children">{t('children')}</option>
                            <option value="health">{t('health')}</option>
                            <option value="self-help">{t('self-help')}</option>
                        </select>
                    </div>
                </div>

                <div className="flex space-x-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary"
                    >
                        {loading ? t('loading') : t('update')}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/admin/dashboard')}
                        className="btn-secondary"
                    >
                        {t('cancel')}
                    </button>
                </div>
            </form>
        </div>
    );
}

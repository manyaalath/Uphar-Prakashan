import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useI18n } from '../../i18n';
import { useAuthStore } from '../../store/authStore';

export default function AddBook() {
    const { t } = useI18n();
    const navigate = useNavigate();
    const { token } = useAuthStore();
    const [loading, setLoading] = useState(false);
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

            await axios.post('/api/v1/admin/books', bookData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert(t('book_added'));
            navigate('/admin/dashboard');
        } catch (error) {
            console.error('Error adding book:', error);
            alert(error.response?.data?.error || t('error'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-8">{t('add_book')}</h1>

            <form onSubmit={handleSubmit} className="card card-body space-y-6">
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
                    <label className="block font-medium mb-2">Slug (URL-friendly ID) *</label>
                    <input
                        type="text"
                        required
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                        className="input-field"
                        placeholder="book-slug-example"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block font-medium mb-2">{t('short_description')} (Hindi)</label>
                        <textarea
                            value={formData.short_hi}
                            onChange={(e) => setFormData({ ...formData, short_hi: e.target.value })}
                            className="input-field hindi-text"
                            rows="2"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-2">{t('short_description')} (English)</label>
                        <textarea
                            value={formData.short_en}
                            onChange={(e) => setFormData({ ...formData, short_en: e.target.value })}
                            className="input-field"
                            rows="2"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block font-medium mb-2">{t('description')} (Hindi)</label>
                        <textarea
                            value={formData.description_hi}
                            onChange={(e) => setFormData({ ...formData, description_hi: e.target.value })}
                            className="input-field hindi-text"
                            rows="4"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-2">{t('description')} (English)</label>
                        <textarea
                            value={formData.description_en}
                            onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                            className="input-field"
                            rows="4"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block font-medium mb-2">{t('price')} (₹) *</label>
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
                        <label className="block font-medium mb-2">{t('ex_tax')} (₹)</label>
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={formData.ex_tax}
                            onChange={(e) => setFormData({ ...formData, ex_tax: e.target.value })}
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                    <div>
                        <label className="block font-medium mb-2">{t('language')} *</label>
                        <select
                            required
                            value={formData.language}
                            onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                            className="input-field"
                        >
                            <option value="hindi">{t('hindi')}</option>
                            <option value="english">{t('english')}</option>
                            <option value="both">{t('both')}</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block font-medium mb-2">{t('tags')} (comma-separated)</label>
                    <input
                        type="text"
                        value={formData.tags}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        className="input-field"
                        placeholder="spiritual, classic, popular"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-2">{t('cover_image')} URL</label>
                    <input
                        type="url"
                        value={formData.cover_url}
                        onChange={(e) => setFormData({ ...formData, cover_url: e.target.value })}
                        className="input-field"
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                <div className="flex space-x-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary"
                    >
                        {loading ? t('loading') : t('save')}
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

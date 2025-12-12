import { useState, useEffect } from 'react';
import { useI18n } from '../../i18n';

export default function BookForm({ initialData = {}, onSubmit, loading, onCancel }) {
    const { t } = useI18n();
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
        cover_url: '',
        ...initialData,
        tags: initialData.tags ? initialData.tags.join(', ') : ''
    });

    // Update tags string if initialData updates
    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            setFormData(prev => ({
                ...prev,
                ...initialData,
                tags: Array.isArray(initialData.tags) ? initialData.tags.join(', ') : (initialData.tags || '')
            }));
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {initialData.id ? t('edit_book') : t('book_details')}
                </h3>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column: Details */}
                <div className="space-y-6">
                    {/* Titles */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {t('title')} (Hindi) *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.title_hi}
                                onChange={(e) => setFormData({ ...formData, title_hi: e.target.value })}
                                className="input-field"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {t('title')} (English) *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.title_en}
                                onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                                className="input-field"
                            />
                        </div>
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Slug *
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            className="input-field font-mono text-sm"
                        />
                    </div>

                    {/* Descriptions */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {t('description')} (Hindi)
                            </label>
                            <textarea
                                rows="4"
                                value={formData.description_hi}
                                onChange={(e) => setFormData({ ...formData, description_hi: e.target.value })}
                                className="input-field"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {t('description')} (English)
                            </label>
                            <textarea
                                rows="4"
                                value={formData.description_en}
                                onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                                className="input-field"
                            />
                        </div>
                    </div>

                    {/* Meta */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {t('category')}
                            </label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="input-field"
                            >
                                <option value="education">{t('education')}</option>
                                <option value="spiritual">{t('spiritual')}</option>
                                <option value="fiction">{t('fiction')}</option>
                                <option value="children">{t('children')}</option>
                                <option value="health">{t('health')}</option>
                                <option value="self-help">{t('self-help')}</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {t('language')}
                            </label>
                            <select
                                value={formData.language}
                                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                                className="input-field"
                            >
                                <option value="both">{t('both')}</option>
                                <option value="hindi">{t('hindi')}</option>
                                <option value="english">{t('english')}</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Right Column: Pricing & Media */}
                <div className="space-y-6">
                    {/* Pricing */}
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {t('price')} *
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className="input-field pl-7"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {t('ex_tax')}
                            </label>
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
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {t('stock')} *
                            </label>
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

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {t('cover_image')} URL
                        </label>
                        <input
                            type="url"
                            value={formData.cover_url}
                            onChange={(e) => setFormData({ ...formData, cover_url: e.target.value })}
                            className="input-field mb-2"
                            placeholder="https://"
                        />
                        {formData.cover_url && (
                            <div className="mt-2 text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                                <img
                                    src={formData.cover_url}
                                    alt="Preview"
                                    className="mx-auto h-48 object-contain rounded shadow-sm"
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Invalid+URL'; }}
                                />
                                <p className="text-xs text-gray-500 mt-2">Image Preview</p>
                            </div>
                        )}
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {t('tags')}
                        </label>
                        <input
                            type="text"
                            value={formData.tags}
                            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                            className="input-field"
                            placeholder="history, best-seller"
                        />
                        <p className="text-xs text-gray-500 mt-1">Comma separated</p>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 rounded-b-lg flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 bg-white dark:bg-gray-800 transition-colors"
                >
                    {t('cancel')}
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-royal-blue hover:bg-blue-700 text-white rounded-md shadow-sm transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                    {loading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
                    {t('save')}
                </button>
            </div>
        </form>
    );
}

const { db } = require('../db');

class Book {
    static getAll(filters = {}) {
        let query = 'SELECT * FROM books WHERE 1=1';
        const params = [];

        // Search filter (searches in both Hindi and English fields)
        if (filters.search) {
            query += ' AND (title_hi LIKE ? OR title_en LIKE ? OR description_hi LIKE ? OR description_en LIKE ?)';
            const searchTerm = `%${filters.search}%`;
            params.push(searchTerm, searchTerm, searchTerm, searchTerm);
        }

        // Category filter
        if (filters.category) {
            query += ' AND category = ?';
            params.push(filters.category);
        }

        // Language filter
        if (filters.language) {
            query += ' AND (language = ? OR language = "both")';
            params.push(filters.language);
        }

        // Price range filter
        if (filters.minPrice) {
            query += ' AND price >= ?';
            params.push(filters.minPrice);
        }
        if (filters.maxPrice) {
            query += ' AND price <= ?';
            params.push(filters.maxPrice);
        }

        // Sorting
        if (filters.sort === 'price_low') {
            query += ' ORDER BY price ASC';
        } else if (filters.sort === 'price_high') {
            query += ' ORDER BY price DESC';
        } else if (filters.sort === 'newest') {
            query += ' ORDER BY created_at DESC';
        } else {
            query += ' ORDER BY id DESC';
        }

        // Pagination
        const limit = filters.limit || 12;
        const offset = filters.offset || 0;
        query += ' LIMIT ? OFFSET ?';
        params.push(limit, offset);

        const stmt = db.prepare(query);
        return stmt.all(...params);
    }

    static count(filters = {}) {
        let query = 'SELECT COUNT(*) as total FROM books WHERE 1=1';
        const params = [];

        if (filters.search) {
            query += ' AND (title_hi LIKE ? OR title_en LIKE ? OR description_hi LIKE ? OR description_en LIKE ?)';
            const searchTerm = `%${filters.search}%`;
            params.push(searchTerm, searchTerm, searchTerm, searchTerm);
        }

        if (filters.category) {
            query += ' AND category = ?';
            params.push(filters.category);
        }

        if (filters.language) {
            query += ' AND (language = ? OR language = "both")';
            params.push(filters.language);
        }

        if (filters.minPrice) {
            query += ' AND price >= ?';
            params.push(filters.minPrice);
        }
        if (filters.maxPrice) {
            query += ' AND price <= ?';
            params.push(filters.maxPrice);
        }

        const stmt = db.prepare(query);
        const result = stmt.get(...params);
        return result.total;
    }

    static findById(id) {
        const stmt = db.prepare('SELECT * FROM books WHERE id = ?');
        return stmt.get(id);
    }

    static findBySlug(slug) {
        const stmt = db.prepare('SELECT * FROM books WHERE slug = ?');
        return stmt.get(slug);
    }

    static create(bookData) {
        const stmt = db.prepare(`
            INSERT INTO books (
                slug, title_hi, title_en, short_hi, short_en, description_hi, description_en,
                price, ex_tax, category, tags, language, stock, cover_url
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        const result = stmt.run(
            bookData.slug,
            bookData.title_hi,
            bookData.title_en,
            bookData.short_hi || null,
            bookData.short_en || null,
            bookData.description_hi || null,
            bookData.description_en || null,
            bookData.price,
            bookData.ex_tax || null,
            bookData.category,
            JSON.stringify(bookData.tags || []),
            bookData.language,
            bookData.stock || 0,
            bookData.cover_url || null
        );

        return result.lastInsertRowid;
    }

    static update(id, bookData) {
        const stmt = db.prepare(`
            UPDATE books SET
                slug = ?, title_hi = ?, title_en = ?, short_hi = ?, short_en = ?,
                description_hi = ?, description_en = ?, price = ?, ex_tax = ?,
                category = ?, tags = ?, language = ?, stock = ?, cover_url = ?
            WHERE id = ?
        `);

        return stmt.run(
            bookData.slug,
            bookData.title_hi,
            bookData.title_en,
            bookData.short_hi || null,
            bookData.short_en || null,
            bookData.description_hi || null,
            bookData.description_en || null,
            bookData.price,
            bookData.ex_tax || null,
            bookData.category,
            JSON.stringify(bookData.tags || []),
            bookData.language,
            bookData.stock || 0,
            bookData.cover_url || null,
            id
        );
    }

    static delete(id) {
        const stmt = db.prepare('DELETE FROM books WHERE id = ?');
        return stmt.run(id);
    }

    static getCategories() {
        const stmt = db.prepare('SELECT DISTINCT category FROM books ORDER BY category');
        return stmt.all().map(row => row.category);
    }
}

module.exports = Book;

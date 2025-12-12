const { db } = require('../db');

class Book {
    static getAll(filters = {}) {
        let books = db.get('books').value();

        // Search filter (searches in both Hindi and English fields)
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            books = books.filter(book =>
                (book.title_hi && book.title_hi.toLowerCase().includes(searchLower)) ||
                (book.title_en && book.title_en.toLowerCase().includes(searchLower)) ||
                (book.description_hi && book.description_hi.toLowerCase().includes(searchLower)) ||
                (book.description_en && book.description_en.toLowerCase().includes(searchLower))
            );
        }

        // Category filter
        if (filters.category) {
            books = books.filter(book => book.category === filters.category);
        }

        // Language filter
        if (filters.language) {
            books = books.filter(book => book.language === filters.language || book.language === 'both');
        }

        // Price range filter
        if (filters.minPrice) {
            books = books.filter(book => book.price >= parseFloat(filters.minPrice));
        }
        if (filters.maxPrice) {
            books = books.filter(book => book.price <= parseFloat(filters.maxPrice));
        }

        // Sorting
        if (filters.sort === 'price_low') {
            books.sort((a, b) => a.price - b.price);
        } else if (filters.sort === 'price_high') {
            books.sort((a, b) => b.price - a.price);
        } else if (filters.sort === 'newest') {
            books.sort((a, b) => b.id - a.id);
        } else {
            books.sort((a, b) => b.id - a.id);
        }

        // Pagination
        const limit = filters.limit || 12;
        const offset = filters.offset || 0;
        return books.slice(offset, offset + limit);
    }

    static count(filters = {}) {
        let books = db.get('books').value();

        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            books = books.filter(book =>
                (book.title_hi && book.title_hi.toLowerCase().includes(searchLower)) ||
                (book.title_en && book.title_en.toLowerCase().includes(searchLower)) ||
                (book.description_hi && book.description_hi.toLowerCase().includes(searchLower)) ||
                (book.description_en && book.description_en.toLowerCase().includes(searchLower))
            );
        }

        if (filters.category) {
            books = books.filter(book => book.category === filters.category);
        }

        if (filters.language) {
            books = books.filter(book => book.language === filters.language || book.language === 'both');
        }

        if (filters.minPrice) {
            books = books.filter(book => book.price >= parseFloat(filters.minPrice));
        }
        if (filters.maxPrice) {
            books = books.filter(book => book.price <= parseFloat(filters.maxPrice));
        }

        return books.length;
    }

    static findById(id) {
        return db.get('books')
            .find({ id: parseInt(id) })
            .value();
    }

    static findBySlug(slug) {
        return db.get('books')
            .find({ slug })
            .value();
    }

    static create(bookData) {
        const books = db.get('books').value();
        const newId = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;

        const newBook = {
            id: newId,
            slug: bookData.slug,
            title_hi: bookData.title_hi,
            title_en: bookData.title_en,
            short_hi: bookData.short_hi || null,
            short_en: bookData.short_en || null,
            description_hi: bookData.description_hi || null,
            description_en: bookData.description_en || null,
            price: bookData.price,
            ex_tax: bookData.ex_tax || null,
            category: bookData.category,
            tags: bookData.tags || [],
            language: bookData.language,
            stock: bookData.stock || 0,
            cover_url: bookData.cover_url || null
        };

        db.get('books').push(newBook).write();
        return newId;
    }

    static update(id, bookData) {
        const bookIndex = db.get('books')
            .findIndex({ id: parseInt(id) })
            .value();

        if (bookIndex === -1) {
            return null;
        }

        const updatedBook = {
            id: parseInt(id),
            slug: bookData.slug,
            title_hi: bookData.title_hi,
            title_en: bookData.title_en,
            short_hi: bookData.short_hi || null,
            short_en: bookData.short_en || null,
            description_hi: bookData.description_hi || null,
            description_en: bookData.description_en || null,
            price: bookData.price,
            ex_tax: bookData.ex_tax || null,
            category: bookData.category,
            tags: bookData.tags || [],
            language: bookData.language,
            stock: bookData.stock || 0,
            cover_url: bookData.cover_url || null
        };

        db.get('books')
            .nth(bookIndex)
            .assign(updatedBook)
            .write();

        return updatedBook;
    }

    static delete(id) {
        db.get('books')
            .remove({ id: parseInt(id) })
            .write();
        return true;
    }

    static getCategories() {
        const books = db.get('books').value();
        const categories = [...new Set(books.map(book => book.category))];
        return categories.sort();
    }
}

module.exports = Book;

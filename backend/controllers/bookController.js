const Book = require('../models/Book');

// Get all books (public)
function getAllBooks(req, res) {
    try {
        const { search, category, language, minPrice, maxPrice, sort, page = 1, limit = 12 } = req.query;

        const offset = (page - 1) * limit;

        const filters = {
            search,
            category,
            language,
            minPrice: minPrice ? parseFloat(minPrice) : undefined,
            maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
            sort,
            limit: parseInt(limit),
            offset: parseInt(offset)
        };

        const books = Book.getAll(filters);
        const total = Book.count(filters);

        res.json({
            books,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get single book by ID
function getBookById(req, res) {
    try {
        const { id } = req.params;
        const book = Book.findById(id);

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.json({ book });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get all categories
function getCategories(req, res) {
    try {
        const categories = Book.getCategories();
        res.json({ categories });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllBooks,
    getBookById,
    getCategories
};

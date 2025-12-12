const Admin = require('../models/Admin');
const Book = require('../models/Book');
const { generateToken } = require('../middleware/auth');

// Admin login
async function login(req, res) {
    try {
        const { username, password } = req.body;

        const admin = Admin.findByUsername(username);
        if (!admin) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isValidPassword = await Admin.verifyPassword(password, admin.password_hash);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = generateToken({ id: admin.id, username: admin.username, role: 'admin' });

        res.json({
            message: 'Login successful',
            token,
            admin: {
                id: admin.id,
                username: admin.username
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get all books (admin view with filters)
function getAllBooks(req, res) {
    try {
        const { search, category, language, minPrice, maxPrice, sort, page = 1, limit = 50 } = req.query;

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

// Create new book
function createBook(req, res) {
    try {
        const bookId = Book.create(req.body);
        const book = Book.findById(bookId);

        res.status(201).json({
            message: 'Book created successfully',
            book
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update book
function updateBook(req, res) {
    try {
        const { id } = req.params;

        const existingBook = Book.findById(id);
        if (!existingBook) {
            return res.status(404).json({ error: 'Book not found' });
        }

        Book.update(id, req.body);
        const updatedBook = Book.findById(id);

        res.json({
            message: 'Book updated successfully',
            book: updatedBook
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete book
function deleteBook(req, res) {
    try {
        const { id } = req.params;

        const existingBook = Book.findById(id);
        if (!existingBook) {
            return res.status(404).json({ error: 'Book not found' });
        }

        Book.delete(id);

        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    login,
    getAllBooks,
    createBook,
    updateBook,
    deleteBook
};

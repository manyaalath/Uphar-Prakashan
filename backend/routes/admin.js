const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { requireAdmin } = require('../middleware/auth');
const { validateLogin, validateBookData } = require('../middleware/validation');

// Admin login (public)
router.post('/login', validateLogin, adminController.login);

// Protected admin routes
router.get('/books', requireAdmin, adminController.getAllBooks);
router.post('/books', requireAdmin, validateBookData, adminController.createBook);
router.put('/books/:id', requireAdmin, validateBookData, adminController.updateBook);
router.delete('/books/:id', requireAdmin, adminController.deleteBook);

module.exports = router;

const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Public book routes
router.get('/', bookController.getAllBooks);
router.get('/categories', bookController.getCategories);
router.get('/:id', bookController.getBookById);

module.exports = router;

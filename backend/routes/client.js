const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const { requireClient } = require('../middleware/auth');
const { validateClientSignup, validateLogin, validateOrder } = require('../middleware/validation');

// Public client routes
router.post('/signup', validateClientSignup, clientController.signup);
router.post('/login', validateLogin, clientController.login);

// Protected client routes
router.post('/order', requireClient, validateOrder, clientController.createOrder);
router.get('/orders', requireClient, clientController.getOrders);

module.exports = router;

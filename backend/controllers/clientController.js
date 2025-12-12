const Client = require('../models/Client');
const Order = require('../models/Order');
const Book = require('../models/Book');
const { generateToken } = require('../middleware/auth');

// Client signup
async function signup(req, res) {
    try {
        const { name, email, password } = req.body;

        const clientId = await Client.create(name, email, password);
        const client = Client.findById(clientId);

        const token = generateToken({ id: client.id, email: client.email, role: 'client' });

        res.status(201).json({
            message: 'Signup successful',
            token,
            client: {
                id: client.id,
                name: client.name,
                email: client.email
            }
        });
    } catch (error) {
        if (error.message === 'Email already exists') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
}

// Client login
async function login(req, res) {
    try {
        const { email, password } = req.body;

        const client = Client.findByEmail(email);
        if (!client) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isValidPassword = await Client.verifyPassword(password, client.password_hash);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = generateToken({ id: client.id, email: client.email, role: 'client' });

        res.json({
            message: 'Login successful',
            token,
            client: {
                id: client.id,
                name: client.name,
                email: client.email
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Create order
function createOrder(req, res) {
    try {
        const { items } = req.body;
        const clientId = req.client.id;

        // Calculate total amount
        let totalAmount = 0;
        const orderItems = [];

        for (const item of items) {
            const book = Book.findById(item.bookId);
            if (!book) {
                return res.status(404).json({ error: `Book with ID ${item.bookId} not found` });
            }

            if (book.stock < item.quantity) {
                return res.status(400).json({ error: `Insufficient stock for book: ${book.title_en}` });
            }

            const itemTotal = book.price * item.quantity;
            totalAmount += itemTotal;

            orderItems.push({
                bookId: book.id,
                title_hi: book.title_hi,
                title_en: book.title_en,
                price: book.price,
                quantity: item.quantity,
                total: itemTotal
            });

            // Update stock
            Book.update(book.id, { ...book, stock: book.stock - item.quantity });
        }

        const orderId = Order.create(clientId, orderItems, totalAmount);
        const order = Order.findById(orderId);

        res.status(201).json({
            message: 'Order created successfully',
            order: {
                id: order.id,
                items: JSON.parse(order.items),
                totalAmount: order.total_amount,
                createdAt: order.created_at
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get client orders
function getOrders(req, res) {
    try {
        const clientId = req.client.id;
        const orders = Order.findByClientId(clientId);

        const formattedOrders = orders.map(order => ({
            id: order.id,
            items: JSON.parse(order.items),
            totalAmount: order.total_amount,
            createdAt: order.created_at
        }));

        res.json({ orders: formattedOrders });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    signup,
    login,
    createOrder,
    getOrders
};

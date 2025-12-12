const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { initDB } = require('./db');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

// Import routes
const adminRoutes = require('./routes/admin');
const clientRoutes = require('./routes/client');
const bookRoutes = require('./routes/books');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors());

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize database
console.log('Initializing database...');
initDB();

// API routes
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/client', clientRoutes);
app.use('/api/v1/books', bookRoutes);

// Health check
app.get('/api/v1/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// 404 handler
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    console.log(`📚 API endpoints:`);
    console.log(`   - Admin: http://localhost:${PORT}/api/v1/admin`);
    console.log(`   - Client: http://localhost:${PORT}/api/v1/client`);
    console.log(`   - Books: http://localhost:${PORT}/api/v1/books`);
    console.log(`\n✅ Ready to accept requests!\n`);
});

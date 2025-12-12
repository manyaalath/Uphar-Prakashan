// Global error handler middleware
function errorHandler(err, req, res, next) {
    console.error('Error:', err);

    // Default error
    let status = err.status || 500;
    let message = err.message || 'Internal server error';

    // Handle specific error types
    if (err.name === 'ValidationError') {
        status = 400;
    } else if (err.name === 'UnauthorizedError') {
        status = 401;
        message = 'Unauthorized';
    }

    // Send error response
    res.status(status).json({
        error: message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
}

// 404 handler
function notFoundHandler(req, res) {
    res.status(404).json({ error: 'Route not found' });
}

module.exports = {
    errorHandler,
    notFoundHandler
};

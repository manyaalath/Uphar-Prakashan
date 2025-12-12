// Simple validation middleware
function validateBookData(req, res, next) {
    const { title_hi, title_en, price, category, language } = req.body;

    const errors = [];

    if (!title_hi || title_hi.trim() === '') {
        errors.push('Hindi title is required');
    }

    if (!title_en || title_en.trim() === '') {
        errors.push('English title is required');
    }

    if (!price || isNaN(price) || price <= 0) {
        errors.push('Valid price is required');
    }

    if (!category || category.trim() === '') {
        errors.push('Category is required');
    }

    if (!language || !['hindi', 'english', 'both'].includes(language)) {
        errors.push('Language must be hindi, english, or both');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
}

function validateClientSignup(req, res, next) {
    const { name, email, password } = req.body;

    const errors = [];

    if (!name || name.trim() === '') {
        errors.push('Name is required');
    }

    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errors.push('Valid email is required');
    }

    if (!password || password.length < 6) {
        errors.push('Password must be at least 6 characters');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
}

function validateLogin(req, res, next) {
    const { email, password, username } = req.body;

    const errors = [];

    // For admin login (uses username)
    if (username !== undefined) {
        if (!username || username.trim() === '') {
            errors.push('Username is required');
        }
    }
    // For client login (uses email)
    else if (email !== undefined) {
        if (!email || email.trim() === '') {
            errors.push('Email is required');
        }
    }

    if (!password || password.trim() === '') {
        errors.push('Password is required');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
}

function validateOrder(req, res, next) {
    const { items } = req.body;

    const errors = [];

    if (!items || !Array.isArray(items) || items.length === 0) {
        errors.push('Order must contain at least one item');
    }

    if (items && Array.isArray(items)) {
        items.forEach((item, index) => {
            if (!item.bookId || !item.quantity || item.quantity <= 0) {
                errors.push(`Invalid item at index ${index}`);
            }
        });
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
}

module.exports = {
    validateBookData,
    validateClientSignup,
    validateLogin,
    validateOrder
};

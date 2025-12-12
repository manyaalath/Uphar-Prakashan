const { db } = require('../db');

class Order {
    static create(clientId, items, totalAmount) {
        const stmt = db.prepare(`
            INSERT INTO orders (client_id, items, total_amount)
            VALUES (?, ?, ?)
        `);

        const result = stmt.run(clientId, JSON.stringify(items), totalAmount);
        return result.lastInsertRowid;
    }

    static findByClientId(clientId) {
        const stmt = db.prepare('SELECT * FROM orders WHERE client_id = ? ORDER BY created_at DESC');
        return stmt.all(clientId);
    }

    static findById(id) {
        const stmt = db.prepare('SELECT * FROM orders WHERE id = ?');
        return stmt.get(id);
    }
}

module.exports = Order;

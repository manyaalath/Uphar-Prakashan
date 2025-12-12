const { db } = require('../db');

class Order {
    static create(clientId, items, totalAmount) {
        const orders = db.get('orders').value();
        const newId = orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1;

        const newOrder = {
            id: newId,
            client_id: clientId,
            items: items,
            total_amount: totalAmount,
            created_at: new Date().toISOString()
        };

        db.get('orders').push(newOrder).write();
        return newId;
    }

    static findByClientId(clientId) {
        return db.get('orders')
            .filter({ client_id: parseInt(clientId) })
            .sortBy('created_at')
            .reverse()
            .value();
    }

    static findById(id) {
        return db.get('orders')
            .find({ id: parseInt(id) })
            .value();
    }
}

module.exports = Order;

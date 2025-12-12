const { db } = require('../db');
const bcrypt = require('bcryptjs');

class Client {
    static findByEmail(email) {
        return db.get('clients')
            .find({ email })
            .value();
    }

    static findById(id) {
        return db.get('clients')
            .find({ id })
            .value();
    }

    static async create(name, email, password) {
        const existingClient = this.findByEmail(email);
        if (existingClient) {
            throw new Error('Email already exists');
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const clients = db.get('clients').value();
        const newId = clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1;

        const newClient = {
            id: newId,
            name,
            email,
            password_hash: passwordHash
        };

        db.get('clients').push(newClient).write();
        return newId;
    }

    static async verifyPassword(password, hash) {
        return await bcrypt.compare(password, hash);
    }
}

module.exports = Client;

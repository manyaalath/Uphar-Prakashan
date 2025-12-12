const { db } = require('../db');
const bcrypt = require('bcryptjs');

class Client {
    static findByEmail(email) {
        const stmt = db.prepare('SELECT * FROM clients WHERE email = ?');
        return stmt.get(email);
    }

    static findById(id) {
        const stmt = db.prepare('SELECT * FROM clients WHERE id = ?');
        return stmt.get(id);
    }

    static async create(name, email, password) {
        const existingClient = this.findByEmail(email);
        if (existingClient) {
            throw new Error('Email already exists');
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const stmt = db.prepare('INSERT INTO clients (name, email, password_hash) VALUES (?, ?, ?)');
        const result = stmt.run(name, email, passwordHash);
        return result.lastInsertRowid;
    }

    static async verifyPassword(password, hash) {
        return await bcrypt.compare(password, hash);
    }
}

module.exports = Client;

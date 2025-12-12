const { db } = require('../db');
const bcrypt = require('bcrypt');

class Admin {
    static findByUsername(username) {
        const stmt = db.prepare('SELECT * FROM admins WHERE username = ?');
        return stmt.get(username);
    }

    static async verifyPassword(password, hash) {
        return await bcrypt.compare(password, hash);
    }

    static create(username, passwordHash) {
        const stmt = db.prepare('INSERT INTO admins (username, password_hash) VALUES (?, ?)');
        return stmt.run(username, passwordHash);
    }
}

module.exports = Admin;

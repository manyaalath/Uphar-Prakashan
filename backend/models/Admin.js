const { db } = require('../db');
const bcrypt = require('bcryptjs');

class Admin {
    static findByUsername(username) {
        return db.get('admins')
            .find({ username })
            .value();
    }

    static async verifyPassword(password, hash) {
        return await bcrypt.compare(password, hash);
    }

    static create(username, passwordHash) {
        const admins = db.get('admins').value();
        const newId = admins.length > 0 ? Math.max(...admins.map(a => a.id)) + 1 : 1;

        const newAdmin = {
            id: newId,
            username,
            password_hash: passwordHash
        };

        db.get('admins').push(newAdmin).write();
        return newAdmin;
    }
}

module.exports = Admin;

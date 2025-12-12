const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'database.json');
const adapter = new FileSync(dbPath);
const db = low(adapter);

// Initialize database with default structure
function initDB() {
    try {
        // Set default structure if database is empty
        db.defaults({
            admins: [],
            clients: [],
            books: [],
            orders: []
        }).write();

        console.log('✓ Database initialized');
        return true;
    } catch (error) {
        console.error('Database initialization failed:', error);
        return false;
    }
}

module.exports = { db, initDB };

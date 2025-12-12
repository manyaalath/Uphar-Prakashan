const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'database.db');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Run migrations
function runMigrations() {
    const migrationFile = path.join(__dirname, 'migrations', 'init.sql');
    const migration = fs.readFileSync(migrationFile, 'utf-8');
    
    // Split by semicolon and execute each statement
    const statements = migration.split(';').filter(stmt => stmt.trim());
    
    for (const statement of statements) {
        if (statement.trim()) {
            db.exec(statement);
        }
    }
    
    console.log('✓ Database migrations completed');
}

// Initialize database
function initDB() {
    try {
        runMigrations();
        return true;
    } catch (error) {
        console.error('Database initialization failed:', error);
        return false;
    }
}

module.exports = { db, initDB };

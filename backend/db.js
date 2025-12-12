const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'database.db');
let db = null;
let SQL = null;

// Initialize sql.js database
async function initializeDatabase() {
    if (db) return db;
    
    SQL = await initSqlJs();
    
    // Load existing database file or create new one
    if (fs.existsSync(dbPath)) {
        const buffer = fs.readFileSync(dbPath);
        db = new SQL.Database(buffer);
    } else {
        db = new SQL.Database();
    }
    
    // Enable foreign keys
    db.run('PRAGMA foreign_keys = ON');
    
    return db;
}

// Save database to file
function saveDatabase() {
    if (db) {
        const data = db.export();
        const buffer = Buffer.from(data);
        fs.writeFileSync(dbPath, buffer);
    }
}

// Run migrations
async function runMigrations() {
    await initializeDatabase();
    
    const migrationFile = path.join(__dirname, 'migrations', 'init.sql');
    const migration = fs.readFileSync(migrationFile, 'utf-8');
    
    // Split by semicolon and execute each statement
    const statements = migration.split(';').filter(stmt => stmt.trim());
    
    for (const statement of statements) {
        if (statement.trim()) {
            db.run(statement);
        }
    }
    
    saveDatabase();
    console.log('✓ Database migrations completed');
}

// Initialize database
async function initDB() {
    try {
        await runMigrations();
        return true;
    } catch (error) {
        console.error('Database initialization failed:', error);
        return false;
    }
}

// Wrapper class to make sql.js API compatible with better-sqlite3 style
class DBWrapper {
    constructor() {
        this.initialized = false;
    }
    
    async init() {
        if (!this.initialized) {
            await initializeDatabase();
            this.initialized = true;
        }
    }
    
    prepare(sql) {
        return {
            run: (...params) => {
                const stmt = db.prepare(sql);
                stmt.bind(params);
                stmt.step();
                const changes = db.getRowsModified();
                const lastID = db.exec('SELECT last_insert_rowid()')[0]?.values[0]?.[0] || 0;
                stmt.free();
                saveDatabase();
                return { changes, lastInsertRowid: lastID };
            },
            get: (...params) => {
                const stmt = db.prepare(sql);
                stmt.bind(params);
                const result = stmt.step() ? stmt.getAsObject() : undefined;
                stmt.free();
                return result;
            },
            all: (...params) => {
                const stmt = db.prepare(sql);
                stmt.bind(params);
                const results = [];
                while (stmt.step()) {
                    results.push(stmt.getAsObject());
                }
                stmt.free();
                return results;
            }
        };
    }
    
    exec(sql) {
        db.run(sql);
        saveDatabase();
    }
}

const dbWrapper = new DBWrapper();

module.exports = { db: dbWrapper, initDB, saveDatabase };

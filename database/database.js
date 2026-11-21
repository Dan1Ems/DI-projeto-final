const Database = require("better-sqlite3");
const db = new Database("database.db");
db.pragma("foreign_keys = ON");

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        hash TEXT NOT NULL
    )
`);

db.exec(`
    CREATE UNIQUE INDEX IF NOT EXISTS idx_users_username ON users(username)
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        text TEXT NOT NULL,

        FOREIGN KEY (user_id) REFERENCES users(id)
    )
`);

db.exec(`
    CREATE UNIQUE INDEX IF NOT EXISTS idx_notes_id ON notes(id)    
`);

module.exports = db;
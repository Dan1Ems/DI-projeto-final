const Database = require("better-sqlite3");
const db = new Database("database.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        hash TEXT NOT NULL
    )
`);

db.exec(`
    CREATE UNIQUE INDEX IF NOT EXISTS username ON users(username)
`)

module.exports = db;
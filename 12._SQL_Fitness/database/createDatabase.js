import db from './connection.js'

// db.all   for SELECT
// db.run   for INSERT, UPDATE, DELETE
// db.exec  run DDL and DCL against database.

// const deleteMode = process.argv.find((argument) => argument.includes('delete'))
const deleteMode = process.argv.includes('delete')

console.log(deleteMode)

if (deleteMode) {
    db.exec(`DROP TABLE IF EXISTS exercises;`)
    db.exec(`DROP TABLE IF EXISTS users;`)  
}

/*
Conventions for SQL
use lowercase
use snake case
use plural for tables
*/



db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_name VARCHAR(255) UNIQUE,
        user_role TEXT CHECK (user_role IN ('ADMIN', 'STAFF', 'USER'))
    );

    CREATE TABLE IF NOT EXISTS exercises (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT current_timestamp,
        difficulty INTEGER,
        user_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users (user_id)
    );
`);

//seeding
// DML

if (deleteMode) {
    db.run(`INSERT INTO users (user_name, user_role) VALUES ('anders1', 'STAFF')`)
    db.run(`INSERT INTO exercises (name, difficulty, user_id) VALUES ('squats', 7, 1)`)
    db.run(`INSERT INTO exercises (name, difficulty, user_id) VALUES ('burpees', 5, 1)`)
}

    
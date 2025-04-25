// importiamo il modulo sqlite
const sqlite3 = require('sqlite3').verbose();

//creiamo un database chiamato utenti nella directory corrente
const db = new sqlite3.Database('./utenti.db');

db.serialize(() => {

    // Creiamo la tabella users qualora non esistesse
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL
        )
    `);
    

    // Inseriamo alcuni dati di esempio

    db.run(`INSERT OR IGNORE INTO users (id, name, email) VALUES (1, 'Diego Corona', 'diego.corona@gmail.com')`);
    db.run(`INSERT OR IGNORE INTO users (id, name, email) VALUES (2, 'Leonardo Caiezza', 'leonardo.caiezza@gmail.com')`);
    db.run(`INSERT OR IGNORE INTO users (id, name, email) VALUES (3, 'Luca Gaetani', 'luca.gaetani@gmail.com')`);
    db.run(`INSERT OR IGNORE INTO users (id, name, email) VALUES (4, 'Daniele Susino', 'daniele.susino@gmail.com')`);

});

// Lo rendiamo visibile ad altri file, siccome lo dobiamo importare nel server.js
module.exports = db;
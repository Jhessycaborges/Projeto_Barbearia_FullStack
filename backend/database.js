const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Importante: salva o banco de dados na pasta /tmp
const dbPath = path.resolve('/tmp', 'barbearia.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Erro ao abrir o banco de dados", err.message);
    } else {
        console.log("Conectado ao banco de dados SQLite na Vercel.");
        createTables();
    }
});

function createTables() {
    const createClientesTable = `
    CREATE TABLE IF NOT EXISTS clientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        telefone TEXT
    );`;

    const createAgendamentosTable = `
    CREATE TABLE IF NOT EXISTS agendamentos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cliente_id INTEGER,
        data TEXT NOT NULL,
        servico TEXT NOT NULL,
        FOREIGN KEY (cliente_id) REFERENCES clientes (id)
    );`;

    const createServicosTable = `
    CREATE TABLE IF NOT EXISTS servicos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        preco REAL NOT NULL
    );`;

    db.serialize(() => {
        db.run(createClientesTable);
        db.run(createAgendamentosTable);
        db.run(createServicosTable);
    });
}

module.exports = db;

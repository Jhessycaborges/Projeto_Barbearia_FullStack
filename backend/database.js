const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./barbearia.db', (err) => {
    if (err) {
        console.error("Erro ao abrir o banco de dados", err.message);
    } else {
        console.log("Conectado ao banco de dados SQLite.");
        createTables();
    }
});

function createTables() {
    // SQL para criar a tabela de clientes
    const createClientesTable = `
    CREATE TABLE IF NOT EXISTS clientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        telefone TEXT
    );`;

    // SQL para criar a tabela de agendamentos
    const createAgendamentosTable = `
    CREATE TABLE IF NOT EXISTS agendamentos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cliente_id INTEGER,
        data TEXT NOT NULL,
        servico TEXT NOT NULL,
        FOREIGN KEY (cliente_id) REFERENCES clientes (id)
    );`;

    // SQL para criar a tabela de serviços
    const createServicosTable = `
    CREATE TABLE IF NOT EXISTS servicos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        preco REAL NOT NULL 
    );`; // Usamos REAL para preços com centavos

    db.serialize(() => {
        db.run(createClientesTable, (err) => {
            if (err) console.error("Erro ao criar tabela de clientes", err);
        });
        db.run(createAgendamentosTable, (err) => {
            if (err) console.error("Erro ao criar tabela de agendamentos", err);
        });
        // Executa a criação da nova tabela
        db.run(createServicosTable, (err) => {
            if (err) console.error("Erro ao criar tabela de serviços", err);
        });
    });
}

module.exports = db;
const db = require('../database');

// Listar todos os clientes
exports.listar = (req, res) => {
    const sql = "SELECT * FROM clientes";
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).send("Erro ao buscar clientes");
            throw err;
        }
        res.json(rows);
    });
};

// Criar um novo cliente
exports.criar = (req, res) => {
    const { nome, telefone } = req.body;
    const sql = "INSERT INTO clientes (nome, telefone) VALUES (?, ?)";
    db.run(sql, [nome, telefone], function(err) {
        if (err) {
            res.status(500).send("Erro ao criar cliente");
            return console.error(err.message);
        }
        res.status(201).json({ id: this.lastID, nome, telefone });
    });
};

// Atualizar um cliente existente
exports.atualizar = (req, res) => {
    const { id } = req.params;
    const { nome, telefone } = req.body;
    const sql = "UPDATE clientes SET nome = ?, telefone = ? WHERE id = ?";
    db.run(sql, [nome, telefone, id], function(err) {
        if (err) {
            res.status(500).send("Erro ao atualizar cliente");
            return console.error(err.message);
        }
        res.status(200).json({ id: id, nome, telefone });
    });
};

// Deletar um cliente
exports.deletar = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM clientes WHERE id = ?";
    db.run(sql, id, function(err) {
        if (err) {
            res.status(500).send("Erro ao deletar cliente");
            return console.error(err.message);
        }
        res.status(200).send(`Cliente com ID ${id} deletado com sucesso.`);
    });
};
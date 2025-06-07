const db = require('../database');

// Listar todos os serviços
exports.listar = (req, res) => {
    const sql = "SELECT * FROM servicos";
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).send("Erro ao buscar serviços");
        res.json(rows);
    });
};

// Criar um novo serviço
exports.criar = (req, res) => {
    const { nome, preco } = req.body;
    const sql = "INSERT INTO servicos (nome, preco) VALUES (?, ?)";
    db.run(sql, [nome, preco], function(err) {
        if (err) return res.status(500).send("Erro ao criar serviço");
        res.status(201).json({ id: this.lastID, nome, preco });
    });
};

// Atualizar um serviço
exports.atualizar = (req, res) => {
    const { id } = req.params;
    const { nome, preco } = req.body;
    const sql = "UPDATE servicos SET nome = ?, preco = ? WHERE id = ?";
    db.run(sql, [nome, preco, id], function(err) {
        if (err) return res.status(500).send("Erro ao atualizar serviço");
        res.status(200).json({ id, nome, preco });
    });
};

// Deletar um serviço
exports.deletar = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM servicos WHERE id = ?";
    db.run(sql, id, function(err) {
        if (err) return res.status(500).send("Erro ao deletar serviço");
        res.status(200).send(`Serviço com ID ${id} deletado.`);
    });
};

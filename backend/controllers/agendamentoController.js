const db = require('../database');

// Listar todos os agendamentos
exports.listar = (req, res) => {
    const sql = "SELECT * FROM agendamentos";
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).send("Erro ao buscar agendamentos");
            throw err;
        }
        res.json(rows);
    });
};

// Criar um novo agendamento
exports.criar = (req, res) => {
    const { clienteId, data, servico } = req.body; 
    const sql = "INSERT INTO agendamentos (cliente_id, data, servico) VALUES (?, ?, ?)";
    db.run(sql, [clienteId, data, servico], function(err) {
        if (err) {
            res.status(500).send("Erro ao criar agendamento");
            return console.error(err.message);
        }
        res.status(201).json({ id: this.lastID, clienteId, data, servico });
    });
};

// Atualizar um agendamento existente
exports.atualizar = (req, res) => {
    const { id } = req.params;
    const { clienteId, data, servico } = req.body;
    const sql = "UPDATE agendamentos SET cliente_id = ?, data = ?, servico = ? WHERE id = ?";
    db.run(sql, [clienteId, data, servico, id], function(err) {
        if (err) {
            res.status(500).send("Erro ao atualizar agendamento");
            return console.error(err.message);
        }
        res.status(200).json({ id: id, clienteId, data, servico });
    });
};

// Deletar um agendamento
exports.deletar = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM agendamentos WHERE id = ?";
    db.run(sql, id, function(err) {
        if (err) {
            res.status(500).send("Erro ao deletar agendamento");
            return console.error(err.message);
        }
        res.status(200).send(`Agendamento com ID ${id} deletado com sucesso.`);
    });
};
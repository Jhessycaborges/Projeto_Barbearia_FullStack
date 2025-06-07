const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamentoController');

router.get('/', agendamentoController.listar);
router.post('/', agendamentoController.criar);
router.put('/:id', agendamentoController.atualizar); // Adicione esta linha
router.delete('/:id', agendamentoController.deletar);

module.exports = router;
const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Importa rotas
const clienteRoutes = require('./routes/clienteRoutes');
const agendamentoRoutes = require('./routes/agendamentoRoutes');
const servicoRoutes = require('./routes/servicoRoutes');

// Usa rotas
app.use('/clientes', clienteRoutes);
app.use('/agendamentos', agendamentoRoutes);
app.use('/servicos', servicoRoutes);

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor backend rodando em http://localhost:${PORT}`);
});
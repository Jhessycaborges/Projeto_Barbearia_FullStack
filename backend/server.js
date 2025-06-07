const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Importar rotas
const clienteRoutes = require('./routes/clienteRoutes');
const agendamentoRoutes = require('./routes/agendamentoRoutes');
const servicoRoutes = require('./routes/servicoRoutes'); // Importe as novas rotas

// Usar rotas
app.use('/clientes', clienteRoutes);
app.use('/agendamentos', agendamentoRoutes);
app.use('/servicos', servicoRoutes); // Use as novas rotas

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor backend rodando em http://localhost:${PORT}`);
});
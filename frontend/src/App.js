import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Clientes from './pages/Clientes';
import Agendamentos from './pages/Agendamentos';
import Servicos from './pages/Servicos'; // Importe a nova página
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <header>
                    <h1>Barbearia Full Stack</h1>
                    <nav>
                        <Link to="/clientes">Clientes</Link>
                        <Link to="/agendamentos">Agendamentos</Link>
                        <Link to="/servicos">Serviços</Link> {/* Adicione o novo link */}
                    </nav>
                </header>
                <main>
                    <Routes>
                        <Route path="/clientes" element={<Clientes />} />
                        <Route path="/agendamentos" element={<Agendamentos />} />
                        <Route path="/servicos" element={<Servicos />} /> {/* Adicione a nova rota */}
                        <Route path="/" element={<Clientes />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
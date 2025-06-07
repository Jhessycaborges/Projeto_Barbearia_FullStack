import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');

    // Novos estados para o modal de edição
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCliente, setEditingCliente] = useState(null);

    const fetchClientes = async () => {
        const response = await axios.get('http://localhost:3001/clientes');
        setClientes(response.data);
    };

    useEffect(() => {
        fetchClientes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:3001/clientes', { nome, telefone });
        setNome('');
        setTelefone('');
        fetchClientes();
    };

    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
            await axios.delete(`http://localhost:3001/clientes/${id}`);
            fetchClientes();
        }
    };
    
    // Funções para o modal de edição
    const handleEditClick = (cliente) => {
        setEditingCliente(cliente);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingCliente(null);
    };

    const handleUpdateCliente = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:3001/clientes/${editingCliente.id}`, {
            nome: editingCliente.nome,
            telefone: editingCliente.telefone
        });
        handleCloseModal();
        fetchClientes();
    };

    return (
        <div className="container">
            <h2>Gestão de Clientes</h2>
            {/* Formulário de Cadastro */}
            <form onSubmit={handleSubmit} className="form-card">
                <h3>Cadastrar Novo Cliente</h3>
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome do cliente" required />
                <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="Telefone" required />
                <button type="submit">Cadastrar</button>
            </form>

            {/* Lista de Clientes */}
            <div className="list-card">
                <h3>Clientes Cadastrados</h3>
                <ul>
                    {clientes.map(cliente => (
                        <li key={cliente.id}>
                            <span>{cliente.nome} - {cliente.telefone}</span>
                            <div className="btn-group">
                                <button onClick={() => handleEditClick(cliente)} className="edit-btn">Editar</button>
                                <button onClick={() => handleDelete(cliente.id)} className="delete-btn">Excluir</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Modal de Edição */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Editar Cliente</h2>
                        <form onSubmit={handleUpdateCliente}>
                            <label>Nome:</label>
                            <input
                                type="text"
                                value={editingCliente.nome}
                                onChange={(e) => setEditingCliente({ ...editingCliente, nome: e.target.value })}
                            />
                            <label>Telefone:</label>
                            <input
                                type="text"
                                value={editingCliente.telefone}
                                onChange={(e) => setEditingCliente({ ...editingCliente, telefone: e.target.value })}
                            />
                            <div className="modal-actions">
                                <button type="submit" className="save-btn">Salvar</button>
                                <button type="button" onClick={handleCloseModal}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Clientes;
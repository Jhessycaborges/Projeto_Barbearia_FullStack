import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Servicos() {
    const [servicos, setServicos] = useState([]);
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingServico, setEditingServico] = useState(null);

    const fetchServicos = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/servicos`);
        setServicos(response.data);
    };

    useEffect(() => {
        fetchServicos();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`${process.env.REACT_APP_API_URL}/servicos`, { nome, preco: parseFloat(preco) });
        setNome('');
        setPreco('');
        fetchServicos();
    };

    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir este serviço?")) {
            await axios.delete(`${process.env.REACT_APP_API_URL}/servicos/${id}`);
            fetchServicos();
        }
    };
    
    const handleEditClick = (servico) => {
        setEditingServico(servico);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingServico(null);
    };

    const handleUpdateServico = async (e) => {
        e.preventDefault();
        await axios.put(`${process.env.REACT_APP_API_URL}/servicos/${editingServico.id}`, {
            nome: editingServico.nome,
            preco: parseFloat(editingServico.preco)
        });
        handleCloseModal();
        fetchServicos();
    };

    return (
        <div className="container">
            <h2>Gestão de Serviços</h2>
            <form onSubmit={handleSubmit} className="form-card">
                <h3>Cadastrar Novo Serviço</h3>
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome do serviço" required />
                <input type="number" step="0.01" value={preco} onChange={(e) => setPreco(e.target.value)} placeholder="Preço (ex: 35.00)" required />
                <button type="submit">Cadastrar</button>
            </form>

            <div className="list-card">
                <h3>Serviços Cadastrados</h3>
                <ul>
                    {servicos.map(servico => (
                        <li key={servico.id}>
                            <span>{servico.nome} - R$ {servico.preco.toFixed(2)}</span>
                            <div className="btn-group">
                                <button onClick={() => handleEditClick(servico)} className="edit-btn">Editar</button>
                                <button onClick={() => handleDelete(servico.id)} className="delete-btn">Excluir</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Editar Serviço</h2>
                        <form onSubmit={handleUpdateServico}>
                            <label>Nome:</label>
                            <input
                                type="text"
                                value={editingServico.nome}
                                onChange={(e) => setEditingServico({ ...editingServico, nome: e.target.value })}
                            />
                            <label>Preço:</label>
                            <input
                                type="number"
                                step="0.01"
                                value={editingServico.preco}
                                onChange={(e) => setEditingServico({ ...editingServico, preco: e.target.value })}
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

export default Servicos;
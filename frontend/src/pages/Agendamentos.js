import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Agendamentos() {
    const [agendamentos, setAgendamentos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [servicos, setServicos] = useState([]); // Novo estado para guardar os serviços
    
    // Estado do formulário de criação
    const [clienteId, setClienteId] = useState('');
    const [data, setData] = useState('');
    const [servico, setServico] = useState(''); // Agora vai guardar o nome do serviço selecionado

    // Estados para o modal de edição
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAgendamento, setEditingAgendamento] = useState(null);

    // Função que busca TODOS os dados necessários para a página
    const fetchData = async () => {
        const [agendamentosRes, clientesRes, servicosRes] = await Promise.all([
            axios.get('http://localhost:3001/agendamentos'),
            axios.get('http://localhost:3001/clientes'),
            axios.get('http://localhost:3001/servicos') // Busca os serviços
        ]);
        setAgendamentos(agendamentosRes.data);
        setClientes(clientesRes.data);
        setServicos(servicosRes.data); // Guarda os serviços no estado
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!clienteId || !servico) return alert('Por favor, selecione um cliente e um serviço.');
        
        await axios.post('http://localhost:3001/agendamentos', { clienteId, data, servico });
        setClienteId('');
        setData('');
        setServico('');
        fetchData();
    };
    
    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir este agendamento?")) {
            await axios.delete(`http://localhost:3001/agendamentos/${id}`);
            fetchData();
        }
    };
    
    const handleEditClick = (agendamento) => {
        const dataFormatada = new Date(agendamento.data).toISOString().slice(0, 16);
        setEditingAgendamento({
            ...agendamento,
            data: dataFormatada,
            clienteId: agendamento.cliente_id
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingAgendamento(null);
    };

    const handleUpdateAgendamento = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:3001/agendamentos/${editingAgendamento.id}`, {
            clienteId: editingAgendamento.clienteId,
            data: editingAgendamento.data,
            servico: editingAgendamento.servico
        });
        handleCloseModal();
        fetchData();
    };

    return (
        <div className="container">
            <h2>Gestão de Agendamentos</h2>
            <form onSubmit={handleSubmit} className="form-card">
                <h3>Marcar Novo Horário</h3>
                <select value={clienteId} onChange={(e) => setClienteId(e.target.value)} required>
                    <option value="">Selecione um Cliente</option>
                    {clientes.map(cliente => <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>)}
                </select>

                {/* CAMPO DE SERVIÇO MODIFICADO */}
                <select value={servico} onChange={(e) => setServico(e.target.value)} required>
                    <option value="">Selecione um Serviço</option>
                    {servicos.map(s => <option key={s.id} value={s.nome}>{s.nome} - R$ {s.preco.toFixed(2)}</option>)}
                </select>
                
                <input type="datetime-local" value={data} onChange={(e) => setData(e.target.value)} required />
                <button type="submit">Agendar</button>
            </form>

            <div className="list-card">
                <h3>Próximos Agendamentos</h3>
                <ul>
                    {agendamentos.map(ag => {
                        const cliente = clientes.find(c => c.id === ag.cliente_id);
                        const dataFormatada = new Date(ag.data).toLocaleString('pt-BR');
                        return (
                            <li key={ag.id}>
                                <div>
                                    <strong>{cliente ? cliente.nome : 'Cliente não encontrado'}</strong> - {ag.servico}
                                    <br />
                                    <small>{dataFormatada}</small>
                                </div>
                                <div className="btn-group">
                                    <button onClick={() => handleEditClick(ag)} className="edit-btn">Editar</button>
                                    <button onClick={() => handleDelete(ag.id)} className="delete-btn">Excluir</button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
            
            {/* MODAL DE EDIÇÃO MODIFICADO */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Editar Agendamento</h2>
                        <form onSubmit={handleUpdateAgendamento}>
                            <label>Cliente:</label>
                            <select 
                                value={editingAgendamento.clienteId} 
                                onChange={(e) => setEditingAgendamento({...editingAgendamento, clienteId: e.target.value})}
                            >
                                {clientes.map(cliente => <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>)}
                            </select>
                            
                            <label>Serviço:</label>
                            <select 
                                value={editingAgendamento.servico}
                                onChange={(e) => setEditingAgendamento({...editingAgendamento, servico: e.target.value})}
                            >
                                <option value="">Selecione um Serviço</option>
                                {servicos.map(s => <option key={s.id} value={s.nome}>{s.nome} - R$ {s.preco.toFixed(2)}</option>)}
                            </select>

                            <label>Data e Hora:</label>
                            <input 
                                type="datetime-local" 
                                value={editingAgendamento.data}
                                onChange={(e) => setEditingAgendamento({...editingAgendamento, data: e.target.value})}
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

export default Agendamentos;
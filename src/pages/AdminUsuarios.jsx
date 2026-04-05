import { useState, useEffect } from 'react';
import MensagemErro from '../componentes/MensagemErro';

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

  function getHeaders() {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
  }

  useEffect(() => {
    buscar();
  }, []);

  async function buscar() {
    setCarregando(true);
    setErro('');
    try {
      const res = await fetch(`${BASE_URL}/usuarios`, { headers: getHeaders() });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setUsuarios(Array.isArray(data) ? data : data.dados ?? []);
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Erro ao carregar usuários');
    } finally {
      setCarregando(false);
    }
  }

  async function handleDeletar(id) {
    if (!window.confirm('Deseja excluir este usuário?')) return;
    try {
      const res = await fetch(`${BASE_URL}/usuarios/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message);
      }
      await buscar();
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Erro ao excluir usuário');
    }
  }

  return (
    <div className="pagina-crud">
      <div className="pagina-crud__topo">
        <h2>👥 Usuários</h2>
      </div>

      <MensagemErro mensagem={erro} />

      {carregando ? (
        <p>Carregando...</p>
      ) : (
        <div className="tabela-wrapper">
          <table className="tabela">
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>CPF</th>
                <th>Perfil</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: 24, color: '#999' }}>
                    Nenhum usuário encontrado
                  </td>
                </tr>
              ) : (
                usuarios.map((u) => (
                  <tr key={u.id}>
                    <td>{u.nome}</td>
                    <td>{u.email}</td>
                    <td>{u.cpf}</td>
                    <td>
                      <span style={{
                        background: u.role === 'admin' ? '#4b2c20' : '#d2b48c',
                        color: u.role === 'admin' ? '#F3E9DC' : '#4b2c20',
                        padding: '3px 10px',
                        borderRadius: 20,
                        fontSize: '0.78rem',
                        fontWeight: 600,
                      }}>
                        {u.role === 'admin' ? 'Admin' : 'Usuário'}
                      </span>
                    </td>
                    <td>
                      {u.role !== 'admin' && (
                        <button
                          className="btn-sm btn-sm--deletar"
                          onClick={() => handleDeletar(u.id)}
                        >
                          Excluir
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
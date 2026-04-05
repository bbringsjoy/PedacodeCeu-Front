import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { listarCategorias } from '../services/api';
import './Sidebar.css';

function Sidebar() {
  const { usuario } = useAuth();
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    async function buscar() {
      try {
        const res = await listarCategorias();
        setCategorias(res.dados);
      } catch {}
    }
    buscar();
  }, []);

  return (
    <aside className="sidebar">
      <h2 className="sidebar-titulo">Categorias</h2>
      <ul className="sidebar-lista">
        <li className="sidebar-item">
          <NavLink to="/" end>🏠 Início</NavLink>
        </li>

        {categorias.map((cat) => (
          <li key={cat.id} className="sidebar-item">
            <NavLink to={`/?categoria=${cat.id}`}>🍰 {cat.nome}</NavLink>
          </li>
        ))}

        {usuario && (
          <>
            <li className="sidebar-separador" />
            <li className="sidebar-item">
              <NavLink to="/produtos">📋 Gerenciar Produtos</NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/categorias">📂 Gerenciar Categorias</NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/pedidos">📦 Pedidos</NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/perfil">👤 Meu Perfil</NavLink>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
}

export default Sidebar;
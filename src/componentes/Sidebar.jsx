import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

function Sidebar() {
  const { usuario } = useAuth();

  return (
    <aside className="sidebar">
      <h2 className="sidebar-titulo">Menu</h2>
      <ul className="sidebar-lista">
        <li className="sidebar-item">
          <NavLink to="/" end>🏠 Início</NavLink>
        </li>

        {usuario ? (
          <>
            <li className="sidebar-item">
              <NavLink to="/produtos">🍰 Produtos</NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/categorias">📂 Categorias</NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/pedidos">📦 Pedidos</NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/perfil">👤 Meu Perfil</NavLink>
            </li>
          </>
        ) : (
          <>
            <li className="sidebar-item">
              <NavLink to="/login">🔑 Login</NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/cadastro">📝 Cadastrar</NavLink>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
}

export default Sidebar;

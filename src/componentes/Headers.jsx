import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../ativos/logotransparente.png';
import { useAuth } from '../context/AuthContext';
import { useCarrinho } from '../context/CarrinhoContext';
import './Headers.css';

function Header() {
  const { usuario, logout } = useAuth();
  const { totalItens } = useCarrinho();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <header className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logoImg} alt="Pedaço do Céu Logo" />
          <span>Pedaço do Céu</span>
        </Link>
      </div>

      <nav className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/sobre">Sobre</Link>

        {usuario ? (
          <>
            <Link to="/produtos">Produtos</Link>
            <Link to="/categorias">Categorias</Link>
            <Link to="/pedidos">Pedidos</Link>
            <Link to="/perfil">Olá, {usuario.nome.split(' ')[0]}</Link>
            <button className="btn-logout" onClick={handleLogout}>Sair</button>
          </>
        ) : (
          <>
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/cadastro">Cadastrar</Link>
          </>
        )}

        <Link to="/carrinho" className="carrinho-btn">
          🛒
          {totalItens > 0 && (
            <span className="carrinho-badge">{totalItens}</span>
          )}
        </Link>
      </nav>
    </header>
  );
}

export default Header;
import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../ativos/logotransparente.png';
import './Headers.css';

function Header() {
  return (
    <header className="navbar">
      <div className="navbar-logo">
      </div>

      <nav className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/produtos">Produtos</Link>
        <Link to="/cadastro" className="login-btn">Login</Link>
        <Link to="/carrinho" className="carrinho">🛒</Link>
      </nav>
    </header>
  );
}

export default Header;
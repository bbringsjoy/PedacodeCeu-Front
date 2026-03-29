import './Headers.css';
import { Link } from 'react-router-dom';

function Header(){
  return(
    <header className="header">
      <div>
        <h1>Loja de Doces</h1>
      </div>
      <nav className="menu_header">
        <Link to="/">Home</Link>
        <Link to="/produtos">Produtos</Link>
        <Link to="/categorias">Categorias</Link>
        <Link to="/login">Login</Link>
        <Link to="/cadastro">Cadastro</Link>
      </nav>
    </header>
  )
}

export default Header;
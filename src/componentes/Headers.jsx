import './Headers.css';
import { Link } from 'react-router-dom';

function Header(){
  return(
    <header className="header" >

      <div >
         <h1>Loja de Doces</h1>
      </div>
      <nav className="menu_header">
          <Link to="/">Home</Link>
          <Link to="/contato">Contato</Link>
          <Link to="/quem-somos">Quem Somos</Link>
          <Link to="/login">Login</Link>
          <Link to="/carrinho">Carrinho</Link>
      </nav>
    </header>
  )
}

export default Header;
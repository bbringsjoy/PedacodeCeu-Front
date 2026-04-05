import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p>Desenvolvido por: Beatriz Gomes Santana</p>
      <Link to="/sobre">Sobre</Link>
    </footer>
  );
}

export default Footer;
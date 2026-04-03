import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProdutoCard from '../componentes/ProdutosCard';
import imgBolo from '../ativos/bolodestaque.png';
import imgCookie from '../ativos/cookiedestaque.png';
import '../App.css';

export default function Home() {
  const { usuario } = useAuth();

  const produtosDestaque = [
    {
      id: 1,
      nome: 'Bolo de Chocolate',
      preco: 45.00,
      descricao: 'O campeão de gosto bom',
      imagem: imgBolo,
    },
    {
      id: 2,
      nome: 'Cookie Artesanal',
      preco: 8.00,
      descricao: 'Crocante por fora, macio por dentro.',
      imagem: imgCookie,
    },
  ];

  return (
    <div className="home-container">
      {/* Hero Banner */}
      <div className="hero-wrapper">
        <section className="hero-banner">
          <h1>Bem-vindo à Pedaço do Céu</h1>
          <p>
            {usuario
              ? `Olá, ${usuario.nome.split(' ')[0]}! Gerencie produtos, categorias e pedidos abaixo.`
              : 'A doçura que faltava no seu dia está aqui.'}
          </p>
          {usuario ? (
            <Link to="/produtos" className="cta-button">Gerenciar Produtos</Link>
          ) : (
            <Link to="/produtos" className="cta-button">Ver Cardápio Completo</Link>
          )}
        </section>
      </div>

      {/* Cards de acesso rápido (quando logado) */}
      {usuario && (
        <section className="destaques">
          <h2>✨ Acesso Rápido ✨</h2>
          <div className="home-cards-acesso">
            <Link to="/produtos" className="home-card-acesso">
              <span>🍰</span>
              <p>Produtos</p>
            </Link>
            <Link to="/categorias" className="home-card-acesso">
              <span>📂</span>
              <p>Categorias</p>
            </Link>
            <Link to="/pedidos" className="home-card-acesso">
              <span>📦</span>
              <p>Pedidos</p>
            </Link>
            <Link to="/perfil" className="home-card-acesso">
              <span>👤</span>
              <p>Meu Perfil</p>
            </Link>
          </div>
        </section>
      )}

      {/* Produtos em destaque (sempre visível) */}
      <section className="destaques">
        <h2>✨ Produtos em Destaque ✨</h2>
        <div className="destaques-grid">
          {produtosDestaque.map((doce) => (
            <ProdutoCard key={doce.id} produto={doce} />
          ))}
        </div>
      </section>
    </div>
  );
}

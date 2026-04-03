import React from 'react';
import './ProdutosCard.css';

function ProdutoCard({ produto, nomeProduto, precoProduto, descricao, quantidadeDisponivel, foto }) {
  // Suporta tanto a versão antiga (props diretas) quanto a nova (objeto produto)
  const nome = produto ? produto.nome : nomeProduto;
  const preco = produto ? produto.preco : precoProduto;
  const desc = produto ? produto.descricao : descricao;
  const imagem = produto ? produto.imagem : foto;
  const qtd = produto ? produto.quantidade : quantidadeDisponivel;

  return (
    <div className="card-doce">
      {imagem && (
        <img
          src={imagem}
          alt={nome}
          className="card-img"
        />
      )}
      <div className="card-info">
        <h2>{nome}</h2>
        <p className="preco">R$ {Number(preco).toFixed(2)}</p>
        <p className="descricao">{desc}</p>
        {qtd !== undefined && (
          <p className="estoque"><small>Estoque: {qtd}</small></p>
        )}
        <button className="card-button">Ver mais</button>
      </div>
    </div>
  );
}

export default ProdutoCard;

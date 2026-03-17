import "./ProdutoCard.css";

function ProdutoCard({ nome, preco, imagem }) {
  return (
    <div className="produto-card">
      <img src={imagem} alt={nome} className="produto-imagem" />

      <div className="produto-info">
        <h3>{nome}</h3>
        <p className="produto-preco">R$ {preco}</p>

        <button className="produto-botao">
          Comprar
        </button>
      </div>
    </div>
  );
}

export default ProdutoCard;
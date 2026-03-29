import { useState } from "react";
import { Link } from "react-router-dom";

const categoriasMock = [
  { id: 1, nome: "Bolos", descricao: "Bolos diversos" },
  { id: 2, nome: "Cookies", descricao: "Cookies artesanais" },
];

export default function Categorias() {
  const [categorias, setCategorias] = useState(categoriasMock);

  function handleDeletar(id) {
    if (!window.confirm("Deseja excluir esta categoria?")) return;
    setCategorias(categorias.filter((c) => c.id !== id));
  }

  return (
    <div className="pagina-crud">
      <div className="pagina-crud__topo">
        <h2>📂 Categorias</h2>
        <Link to="/categorias/nova">
          <button className="botao botao--primario" style={{ width: "auto" }}>+ Nova Categoria</button>
        </Link>
      </div>
      <div className="tabela-wrapper">
        <table className="tabela">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.nome}</td>
                <td>{c.descricao}</td>
                <td>
                  <div className="tabela__acoes">
                    <Link to={`/categorias/editar/${c.id}`}>
                      <button className="btn-sm btn-sm--editar">Editar</button>
                    </Link>
                    <button className="btn-sm btn-sm--deletar" onClick={() => handleDeletar(c.id)}>Excluir</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
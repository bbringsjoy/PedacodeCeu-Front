import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listarPedidos, deletarPedido } from "../services/api";
import Paginacao from "../componentes/Paginacao";
import MensagemErro from "../componentes/MensagemErro";

const STATUS_CORES = {
  pendente: "#ed8936",
  confirmado: "#3182ce",
  entregue: "#38a169",
  cancelado: "#e53e3e",
};

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    buscar();
  }, [pagina]);

  async function buscar() {
    setCarregando(true);
    setErro("");
    try {
      const res = await listarPedidos(pagina, 10);
      setPedidos(res.dados);
      setTotalPaginas(res.meta.totalPaginas);
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro ao carregar pedidos");
    } finally {
      setCarregando(false);
    }
  }

  async function handleDeletar(id) {
    if (!window.confirm("Deseja excluir este pedido?")) return;
    try {
      await deletarPedido(id);
      await buscar();
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro ao excluir pedido");
    }
  }

  return (
    <div className="pagina-crud">
      <div className="pagina-crud__topo">
        <h2>📦 Pedidos</h2>
        <Link to="/pedidos/novo">
          <button className="botao botao--primario" style={{ width: "auto" }}>+ Novo Pedido</button>
        </Link>
      </div>

      <MensagemErro mensagem={erro} />

      {carregando ? (
        <p>Carregando...</p>
      ) : (
        <div className="tabela-wrapper">
          <table className="tabela">
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuário</th>
                <th>Status</th>
                <th>Total</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.length === 0 ? (
                <tr><td colSpan={6} style={{ textAlign: "center", padding: 24, color: "#999" }}>Nenhum pedido encontrado</td></tr>
              ) : (
                pedidos.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.usuarioId}</td>
                    <td>
                      <span style={{
                        background: STATUS_CORES[p.status] ?? "#999",
                        color: "white",
                        padding: "3px 9px",
                        borderRadius: 20,
                        fontSize: "0.78rem",
                        fontWeight: 600,
                      }}>
                        {p.status}
                      </span>
                    </td>
                    <td>R$ {Number(p.total).toFixed(2).replace(".", ",")}</td>
                    <td>{new Date(p.createdAt).toLocaleDateString("pt-BR")}</td>
                    <td>
                      <div className="tabela__acoes">
                        <Link to={`/pedidos/editar/${p.id}`}>
                          <button className="btn-sm btn-sm--editar">Editar</button>
                        </Link>
                        <button className="btn-sm btn-sm--deletar" onClick={() => handleDeletar(p.id)}>
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <Paginacao pagina={pagina} totalPaginas={totalPaginas} onMudar={setPagina} />
    </div>
  );
}

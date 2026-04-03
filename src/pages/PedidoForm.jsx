import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { criarPedido, editarPedido, listarPedidos } from "../services/api";
import { useAuth } from "../context/AuthContext";
import CampoTexto from "../componentes/CampoTexto";
import Botao from "../componentes/Botao";
import MensagemErro from "../componentes/MensagemErro";

const STATUS_OPTIONS = ["pendente", "confirmado", "entregue", "cancelado"];

export default function PedidoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const editando = Boolean(id);

  const [status, setStatus] = useState("pendente");
  const [total, setTotal] = useState("");
  const [erros, setErros] = useState({});
  const [erroApi, setErroApi] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (editando && id) carregarPedido(Number(id));
  }, []);

  async function carregarPedido(pedidoId) {
    try {
      const res = await listarPedidos(1, 100);
      const pedido = res.dados.find((p) => p.id === pedidoId);
      if (pedido) {
        setStatus(pedido.status);
        setTotal(String(pedido.total));
      }
    } catch {}
  }

  function validar() {
    const novosErros = {};
    if (!status) novosErros.status = "Status é obrigatório";
    if (!total) novosErros.total = "Total é obrigatório";
    else if (isNaN(Number(total)) || Number(total) < 0) novosErros.total = "Total inválido";
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  async function handleSubmit() {
    setErroApi("");
    if (!validar() || !usuario) return;
    setCarregando(true);
    try {
      const payload = {
        status,
        total: Number(total),
        usuarioId: usuario.id,
        itens: [],
      };
      if (editando && id) {
        await editarPedido(Number(id), payload);
      } else {
        await criarPedido(payload);
      }
      navigate("/pedidos");
    } catch (err) {
      setErroApi(err instanceof Error ? err.message : "Erro ao salvar pedido");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="pagina-crud" style={{ maxWidth: 500 }}>
      <div className="pagina-crud__topo">
        <h2>{editando ? "Editar Pedido" : "Novo Pedido"}</h2>
      </div>
      <div className="perfil-form">
        <MensagemErro mensagem={erroApi} />
        <div className="campo-grupo">
          <label className="campo-label" htmlFor="status">Status</label>
          <select
            id="status"
            className={`campo-input${erros.status ? " campo-input--erro" : ""}`}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {erros.status && <span className="campo-erro">{erros.status}</span>}
        </div>
        <CampoTexto
          id="total"
          label="Total (R$)"
          type="number"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
          erro={erros.total}
          placeholder="0.00"
        />
        <div style={{ display: "flex", gap: 12 }}>
          <button className="botao botao--secundario" style={{ width: "auto" }} onClick={() => navigate("/pedidos")}>
            Cancelar
          </button>
          <Botao onClick={handleSubmit} carregando={carregando}>
            {editando ? "Salvar alterações" : "Criar pedido"}
          </Botao>
        </div>
      </div>
    </div>
  );
}

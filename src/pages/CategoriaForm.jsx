import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { criarCategoria, editarCategoria, listarCategorias } from "../services/api";
import CampoTexto from "../componentes/CampoTexto";
import Botao from "../componentes/Botao";
import MensagemErro from "../componentes/MensagemErro";

export default function CategoriaForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editando = Boolean(id);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [erros, setErros] = useState({});
  const [erroApi, setErroApi] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (editando && id) carregarCategoria(Number(id));
  }, []);

  async function carregarCategoria(catId) {
    try {
      const res = await listarCategorias(1, 100);
      const cat = res.dados.find((c) => c.id === catId);
      if (cat) {
        setNome(cat.nome);
        setDescricao(cat.descricao);
      }
    } catch {}
  }

  function validar() {
    const novosErros = {};
    if (!nome.trim()) novosErros.nome = "Nome é obrigatório";
    if (!descricao.trim()) novosErros.descricao = "Descrição é obrigatória";
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  async function handleSubmit() {
    setErroApi("");
    if (!validar()) return;
    setCarregando(true);
    try {
      if (editando && id) {
        await editarCategoria(Number(id), { nome, descricao });
      } else {
        await criarCategoria({ nome, descricao });
      }
      navigate("/categorias");
    } catch (err) {
      setErroApi(err instanceof Error ? err.message : "Erro ao salvar categoria");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="pagina-crud" style={{ maxWidth: 500 }}>
      <div className="pagina-crud__topo">
        <h2>{editando ? "Editar Categoria" : "Nova Categoria"}</h2>
      </div>
      <div className="perfil-form">
        <MensagemErro mensagem={erroApi} />
        <CampoTexto id="nome" label="Nome" value={nome} onChange={(e) => setNome(e.target.value)} erro={erros.nome} />
        <CampoTexto id="descricao" label="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} erro={erros.descricao} />
        <div style={{ display: "flex", gap: 12 }}>
          <button className="botao botao--secundario" style={{ width: "auto" }} onClick={() => navigate("/categorias")}>
            Cancelar
          </button>
          <Botao onClick={handleSubmit} carregando={carregando}>
            {editando ? "Salvar alterações" : "Criar categoria"}
          </Botao>
        </div>
      </div>
    </div>
  );
}

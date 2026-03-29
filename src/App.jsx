import { Routes, Route } from "react-router-dom";
import Header from "./componentes/Headers";
import Sidebar from "./componentes/Sidebar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Produtos from "./pages/Produtos";
import Categorias from "./pages/Categorias";
import CategoriaForm from "./pages/CategoriaForm";

import "./index.css";

function App() {
  return (
    <>
      <Header />
      <div className="layout-principal">
        <Sidebar />
        <main className="conteudo-da-pagina">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/categorias/nova" element={<CategoriaForm />} />
            <Route path="/categorias/editar/:id" element={<CategoriaForm />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
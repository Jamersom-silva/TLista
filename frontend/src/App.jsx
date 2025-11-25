import React, { useState, useEffect } from "react";
import ListaDiaria from "./components/ListaDiaria";
import ListaSemanal from "./components/ListaSemanal";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function App() {
  const [modo, setModo] = useState("dia");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const nav = useNavigate();

  // ============================
  //  Autenticação
  // ============================
  useEffect(() => {
    const token = localStorage.getItem("todo_token");

    if (!token) {
      setIsLogged(false);
      return;
    }

    setIsLogged(true);

    try {
      const decoded = jwtDecode(token);
      if (decoded.role === "admin") {
        setIsAdmin(true);
      }
    } catch {
      setIsAdmin(false);
    }
  }, []);

  function logout() {
    localStorage.removeItem("todo_token");
    setIsLogged(false);
    setIsAdmin(false);
    nav("/login");
  }

  return (
    <div className="min-h-screen bg-[#f1f8f4] flex flex-col">

      {/* NAVBAR COMO COMPONENTE */}
      <Navbar 
        isLogged={isLogged}
        isAdmin={isAdmin}
        logout={logout}
      />

      {/* CONTEÚDO */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-10">

        {/* TÍTULO ESTILO ORGANIZZE */}
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">
          Seu planejamento sob{" "}
          <span className="text-[#00a86b]">controle</span>
        </h2>

        {/* BOTÕES DE MODO */}
        <div className="flex gap-4 justify-center mb-10">
          <button
            onClick={() => setModo("dia")}
            className={`px-6 py-2 rounded-lg border font-medium transition ${
              modo === "dia"
                ? "bg-[#00a86b] text-white border-[#00a86b]"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            Lista do Dia
          </button>

          <button
            onClick={() => setModo("semana")}
            className={`px-6 py-2 rounded-lg border font-medium transition ${
              modo === "semana"
                ? "bg-[#00a86b] text-white border-[#00a86b]"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            Lista Semanal
          </button>
        </div>

        {/* ÁREA DE LISTAS */}
        <div className="bg-white rounded-xl shadow p-6 mb-16">
          {modo === "dia" && <ListaDiaria />}
          {modo === "semana" && <ListaSemanal />}
        </div>
      </main>

      {/* FOOTER COMO COMPONENTE */}
      <Footer />

    </div>
  );
}

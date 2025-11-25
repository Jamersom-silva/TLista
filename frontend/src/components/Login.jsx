import React, { useState } from "react";
import API, { setToken } from "../api";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, Mail, Lock } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      const { token } = res.data;

      localStorage.setItem("todo_token", token);
      setToken(token);

      nav("/");
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao logar");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f1f8f4] px-6">

      <div className="
        bg-white/90 backdrop-blur-lg 
        p-10 rounded-3xl 
        shadow-[0_8px_40px_rgba(0,0,0,0.07)]
        border border-gray-200
        max-w-md w-full
      ">
        
        {/* Cabeçalho */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-green-100 text-green-700 rounded-xl">
            <LogIn size={22} />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Entrar</h2>
        </div>

        <form onSubmit={submit} className="space-y-5">
          
          {/* EMAIL */}
          <div>
            <label className="font-medium text-gray-700">Email</label>
            <div className="flex items-center gap-3 bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 mt-1">
              <Mail size={20} className="text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent outline-none w-full text-gray-700"
                placeholder="seuemail@mail.com"
              />
            </div>
          </div>

          {/* SENHA */}
          <div>
            <label className="font-medium text-gray-700">Senha</label>
            <div className="flex items-center gap-3 bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 mt-1">
              <Lock size={20} className="text-gray-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent outline-none w-full text-gray-700"
                placeholder="Digite sua senha..."
              />
            </div>
          </div>

          {/* BOTÃO */}
          <button
            type="submit"
            className="
              w-full py-3 text-white font-medium rounded-xl
              bg-gradient-to-r from-green-600 to-green-700
              shadow-lg hover:scale-[1.02] active:scale-[0.97]
              transition-all
            "
          >
            Entrar
          </button>

        </form>

        {/* Link para registrar */}
        <p className="text-center text-gray-600 mt-6">
          Ainda não tem conta?{" "}
          <Link to="/register" className="text-green-700 font-medium hover:underline">
            Criar conta
          </Link>
        </p>

        {/* VOLTAR PARA HOME */}
        <p className="text-center text-gray-600 mt-3">
          <Link
            to="/"
            className="text-gray-500 hover:text-green-700 transition font-medium"
          >
            ⬅ Voltar para a Home
          </Link>
        </p>

      </div>
    </div>
  );
}

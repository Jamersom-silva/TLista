import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { jwtDecode } from "jwt-decode";

export default function Footer() {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("todo_token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      setIsLogged(true);
      if (decoded.role === "admin") setIsAdmin(true);
    } catch (err) {
      setIsLogged(false);
    }
  }, []);

  return (
    <footer className="mt-20 bg-white/80 backdrop-blur-lg border-t border-gray-200 py-10">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Links */}
        <div className="flex justify-center flex-wrap gap-6 text-gray-600 font-medium mb-6">

          <Link to="/" className="hover:text-[#00a86b] transition">
            Início
          </Link>

          {!isLogged && (
            <>
              <Link to="/login" className="hover:text-[#00a86b] transition">
                Login
              </Link>

              <Link to="/register" className="hover:text-[#00a86b] transition">
                Criar Conta
              </Link>
            </>
          )}

          {isLogged && isAdmin && (
            <Link to="/admin" className="hover:text-[#00a86b] transition">
              Admin
            </Link>
          )}
        </div>

        {/* Linha divisória suave */}
        <div className="w-full max-w-sm mx-auto h-px bg-gray-300/50 mb-6"></div>

        {/* Créditos */}
        <p className="text-gray-600 text-sm flex justify-center items-center gap-1">
          © {new Date().getFullYear()} ToDofy — Feito com 
          <Heart size={16} className="text-red-500" />  
          foco e organização.
        </p>
      </div>
    </footer>
  );
}

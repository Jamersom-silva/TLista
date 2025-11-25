import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ListTodo, LogOut } from "lucide-react";

export default function Navbar() {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const nav = useNavigate();

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

  function logout() {
    localStorage.removeItem("todo_token");
    setIsLogged(false);
    setIsAdmin(false);
    nav("/login");
  }

  return (
    <header className="bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <div className="p-2 bg-green-100 text-green-700 rounded-xl">
            <ListTodo size={22} />
          </div>
          <span className="text-2xl font-bold text-[#008a56] tracking-tight">
            ToDofy
          </span>
        </Link>

        {/* MENU */}
        <nav className="flex items-center gap-6 text-gray-700 font-medium">

          {!isLogged && (
            <>
              <Link className="hover:text-[#008a56]" to="/login">
                Login
              </Link>

              <Link className="hover:text-[#008a56]" to="/register">
                Registrar
              </Link>
            </>
          )}

          {isLogged && (
            <>
              {/* ADMIN */}
              {isAdmin && (
                <Link className="hover:text-[#008a56]" to="/admin">
                  Admin
                </Link>
              )}

              {/* LOGOUT */}
              <button
                onClick={logout}
                className="flex items-center gap-1 text-red-600 hover:text-red-700"
              >
                <LogOut size={18} /> Sair
              </button>
            </>
          )}

          {/* CTA → Sempre visível */}
          <Link
            to="/"
            className="px-4 py-2 bg-[#00a86b] text-white rounded-lg shadow hover:bg-[#008a56] transition hidden sm:block"
          >
            Começar agora
          </Link>

        </nav>
      </div>
    </header>
  );
}

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("todo_token");

    if (!token) {
      setIsLogged(false);
      setIsAdmin(false);
      return;
    }

    setIsLogged(true);

    try {
      const decoded = jwtDecode(token);
      if (decoded.role === "admin") setIsAdmin(true);
    } catch {
      setIsLogged(false);
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
    <header className="bg-white shadow py-4 mb-8">
      <div className="max-w-5xl mx-auto flex justify-between items-center px-4">

        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          ToDofy
        </Link>

        {/* MENU */}
        <nav className="flex items-center gap-4 text-gray-700">

          {!isLogged && (
            <>
              <Link className="hover:text-black" to="/login">Login</Link>
              <Link className="hover:text-black" to="/register">Registrar</Link>
            </>
          )}

          {isLogged && (
            <>
              {/* Admin aparece só para ADM */}
              {isAdmin && (
                <Link className="hover:text-black" to="/admin">Admin</Link>
              )}

              <button
                onClick={logout}
                className="hover:text-red-600 transition"
              >
                Logout
              </button>
            </>
          )}

        </nav>
      </div>
    </header>
  );
}

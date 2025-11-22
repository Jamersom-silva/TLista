import React, { useState, useEffect } from 'react'
import ListaDiaria from './components/ListaDiaria'
import ListaSemanal from './components/ListaSemanal'
import { Link, useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";


export default function App(){

  const [modo, setModo] = useState("dia")
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLogged, setIsLogged] = useState(false)

  const nav = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("todo_token")

    if (!token) {
      setIsLogged(false)
      return
    }

    setIsLogged(true)

    try {
      const decoded = jwtDecode(token)
      if (decoded.role === "admin") {
        setIsAdmin(true)
      }
    } catch (err) {
      setIsAdmin(false)
    }
  }, [])

  function logout() {
    localStorage.removeItem("todo_token")
    setIsLogged(false)
    setIsAdmin(false)
    nav("/login")
  }

  return (
    <div style={{maxWidth:800, margin:'2rem auto', padding:20, background:'#fff', borderRadius:8}}>
      
      <header style={{display:'flex', justifyContent:'space-between', marginBottom:20}}>
        <h1>ToDofy</h1>

        <nav>

          {/* ► Não logado → Login | Register */}
          {!isLogged && (
            <>
              <Link to="/login">Login</Link> |{" "}
              <Link to="/register">Register</Link>
            </>
          )}

          {/* ► Logado */}
          {isLogged && (
            <>
              {/* Somente admins veem o botão "Admin" */}
              {isAdmin && (
                <>
                  <Link to="/admin">Admin</Link> |{" "}
                </>
              )}

              {/* Botão Logout */}
              <button
                onClick={logout}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "blue",
                  cursor: "pointer",
                  textDecoration: "underline",
                  padding: 0
                }}
              >
                Logout
              </button>
            </>
          )}

        </nav>
      </header>

      {/* MENU PRINCIPAL */}
      <div style={{display:"flex", gap:10, marginBottom:20}}>
        <button onClick={() => setModo("dia")}>Lista do Dia</button>
        <button onClick={() => setModo("semana")}>Lista Semanal</button>
      </div>

      {/* CONTEÚDO */}
      {modo === "dia" && <ListaDiaria />}
      {modo === "semana" && <ListaSemanal />}
      
    </div>
  )
}

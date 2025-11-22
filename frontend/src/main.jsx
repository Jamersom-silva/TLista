import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./components/AdminDashboard";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        {/* Página inicial */}
        <Route path="/" element={<App />} />

        {/* Login & Registro */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Painel ADMIN – somente admins podem entrar */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

import React, { useEffect, useState } from "react";
import API, { setToken } from "../api";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [tasks, setTasks] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");

  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("todo_token");
    if (!token) return nav("/login");

    setToken(token);
    loadUsers();
    loadStats();
  }, []);

  async function loadUsers() {
    const res = await API.get("/admin/users");
    setUsers(res.data);
  }

  async function loadStats() {
    const res = await API.get("/admin/stats");
    setStats(res.data);
  }

  async function viewTasks(id) {
    const res = await API.get(`/admin/users/${id}/tasks`);
    setTasks(res.data);
    const u = users.find((x) => x.id === id);
    setSelectedUser(u);
  }

  async function deleteUser(id) {
    if (!window.confirm("Tem certeza que deseja excluir este usuário?")) return;
    await API.delete(`/admin/users/${id}`);
    loadUsers();
    setSelectedUser(null);
    setTasks([]);
  }

  function logout() {
    localStorage.removeItem("todo_token");
    nav("/login");
  }

  const filteredUsers = users.filter((u) =>
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Painel Administrativo</h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white shadow p-6 rounded-lg border">
          <h2 className="text-gray-500">Usuários cadastrados</h2>
          <p className="text-3xl font-bold">{stats.total_users}</p>
        </div>

        <div className="bg-white shadow p-6 rounded-lg border">
          <h2 className="text-gray-500">Tarefas criadas</h2>
          <p className="text-3xl font-bold">{stats.total_tasks}</p>
        </div>

        <div className="bg-white shadow p-6 rounded-lg border">
          <h2 className="text-gray-500">Selecionado</h2>
          <p className="text-3xl font-bold">
            {selectedUser ? selectedUser.email : "-"}
          </p>
        </div>

        <div className="bg-white shadow p-6 rounded-lg border">
          <h2 className="text-gray-500">Tarefas desse usuário</h2>
          <p className="text-3xl font-bold">{tasks.length}</p>
        </div>
      </div>

      {/* BUSCA */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Buscar por email..."
          className="px-4 py-2 w-full max-w-sm border rounded shadow"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABELA */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Nome</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Cargo</th>
              <th className="px-4 py-2 border">Ações</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{u.id}</td>
                <td className="border px-4 py-2">{u.name || "-"}</td>
                <td className="border px-4 py-2">{u.email}</td>
                <td className="border px-4 py-2">{u.role}</td>
                <td className="border px-4 py-2 flex gap-2">
                  <button
                    onClick={() => viewTasks(u.id)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Ver tarefas
                  </button>

                  <button
                    onClick={() => deleteUser(u.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* LISTA DE TAREFAS */}
      {selectedUser && (
        <div className="mt-10 bg-white shadow p-6 rounded border">
          <h3 className="text-2xl font-bold mb-4">
            Tarefas de {selectedUser.name || selectedUser.email}
          </h3>

          <ul className="space-y-2">
            {tasks.map((t) => (
              <li
                key={t.id}
                className="p-3 border rounded bg-gray-50 flex justify-between"
              >
                <span>{t.title}</span>
                <span className="text-sm">
                  {t.done ? "✔️ Concluída" : "⏳ Pendente"}
                </span>
              </li>
            ))}
          </ul>

          {tasks.length === 0 && (
            <p className="text-gray-500 mt-4">Nenhuma tarefa encontrada.</p>
          )}
        </div>
      )}

      {/* VOLTAR */}
      <div className="mt-6">
        <button
          onClick={() => nav("/")}
          className="px-5 py-2 bg-gray-300 hover:bg-gray-400 rounded transition"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}


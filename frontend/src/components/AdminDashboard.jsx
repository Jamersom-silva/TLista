import React, { useEffect, useState } from "react";
import API, { setToken } from "../api";
import { useNavigate } from "react-router-dom";
import {
  Users,
  ListTodo,
  Trash2,
  ArrowLeft,
  Search,
  ClipboardList,
  UserCheck,
  LogOut,
} from "lucide-react";

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
    <div className="min-h-screen bg-[#f5f7f5] flex">

      {/* SIDEBAR PREMIUM */}
      <aside className="w-64 bg-white shadow-xl border-r border-gray-200 p-6 hidden md:block">
        <h2 className="text-2xl font-bold text-[#008a56] mb-8 flex items-center gap-2">
          <UserCheck size={22} /> Admin
        </h2>

        <nav className="space-y-4 text-gray-700 font-medium">

          <button
            onClick={() => nav("/")}
            className="flex items-center gap-2 w-full text-left hover:text-[#008a56] transition"
          >
            <ArrowLeft size={18} /> Voltar ao Início
          </button>

          <button
            onClick={logout}
            className="flex items-center gap-2 w-full text-left text-red-600 hover:text-red-700 transition"
          >
            <LogOut size={18} /> Logout
          </button>

        </nav>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 p-8">

        {/* TÍTULO */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">
            Painel Administrativo
          </h1>
        </div>

        {/* CARDS PREMIUM */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-md border flex items-center gap-4">
            <div className="p-3 bg-green-100 text-green-700 rounded-xl">
              <Users size={28} />
            </div>
            <div>
              <h2 className="text-gray-600 text-sm font-medium">Usuários</h2>
              <p className="text-3xl font-bold">{stats.total_users}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-700 rounded-xl">
              <ListTodo size={28} />
            </div>
            <div>
              <h2 className="text-gray-600 text-sm font-medium">Tarefas</h2>
              <p className="text-3xl font-bold">{stats.total_tasks}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border flex items-center gap-4">
            <div className="p-3 bg-yellow-100 text-yellow-700 rounded-xl">
              <ClipboardList size={28} />
            </div>
            <div>
              <h2 className="text-gray-600 text-sm font-medium">Selecionado</h2>
              <p className="text-xl font-bold">
                {selectedUser ? selectedUser.email : "-"}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border flex items-center gap-4">
            <div className="p-3 bg-purple-100 text-purple-700 rounded-xl">
              <ListTodo size={28} />
            </div>
            <div>
              <h2 className="text-gray-600 text-sm font-medium">Tarefas</h2>
              <p className="text-3xl font-bold">{tasks.length}</p>
            </div>
          </div>
        </div>

        {/* 📌 BUSCA PREMIUM */}
        <div className="max-w-sm mb-6">
          <div className="flex items-center gap-3 bg-white border p-3 rounded-xl shadow-sm">
            <Search className="text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar usuário pelo email..."
              className="outline-none w-full text-gray-700"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* TABELA PREMIUM */}
        <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">

          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100">
              <tr className="text-gray-600 text-sm">
                <th className="px-4 py-3 border">ID</th>
                <th className="px-4 py-3 border">Nome</th>
                <th className="px-4 py-3 border">Email</th>
                <th className="px-4 py-3 border">Cargo</th>
                <th className="px-4 py-3 border">Ações</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-3">{u.id}</td>
                  <td className="border px-4 py-3">{u.name || "-"}</td>
                  <td className="border px-4 py-3">{u.email}</td>
                  <td className="border px-4 py-3">{u.role}</td>
                  <td className="border px-4 py-3 flex gap-2">

                    <button
                      onClick={() => viewTasks(u.id)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                    >
                      Ver tarefas
                    </button>

                    <button
                      onClick={() => deleteUser(u.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
                    >
                      <Trash2 size={16} />
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TAREFAS DO USUÁRIO */}
        {selectedUser && (
          <div className="mt-10 bg-white p-6 rounded-2xl shadow-lg border">

            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <ClipboardList size={22} />
              Tarefas de {selectedUser.name || selectedUser.email}
            </h3>

            <ul className="space-y-3">
              {tasks.map((t) => (
                <li
                  key={t.id}
                  className="p-4 rounded-xl border bg-gray-50 flex justify-between shadow-sm"
                >
                  <span>{t.title}</span>
                  <span className="text-sm">
                    {t.done ? "✔️ Concluída" : "⏳ Pendente"}
                  </span>
                </li>
              ))}
            </ul>

            {tasks.length === 0 && (
              <p className="text-gray-500 mt-4">
                Nenhuma tarefa encontrada.
              </p>
            )}
          </div>
        )}

      </main>
    </div>
  );
}

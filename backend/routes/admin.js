const express = require("express");
const router = express.Router();

const { all, get, run } = require("../db");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// LISTAR TODOS OS USUÁRIOS
router.get("/users", authMiddleware, adminMiddleware, async (req, res) => {
  const users = await all("SELECT id, name, email, role, created_at FROM users ORDER BY id DESC");
  res.json(users);
});

// LISTAR TAREFAS DE UM USUÁRIO
router.get("/users/:id/tasks", authMiddleware, adminMiddleware, async (req, res) => {
  const { id } = req.params;
  const tasks = await all("SELECT * FROM tasks WHERE user_id = ? ORDER BY id DESC", [id]);
  res.json(tasks);
});

// REMOVER USUÁRIO
router.delete("/users/:id", authMiddleware, adminMiddleware, async (req, res) => {
  const { id } = req.params;

  await run("DELETE FROM users WHERE id = ?", [id]);

  res.json({ success: true });
});

// ESTATÍSTICAS
router.get("/stats", authMiddleware, adminMiddleware, async (req, res) => {
  const totalUsers = await get("SELECT COUNT(*) as total FROM users");
  const totalTasks = await get("SELECT COUNT(*) as total FROM tasks");

  res.json({
    total_users: totalUsers.total,
    total_tasks: totalTasks.total
  });
});

module.exports = router;

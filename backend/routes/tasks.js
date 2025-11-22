const express = require('express');
const router = express.Router();
const { run, all, get } = require('../db');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'No token' });
  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

router.get('/', authMiddleware, async (req, res) => {
  const rows = await all('SELECT id, title, done, created_at FROM tasks WHERE user_id = ? ORDER BY id DESC', [req.user.id]);
  res.json(rows);
});

router.post('/', authMiddleware, async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Missing title' });
  const result = await run('INSERT INTO tasks (user_id, title) VALUES (?, ?)', [req.user.id, title]);
  const task = await get('SELECT id, title, done, created_at FROM tasks WHERE id = ?', [result.id]);
  res.json(task);
});

router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { title, done } = req.body;
  await run('UPDATE tasks SET title = COALESCE(?, title), done = COALESCE(?, done) WHERE id = ? AND user_id = ?', [title, done, id, req.user.id]);
  const task = await get('SELECT id, title, done, created_at FROM tasks WHERE id = ?', [id]);
  res.json(task);
});

router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  await run('DELETE FROM tasks WHERE id = ? AND user_id = ?', [id, req.user.id]);
  res.json({ success: true });
});

router.get('/download/json', authMiddleware, async (req, res) => {
  const rows = await all('SELECT id, title, done, created_at FROM tasks WHERE user_id = ? ORDER BY id DESC', [req.user.id]);
  res.setHeader('Content-Disposition', 'attachment; filename="tasks.json"');
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(rows, null, 2));
});

module.exports = router;

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { run, get } = require('../db');
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

// =========================
//  REGISTRO
// =========================
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: 'Missing fields' });

    const hashed = await bcrypt.hash(password, 10);

    const result = await run(
      'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [name || null, email, hashed, role || "user"]  // 👈 role padrão é "user"
    );

    const user = await get(
      'SELECT id, name, email, role FROM users WHERE id = ?',
      [result.id]
    );

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ user, token });

  } catch (err) {
    if (err && err.message && err.message.includes('UNIQUE constraint'))
      return res.status(400).json({ error: 'Email already registered' });

    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// =========================
//  LOGIN
// =========================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await get(
      'SELECT id, name, email, password_hash, role FROM users WHERE email = ?',
      [email]
    );

    if (!user)
      return res.status(400).json({ error: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok)
      return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

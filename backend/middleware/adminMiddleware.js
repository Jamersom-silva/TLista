function adminMiddleware(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ error: "Acesso negado (Admin apenas)" });
  }
  next();
}

module.exports = adminMiddleware;

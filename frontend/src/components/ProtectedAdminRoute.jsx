import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


export default function ProtectedAdminRoute({ children }) {
  const token = localStorage.getItem("todo_token");

  // Se não tiver token → vai para Login
  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode(token);

    // Se o token NÃO for de admin → volta para Home
    if (decoded.role !== "admin") {
      return <Navigate to="/" />;
    }

    // Se for admin → pode acessar normalmente
    return children;

  } catch (err) {
    // Token inválido → volta para login
    return <Navigate to="/login" />;
  }
}

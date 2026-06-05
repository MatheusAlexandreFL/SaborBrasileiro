import { Navigate } from "react-router-dom";

/**
 * Componente wrapper que protege rotas autenticadas.
 * Redireciona para /login se não houver token no localStorage.
 */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const parts = token.split('.');
    if (parts.length === 3) {
      const payload = JSON.parse(atob(parts[1]));
      const exp = payload.exp * 1000;
      if (Date.now() >= exp) {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        return <Navigate to="/login" replace />;
      }
    } else {
      localStorage.removeItem("token");
      return <Navigate to="/login" replace />;
    }
  } catch (error) {
    console.error("Erro ao validar token:", error);
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

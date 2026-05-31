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

  return children;
};

export default ProtectedRoute;

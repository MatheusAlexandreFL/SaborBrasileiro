import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

// Interceptor para adicionar o token de autenticação em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const pratoService = {
  listarPratos: async () => {
    const response = await api.get("/listar-pratos");
    return response.data;
  }
};

export const authService = {
  login: async (email, senha) => {
    const response = await api.post("/login", { email, senha });
    return response.data;
  },
  cadastrar: async (dadosCadastro) => {
    // Usando a rota atual que está no Cadastro.jsx
    const response = await api.post("/cadastrar-teste", dadosCadastro);
    return response.data;
  }
};

export default api;

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
    const response = await api.get("/pratos");
    return response.data;
  }
};

export const authService = {
  login: async (email, senha) => {
    const response = await api.post("/usuarios/login", { email, senha });
    return response.data;
  },
  cadastrar: async (dadosCadastro) => {
    const response = await api.post("/usuarios/cadastrar", dadosCadastro);
    return response.data;
  }
};

export default api;

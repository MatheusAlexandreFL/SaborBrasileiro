import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location.href = "/login";
  }
  return Promise.reject(error);
});

export const pratoService = {
  listarPratos: async (id_restaurante) => {
    const params = id_restaurante ? { id_restaurante } : {};
    const response = await api.get("/pratos", { params });
    return response.data;
  },
  buscarPrato: async (id) => {
    const response = await api.get(`/pratos/${id}`);
    return response.data;
  },
  cadastrarPrato: async (dados) => {
    const response = await api.post("/pratos", dados);
    return response.data;
  },
  atualizarPrato: async (id, dados) => {
    const response = await api.put(`/pratos/${id}`, dados);
    return response.data;
  },
  deletarPrato: async (id) => {
    const response = await api.delete(`/pratos/${id}`);
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

export const userService = {
  getPerfil: async () => {
    const response = await api.get("/usuarios/perfil");
    return response.data;
  },
  updatePerfil: async (dados) => {
    const response = await api.put("/usuarios/perfil", dados);
    return response.data;
  },
  updateSenha: async (senhas) => {
    const response = await api.put("/usuarios/perfil/senha", senhas);
    return response.data;
  },
  deletarConta: async () => {
    const response = await api.delete("/usuarios/perfil");
    return response.data;
  }
};

export const restaurantService = {
  listar: async () => {
    const response = await api.get("/restaurantes");
    return response.data;
  },
  buscarPorId: async (id) => {
    const response = await api.get(`/restaurantes/${id}`);
    return response.data;
  },
  criar: async (dados) => {
    const response = await api.post("/restaurantes", dados);
    return response.data;
  },
  atualizar: async (id, dados) => {
    const response = await api.put(`/restaurantes/${id}`, dados);
    return response.data;
  },
  deletar: async (id) => {
    const response = await api.delete(`/restaurantes/${id}`);
    return response.data;
  }
};

export const avaliacaoService = {
  listar: async (filtros) => {
    const response = await api.get("/avaliacoes", { params: filtros });
    return response.data;
  },
  criar: async (dados) => {
    const response = await api.post("/avaliacoes", dados);
    return response.data;
  },
  editar: async (id, dados) => {
    const response = await api.put(`/avaliacoes/${id}`, dados);
    return response.data;
  },
  deletar: async (id) => {
    const response = await api.delete(`/avaliacoes/${id}`);
    return response.data;
  }
};

export default api;


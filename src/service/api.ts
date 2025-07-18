import axios from "axios";
import { API_CONFIG } from "config/APIConfig";

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.DEFAULT_HEADERS,
});

// Interceptor para requisições
api.interceptors.request.use(
  (config) => {
    // Aqui você pode adicionar tokens de autenticação, logs, etc.
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("[API] Erro na requisição:", error);
    return Promise.reject(new Error(error.message || "Erro na requisição"));
  }
);

// Interceptor para respostas
api.interceptors.response.use(
  (response) => {
    console.log(`[API] Resposta recebida: ${response.status}`);
    return response;
  },
  (error) => {
    console.error(
      "[API] Erro na resposta:",
      error.response?.status,
      error.message
    );

    // Tratamento de erros globais
    if (error.response?.status === 401) {
      console.error("Erro de autenticação");
      // Aqui você pode redirecionar para login
    } else if (error.response?.status === 500) {
      console.error("Erro interno do servidor");
    } else {
      console.error("Erro desconhecido:", error.message);
    }

    return Promise.reject(
      new Error(error.message || "Erro na resposta da API")
    );
  }
);

export default api;

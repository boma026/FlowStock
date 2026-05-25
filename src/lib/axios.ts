import { api } from "@/utils/axios";
import { AxiosError } from "axios";
import { redirect } from "next/dist/server/api-utils";

api.interceptors.request.use(
  (config) => {
    /*const token = typeof window !== 'undefined' ? localStorage.getItem('@App:token') : null;
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }*/
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    // Se a requisição deu certo, apenas retorne os dados
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      // O servidor respondeu com um status de erro (4xx, 5xx)
      const status = error.response.status;

      if (status === 401) {
        console.error("Sessão expirada. Redirecionando para login...");
      } else if (status === 500) {
        console.error("Erro interno do servidor. Tente novamente mais tarde.");
      }
    } else if (error.request) {
      // A requisição foi feita, mas não houve resposta (ex: sem internet)
      console.error("Erro de rede. Verifique sua conexão.");
    } else {
      // Algum erro ocorreu ao montar a requisição
      console.error("Erro na requisição:", error.message);
    }

    // Repassa o erro para ser tratado de forma específica no componente/service, se necessário
    return Promise.reject(error);
  },
);

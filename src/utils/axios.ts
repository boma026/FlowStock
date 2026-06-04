import axios from "axios";

import { AxiosError } from "axios";

const apiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  withCredentials: true,
};

export const privateApi = axios.create(apiConfig);

export const publicApi = axios.create(apiConfig);

privateApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        console.error("Sessão expirada. Redirecionando para login...");
        if (typeof window !== "undefined") {
          window.location.href = "/";
        }
      } else if (status === 500) {
        console.error("Erro interno do servidor. Tente novamente mais tarde.");
      }
    } else if (error.request) {
      console.error("Erro de rede. Verifique sua conexão.");
    } else {
      console.error("Erro na requisição:", error.message);
    }

    return Promise.reject(error);
  },
);

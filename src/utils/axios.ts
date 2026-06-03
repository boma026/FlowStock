import axios from "axios";

import { AxiosError } from "axios";
import { redirect } from "next/navigation";

export const privateApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  withCredentials: true,
});

export const publicApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
});

privateApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      // O servidor respondeu com um status de erro (4xx, 5xx)
      const status = error.response.status;

      if (status === 401) {
        console.log("entrou");
        console.error("Sessão expirada. Redirecionando para login...");
        if (typeof window !== "undefined") {
          window.location.href = "/";
        }
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

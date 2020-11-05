import axios from "axios";
import { baseURL } from "./constants";

const headers = { "Content-Type": "application/json" };

const api = axios.create({ baseURL, headers });

api.interceptors.response.use(
  (response) => response,
  ({ response, request, message }) => {
    return Promise.reject(response || request || message || "erro_inesperado");
  }
);

export default api;

import { parseCookies } from "nookies";
import axios from "axios";

const { ["rastreio-token"]: token } = parseCookies();

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    Authorization: "Bearer " + token,
  },
});

export default api;

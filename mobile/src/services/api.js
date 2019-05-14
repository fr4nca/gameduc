import axios from "axios";

const api = axios.create({
  baseURL: "http://www.gameeduc.com.br/api"
});

export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "https://microwell.onrender.com/api"
});

export default api;

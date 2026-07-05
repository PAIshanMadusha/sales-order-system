import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5030/api";

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL,
});

export default api;

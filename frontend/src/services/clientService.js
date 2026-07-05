import api from "./api";

// Get all clients
export const getClients = () => api.get("/client");

// Get client by ID
export const getClientById = (id) => api.get(`/client/${id}`);

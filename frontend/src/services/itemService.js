import api from "./api";

// Get all items
export const getItems = () => api.get("/item");

// Get item by ID
export const getItemById = (id) => api.get(`/item/${id}`);

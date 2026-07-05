import api from "./api";

// Create a new order
export const createOrder = (data) => api.post("/salesorder", data);

// Get all orders
export const getOrders = () => api.get("/salesorder");

// Get order by ID
export const getOrderById = (id) => api.get(`/salesorder/${id}`);

// Update an order by ID
export const updateOrder = (id, data) => api.put(`/salesorder/${id}`, data);

// Delete an order by ID
export const deleteOrder = (id) => api.delete(`/salesorder/${id}`);

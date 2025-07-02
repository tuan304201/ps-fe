import api from "@/lib/api";

export const createOrder = (data) => api.post("/order", data);
export const getAllOrders = () => api.get("/order");
export const getOrderById = (id) => api.get(`/order/${id}`);

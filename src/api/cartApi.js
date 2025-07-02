import api from "@/lib/api";

export const getCart = () => api.get("/cart");
export const updateCart = (data) => api.put("/cart", data);
export const clearCart = () => api.delete("/cart");

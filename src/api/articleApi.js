import api from "@/lib/api";

export const getAllArticles = () => api.get("/article");
export const getArticleById = (id) => api.get(`/article/${id}`);

import api from "@/lib/api";

export const createReview = (data) => api.post("/review", data);

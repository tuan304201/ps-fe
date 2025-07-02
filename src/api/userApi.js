import api from "@/lib/api";

export const updateProfile = (data) => api.put("/user/profile", data);

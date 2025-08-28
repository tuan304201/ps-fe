import api from "@/lib/api";

export const updateProfile = (data) => api.put("/user/profile", data);
export const logout = () => api.post("/auth/logout");
export const requestChangePassword = (data) => api.post("/auth/send-otp-change-password", data);
export const resendChangePasswordOtp = () => api.post("/auth/resend-otp-change-password");
export const confirmChangePassword = (data) => api.post("/auth/change-password", data);
export const getUserProfile = () => api.get("/user/profile");

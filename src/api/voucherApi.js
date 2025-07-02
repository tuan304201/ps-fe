import api from "@/lib/api";

export const getAllVouchers = () => api.get("/voucher");
export const getVoucherByCode = (code) => api.get(`/voucher/${code}`);

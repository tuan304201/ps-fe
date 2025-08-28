import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    name: "",
    email: "",
    avatar: "",
    // Thêm các trường khác nếu cần
  }),
  actions: {
    setUser(user) {
      this.name = user.name;
      this.email = user.email;
      this.avatar = user.avatar;
    },
    setName(name) {
      this.name = name;
    },
  },
  persist: true, // Tự động lưu vào localStorage
});

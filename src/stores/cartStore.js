import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    flyingImage: null,
    startPosition: { x: 0, y: 0 },
    isFlying: false,
    isCartShaking: false,
    // SỬA Ở ĐÂY: Khởi tạo là null để kiểm tra
    cartIconPosition: null,
    cartItems: [], // Thêm state lưu sản phẩm giỏ hàng
  }),
  getters: {
    cartCount(state) {
      // Đếm tổng số lượng sản phẩm trong giỏ hàng
      return state.cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
    },
  },
  actions: {
    setCartIconPosition(position) {
      this.cartIconPosition = position;
    },

    flyToCart(imageSrc, startEvent) {
      // THÊM KIỂM TRA: Chỉ bay khi đã biết vị trí giỏ hàng
      if (!this.cartIconPosition) {
        console.warn("Chưa xác định được vị trí giỏ hàng, không thể bay.");
        // Thay vì bay, chúng ta sẽ chỉ rung giỏ hàng
        this.shakeCart();
        return;
      }

      const cardElement = startEvent.target.closest(".group");
      if (!cardElement) return;

      const rect = cardElement.getBoundingClientRect();
      this.startPosition = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
      this.flyingImage = imageSrc;
      this.isFlying = true;

      setTimeout(() => {
        this.isFlying = false;
        this.shakeCart();
      }, 800);
    },

    shakeCart() {
      this.isCartShaking = true;
      setTimeout(() => {
        this.isCartShaking = false;
      }, 500);
    },

    async fetchCart() {
      const { getCart } = await import("@/api/cartApi");
      try {
        const res = await getCart();
        this.cartItems = res.data?.items || [];
      } catch (e) {
        if (e.response && e.response.status === 401) {
          this.cartItems = [];
        } else {
          this.cartItems = [];
        }
      }
    },

    clearCart() {
      this.cartItems = [];
    },
  },
});

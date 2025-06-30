import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    // Dữ liệu cho hiệu ứng bay
    flyingImage: null,
    startPosition: { x: 0, y: 0 },
    isFlying: false,

    // Dữ liệu cho hiệu ứng rung giỏ hàng
    isCartShaking: false,
  }),
  actions: {
    // Kích hoạt hiệu ứng bay từ product card
    flyToCart(imageSrc, startEvent) {
      const rect = startEvent.target.closest(".group").getBoundingClientRect();
      this.startPosition = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
      this.flyingImage = imageSrc;
      this.isFlying = true;

      // Sau một khoảng thời gian ngắn, tắt trạng thái flying
      setTimeout(() => {
        this.isFlying = false;
        // Kích hoạt hiệu ứng rung giỏ hàng
        this.shakeCart();
      }, 800); // 800ms là thời gian bay
    },

    // Kích hoạt hiệu ứng rung cho giỏ hàng
    shakeCart() {
      this.isCartShaking = true;
      setTimeout(() => {
        this.isCartShaking = false;
      }, 500); // 500ms là thời gian rung
    },
  },
});

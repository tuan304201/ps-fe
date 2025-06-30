<template>
  <component :is="layout">
    <router-view />
  </component>

  <img
    v-if="cartStore.isFlying"
    :src="cartStore.flyingImage"
    class="flying-item"
    :style="flyingItemStyle"
    alt="Sản phẩm đang được thêm vào giỏ"
  />
</template>

<script>
import { computed, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { useCartStore } from "@/stores/cartStore";

export default {
  name: "App",
  components: {
    DefaultLayout,
  },
  setup() {
    const route = useRoute();
    const cartStore = useCartStore();
    const cartIconPosition = ref({ x: 0, y: 0 });

    const layout = computed(() => {
      return route.meta.layout || "DefaultLayout";
    });

    // Tính toán style động cho phần tử bay
    const flyingItemStyle = computed(() => {
      const { startPosition } = cartStore;
      return {
        "--start-x": `${startPosition.x}px`,
        "--start-y": `${startPosition.y}px`,
        "--end-x": `${cartIconPosition.value.x}px`,
        "--end-y": `${cartIconPosition.value.y}px`,
      };
    });

    // Lấy vị trí của icon giỏ hàng khi component được mount
    onMounted(() => {
      const cartIconEl = document.querySelector('[ref="cartIcon"]');
      if (cartIconEl) {
        const rect = cartIconEl.getBoundingClientRect();
        cartIconPosition.value = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
      }
    });

    return {
      layout,
      cartStore,
      flyingItemStyle,
    };
  },
};
</script>

<style>
.flying-item {
  position: fixed;
  z-index: 9999;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  animation: fly 0.8s cubic-bezier(0.5, 0, 1, 0.5) forwards;
  will-change: transform;
}

@keyframes fly {
  0% {
    left: var(--start-x);
    top: var(--start-y);
    transform: scale(1);
    opacity: 1;
  }
  100% {
    left: var(--end-x);
    top: var(--end-y);
    transform: scale(0.1);
    opacity: 0;
  }
}
</style>

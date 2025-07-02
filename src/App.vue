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

  <Toaster />
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { useCartStore } from "@/stores/cartStore";
import Toaster from "@/components/ui/toast/Toaster.vue";

export default {
  name: "App",
  components: {
    DefaultLayout,
    Toaster,
  },
  setup() {
    const route = useRoute();
    const cartStore = useCartStore();

    const layout = computed(() => {
      switch (route.meta.layout) {
        default:
          return "DefaultLayout";
      }
    });

    const flyingItemStyle = computed(() => {
      const { startPosition, cartIconPosition } = cartStore;
      return {
        // Lấy tất cả tọa độ từ store, không truy vấn DOM ở đây
        "--start-x": `${startPosition.x}px`,
        "--start-y": `${startPosition.y}px`,
        "--end-x": `${cartIconPosition.x}px`,
        "--end-y": `${cartIconPosition.y}px`,
      };
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
  border: 2px solid white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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

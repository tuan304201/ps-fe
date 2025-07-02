<template>
  <div class="group relative w-full rounded-lg border bg-white transition-all duration-300 hover:shadow-xl">
    <RouterLink :to="`/product/${id}`" class="block cursor-pointer">
      <div class="relative overflow-hidden rounded-t-lg">
        <div class="aspect-square">
          <img
            :src="mainImage"
            :alt="title"
            loading="lazy"
            class="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
          <img
            :src="hoverImage ? hoverImage : mainImage"
            :alt="title"
            loading="lazy"
            class="pointer-events-none absolute left-0 top-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
          />
        </div>
      </div>

      <div class="p-4 text-left">
        <h3 class="mb-4 h-12 font-semibold text-gray-800 line-clamp-2">
          {{ title }}
        </h3>
        <div class="flex items-end justify-between">
          <div class="flex flex-col">
            <span class="text-lg font-bold text-primary">{{ formatCurrency(price) }}</span>
            <span v-if="oldPrice" class="text-sm text-gray-400 line-through">
              {{ formatCurrency(oldPrice) }}
            </span>
          </div>

          <button
            @click.prevent="addToCart"
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-primary transition-all duration-300 hover:bg-primary hover:text-white"
            aria-label="Thêm vào giỏ hàng"
          >
            <Icon icon="ph:shopping-cart-simple-bold" class="size-5" />
          </button>
        </div>
      </div>
    </RouterLink>

    <div v-if="discount" class="absolute left-[-8.7px] top-3 rounded" aria-label="Giảm giá">
      <div class="bg-rose-500 px-3 py-1 shadow-md">
        <span class="font-bold text-white text-xs">Giảm {{ discount }}%</span>
      </div>
      <div class="absolute left-0 top-full h-0 w-0 border-t-8 border-l-8 border-t-rose-700 border-l-transparent"></div>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import { useCartStore } from "@/stores/cartStore";

export default {
  name: "CardProduct",
  components: { Icon },
  props: {
    id: { type: [String, Number], required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number, required: false },
    discount: { type: Number, required: false },
    mainImage: { type: String, required: true },
    hoverImage: { type: String, required: false },
  },
  setup(props) {
    const cartStore = useCartStore();

    const formatCurrency = (value) => {
      if (typeof value !== "number") return value;
      return value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
    };

    // Hàm addToCart nhận vào event
    const addToCart = (event) => {
      cartStore.flyToCart(props.mainImage, event);
    };

    return {
      formatCurrency,
      addToCart,
    };
  },
};
</script>

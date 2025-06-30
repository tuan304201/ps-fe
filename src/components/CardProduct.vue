<template>
  <div class="bg-white rounded overflow-hidden w-full cursor-pointer card__product" @click="goToProductDetail">
    <div class="relative group" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
      <img
        :src="mainImage"
        alt="product"
        class="absolute top-0 left-0 w-full transition-opacity duration-300"
        :class="{ 'opacity-0': isHovered, 'opacity-100': !isHovered }"
      />
      <img
        :src="hoverImage ? hoverImage : mainImage"
        alt="product hover"
        class="w-full transition-opacity duration-300"
        :class="hoverImage ? { 'opacity-100': isHovered, 'opacity-0': !isHovered } : ''"
      />
      <div class="absolute top-2 right-0 bg-discount text-white px-2 py-1 rounded-bl-lg text-sm font-bold">
        {{ discount ? `${discount}%` : "" }}
      </div>
    </div>
    <div class="p-2">
      <div class="line-clamp-2 text-ellipsis font-semibold">
        {{ title }}
      </div>
      <star-rating :rating="4" :read-only="true" :show-rating="false" :star-size="15"></star-rating>
      <div class="flex justify-between py-3">
        <div class="text-price font-semibold">{{ toVND(price) }}</div>
        <div class="text-gray-400 line-through">{{ toVND(oldPrice) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { toVND } from "@/utils/Helper";
import StarRating from "vue-star-rating";
export default {
  name: "Card Product",
  components: {
    StarRating,
  },
  props: {
    id: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: "",
    },
    discount: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
    oldPrice: {
      type: Number,
      default: 0,
    },
    mainImage: {
      type: String,
      default: "",
    },
    hoverImage: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isHovered: false,
    };
  },
  methods: {
    toVND,
    goToProductDetail() {
      this.$router.push(`/product/${this.id}`);
    },
  },
};
</script>

<style scoped>
.card__product {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
</style>

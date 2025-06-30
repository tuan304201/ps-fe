<template>
  <div class="grid grid-cols-2 gap-4 lg:grid-cols-6 md:grid-cols-3">
    <CardProduct
      v-for="item in data"
      :id="item.id"
      :title="item.title"
      :price="item.price"
      :oldPrice="item.oldPrice"
      :discount="item.discount"
      :mainImage="item.mainImage"
      :hoverImage="item.hoverImage"
    />
  </div>
  <div class="flex justify-center mt-6 text-primary font-semibold">
    <button class="hover:opacity-70">Xem tất cả</button>
  </div>
</template>

<script>
import CardProduct from "./CardProduct.vue";
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  components: {
    CardProduct,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped></style>

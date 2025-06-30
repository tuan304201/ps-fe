<template>
  <div class="container px-3 sm:px-4 lg:px-8 md:my-5 my-2">
    <div class="w-full">
      <div class="flex justify-between mb-4">
        <h3 class="text-2xl font-semibold text-primary">Dịch vụ chăm Pets</h3>

        <div class="w-36">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Sắp xếp theo..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup v-for="item in sortBy">
                <SelectItem :value="item.value">{{ item.title }} </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div class="product-list">
        <div v-if="servicesOfBoss.length">
          <div class="grid grid-cols-2 gap-4 lg:grid-cols-5 md:grid-cols-3">
            <CardProduct
              v-for="item in servicesOfBoss[0].listProduct"
              :title="item.title"
              :price="item.price"
              :oldPrice="item.oldPrice"
              :discount="item.discount"
              :mainImage="item.mainImage"
              :hoverImage="item.hoverImage"
            />
          </div>
        </div>

        <div v-else>
          <p>Không có sản phẩm nào</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Category from "@/components/Category.vue";
import Sheet from "@/components/Sheet.vue";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { servicesOfBoss } from "@/utils/FakeData";
import CardProduct from "@/components/CardProduct.vue";
export default {
  components: {
    Category,
    CardProduct,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
    Sheet,
  },
  data() {
    return {
      servicesOfBoss,
      sortBy: [
        { id: 1, title: "Mặc định", value: "mac_dinh" },
        { id: 2, title: "Tên A → Z", value: "ten_tang_dan" },
        { id: 3, title: "Tên Z → A", value: "ten_giam_dan" },
        { id: 4, title: "Giá tăng dần", value: "gia_tang_dan" },
        { id: 5, title: "Giá giảm dần", value: "gia_giam_dan" },
      ],
      isDesktop: window.innerWidth >= 768,
    };
  },
  methods: {},
  created() {},
};
</script>

<style scoped></style>

<template>
  <div class="container px-3 sm:px-4 lg:px-8 md:my-5 my-2">
    <div class="w-full">
      <h3 class="text-2xl font-semibold text-primary mb-4">Tin tức</h3>

      <div class="product-list">
        <div v-if="dataPosts.length">
          <div class="grid grid-cols-2 gap-4 lg:grid-cols-4 md:grid-cols-3">
            <NewsCard
              v-for="item in dataPosts"
              :content="item.content"
              :title="item.title"
              :image="item.image"
              :date="item.date"
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

import { dataPosts } from "@/utils/FakeData";
import NewsCard from "@/components/NewsCard.vue";
export default {
  components: {
    Category,
    NewsCard,
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
      dataPosts,
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

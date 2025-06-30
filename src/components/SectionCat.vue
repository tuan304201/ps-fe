<template>
  <Tabs :default-value="data[0].value" class="w-full mt-3 flex flex-col justify-center">
    <TabsList class="mb-6">
      <div v-for="item in data">
        <TabsTrigger :value="item.value"> {{ item.title }} </TabsTrigger>
      </div>
    </TabsList>
    <div v-for="item in data">
      <TabsContent :value="item.value">
        <div class="grid grid-cols-2 gap-4 lg:grid-cols-6 md:grid-cols-3">
          <CardProduct
            v-for="itemInList in item.listProduct"
            :title="itemInList.title"
            :price="itemInList.price"
            :oldPrice="itemInList.oldPrice"
            :discount="itemInList.discount"
            :mainImage="itemInList.mainImage"
            :hoverImage="itemInList.hoverImage"
          />
        </div>
        <div class="flex justify-center mt-6 text-primary font-semibold">
          <button class="hover:opacity-70">Xem tất cả</button>
        </div>
      </TabsContent>
    </div>
  </Tabs>
</template>

<script>
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CardProduct from "./CardProduct.vue";
export default {
  components: {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    CardProduct,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped></style>

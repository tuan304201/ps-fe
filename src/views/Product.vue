<template>
  <div class="container px-3 sm:px-4 lg:px-8 md:my-5 my-2">
    <div class="md:flex gap-10 block">
      <Category v-if="isDesktop" ref="desktopCategoryFilter" @filter-changed="updateProducts" />

      <div class="w-full">
        <h2 class="text-2xl font-semibold text-primary">Danh sách sản phẩm</h2>

        <div class="product-section flex md:flex-row flex-col min-h-16 justify-between">
          <div class="mb-4 order-2 md:order-1">
            <div v-if="selectedFilters.length">
              <div
                v-for="(filter, index) in selectedFilters"
                :key="index"
                class="filter-tag flex justify-center items-center"
              >
                <span>{{ filter.label }}</span>
                <button @click="removeFilter(filter)">x</button>
              </div>
              <button @click="clearFilters" class="ml-2 font-semibold text-discount hover:text-primary">
                Xóa tất cả
              </button>
            </div>
            <div v-else>{{ "" }}</div>
          </div>

          <div class="flex justify-between items-center order-1 md:order-2">
            <div v-if="!isDesktop">
              <button
                class="flex justify-center items-center gap-1 border-[1px] border-neutral-200 px-3 py-1 rounded-full"
                @click="openSheet"
              >
                <Icon icon="material-symbols-light:filter-alt" class="md:hidden" />
                <span>Lọc</span>
              </button>
              <Sheet ref="sheet">
                <div class="p-4">
                  <Category v-show="true" ref="mobileCategoryFilter" @filter-changed="updateProducts" />
                </div>
              </Sheet>
            </div>

            <div>
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
        </div>
        <div class="product-list">
          <div v-if="filteredProducts.length">
            <div class="grid grid-cols-2 gap-4 lg:grid-cols-5 md:grid-cols-3">
              <CardProduct
                v-for="item in filteredProducts"
                :title="item.name"
                :id="item.id"
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

    <Dialog v-model="showDeleteDialog">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bạn có chắc chắn muốn xóa sản phẩm này?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button @click="deleteProductConfirmed" variant="destructive">Xóa</Button>
          <Button @click="() => (showDeleteDialog = false)">Hủy</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
// import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { getAllProducts } from "@/api/productApi";
import CardProduct from "@/components/CardProduct.vue";
import { useToast } from "@/components/ui/toast/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ref } from "vue";

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
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
  },
  setup() {
    const { toast } = useToast();
    const showDeleteDialog = ref(false);
    const productToDelete = ref(null);
    const dataAllProduct = ref([]);
    const filteredProducts = ref([]);
    const selectedFilters = ref([]);
    const sortBy = [
      { id: 1, title: "Mặc định", value: "mac_dinh" },
      { id: 2, title: "Tên A → Z", value: "ten_tang_dan" },
      { id: 3, title: "Tên Z → A", value: "ten_giam_dan" },
      { id: 4, title: "Giá tăng dần", value: "gia_tang_dan" },
      { id: 5, title: "Giá giảm dần", value: "gia_giam_dan" },
    ];
    const isDesktop = ref(window.innerWidth >= 768);
    const filters = ref({});

    function updateProducts(filters) {
      selectedFilters.value = [];
      filters.tags.forEach((tag) => {
        selectedFilters.value.push({ type: "tags", value: tag, label: `${tag}` });
      });
      filters.brands.forEach((brand) => {
        selectedFilters.value.push({ type: "brands", value: brand, label: `${brand}` });
      });
      filters.types.forEach((type) => {
        selectedFilters.value.push({ type: "types", value: type, label: `${type}` });
      });
      if (filters.priceRange) {
        selectedFilters.value.push({
          type: "priceRange",
          value: filters.priceRange,
          label: `Khoảng giá: ${filters.priceRange}`,
        });
      }
      filteredProducts.value = dataAllProduct.value.filter((product) => {
        const noFilters =
          !filters.tags.length && !filters.brands.length && !filters.types.length && !filters.priceRange;
        if (noFilters) {
          return true;
        }
        const matchTags = !filters.tags.length || filters.tags.some((tag) => product.tags.includes(tag));
        const matchBrands = !filters.brands.length || filters.brands.some((brand) => product.brands.includes(brand));
        const matchTypes = !filters.types.length || filters.types.some((type) => product.types.includes(type));
        const matchPrice =
          !filters.priceRange ||
          (filters.priceRange === "Dưới 100k" && product.price < 100000) ||
          (filters.priceRange === "100k - 200k" && product.price >= 100000 && product.price <= 200000) ||
          (filters.priceRange === "200k - 500k" && product.price > 200000 && product.price <= 500000) ||
          (filters.priceRange === "Trên 500k" && product.price > 500000);
        return matchTags && matchBrands && matchTypes && matchPrice;
      });
    }

    function removeFilter(filter) {
      const categoryFilter = this.$refs.desktopCategoryFilter || this.$refs.mobileCategoryFilter;
      if (!categoryFilter) return;
      switch (filter.type) {
        case "tags":
          filters.value.tags = filters.value.tags.filter((tag) => tag !== filter.value);
          break;
        case "brands":
          filters.value.brands = filters.value.brands.filter((brand) => brand !== filter.value);
          break;
        case "types":
          filters.value.types = filters.value.types.filter((type) => type !== filter.value);
          break;
        case "priceRange":
          filters.value.priceRange = "";
          categoryFilter.resetPriceRange();
          break;
      }
      categoryFilter.syncFilters(filters.value);
      updateProducts(filters.value);
    }

    function clearFilters() {
      const categoryFilter = this.$refs.desktopCategoryFilter || this.$refs.mobileCategoryFilter;
      if (!categoryFilter) return;
      filters.value = {
        tags: [],
        brands: [],
        types: [],
        priceRange: "",
      };
      categoryFilter.syncFilters(filters.value);
      updateProducts(filters.value);
    }

    function updateIsDesktop() {
      isDesktop.value = window.innerWidth >= 768;
    }

    function openSheet() {
      this.$refs.sheet.openSheet();
    }

    function confirmDeleteProduct(product) {
      productToDelete.value = product;
      showDeleteDialog.value = true;
    }

    async function deleteProductConfirmed() {
      try {
        await deleteProduct(productToDelete.value.id);
        toast({ title: "Xóa sản phẩm thành công!", variant: "success" });
        const res = await getAllProducts();
        dataAllProduct.value = res.data;
        filteredProducts.value = res.data;
      } catch (e) {
        toast({ title: "Lỗi xóa sản phẩm!", description: "Không thể xóa sản phẩm.", variant: "destructive" });
      } finally {
        showDeleteDialog.value = false;
        productToDelete.value = null;
      }
    }

    return {
      dataAllProduct,
      filteredProducts,
      selectedFilters,
      sortBy,
      isDesktop,
      filters,
      showDeleteDialog,
      productToDelete,
      confirmDeleteProduct,
      deleteProductConfirmed,
      updateProducts,
      removeFilter,
      clearFilters,
      updateIsDesktop,
      openSheet,
    };
  },
  async created() {
    try {
      const res = await getAllProducts();
      this.dataAllProduct = res.data;
      this.filteredProducts = res.data;
    } catch (e) {
      // Xử lý lỗi nếu cần
    }
    this.updateIsDesktop();
    window.addEventListener("resize", this.updateIsDesktop);
  },
};
</script>

<style scoped>
.selected-filters h4 {
  font-size: 18px;
}

.filter-tag {
  display: inline-flex;
  align-items: center;
  background-color: #fff;
  color: #333;
  font-weight: 600;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 5px 12px;
  margin: 5px;
  font-size: 14px;
  cursor: default;
}

.filter-tag button {
  background: none;
  border: none;
  margin-left: 8px;
  color: #888;
  font-size: 16px;
  line-height: 1.6;
  cursor: pointer;
  padding: 0;
}

.filter-tag button:hover {
  color: hsl(var(--primary));
}
</style>

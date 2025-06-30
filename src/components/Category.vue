<template>
  <div>
    <h4 class="font-semibold mb-2">Tags</h4>
    <div v-for="tag in tags" :key="tag.id">
      <input type="checkbox" :id="tag.id" :value="tag.name" v-model="selectedTags" @change="fetchProducts" />
      <label class="whitespace-nowrap" :for="tag.id">{{ tag.name }}</label>
    </div>
    <div class="h-[1px] border-t-[1px] border-neutral-200/70 mt-4"></div>

    <h4 class="font-semibold mb-2 mt-4">Hãng sản xuất</h4>
    <div v-for="brand in displayedBrands" :key="brand.id">
      <input type="checkbox" :id="brand.id" :value="brand.name" v-model="selectedBrands" @change="fetchProducts" />
      <label class="whitespace-nowrap" :for="brand.id">{{ brand.name }}</label>
    </div>
    <div class="flex">
      <button v-if="brands.length > 5" @click="toggleShowAllBrands" class="mt-2 mx-auto">
        <div v-if="!showAllBrands" class="flex justify-center items-center text-primary hover:opacity-80 text-sm">
          <span>Xem thêm</span>
          <Icon icon="material-symbols-light:keyboard-arrow-down-rounded" class="size-6" />
        </div>
        <div v-else class="flex justify-center items-center text-primary hover:opacity-80 text-sm">
          <span>Thu gọn</span>
          <Icon icon="material-symbols-light:keyboard-arrow-up-rounded" class="size-6" />
        </div>
      </button>
    </div>
    <div class="h-[1px] border-t-[1px] border-neutral-200/70 mt-4"></div>

    <h4 class="font-semibold mb-2 mt-4">Loại sản phẩm</h4>
    <div v-for="type in types" :key="type.id">
      <input type="checkbox" :id="type.id" :value="type.name" v-model="selectedTypes" @change="fetchProducts" />
      <label class="whitespace-nowrap" :for="type.id">{{ type.name }}</label>
    </div>
    <div class="h-[1px] border-t-[1px] border-neutral-200/70 mt-4"></div>

    <h4 class="font-semibold mb-2 mt-4">Khoảng giá</h4>
    <div v-for="range in priceRanges" :key="range.id">
      <input
        type="radio"
        :id="range.id"
        name="priceRange"
        :value="range.name"
        v-model="selectedPriceRange"
        @change="fetchProducts"
      />
      <label class="whitespace-nowrap" :for="range.id">{{ range.name }}</label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: [
        { id: "tag1", name: "Flash Sale", value: "flash_sale" },
        { id: "tag2", name: "Giao Nhanh 24h", value: "fast_delivery" },
      ],
      brands: [
        { id: "brand1", name: "Aatas", value: "aatas" },
        { id: "brand2", name: "Absolute Holistic", value: "absolute_holistic" },
        { id: "brand3", name: "Bellotta", value: "bellotta" },
        { id: "brand4", name: "Catchy", value: "catchy" },
        { id: "brand5", name: "Catsrang", value: "catsrang" },
        { id: "brand6", name: "CattyMan", value: "cattyman" },
        { id: "brand7", name: "Ciao Chururu", value: "ciao_chururu" },
        { id: "brand8", name: "EGA Pets", value: "ega_pets" },
        { id: "brand9", name: "GimCat Đức", value: "gimcat_duc" },
        { id: "brand10", name: "Kaniva", value: "kaniva" },
      ],
      types: [
        { id: "type1", name: "Thức ăn khô", value: "thuc_an_kho" },
        { id: "type2", name: "Thức ăn ướt", value: "thuc_an_uot" },
        { id: "type3", name: "Snack cho mèo", value: "snack_cho_meo" },
      ],
      priceRanges: [
        { id: "range1", name: "Dưới 100k", value: "<100k" },
        { id: "range2", name: "100k - 200k", value: "100k-200k" },
        { id: "range3", name: "200k - 500k", value: "200k-500k" },
        { id: "range4", name: "Trên 500k", value: ">500k" },
      ],
      selectedPriceRange: "",
      selectedTags: [],
      selectedBrands: [],
      products: [],
      selectedTypes: [],
      showAllBrands: false,
    };
  },
  computed: {
    displayedBrands() {
      return this.showAllBrands ? this.brands : this.brands.slice(0, 5);
    },
  },
  methods: {
    fetchProducts() {
      const filters = {
        tags: this.selectedTags,
        brands: this.selectedBrands,
        priceRange: this.selectedPriceRange,
        types: this.selectedTypes,
      };

      this.$emit("filter-changed", filters);
    },

    resetPriceRange() {
      this.selectedPriceRange = "";
      this.fetchProducts();
    },

    syncFilters(filters) {
      this.selectedTags = filters.tags || [];
      this.selectedBrands = filters.brands || [];
      this.selectedTypes = filters.types || [];
      this.selectedPriceRange = filters.priceRange || "";
    },

    toggleShowAllBrands() {
      this.showAllBrands = !this.showAllBrands;
    },
  },
  created() {},
};
</script>

<style scoped>
input[type="checkbox"] {
  display: none;
}

input[type="checkbox"] + label {
  position: relative;
  padding-left: 30px;
  cursor: pointer;
  font-size: 16px;
  line-height: 20px;
  display: inline-block;
  color: #333;
}

input[type="checkbox"] + label:before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  border: 1px solid hsl(var(--primary));
  background-color: #fff;
  border-radius: 3px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

input[type="checkbox"]:checked + label:before {
  background-color: hsl(var(--primary));
  border-color: hsl(var(--primary));
}

input[type="checkbox"]:checked + label:after {
  content: "✓";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: white;
}

input[type="radio"] {
  display: none;
}

input[type="radio"] + label {
  position: relative;
  padding-left: 30px;
  cursor: pointer;
  font-size: 16px;
  line-height: 20px;
  display: inline-block;
  color: #333;
}

input[type="radio"] + label:before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  border: 1px solid hsl(var(--primary));
  background-color: #fff;
  border-radius: 50%;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

input[type="radio"]:checked + label:before {
  background-color: hsl(var(--primary));
  border-color: hsl(var(--primary));
}

input[type="radio"]:checked + label:after {
  content: "";
  position: absolute;
  left: 4px;
  top: 50%;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  background-color: white;
  border-radius: 50%;
}
</style>

<template>
  <div class="bg-white py-8">
    <div v-if="product" class="container mx-auto px-4">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <div class="mb-4 overflow-hidden rounded-lg border">
            <img :src="activeImage" :alt="product.name" class="h-full w-full object-cover aspect-square" />
          </div>
          <div class="grid grid-cols-5 gap-2">
            <button
              v-for="(image, index) in product.images"
              :key="index"
              @click="activeImage = image"
              class="overflow-hidden rounded-md border-2 transition-all"
              :class="activeImage === image ? 'border-primary' : 'border-transparent hover:border-primary/50'"
            >
              <img
                :src="image"
                :alt="`${product.name} - ảnh nhỏ ${index + 1}`"
                class="h-full w-full object-cover aspect-square"
              />
            </button>
          </div>
        </div>

        <div>
          <h1 class="text-3xl font-bold text-gray-900">{{ product.name }}</h1>
          <div class="mt-2 flex items-center text-sm text-gray-500">
            <span
              >Thương hiệu: <a href="#" class="font-medium text-primary">{{ product.brand }}</a></span
            >
            <span class="mx-2">|</span>
            <span>Mã sản phẩm: {{ product.sku }}</span>
          </div>

          <div class="mt-6 rounded-lg bg-rose-50 p-4">
            <div class="flex items-center justify-between">
              <span class="text-3xl font-bold text-red-600">{{ formatCurrency(product.price) }}</span>
              <span class="rounded-md bg-red-600 px-2 py-1 text-sm font-semibold text-white">
                -{{ Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) }}%
              </span>
            </div>
            <p class="mt-1 text-gray-500">
              Giá cũ: <span class="line-through">{{ formatCurrency(product.originalPrice) }}</span>
            </p>
          </div>

          <div class="mt-6 rounded-lg border border-green-200 bg-green-50 p-4">
            <h3 class="font-semibold text-green-800">Quà tặng khuyến mãi</h3>
            <ul class="mt-2 grid grid-cols-1 gap-x-6 gap-y-2 text-sm text-gray-700 sm:grid-cols-2">
              <li v-for="promo in product.promotions" :key="promo" class="flex items-start">
                <Icon icon="ph:check-circle-bold" class="mr-2 mt-1 h-4 w-4 shrink-0 text-green-600" />
                <span>{{ promo }}</span>
              </li>
            </ul>
          </div>

          <div class="mt-6">
            <h4 class="font-semibold text-gray-700">Kích thước:</h4>
            <div class="mt-2 flex flex-wrap gap-2">
              <button
                v-for="size in product.sizes"
                :key="size"
                @click="selectedSize = size"
                class="rounded-lg border px-5 py-2 text-sm font-medium transition-colors"
                :class="selectedSize === size ? 'border-primary bg-primary text-white' : 'hover:border-primary/50'"
              >
                {{ size }}
              </button>
            </div>
          </div>

          <div class="mt-6">
            <h4 class="font-semibold text-gray-700">Số lượng:</h4>
            <div class="mt-2 flex items-center border rounded-lg w-fit">
              <button @click="quantity = Math.max(1, quantity - 1)" class="p-3 hover:bg-gray-100 rounded-l-lg">
                <Icon icon="ph:minus" class="w-4 h-4" />
              </button>
              <span class="w-12 text-center text-lg font-medium">{{ quantity }}</span>
              <button @click="quantity++" class="p-3 hover:bg-gray-100 rounded-r-lg">
                <Icon icon="ph:plus" class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div class="mt-8 space-y-3">
            <div class="flex gap-2 justify-between items-center">
              <button
                class="w-full rounded-lg bg-primary px-8 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90 shadow-md"
              >
                Mua ngay
              </button>
              <button
                class="w-full rounded-lg border-2 border-primary bg-white px-8 py-3 text-base font-semibold text-primary transition-colors hover:bg-primary/5 shadow-md"
              >
                Thêm vào giỏ
              </button>
            </div>
            <div class="text-sm text-gray-500 space-y-1">
              <p>
                <Icon icon="ph:truck-bold" class="inline-block mr-1 align-middle" /> Giao hàng miễn phí trong 24h (chỉ
                áp dụng khu vực nội thành)
              </p>
              <p>
                <Icon icon="ph:credit-card-bold" class="inline-block mr-1 align-middle" /> Trả góp lãi suất 0% qua thẻ
                tín dụng Visa, Master, JCB
              </p>
              <p>
                <Icon icon="ph:arrow-counter-clockwise-bold" class="inline-block mr-1 align-middle" /> Đổi trả miễn phí
                trong 30 ngày
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-12">
        <Tabs default-value="features" class="w-full">
          <TabsList class="border-b justify-start rounded-none bg-transparent p-0">
            <TabsTrigger
              value="features"
              class="relative rounded-none border-b-2 border-transparent bg-transparent px-4 py-3 font-semibold text-gray-500 shadow-none transition-none data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-none"
            >
              Đặc điểm nổi bật
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              class="relative rounded-none border-b-2 border-transparent bg-transparent px-4 py-3 font-semibold text-gray-500 shadow-none transition-none data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-none"
            >
              Đánh giá sản phẩm
            </TabsTrigger>
          </TabsList>
          <TabsContent value="features" class="mt-6 prose max-w-none">
            <p>{{ product.description }}</p>
            <ul class="list-disc pl-5">
              <li>Ngăn ngừa lông vón cục trong ruột mèo.</li>
              <li>Hàm lượng dinh dưỡng cân bằng, phù hợp mọi lứa tuổi.</li>
              <li>Sử dụng protein cao cấp, tốt cho hệ tiêu hóa.</li>
              <li>Không chất bảo quản, không kháng sinh, không màu nhân tạo.</li>
            </ul>
          </TabsContent>
          <TabsContent value="reviews" class="mt-6">
            <!-- Tổng quan đánh giá -->
            <div v-if="reviews.length" class="mb-8 p-4 rounded-lg border bg-gray-50">
              <div class="flex flex-col md:flex-row md:items-center md:gap-8 gap-4">
                <div class="flex flex-col items-center justify-center min-w-[120px]">
                  <div class="flex items-center gap-1">
                    <span class="text-4xl font-bold text-yellow-500">{{ averageRating }}</span>
                    <Icon icon="ph:star-fill" class="w-7 h-7 text-yellow-500" />
                  </div>
                  <div class="text-gray-600 text-sm mt-1">Trung bình trên {{ totalReviews }} đánh giá</div>
                </div>
                <div class="flex-1 w-full">
                  <div
                    v-for="i in 5"
                    :key="i"
                    class="flex items-center gap-2 mb-1 cursor-pointer select-none"
                    @click="filterRating = 6 - i"
                  >
                    <span
                      :class="[
                        'w-8 text-sm flex items-center gap-0.5',
                        filterRating === 6 - i ? 'text-primary font-bold' : 'text-gray-700',
                      ]"
                    >
                      {{ 6 - i }} <Icon icon="ph:star-fill" class="inline-block text-yellow-500 w-4 h-4" />
                    </span>
                    <div class="flex-1 h-3 rounded bg-gray-200 overflow-hidden">
                      <div
                        class="h-full rounded bg-primary transition-all"
                        :style="{ width: (((ratingBreakdown[6 - i] || 0) / totalReviews) * 100 || 0) + '%' }"
                      ></div>
                    </div>
                    <span class="w-6 text-xs text-gray-500 text-right">{{ ratingBreakdown[6 - i] || 0 }}</span>
                  </div>
                  <button v-if="filterRating" @click="filterRating = null" class="mt-2 text-xs text-primary underline">
                    Xóa lọc
                  </button>
                </div>
              </div>
            </div>
            <!-- End Tổng quan đánh giá -->
            <div v-if="filteredReviews.length > 0" class="space-y-6">
              <div v-for="review in filteredReviews" :key="review.id" class="border rounded-md p-4">
                <div class="flex items-center mb-2">
                  <span class="font-semibold text-gray-800">{{ review.author }}</span>
                  <span class="ml-2 text-gray-500 text-sm">({{ formatDate(review.date) }})</span>
                </div>
                <div class="flex items-center mb-2">
                  <template v-for="i in 5" :key="i">
                    <Icon
                      icon="ph:star-fill"
                      :class="i <= review.rating ? 'text-yellow-500' : 'text-gray-300'"
                      class="h-4 w-4 mr-1"
                    />
                  </template>
                </div>
                <p class="text-gray-700">{{ review.comment }}</p>

                <div v-if="review.media?.length" class="mt-2 grid grid-cols-3 gap-2">
                  <div
                    v-for="(file, index) in review.media"
                    :key="index"
                    class="rounded-md overflow-hidden border group relative"
                  >
                    <img
                      v-if="file.type.startsWith('image/')"
                      :src="file.previewUrl"
                      class="w-full h-24 object-cover group-hover:scale-105 transition"
                    />
                    <video
                      v-else-if="file.type.startsWith('video/')"
                      :src="file.previewUrl"
                      controls
                      class="w-full h-24 object-cover bg-black"
                    ></video>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-gray-500">
              Chưa có đánh giá nào cho sản phẩm này. Hãy là người đầu tiên đánh giá!
            </div>
            <Dialog v-model:open="isDialogOpen">
              <DialogTrigger as-child class="w-full flex justify-center">
                <Button variant="link" class="mt-4 text-primary font-semibold hover:underline p-0 h-auto">
                  Viết đánh giá của bạn
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Viết đánh giá của bạn</DialogTitle>
                <form @submit.prevent="submitReview" class="space-y-4">
                  <div>
                    <Label for="review-author">Tên của bạn</Label>
                    <Input id="review-author" v-model="reviewForm.author" required />
                  </div>
                  <div>
                    <Label>Đánh giá</Label>
                    <div class="flex items-center gap-1">
                      <span v-for="i in 5" :key="i" @click="reviewForm.rating = i" class="cursor-pointer">
                        <Icon
                          icon="ph:star-fill"
                          :class="i <= reviewForm.rating ? 'text-yellow-500' : 'text-gray-300'"
                          class="h-6 w-6"
                        />
                      </span>
                    </div>
                  </div>
                  <div>
                    <Label for="review-comment">Nhận xét</Label>
                    <textarea
                      id="review-comment"
                      v-model="reviewForm.comment"
                      required
                      class="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-primary/50"
                      style="resize: none"
                    />
                  </div>
                  <div>
                    <Label for="review-media">Hình ảnh / Video</Label>
                    <div class="flex flex-col gap-2">
                      <label
                        for="review-media"
                        class="flex items-center justify-center gap-2 border-2 border-dashed border-primary/40 rounded-lg px-4 py-3 cursor-pointer hover:bg-primary/5 transition"
                      >
                        <Icon icon="ph:image-bold" class="text-primary w-6 h-6" />
                        <span class="text-primary font-medium">Chọn hình ảnh hoặc video</span>
                      </label>
                      <input
                        id="review-media"
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        @change="handleMediaUpload"
                        class="hidden"
                      />
                      <div v-if="reviewMedia.length" class="grid grid-cols-3 gap-2 mt-2">
                        <div
                          v-for="(file, idx) in reviewMedia"
                          :key="idx"
                          class="relative group rounded-md overflow-hidden border"
                        >
                          <img
                            v-if="file.type.startsWith('image/')"
                            :src="file.previewUrl"
                            class="w-full h-20 object-cover"
                          />
                          <video
                            v-else-if="file.type.startsWith('video/')"
                            :src="file.previewUrl"
                            class="w-full h-20 object-cover bg-black"
                            muted
                          />
                          <button
                            type="button"
                            @click="removeMedia(idx)"
                            class="absolute top-1 right-1 bg-white/80 rounded-full p-1 text-red-500 hover:bg-white"
                            title="Xóa"
                          >
                            <Icon icon="ph:x-bold" class="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Gửi đánh giá</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </TabsContent>
        </Tabs>
      </div>
      <!-- Related Products Section -->
      <div class="mt-16">
        <h2 class="text-2xl font-bold mb-6 text-primary text-center">Sản phẩm liên quan</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <CardProduct
            v-for="item in relatedProducts"
            :key="item.id"
            :id="item.id"
            :title="item.name"
            :price="item.price"
            :oldPrice="item.oldPrice"
            :discount="item.discount"
            :mainImage="item.mainImage"
            :hoverImage="item.hoverImage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { Icon } from "@iconify/vue";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CardProduct from "@/components/CardProduct.vue";
import { dataAllProduct } from "@/utils/FakeData";

// Sample Product Data
const product = ref({
  id: 1,
  name: "Hạt Cho Mèo Mọi Lứa Tuổi Catsrang",
  brand: "Catsrang",
  sku: "CR2131000TC",
  price: 85000,
  originalPrice: 90000,
  images: [
    "https://bizweb.dktcdn.net/100/527/383/products/1-8975a5e3-c242-4f05-b827-0b5c13b7e61b.jpg",
    "https://bizweb.dktcdn.net/100/527/383/products/5-0d418904-4530-4e5a-9426-3d60678f9de6.jpg",
    "https://bizweb.dktcdn.net/100/527/383/products/6-13d80e81-2292-411a-8280-92892973e440.jpg",
    "https://bizweb.dktcdn.net/100/527/383/products/7-230d0758-2ed3-424a-89a3-5c05c3bd1788.jpg",
    "https://bizweb.dktcdn.net/100/527/383/products/8-f14d86c4-b903-4c9f-ab51-6c2e71d371d3.jpg",
  ],
  promotions: [
    "Nhập mã EGANY thêm 5% đơn hàng",
    "Giảm giá 10% khi mua từ 2 sản phẩm",
    "Giảm giá 10% khi mua từ 5 sản phẩm",
    "Tặng phiếu mua hàng khi mua từ 500K",
  ],
  sizes: ["Túi Chia 1kg", "3kg", "5kg"],
  description:
    "Với đặc tính dễ tiêu, hạt Catsrang giúp mèo đi phân rắn và giảm thiểu mùi hôi khó chịu. Ngăn ngừa lông vón cục trong ruột mèo. Hàm lượng dinh dưỡng cân bằng, Catsrang phù hợp trong việc cải thiện da lông, phòng tránh bệnh quáng gà ở mèo. Sử dụng protein cao cấp tốt cho hệ tiêu hóa. Đặc biệt, sản phẩm không sử dụng chất bảo quản, chất kháng sinh, phẩm màu hay hương liệu nhân tạo khác.",
});

const activeImage = ref(product.value.images?.[0]);
const selectedSize = ref(product.value.sizes?.[0]);
const quantity = ref(1);
const isDialogOpen = ref(false);

const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
};

// Fake Reviews Data
const reviews = ref([
  {
    id: 1,
    author: "Minh Anh",
    rating: 5,
    comment: "Sản phẩm chất lượng tốt, mèo nhà mình rất thích ăn.",
    date: "2023-10-26",
  },
  {
    id: 2,
    author: "Hoàng Nam",
    rating: 4,
    comment: "Giá cả hợp lý, giao hàng nhanh chóng.",
    date: "2023-11-15",
  },
  {
    id: 3,
    author: "Thùy Dung",
    rating: 5,
    comment: "Mèo kén ăn của mình cũng mê món này!",
    date: "2023-12-01",
  },
]);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return date.toLocaleDateString("vi-VN", options);
};

const reviewForm = ref({
  author: "",
  rating: 0,
  comment: "",
});

const reviewMedia = ref([]);

function handleMediaUpload(e) {
  const files = Array.from(e.target.files);
  reviewMedia.value.push(
    ...files.map((file) => ({
      file,
      type: file.type,
      previewUrl: URL.createObjectURL(file),
    })),
  );
}

function removeMedia(idx) {
  // Thu hồi URL khi xóa
  if (reviewMedia.value[idx] && reviewMedia.value[idx].previewUrl) {
    URL.revokeObjectURL(reviewMedia.value[idx].previewUrl);
  }
  reviewMedia.value.splice(idx, 1);
}

function submitReview() {
  if (!reviewForm.value.author || !reviewForm.value.rating || !reviewForm.value.comment) return;
  reviews.value.unshift({
    id: Date.now(),
    author: reviewForm.value.author,
    rating: reviewForm.value.rating,
    comment: reviewForm.value.comment,
    date: new Date().toISOString().slice(0, 10),
    media: reviewMedia.value.map((m) => ({ type: m.type, previewUrl: m.previewUrl })),
  });
  // Thu hồi URL khi submit xong
  reviewMedia.value.forEach((m) => m.previewUrl && URL.revokeObjectURL(m.previewUrl));
  reviewForm.value = { author: "", rating: 0, comment: "" };
  reviewMedia.value = [];
  isDialogOpen.value = false;
}

const relatedProducts = computed(() => {
  return dataAllProduct.filter((p) => p.id !== product.value.id).slice(0, 4);
});

const averageRating = computed(() => {
  if (!reviews.value.length) return 0;
  const sum = reviews.value.reduce((acc, r) => acc + (r.rating || 0), 0);
  return (sum / reviews.value.length).toFixed(1);
});
const totalReviews = computed(() => reviews.value.length);
const ratingBreakdown = computed(() => {
  const breakdown = {};
  for (let i = 1; i <= 5; i++) breakdown[i] = 0;
  reviews.value.forEach((r) => {
    if (r.rating && breakdown[r.rating] !== undefined) breakdown[r.rating]++;
  });
  return breakdown;
});

const filterRating = ref(null);
const filteredReviews = computed(() => {
  if (!filterRating.value) return reviews.value;
  return reviews.value.filter((r) => r.rating === filterRating.value);
});

onMounted(() => {
  if (product.value && product.value.name) {
    window.__CURRENT_PRODUCT_NAME__ = product.value.name;
  }
});
watch(product, (val) => {
  if (val && val.name) {
    window.__CURRENT_PRODUCT_NAME__ = val.name;
  }
});
</script>

<style scoped>
.prose {
  font-size: 1rem;
  line-height: 1.75;
}
.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  color: hsl(var(--foreground));
  font-weight: 600;
  line-height: 1.25;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
}
.prose p {
  margin-top: 1em;
  margin-bottom: 1em;
  color: hsl(var(--foreground));
}
.prose ul,
.prose ol {
  margin-top: 1em;
  margin-bottom: 1em;
  padding-left: 1.5em;
}
.prose li {
  color: hsl(var(--foreground));
}
</style>

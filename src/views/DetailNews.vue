<template>
  <div class="container px-3 sm:px-4 lg:px-8 md:my-5 my-2">
    <div v-if="post" class="w-full">
      <div class="lg:grid lg:grid-cols-3 lg:gap-8">
        <main class="lg:col-span-2">
          <article>
            <h1 class="text-3xl lg:text-4xl font-bold text-primary mb-4 leading-tight">
              {{ post.title }}
            </h1>

            <div class="flex items-center text-sm text-neutral-500 mb-6">
              <span>Đăng bởi: **Admin**</span>
              <span class="mx-2">|</span>
              <div class="flex items-center gap-1">
                <Icon icon="material-symbols-light:date-range" class="size-5" />
                <span>{{ post.date }}</span>
              </div>
            </div>

            <div class="mb-8">
              <img :src="post.image" :alt="post.title" class="w-full rounded-lg shadow-md" />
            </div>

            <div class="prose max-w-none text-lg text-gray-800 leading-relaxed">
              <p class="mb-6">
                {{ post.content }}
              </p>
              <p class="mb-6">
                Việc chăm sóc thú cưng không chỉ dừng lại ở việc cho ăn và dắt đi dạo. Để "boss" của bạn luôn khỏe mạnh
                và vui vẻ, việc hiểu rõ về các khía cạnh khác như dinh dưỡng, tâm lý, và sức khỏe là vô cùng quan trọng.
                Bài viết này sẽ cung cấp cho bạn những kiến thức chuyên sâu để trở thành một người chủ tuyệt vời.
              </p>

              <h2 class="text-2xl font-semibold text-primary mt-8 mb-4">Tầm Quan Trọng Của Dinh Dưỡng Cân Bằng</h2>
              <p class="mb-6">
                Một chế độ ăn uống cân bằng là nền tảng cho sức khỏe của thú cưng. Mỗi loại chó, mèo ở các độ tuổi khác
                nhau sẽ có nhu cầu dinh dưỡng khác nhau.
              </p>
              <ul class="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Thức ăn khô (Hạt):</strong> Tiện lợi, giúp làm sạch răng và cung cấp đủ năng lượng.</li>
                <li>
                  <strong>Thức ăn ướt (Pate):</strong> Cung cấp nước, kích thích vị giác, đặc biệt tốt cho các bé mèo
                  lười uống nước.
                </li>
                <li>
                  <strong>Snacks và Bánh thưởng:</strong> Dùng trong huấn luyện và tạo sự gắn kết, nhưng cần kiểm soát
                  số lượng để tránh béo phì.
                </li>
              </ul>
            </div>
          </article>
        </main>

        <aside class="mt-12 lg:mt-0">
          <div class="sticky top-28">
            <h3 class="text-xl font-semibold text-primary mb-4 border-l-4 border-primary pl-3">Bài viết liên quan</h3>
            <div class="space-y-6">
              <router-link
                v-for="relatedPost in relatedPosts"
                :key="relatedPost.id"
                :to="`/tin-tuc/${relatedPost.id}`"
                class="flex items-center gap-4 group"
              >
                <img
                  :src="relatedPost.image"
                  :alt="relatedPost.title"
                  class="w-24 h-24 object-cover rounded-md flex-shrink-0"
                />
                <div>
                  <h4 class="font-semibold text-md group-hover:text-primary transition-colors line-clamp-2">
                    {{ relatedPost.title }}
                  </h4>
                  <p class="text-sm text-neutral-500">{{ relatedPost.date }}</p>
                </div>
              </router-link>
            </div>
          </div>
        </aside>
      </div>
    </div>
    <div v-else class="text-center py-20">
      <h1 class="text-2xl font-bold">Không tìm thấy bài viết</h1>
      <router-link to="/tin-tuc" class="text-primary hover:underline mt-4 inline-block">
        Quay lại trang tin tức
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { dataPosts } from "@/utils/FakeData"; // Import dữ liệu tĩnh
import { Icon } from "@iconify/vue";

const route = useRoute();
const post = ref(null);
const relatedPosts = ref([]);

// Hàm để lấy dữ liệu bài viết
const fetchPostData = () => {
  const postId = parseInt(route.params.id);
  const foundPost = dataPosts.find((p) => p.id === postId);

  if (foundPost) {
    post.value = foundPost;
    relatedPosts.value = dataPosts.filter((p) => p.id !== postId).slice(0, 3);
  } else {
    post.value = null;
  }
};

onMounted(() => {
  fetchPostData();
});

watch(
  () => route.params.id,
  () => {
    fetchPostData();
    window.scrollTo(0, 0);
  },
);
</script>

<style scoped>
.prose h2 {
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 600;
  color: hsl(var(--primary));
  margin-top: 2rem;
  margin-bottom: 1rem;
}
</style>

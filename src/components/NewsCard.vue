<template>
  <router-link :to="`/tin-tuc/${id || 'default'}`" class="card__news block">
    <div class="overflow-hidden rounded-tl-md rounded-tr-md">
      <img :src="image" :alt="title" class="img__news" />
    </div>
    <div class="px-4 py-4">
      <h2 class="font-semibold text-md line-clamp-2 title__news">{{ title }}</h2>
      <p class="line-clamp-2 text-neutral-400/80 mt-3">{{ content }}</p>
    </div>

    <div class="h-[1px] border-t-[1px] border-neutral-200/70"></div>

    <div class="flex flex-col md:flex-row gap-2 md:gap-0 justify-between items-center px-4 py-4 rounded-md">
      <div class="text-neutral-400/80 flex justify-center items-center gap-1">
        <Icon icon="material-symbols-light:date-range" class="size-5" />{{ date }}
      </div>
      <button
        class="border-[1px] border-primary text-primary rounded-full px-4 py-2 font-semibold text-sm hover:bg-primary hover:text-white transition-all"
      >
        Xem chi tiết
      </button>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    id: {
      type: [String, Number],
      required: false, // Thay đổi từ true thành false
      default: null,
    },
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.card__news:hover .img__news {
  transform: scale(1.05);
  transition: all 0.3s;
}

.card__news {
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

.title__news {
  min-height: calc(1.5em * 2);
}
</style>

<template>
  <div class="overflow-x-hidden bg-slate-50 rounded">
    <section class="relative bg-gradient-to-r from-rose-500 to-primary py-5 text-white md:py-5">
      <div
        class="pointer-events-none absolute inset-0 bg-[url('@/assets/images/coll_title_ic.webp')] bg-repeat opacity-5"
      ></div>
      <div class="absolute inset-0 bg-black/20"></div>

      <div class="container relative text-center">
        <h1 class="text-4xl font-extrabold tracking-tight md:text-6xl">FLASH SALE</h1>
        <p class="mx-auto mt-2 text-lg text-white/90">
          Cơ hội săn deal hot nhất trong ngày! Đừng bỏ lỡ những ưu đãi cực lớn sẽ kết thúc sau...
        </p>

        <div class="mx-auto mt-2 flex max-w-2xl items-center justify-center space-x-2 md:space-x-4">
          <div class="flex flex-col items-center">
            <div
              class="flex h-16 w-16 items-center justify-center rounded-lg bg-white/20 text-3xl font-bold backdrop-blur-sm md:h-24 md:w-24 md:text-5xl"
            >
              <transition name="slide-up" mode="out-in">
                <span :key="timeLeft.days">{{ formatTime(timeLeft.days) }}</span>
              </transition>
            </div>
            <span class="mt-2 text-xs font-semibold uppercase tracking-wider md:text-sm">Ngày</span>
          </div>
          <div class="text-3xl font-bold md:text-5xl">:</div>

          <div class="flex flex-col items-center">
            <div
              class="flex h-16 w-16 items-center justify-center rounded-lg bg-white/20 text-3xl font-bold backdrop-blur-sm md:h-24 md:w-24 md:text-5xl"
            >
              <transition name="slide-up" mode="out-in">
                <span :key="timeLeft.hours">{{ formatTime(timeLeft.hours) }}</span>
              </transition>
            </div>
            <span class="mt-2 text-xs font-semibold uppercase tracking-wider md:text-sm">Giờ</span>
          </div>
          <div class="text-3xl font-bold md:text-5xl">:</div>

          <div class="flex flex-col items-center">
            <div
              class="flex h-16 w-16 items-center justify-center rounded-lg bg-white/20 text-3xl font-bold backdrop-blur-sm md:h-24 md:w-24 md:text-5xl"
            >
              <transition name="slide-up" mode="out-in">
                <span :key="timeLeft.minutes">{{ formatTime(timeLeft.minutes) }}</span>
              </transition>
            </div>
            <span class="mt-2 text-xs font-semibold uppercase tracking-wider md:text-sm">Phút</span>
          </div>
          <div class="text-3xl font-bold md:text-5xl">:</div>

          <div class="flex flex-col items-center">
            <div
              class="flex h-16 w-16 items-center justify-center rounded-lg bg-white/20 text-3xl font-bold backdrop-blur-sm md:h-24 md:w-24 md:text-5xl"
            >
              <transition name="slide-up" mode="out-in">
                <span :key="timeLeft.seconds">{{ formatTime(timeLeft.seconds) }}</span>
              </transition>
            </div>
            <span class="mt-2 text-xs font-semibold uppercase tracking-wider md:text-sm">Giây</span>
          </div>
        </div>
      </div>
      <div class="container px-4 py-2 md:py-4">
        <Carousel
          class="relative w-full"
          :opts="{
            align: 'center',
            loop: true,
          }"
        >
          <CarouselContent>
            <CarouselItem
              class="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 cursor-default text-black"
              v-for="item in listProduct"
              :key="item.id"
            >
              <CardProduct
                :id="item.id"
                :title="item.title"
                :price="item.price"
                :oldPrice="item.oldPrice"
                :discount="item.discount"
                :mainImage="item.mainImage"
                :hoverImage="item.hoverImage"
                :isHover="item.isHover"
              />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious class="carousel-control absolute hidden" />
          <CarouselNext class="carousel-control absolute hidden" />
        </Carousel>
      </div>
    </section>
  </div>
</template>

<script>
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import CardProduct from "@/components/CardProduct.vue";
import { listProduct } from "@/utils/FakeData";

export default {
  name: "FlashSalePage", // Đổi tên để tránh trùng với component FlashSale cũ
  components: {
    CardProduct,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  },
  data() {
    return {
      // Dữ liệu cho Carousel sản phẩm
      listProduct,

      // Dữ liệu cho Countdown Timer
      targetDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // VD: 1 ngày
      timeLeft: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      timerInterval: null,
    };
  },
  methods: {
    updateCountdown() {
      const now = new Date();
      const difference = this.targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(this.timerInterval);
        this.timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        return;
      }

      this.timeLeft.days = Math.floor(difference / (1000 * 60 * 60 * 24));
      this.timeLeft.hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.timeLeft.minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      this.timeLeft.seconds = Math.floor((difference % (1000 * 60)) / 1000);
    },
    formatTime(time) {
      return time < 10 ? "0" + time : time;
    },
  },
  mounted() {
    this.updateCountdown();
    this.timerInterval = setInterval(this.updateCountdown, 1000);
  },
  beforeUnmount() {
    clearInterval(this.timerInterval);
  },
};
</script>

<style scoped>
/* Hiệu ứng chuyển cảnh cho số đếm ngược */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>

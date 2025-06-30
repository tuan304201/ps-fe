<template>
  <div class="bg-flashsale rounded p-6">
    <div class="text-white flex justify-between mb-6">
      <div class="text-3xl font-bold flex">
        <h1 class="relative">
          FLASH SALE
          <img
            src="@/assets/images/coll_title_ic.webp"
            alt="coll_title_ic"
            class="absolute -top-4 -right-10 hidden md:block"
          />
        </h1>
      </div>
      <div class="flex items-center gap-3">
        <div class="countdown flex gap-2 items-center">
          <div class="countdown-item">
            <span>{{ countdown.hours }}</span>
          </div>
          <div class="countdown-item">
            <span>{{ countdown.minutes }}</span>
          </div>
          <div class="countdown-item">
            <span>{{ countdown.seconds }}</span>
          </div>
        </div>
      </div>
    </div>

    <Carousel
      class="relative w-full"
      :opts="{
        align: 'center',
      }"
    >
      <CarouselContent>
        <CarouselItem
          class="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 cursor-default"
          v-for="item in listProduct"
          :key="item.id"
        >
          <CardProduct
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
</template>

<script>
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import CardProduct from "./CardProduct.vue";
import { listProduct } from "@/utils/FakeData";
export default {
  name: "FlashSale",
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
      countdown: {
        hours: "00",
        minutes: "00",
        seconds: "00",
      },
      saleEndTime: new Date().getTime() + 12 * 60 * 60 * 1000,
      listProduct,
    };
  },
  mounted() {
    this.startCountdown();
  },
  methods: {
    startCountdown() {
      setInterval(() => {
        const now = new Date().getTime();
        const distance = this.saleEndTime - now;
        if (distance <= 0) {
          this.countdown = { hours: "00", minutes: "00", seconds: "00" };
        } else {
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          this.countdown = {
            hours: String(hours).padStart(2, "0"),
            minutes: String(minutes).padStart(2, "0"),
            seconds: String(seconds).padStart(2, "0"),
          };
        }
      }, 1000);
    },
  },
};
</script>

<style scoped>
.countdown-item {
  background-color: #facc15;
  color: #000;
  padding: 0.5rem;
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 45px;
}

.countdown-item span {
  font-size: 1.2rem;
  font-weight: bold;
}
</style>

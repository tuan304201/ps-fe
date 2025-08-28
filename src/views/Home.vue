<template>
  <slide-banner />
  <section>
    <div class="bg-primary flex items-center gap-3 w-full">
      <h2 class="font-semibold text-white py-3 md:py-5 m-auto text-md md:text-xl">
        MUA CÀNG NHIỀU GIẢM CÀNG SÂU - giảm đến 50%
      </h2>
    </div>
  </section>
  <div class="container px-3 sm:px-4 lg:px-8">
    <section class="py-2 my-4">
      <div class="container grid grid-cols-2 gap-4 px-4 md:grid-cols-4 md:gap-6">
        <div
          v-for="item in policy"
          :key="item.title"
          class="group flex flex-col items-center rounded-xl border border-transparent bg-white p-4 text-center shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-primary/30 hover:shadow-xl"
        >
          <Icon
            :icon="item.icon"
            class="mb-2 size-12 text-primary transition-transform duration-300 group-hover:scale-110"
          />
          <div>
            <div class="text-md font-bold text-gray-800">{{ item.title }}</div>
            <div class="mt-1 text-sm text-neutral-600 hidden sm:block">
              {{ item.description }}
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <FlashSale />
    </section>
    <section class="pt-10">
      <div class="mb-8 text-center md:mb-12">
        <div class="text-3xl font-bold flex justify-center mt-10">
          <h2 class="relative text-primary">
            Mã giảm giá độc quyền
            <img
              src="@/assets/images/coll_title_ic.webp"
              alt="coll_title_ic"
              class="absolute -top-4 -right-10 hidden md:block"
            />
          </h2>
        </div>

        <p class="mx-auto mt-2 max-w-xl text-gray-600">Sử dụng ngay những mã coupon giá trị này trước khi hết hạn!</p>
      </div>
      <DiscountCard />
    </section>

    <img
      src="https://bizweb.dktcdn.net/100/527/383/themes/964940/assets/banner_image.jpg?1730347951357"
      alt="banner_image"
      class="mt-10 w-full fill-transparent"
    />

    <section>
      <div class="text-3xl font-bold flex justify-center mt-10">
        <h2 class="relative text-primary">
          DINH DƯỠNG CHO MÈO
          <img
            src="@/assets/images/coll_title_ic.webp"
            alt="coll_title_ic"
            class="absolute -top-4 -right-10 hidden md:block"
          />
        </h2>
      </div>

      <SectionCat :data="itemsFoodCat" />
    </section>

    <section>
      <div class="w-full my-16">
        <Carousel
          class="relative w-full"
          :opts="{
            align: 'start',
            loop: true,
          }"
          :plugins="[Autoplay({ delay: 5000 })]"
        >
          <CarouselContent>
            <CarouselItem
              v-for="(image, index) in images"
              :key="index"
              class="basis-1/1 md:basis-1/2 lg:basis-1/3 cursor-defaul w-full h-full"
            >
              <RouterLink to="/product">
                <img :src="image" :alt="`home_slider_${index + 1}`" class="w-full" loading="lazy" />
              </RouterLink>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious class="carousel-control hidden absolute left-2" />
          <CarouselNext class="carousel-control hidden absolute right-2" />
        </Carousel>
      </div>
    </section>

    <section>
      <div class="text-3xl font-bold flex justify-center mt-10">
        <h2 class="relative text-primary">
          Dịch vụ của Boss
          <img
            src="@/assets/images/coll_title_ic.webp"
            alt="coll_title_ic"
            class="absolute -top-4 -right-10 hidden md:block"
          />
        </h2>
      </div>

      <SectionCat :data="servicesOfBoss" />
    </section>

    <section>
      <div class="w-full my-16">
        <Carousel
          class="relative w-full"
          :opts="{
            align: 'start',
            loop: true,
          }"
          :plugins="[Autoplay({ delay: 5000 })]"
        >
          <CarouselContent>
            <CarouselItem
              v-for="(_, index) in 4"
              :key="index"
              class="basis-1/1 md:basis-1/2 lg:basis-1/4 cursor-defaul"
            >
              <img
                :src="`https://bizweb.dktcdn.net/100/527/383/themes/964940/assets/banner_group_2_${
                  index + 1
                }.jpg?1730347951357`"
                :alt="`banner_group_2_${index + 1}`"
                class="w-full rounded-md overflow-hidden"
                loading="lazy"
              />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious class="carousel-control hidden absolute left-2" />
          <CarouselNext class="carousel-control hidden absolute right-2" />
        </Carousel>
      </div>
    </section>

    <section>
      <div class="text-3xl font-bold flex justify-center mt-20 mb-5">
        <h2 class="relative text-primary">
          Sản phẩm mới
          <img
            src="@/assets/images/coll_title_ic.webp"
            alt="coll_title_ic"
            class="absolute -top-4 -right-10 hidden md:block"
          />
        </h2>
      </div>
      <NewProduct :data="dataNewProduct" />
    </section>

    <section>
      <div class="text-3xl font-bold flex justify-center mt-20 mb-5">
        <h2 class="relative text-primary">
          Sổ tay chăm Boss
          <img
            src="@/assets/images/coll_title_ic.webp"
            alt="coll_title_ic"
            class="absolute -top-4 -right-10 hidden md:block"
          />
        </h2>
      </div>

      <div class="grid lg:grid-cols-4 grid-cols-2 gap-4">
        <div v-for="item in dataPosts">
          <NewsCard :content="item.content" :title="item.title" :image="item.image" :date="item.date" />
        </div>
      </div>
    </section>

    <section>
      <div class="text-3xl font-bold flex justify-center mt-20 mb-6">
        <h2 class="relative text-primary">
          Nhãn hiệu tin dùng
          <img
            src="@/assets/images/coll_title_ic.webp"
            alt="coll_title_ic"
            class="absolute -top-4 -right-10 hidden md:block"
          />
        </h2>
      </div>
      <div class="marquee-container">
        <div class="marquee-content">
          <div class="marquee-group">
            <div v-for="(_, index) in 7" :key="index" class="logo-item">
              <img
                :src="`https://bizweb.dktcdn.net/100/527/383/themes/964940/assets/brand_${index + 1}.png?1730347951357`"
                :alt="`brand_${index + 1}`"
                class="logo-image"
                width="180"
                height="80"
              />
            </div>
          </div>
          <div class="marquee-group" aria-hidden="true">
            <div v-for="(_, index) in 7" :key="index + 7" class="logo-item">
              <img
                :src="`https://bizweb.dktcdn.net/100/527/383/themes/964940/assets/brand_${index + 1}.png?1730347951357`"
                :alt="`brand_${index + 1}`"
                class="logo-image"
                width="180"
                height="80"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import DiscountCard from "@/components/DiscountCard.vue";
import FlashSale from "@/components/FlashSale.vue";
import SlideBanner from "@/components/SlideBanner.vue";
import { itemsFoodCat, servicesOfBoss, dataNewProduct, dataPosts } from "@/utils/FakeData.js";
import SectionCat from "@/components/SectionCat.vue";
import NewProduct from "@/components/NewProduct.vue";
import NewsCard from "@/components/NewsCard.vue";

export default {
  components: {
    SlideBanner,
    DiscountCard,
    FlashSale,
    SectionCat,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    NewProduct,
    NewsCard,
  },
  data() {
    return {
      policy: [
        {
          id: 1,
          icon: "material-symbols-light:local-shipping-outline-rounded",
          title: "Giao hoả tốc",
          description: "Nội thành Hà Nội trong 4h",
        },
        {
          id: 2,
          icon: "material-symbols-light:cycle",
          title: "Đổi trả miễn phí",
          description: "Trong vòng 30 ngày miễn phí",
        },
        {
          id: 3,
          icon: "material-symbols-light:sentiment-excited-outline-rounded",
          title: "Hỗ trợ 24/7",
          description: "Hỗ trợ khách hàng 24/7",
        },
        {
          id: 4,
          icon: "material-symbols-light:featured-seasonal-and-gifts-rounded",
          title: "Deal hot bùng nổ",
          description: "Flash sale giảm giá cực sốc",
        },
      ],
      Autoplay,
      images: [
        new URL("@/assets/images/banner_group_1_1.webp", import.meta.url).href,
        new URL("@/assets/images/banner_group_1_2.webp", import.meta.url).href,
        new URL("@/assets/images/banner_group_1_3.webp", import.meta.url).href,
      ],
      itemsFoodCat,
      servicesOfBoss,
      dataNewProduct,
      dataPosts,
    };
  },
};
</script>

<style scoped>
.marquee-container {
  width: 100%;
  overflow: hidden;
}

.marquee-content {
  display: flex;
  width: fit-content;
}

.marquee-group {
  display: flex;
  align-items: center;
  justify-content: space-around;
  min-width: 70%;
  animation: scroll 10s linear infinite;
}

.logo-item {
  margin: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-image {
  max-height: 79px;
  width: auto;
  max-width: 180px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.logo-image:hover {
  transform: scale(1.1);
}

@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>

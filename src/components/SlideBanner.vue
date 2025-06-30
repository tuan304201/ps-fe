<template>
  <section>
    <div class="w-full">
      <Carousel
        class="relative w-full home__baner"
        :opts="{
          align: 'start',
          loop: true,
        }"
        :plugins="[Autoplay({ delay: 5000 })]"
      >
        <CarouselContent>
          <CarouselItem v-for="(_, index) in 2" :key="index">
            <RouterLink to="/product">
              <img
                src="@/assets/images/home_slider_1.webp"
                alt="home_slider_1"
                class="home__baner-image w-full"
                loading="lazy"
              />
            </RouterLink>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious class="carousel-control absolute left-2" />
        <CarouselNext class="carousel-control absolute right-2" />
      </Carousel>
    </div>
  </section>
</template>

<script>
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
export default {
  components: { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious },
  data() {
    return {
      Autoplay,
    };
  },
};
</script>

<style scoped>
.carousel-control {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.home__baner:hover .carousel-control {
  opacity: 1;
}
</style>

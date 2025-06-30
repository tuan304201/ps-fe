<template>
  <div>
    <Carousel
      :opts="{
        align: 'start',
        loop: true,
      }"
    >
      <CarouselContent>
        <CarouselItem
          v-for="(_, index) in 8"
          :key="index"
          class="basis-1/1 sm:basis-1/2 md:basis-1/3 xl:basis-1/5 cursor-default py-1"
        >
          <div class="p-3 discount__shadow rounded-lg max-w-[350px]">
            <div class="border-dashed border-[1px] border-neutral-600 p-4">
              <div class="font-semibold whitespace-nowrap text-ellipsis overflow-hidden">Mã: EGA50THANG10</div>

              <div class="py-2 whitespace-nowrap text-ellipsis overflow-hidden">
                Giảm 15% cho đơn hàng giá trị tối thiểu 500k. Mã giảm tối đa 250K
              </div>

              <div class="flex items-center justify-between">
                <div class="border-[1px] border-primary text-primary px-4 font-semibold text-xs py-2 rounded-full">
                  Điều kiện
                </div>
                <div class="bg-primary text-white px-4 font-semibold text-xs py-2 rounded-full">Sao chép</div>
              </div>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious class="hidden" />
      <CarouselNext class="hidden" />
    </Carousel>
  </div>
</template>

<script>
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
export default {
  name: "discount",
  components: { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious },
};
</script>

<style scoped>
.discount__shadow {
  box-shadow: rgba(0, 0, 0, 0.1) 4.4px 4.4px 1.2px;
  border-radius: 8px;
}
</style>

<template>
  <div class="px-2">
    <Carousel
      :opts="{
        align: 'start',
        loop: true,
      }"
    >
      <CarouselContent class="-ml-2">
        <CarouselItem
          v-for="discount in discounts"
          :key="discount.id"
          class="basis-auto pl-2 sm:basis-1/2 md:basis-1/3 xl:basis-1/4"
        >
          <div
            class="relative flex h-full overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
          >
            <div class="flex w-10 items-center justify-center bg-primary/40"></div>

            <div class="absolute bottom-0 left-10 top-0 flex flex-col justify-around">
              <div class="size-4 -translate-x-1/2 rounded-full bg-slate-50"></div>
              <div class="size-4 -translate-x-1/2 rounded-full bg-slate-50"></div>
              <div class="size-4 -translate-x-1/2 rounded-full bg-slate-50"></div>
              <div class="size-4 -translate-x-1/2 rounded-full bg-slate-50"></div>
            </div>

            <div class="flex flex-1 flex-col p-2 pl-4">
              <h3 class="text-md font-bold text-gray-800 line-clamp-1">{{ discount.title }}</h3>

              <div
                class="my-3 flex items-center gap-2 rounded-lg border-2 border-dashed border-primary/50 bg-amber-50 p-1.5"
              >
                <span
                  class="block flex-1 select-all overflow-hidden text-ellipsis whitespace-nowrap text-start font-mono text-lg font-semibold text-primary"
                >
                  {{ discount.code.length > 10 ? discount.code.substring(0, 10) + "..." : discount.code }}
                </span>

                <button
                  @click="copyCode(discount.code, discount.id)"
                  class="flex w-fit shrink-0 items-center justify-center rounded-md bg-primary p-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary/90 active:scale-95"
                  :class="{ 'bg-green-500': discount.copied }"
                  aria-label="Sao chép mã"
                >
                  <Icon v-if="!discount.copied" icon="ph:copy-bold" class="size-5" />
                  <Icon v-else icon="ph:check-bold" class="size-5" />
                </button>
              </div>

              <div class="mt-auto flex items-center justify-between border-t pt-2">
                <div class="flex items-center gap-1.5 text-xs text-gray-500">
                  <Icon icon="ph:clock-bold" />
                  <span>HSD: {{ discount.expiryDate }}</span>
                </div>

                <Dialog>
                  <DialogTrigger as-child>
                    <button class="text-xs font-semibold text-primary hover:underline">Điều kiện</button>
                  </DialogTrigger>
                  <DialogContent class="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Điều kiện áp dụng</DialogTitle>
                      <DialogDescription>
                        Chi tiết về điều kiện và quy định sử dụng mã giảm giá
                        <span class="font-bold text-primary">{{ discount.code }}</span
                        >.
                      </DialogDescription>
                    </DialogHeader>
                    <div class="py-4 text-sm text-gray-700">
                      <ul class="space-y-2 list-disc pl-5">
                        <li>Áp dụng cho đơn hàng có sản phẩm trong mô tả.</li>
                        <li>Không áp dụng đồng thời với các chương trình khuyến mãi khác.</li>
                        <li>Mỗi tài khoản chỉ được sử dụng mã một lần duy nhất.</li>
                        <li>Giá trị đơn hàng tối thiểu để áp dụng mã là 250.000đ.</li>
                        <li>Mã có hiệu lực đến hết ngày {{ discount.expiryDate }}.</li>
                      </ul>
                    </div>
                    <DialogFooter
                      ><DialogClose as-child
                        ><button class="w-full rounded-md bg-primary py-2 text-white font-semibold hover:bg-primary/90">
                          Đã hiểu
                        </button></DialogClose
                      ></DialogFooter
                    >
                  </DialogContent>
                </Dialog>
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
import { Icon } from "@iconify/vue";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

export default {
  name: "discount",
  components: {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    Icon,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
  },
  data() {
    return {
      discounts: [
        // SỬA Ở ĐÂY: Bỏ thuộc tính 'copyButtonText'
        {
          id: 1,
          title: "Giảm 15% tối đa 50K",
          description: "Cho tất cả đơn hàng thức ăn cho mèo.",
          code: "MEOW15",
          expiryDate: "31/12/2025",
          copied: false,
        },
        {
          id: 2,
          title: "Giảm 20% tối đa 80K",
          description: "Khi mua các sản phẩm Pate & Súp thưởng.",
          code: "PATE20",
          expiryDate: "30/11/2025",
          copied: false,
        },
        {
          id: 3,
          title: "Freeship đơn từ 200K",
          description: "Áp dụng cho tất cả các khu vực giao hàng.",
          code: "PETSHIPFREESHIPOVER200K",
          expiryDate: "31/12/2025",
          copied: false,
        },
        {
          id: 4,
          title: "Giảm 50K cho đơn từ 500K",
          description: "Áp dụng cho toàn bộ giỏ hàng của bạn.",
          code: "BOSS50",
          expiryDate: "15/11/2025",
          copied: false,
        },
        {
          id: 5,
          title: "Giảm 10% cho dịch vụ Spa",
          description: "Áp dụng khi đặt lịch Spa & Grooming online.",
          code: "SPA10",
          expiryDate: "31/10/2025",
          copied: false,
        },
        {
          id: 6,
          title: "Giảm 30K cho khách hàng mới",
          description: "Dành cho đơn hàng đầu tiên tại Pet Shop.",
          code: "NEWPET30",
          expiryDate: "31/12/2025",
          copied: false,
        },
        {
          id: 7,
          title: "Mua 1 tặng 1 - Cát vệ sinh",
          description: "Áp dụng cho sản phẩm cát vệ sinh hương táo 10L.",
          code: "CAT1TANG1",
          expiryDate: "31/10/2025",
          copied: false,
        },
        {
          id: 8,
          title: "Giảm 25% Đồ chơi & Phụ kiện",
          description: "Áp dụng cho tất cả các sản phẩm đồ chơi và các loại phụ kiện đi kèm khác.",
          code: "TOYS25ACCESSORIES",
          expiryDate: "25/11/2025",
          copied: false,
        },
      ],
    };
  },
  methods: {
    // SỬA Ở ĐÂY: Bỏ logic xử lý 'copyButtonText'
    async copyCode(code, discountId) {
      const discount = this.discounts.find((d) => d.id === discountId);
      if (!discount) return;
      try {
        await navigator.clipboard.writeText(code);
        discount.copied = true;
        setTimeout(() => {
          discount.copied = false;
        }, 2000);
      } catch (err) {
        console.error("Lỗi khi sao chép: ", err);
      }
    },
  },
};
</script>

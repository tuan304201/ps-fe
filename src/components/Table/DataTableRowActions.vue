<script setup>
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { computed } from "vue";
import { Ellipsis } from "lucide-vue-next";
import { labels } from "./data/data.js";
import { useTaskStore } from "@/stores/taskStore";
import { Separator } from "@/components/ui/separator";
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
import { statuses } from "./data/data.js";

const taskStore = useTaskStore();
const props = defineProps(["row"]);

const task = computed(() => props.row.original);

const formattedTotalPrice = computed(() => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(task.value.totalPrice);
});
const formattedShippingFee = computed(() => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(task.value.shippingFee);
});
const formattedDiscount = computed(() => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(task.value.discount);
});

const orderStatus = computed(() => {
  return statuses.find((status) => status.value === task.value.status) || null;
});

const totalPrice = computed(() => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    task.value.totalPrice + task.value.shippingFee - task.value.discount - 30000,
  );
});
const handleDelete = () => {
  taskStore.deleteTask(task.value.id);
};
</script>

<template>
  <Dialog>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" class="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <Ellipsis class="h-4 w-4" />
          <span class="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" class="w-[160px]">
        <DropdownMenuItem>
          <DialogTrigger> Chi tiết đơn hàng </DialogTrigger>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem @click="handleDelete()" class="text-red-500 hover:bg-red-100">
          Delete
          <span class="ml-auto">⌘⌫</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <DialogContent class="detail__purchase overflow-auto block">
      <DialogHeader>
        <DialogTitle class="uppercase text-center">Chi tiết đơn hàng</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <div class="mt-4 text-slate-900 md:flex block gap-2 w-full h-full">
        <div class="flex-1">
          <div class="border rounded">
            <div class="p-2 rounded-tl rounded-tr uppercase text-white bg-primary font-medium flex justify-between">
              <p>Người nhận</p>
            </div>
            <div class="flex justify-between">
              <div class="p-2 flex flex-col gap-y-1">
                <p class="font-semibold text-start">{{ task.address.fullName }}</p>
                <p class="text-neutral-500 text-start">{{ task.address.phoneNumber }}</p>
                <p class="text-neutral-500 text-start">{{ task.address.detail }}</p>
              </div>
              <div class="p-2">
                <div
                  class="px-3 rounded py-1 font-semibold whitespace-nowrap"
                  :class="[orderStatus.textColor, orderStatus.bgColor]"
                >
                  {{ orderStatus.label }}
                </div>
              </div>
            </div>
          </div>
          <div class="mt-4 border rounded">
            <p class="p-2 rounded-tl rounded-tr uppercase text-white bg-primary font-medium">Thông tin đơn hàng</p>
            <div class="p-2">
              <p class="font-semibold text-start">Mã đơn hàng: {{ task.id }}</p>
              <div class="mt-2">
                <div class="flex gap-x-2">
                  <img :src="task.image" alt="Chi tiết sản phẩm" width="100" />
                  <div class="w-full">
                    <p class="text-neutral-600 text-start">{{ task.manufacturer }}</p>
                    <p class="font-semibold text-start block tite__purchase line-clamp-2 text-ellipsis text-[15px]">
                      {{ task.productName }}
                    </p>
                    <p class="text-neutral-600 text-start">{{ task.classification }}</p>
                    <p class="text-neutral-600 text-start">{{ "x " + task.quantity }}</p>
                    <p class="text-price text-lg text-end font-medium">{{ formattedTotalPrice }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-4 md:mt-0">
          <div class="border rounded h-full border-b-0">
            <div class="p-2 rounded-tl rounded-tr uppercase text-white bg-primary font-medium flex justify-between">
              <p class="whitespace-nowrap">Phương thức thanh toán</p>
            </div>
            <div class="flex flex-col paymethod justify-between">
              <div class="p-2 flex flex-col gap-1">
                <div class="flex justify-between items-center">
                  <p class="text-neutral-600">Tạm tính:</p>
                  <p class="text-neutral-600 text-[15px] font-semibold">{{ formattedTotalPrice }}</p>
                </div>
                <div class="flex justify-between items-center">
                  <p class="text-neutral-600">Phí vận chuyển:</p>
                  <p class="text-neutral-600 text-[15px] font-semibold">{{ formattedShippingFee }}</p>
                </div>
                <div class="flex justify-between items-center">
                  <p class="text-neutral-600">Mã freeship:</p>
                  <p class="text-green-600 text-[15px] font-semibold">Miễn phí</p>
                </div>
                <div class="flex justify-between items-center">
                  <p class="text-neutral-600">Mã giảm giá:</p>
                  <p class="text-red-600 text-[15px] font-semibold">{{ "- " + formattedDiscount }}</p>
                </div>
              </div>
              <div class="p-2">
                <Separator class="my-2" />
                <div class="flex justify-between items-center">
                  <p class="text-neutral-600">Phương thức:</p>
                  <p class="text-neutral-600 text-[15px] font-semibold">{{ task.paymentMethod }}</p>
                </div>
                <Separator class="my-2" />
                <p class="text-center">Cần thanh toán</p>
                <p class="text-price text-2xl font-semibold text-center">
                  {{ totalPrice }}
                </p>
                <p class="text-center text-neutral-600">(Đã bao gồm VAT)</p>
              </div>
              <DialogClose as-child class="mb-1">
                <Button type="button" class="w-full bg-primary rounded-none rounded-bl rounded-br">Đóng</Button>
              </DialogClose>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<style scoped>
.paymethod {
  height: calc(100% - 36px);
}
</style>

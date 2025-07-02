<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-xl shadow-lg p-6 md:p-10 w-full max-w-md text-center relative">
      <button @click="$emit('close')" class="absolute top-4 right-4 text-gray-400 hover:text-primary">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div class="flex flex-col items-center">
        <div class="bg-primary rounded-full p-4 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2l4 -4" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-primary mb-2">Đặt hàng thành công!</h2>
        <p class="text-gray-600 mb-4">Cảm ơn bạn đã mua hàng tại Pet Shop.</p>
        <div class="bg-gray-50 rounded-lg p-4 w-full text-left mb-4">
          <div class="flex justify-between text-sm mb-1">
            <span class="text-gray-500">Mã đơn hàng:</span>
            <span class="font-medium">{{ orderData?.id }}</span>
          </div>
          <div class="flex justify-between text-sm mb-1">
            <span class="text-gray-500">Tổng tiền:</span>
            <span class="font-medium text-primary">{{ formatCurrency(orderData?.total) }}</span>
          </div>
          <div class="flex justify-between text-sm mb-1">
            <span class="text-gray-500">Địa chỉ:</span>
            <span class="font-medium">{{ orderData?.address?.address }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-500">Ngày đặt:</span>
            <span class="font-medium">{{ formatDate(orderData?.createdAt) }}</span>
          </div>
        </div>
        <button
          @click="$emit('close')"
          class="mt-2 px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:opacity-90"
        >
          Đóng
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    orderData: Object,
  },
  methods: {
    formatCurrency(value) {
      if (!value) return "";
      return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
    },
    formatDate(date) {
      if (!date) return "";
      const d = new Date(date);
      return d.toLocaleString("vi-VN");
    },
  },
};
</script>

<style scoped>
.bg-primary {
  background-color: hsl(var(--primary));
}
.text-primary {
  color: hsl(var(--primary));
}
</style>

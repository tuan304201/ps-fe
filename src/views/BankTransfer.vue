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
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 10v6a2 2 0 002 2h14a2 2 0 002-2v-6M16 6V4a2 2 0 00-2-2H10a2 2 0 00-2 2v2m12 0H4"
            />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-primary mb-2">Chuyển khoản ngân hàng</h2>
        <p class="text-gray-600 mb-4">Vui lòng chuyển khoản theo thông tin bên dưới để hoàn tất đơn hàng.</p>
        <div class="bg-gray-50 rounded-lg p-4 w-full text-left mb-4">
          <div class="flex justify-between text-sm mb-1">
            <span class="text-gray-500">Ngân hàng:</span>
            <span class="font-medium">Vietcombank</span>
          </div>
          <div class="flex justify-between text-sm mb-1">
            <span class="text-gray-500">Số tài khoản:</span>
            <span class="font-medium">0123456789</span>
          </div>
          <div class="flex justify-between text-sm mb-1">
            <span class="text-gray-500">Chủ tài khoản:</span>
            <span class="font-medium">PET SHOP CO., LTD</span>
          </div>
          <div class="flex justify-between text-sm mb-1">
            <span class="text-gray-500">Số tiền:</span>
            <span class="font-medium text-primary">{{ formatCurrency(orderData?.total) }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-500">Nội dung:</span>
            <span class="font-medium">{{ orderData?.id }} - {{ orderData?.address?.name }}</span>
          </div>
        </div>
        <button
          @click="$emit('success')"
          class="mt-2 px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:opacity-90"
        >
          Tôi đã chuyển khoản
        </button>
        <button
          @click="$emit('close')"
          class="mt-2 px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200"
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

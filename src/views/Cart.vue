<template>
  <div class="container px-3 sm:px-4 lg:px-8 pt-7 wrapper__cart">
    <div class="flex justify-center items-center flex-col h-full" v-if="cartItems.length === 0">
      <img src="@/assets/images/cart_empty.png" alt="Giỏ hàng trống" />
      <h2 class="font-normal text-neutral-500/80 mt-4 text-xl">Giỏ hàng của bạn hiện đang trống</h2>
      <button class="bg-primary px-8 py-2 text-white font-medium rounded-lg mt-4">
        <router-link to="/product">Mua sắm ngay</router-link>
      </button>
    </div>
    <Table v-if="cartItems.length > 0">
      <TableHeader>
        <TableRow>
          <TableHead class="w-[50px] text-center align-middle">
            <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" class="custom-checkbox" />
          </TableHead>
          <TableHead class="whitespace-nowrap">Sản phẩm</TableHead>
          <TableHead class="text-center">Loại</TableHead>
          <TableHead class="text-center">Số lượng</TableHead>
          <TableHead class="text-center">Đơn giá</TableHead>
          <TableHead class="text-center">Số tiền</TableHead>
          <TableHead class="text-center">Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(item, index) in cartItems" :key="item.id">
          <TableCell>
            <input type="checkbox" v-model="item.selected" class="custom-checkbox" />
          </TableCell>

          <TableCell class="font-medium flex items-start gap-3 w-max">
            <img
              src="https://bizweb.dktcdn.net/thumb/large/100/527/383/products/upload-baa5e183543848d3948bd1c337ea1fff.jpg?v=1727669771437"
              :alt="item.name"
              class="w-16 h-16 object-cover"
            />
            <div class="mt-1 whitespace-nowrap">
              {{ item.name }}
            </div>
          </TableCell>
          <TableCell class="text-center text-gray-500">{{ item.category }}</TableCell>
          <TableCell>
            <div class="flex items-center justify-center">
              <button
                class="px-2 rounded-tl rounded-bl hover:bg-gray-300 py-1 border border-neutral-300 font-semibold"
                @click="decreaseQuantity(index)"
              >
                -
              </button>
              <span class="border-t border-b px-4 border-neutral-300 py-1 font-semibold">{{ item.quantity }}</span>
              <button
                class="px-2 rounded-tr rounded-br hover:bg-gray-300 py-1 font-semibold border border-neutral-300"
                @click="increaseQuantity(index)"
              >
                +
              </button>
            </div>
          </TableCell>
          <TableCell class="text-center">{{ formatCurrency(item.price) }}</TableCell>
          <TableCell class="text-center text-primary font-bold">
            {{ formatCurrency(item.price * item.quantity) }}
          </TableCell>
          <TableCell class="text-center">
            <button
              class="bg-red-500/80 text-white px-1 py-1 rounded hover:bg-red-600 font-semibold"
              @click="removeItem(index)"
              :aria-label="`Xóa sản phẩm ${item.name}`"
            >
              <Icon icon="material-symbols-light:delete-rounded" class="size-6" />
            </button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <div
      class="mt-10 sticky bottom-0 bg-white right-0 left-0 px-2 py-4 rounded-bl rounded-br footer__pay"
      v-if="cartItems.length > 0"
    >
      <div class="block md:flex justify-between items-center">
        <button
          class="px-4 py-2 rounded"
          :class="{
            'border border-red-500/50 text-red-500/50': itemSelect.length === 0,
            'border border-red-600 text-red-600': itemSelect.length > 0,
          }"
          @click="removeSelectedItems"
          :disabled="itemSelect.length === 0"
        >
          Xoá sản phẩm đã chọn
        </button>
        <div class="mt-4 md:mt-0">
          <div class="flex justify-end">
            <button class="flex justify-end items-center gap-2 text-primary mb-4">
              <Icon icon="mdi:voucher" class="size-5" />
              <span>Chọn voucher</span>
            </button>
          </div>
          <div class="flex items-center space-x-4 justify-between">
            <span class="font-medium">Tổng tiền: {{ formatCurrency(totalAmount) }}</span>
            <button class="bg-primary text-white px-4 py-2 rounded hover:opacity-70" @click="proceedToCheckout">
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
export default {
  components: {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  },
  data() {
    return {
      cartItems: [
        { id: 1, name: "Sản phẩm A", category: "Loại 1", quantity: 1, price: 50000, selected: false },
        { id: 2, name: "Sản phẩm B", category: "Loại 2", quantity: 2, price: 150000, selected: false },
        { id: 3, name: "Sản phẩm C", category: "Loại 3", quantity: 1, price: 100000, selected: false },
        { id: 1, name: "Sản phẩm A", category: "Loại 1", quantity: 1, price: 50000, selected: false },
        { id: 2, name: "Sản phẩm B", category: "Loại 2", quantity: 2, price: 150000, selected: false },
        { id: 3, name: "Sản phẩm C", category: "Loại 3", quantity: 1, price: 100000, selected: false },
        { id: 1, name: "Sản phẩm A", category: "Loại 1", quantity: 1, price: 50000, selected: false },
        { id: 2, name: "Sản phẩm B", category: "Loại 2", quantity: 2, price: 150000, selected: false },
        { id: 3, name: "Sản phẩm C", category: "Loại 3", quantity: 1, price: 100000, selected: false },
        { id: 1, name: "Sản phẩm A", category: "Loại 1", quantity: 1, price: 50000, selected: false },
        { id: 2, name: "Sản phẩm B", category: "Loại 2", quantity: 2, price: 150000, selected: false },
        { id: 3, name: "Sản phẩm C", category: "Loại 3", quantity: 1, price: 100000, selected: false },
      ],
      selectAll: false,
    };
  },
  methods: {
    toggleSelectAll() {
      this.cartItems.forEach((item) => (item.selected = this.selectAll));
    },
    increaseQuantity(index) {
      this.cartItems[index].quantity++;
    },
    decreaseQuantity(index) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--;
      }
    },
    removeItem(index) {
      this.cartItems.splice(index, 1);
    },
    removeSelectedItems() {
      this.cartItems = this.cartItems.filter((item) => !item.selected);
      this.selectAll = false;
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
    },
    proceedToCheckout() {
      const selectedItems = this.cartItems.filter((item) => item.selected);
      if (selectedItems.length > 0) {
        alert("Tiến hành thanh toán các sản phẩm đã chọn!");
      } else {
        alert("Vui lòng chọn sản phẩm để thanh toán!");
      }
    },
  },
  computed: {
    totalAmount() {
      return this.cartItems.reduce((sum, item) => {
        if (item.selected) {
          return sum + item.price * item.quantity;
        }
        return sum;
      }, 0);
    },
    itemSelect() {
      return this.cartItems.filter((item) => item.selected);
    },
  },
};
</script>

<style scoped>
input[type="checkbox"] {
  appearance: none; /* Loại bỏ giao diện mặc định */
  -webkit-appearance: none; /* Hỗ trợ Safari */
  position: relative;
  width: 18px;
  height: 18px;
  border: 1px solid hsl(var(--primary, 200, 60%, 50%)); /* Màu khung */
  border-radius: 3px;
  background-color: #fff;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* Giao diện khi được check */
input[type="checkbox"]:checked {
  background-color: hsl(var(--primary, 200, 60%, 50%));
  border-color: hsl(var(--primary, 200, 60%, 50%));
}

/* Thêm dấu ✓ khi được check */
input[type="checkbox"]:checked:after {
  content: "✓";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  color: white;
}

.wrapper__cart {
  height: calc(100vh - 210px);
  overflow: hidden;
  overflow-y: auto;
  position: relative;
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
}

.wrapper__cart::-webkit-scrollbar {
  width: 0 !important;
  display: none;
}

.footer__pay {
  box-shadow: rgba(0, 0, 0, 0.1) 0px -20px 10px -10px;
}
</style>

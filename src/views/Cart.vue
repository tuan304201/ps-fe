<template>
  <div class="py-4 md:py-8">
    <div v-if="loading" class="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
      <span class="loader"></span>
    </div>
    <div class="container mx-auto px-2 md:px-4">
      <div v-if="cartItems.length === 0" class="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <img src="@/assets/images/cart_empty.png" alt="Giỏ hàng trống" class="w-40 h-40 mb-4 opacity-80" />
        <div class="text-lg font-semibold text-gray-500 mb-2">Giỏ hàng của bạn đang trống</div>
        <router-link to="/product" class="text-primary underline">Mua sắm ngay</router-link>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
        <div class="lg:col-span-2 space-y-4">
          <div class="bg-white rounded-lg p-3 md:p-4 shadow-sm">
            <!-- Header Section - Responsive -->
            <div
              class="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-3 mb-3 gap-3 sm:gap-0"
            >
              <div class="flex items-center">
                <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" class="custom-checkbox" />
                <span class="ml-3 font-medium text-gray-700 text-sm md:text-base">
                  Chọn tất cả ({{ cartItems.length }} sản phẩm)
                </span>
              </div>
              <button
                @click="confirmRemoveSelectedItems"
                :disabled="selectedItems.length === 0"
                class="text-red-500 hover:text-red-700 disabled:text-gray-400 font-medium text-sm md:text-base"
              >
                Xóa đã chọn
              </button>
            </div>

            <!-- Product List - Mobile Optimized -->
            <div class="space-y-3 md:space-y-4 max-h-[60vh] overflow-y-auto pr-2 md:pr-6">
              <div v-for="item in cartItems" :key="item.id" class="border-b border-gray-100 pb-3 last:border-b-0">
                <!-- Mobile Layout -->
                <div class="block md:hidden">
                  <div class="flex items-start space-x-3">
                    <input type="checkbox" v-model="item.selected" class="custom-checkbox mt-1 flex-shrink-0" />
                    <img
                      :src="item.mainImage"
                      :alt="item.title"
                      class="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    <div class="flex-1 min-w-0">
                      <h3 class="font-semibold text-gray-800 text-sm leading-tight mb-2">{{ item.title }}</h3>
                      <div class="flex items-center justify-between">
                        <div class="flex items-center border rounded-lg">
                          <button @click="updateQuantity(item.id, -1)" class="p-1.5 hover:bg-gray-100 rounded-l-lg">
                            <Icon icon="ph:minus" class="w-3 h-3" />
                          </button>
                          <span class="px-3 py-1 font-medium text-sm">{{ item.quantity }}</span>
                          <button @click="updateQuantity(item.id, 1)" class="p-1.5 hover:bg-gray-100 rounded-r-lg">
                            <Icon icon="ph:plus" class="w-3 h-3" />
                          </button>
                        </div>
                        <span class="font-bold text-primary text-sm">{{
                          formatCurrency(item.price * item.quantity)
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Desktop Layout -->
                <div class="hidden md:flex items-start space-x-4">
                  <input type="checkbox" v-model="item.selected" class="custom-checkbox mt-1" />
                  <img :src="item.mainImage" :alt="item.title" class="w-20 h-20 object-cover rounded-lg" />
                  <div class="flex-1 min-w-0">
                    <h3 class="font-semibold text-gray-800 truncate pr-4">{{ item.title }}</h3>
                    <div class="flex items-center justify-between mt-2">
                      <div class="flex items-center border rounded-lg">
                        <button @click="updateQuantity(item.id, -1)" class="p-2 hover:bg-gray-100 rounded-l-lg">
                          <Icon icon="ph:minus" class="w-4 h-4" />
                        </button>
                        <span class="px-4 py-1.5 font-medium">{{ item.quantity }}</span>
                        <button @click="updateQuantity(item.id, 1)" class="p-2 hover:bg-gray-100 rounded-r-lg">
                          <Icon icon="ph:plus" class="w-4 h-4" />
                        </button>
                      </div>
                      <span class="font-bold text-lg text-primary">{{
                        formatCurrency(item.price * item.quantity)
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar - Responsive -->
        <div class="lg:sticky lg:top-24 space-y-4 md:space-y-6 self-start">
          <!-- Shipping Address -->
          <div class="bg-white rounded-lg p-4 md:p-5 shadow-sm">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2 sm:gap-0">
              <h3 class="font-semibold text-gray-800 flex items-center text-base md:text-lg">
                <Icon icon="ph:map-pin-bold" class="w-5 h-5 md:w-6 md:h-6 mr-2 text-primary" />Địa chỉ giao hàng
              </h3>
              <button @click="showAddressModal = true" class="text-sm font-medium text-primary hover:opacity-80">
                Thay đổi
              </button>
            </div>
            <div v-if="currentAddress" class="border-t pt-3">
              <p class="font-medium text-sm md:text-base">
                {{ currentAddress.name }}
                <span class="text-xs md:text-sm text-gray-500">| {{ currentAddress.phone }}</span>
              </p>
              <p class="text-xs md:text-sm text-gray-600 mt-1 leading-relaxed">{{ currentAddress.address }}</p>
            </div>
          </div>

          <!-- Shipping Options -->
          <div class="bg-white rounded-lg p-4 md:p-5 shadow-sm">
            <h3 class="font-semibold text-gray-800 mb-4 flex items-center text-base md:text-lg">
              <Icon icon="ph:truck-bold" class="w-5 h-5 md:w-6 md:h-6 mr-2 text-primary" />Vận chuyển
            </h3>
            <div class="space-y-3">
              <label
                v-for="option in shippingOptions"
                :key="option.id"
                class="flex items-center justify-between p-3 md:p-4 border rounded-lg cursor-pointer transition-all"
                :class="selectedShipping === option.id ? 'border-primary bg-primary/5 shadow-md' : 'hover:bg-gray-50'"
              >
                <div class="flex items-center">
                  <div class="relative">
                    <input
                      type="radio"
                      name="shipping"
                      :value="option.id"
                      v-model="selectedShipping"
                      class="custom-radio"
                    />
                  </div>
                  <div class="ml-3 md:ml-4">
                    <p class="font-medium text-sm md:text-base">{{ option.name }}</p>
                    <p class="text-xs md:text-sm text-gray-500">{{ option.time }}</p>
                  </div>
                </div>
                <span class="font-semibold text-primary text-sm md:text-base">{{ formatCurrency(option.price) }}</span>
              </label>
            </div>
          </div>

          <!-- Voucher Section -->
          <div class="bg-white rounded-lg p-4 md:p-5 shadow-sm">
            <h3 class="font-semibold text-gray-800 mb-4 flex items-center text-base md:text-lg">
              <Icon icon="ph:ticket-bold" class="w-5 h-5 md:w-6 md:h-6 mr-2 text-primary" />Mã giảm giá
            </h3>
            <div
              v-if="appliedVoucher"
              class="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center justify-between"
            >
              <div class="flex items-center">
                <Icon icon="ph:check-circle-bold" class="w-5 h-5 text-green-600 mr-2" />
                <div>
                  <p class="font-medium text-green-800 text-sm md:text-base">{{ appliedVoucher.code }}</p>
                  <p class="text-xs text-green-600">{{ appliedVoucher.description }}</p>
                </div>
              </div>
              <button @click="removeVoucher" class="text-gray-500 hover:text-red-500 transition-colors">
                <Icon icon="ph:x-bold" class="w-4 h-4" />
              </button>
            </div>
            <div v-else>
              <button
                @click="showVoucherModal = true"
                class="w-full p-3 border border-dashed border-primary/50 rounded-lg font-medium text-primary hover:bg-primary/5 transition-all text-sm md:text-base flex items-center justify-center"
              >
                <Icon icon="ph:plus-circle-bold" class="w-5 h-5 mr-2" />
                Chọn mã giảm giá
              </button>
            </div>
          </div>

          <!-- Payment Methods -->
          <div class="bg-white rounded-lg p-4 md:p-5 shadow-sm">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2 sm:gap-0">
              <h3 class="font-semibold text-gray-800 flex items-center text-base md:text-lg">
                <Icon icon="ph:credit-card-bold" class="w-5 h-5 md:w-6 md:h-6 mr-2 text-primary" />Phương thức thanh
                toán
              </h3>
              <button @click="showPaymentModal = true" class="text-sm font-medium text-primary hover:opacity-80">
                Thay đổi
              </button>
            </div>
            <div v-if="currentPaymentMethod" class="border-t pt-3">
              <div class="flex items-center">
                <Icon :icon="currentPaymentMethod.icon" class="w-6 h-6 mr-3" :class="currentPaymentMethod.iconColor" />
                <div>
                  <p class="font-medium text-sm md:text-base">{{ currentPaymentMethod.name }}</p>
                  <p class="text-xs md:text-sm text-gray-500">{{ currentPaymentMethod.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="bg-white rounded-lg p-4 md:p-5 shadow-sm">
            <div class="space-y-3">
              <div class="flex justify-between text-gray-600 text-sm md:text-base">
                <span>Tạm tính</span><span>{{ formatCurrency(subtotal) }}</span>
              </div>
              <div class="flex justify-between text-gray-600 text-sm md:text-base">
                <span>Phí vận chuyển</span><span>{{ formatCurrency(shippingFee) }}</span>
              </div>
              <div v-if="voucherDiscount > 0" class="flex justify-between text-green-600 text-sm md:text-base">
                <span>Giảm giá voucher</span><span>-{{ formatCurrency(voucherDiscount) }}</span>
              </div>
            </div>
            <hr class="my-4" />
            <div class="flex justify-between text-lg md:text-xl font-bold text-primary">
              <span>Tổng cộng</span><span>{{ formatCurrency(totalAmount) }}</span>
            </div>
            <button
              @click="proceedToCheckout"
              :disabled="selectedItems.length === 0"
              class="w-full mt-6 bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 disabled:bg-gray-400 text-sm md:text-base"
            >
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Voucher Modal -->
    <Dialog :open="showVoucherModal" @update:open="showVoucherModal = $event">
      <DialogContent class="sm:max-w-md mx-4">
        <DialogHeader><DialogTitle class="text-lg md:text-xl">Chọn mã giảm giá</DialogTitle></DialogHeader>
        <DialogDescription></DialogDescription>
        <div class="space-y-3 max-h-[60vh] overflow-y-auto p-1">
          <div
            v-for="voucher in availableVouchers"
            :key="voucher.code"
            class="border rounded-lg p-3 md:p-4"
            :class="canUseVoucher(voucher) ? 'border-primary bg-blue-50' : 'border-gray-200 bg-gray-50 opacity-60'"
          >
            <div class="flex justify-between items-start mb-2">
              <span class="font-bold text-primary text-sm md:text-base">{{ voucher.code }}</span>
              <button
                v-if="canUseVoucher(voucher)"
                @click="applyVoucher(voucher)"
                class="text-primary hover:opacity-80 font-medium text-sm"
              >
                Áp dụng
              </button>
              <span v-else class="text-gray-400 text-xs md:text-sm">Không đủ điều kiện</span>
            </div>
            <p class="text-xs md:text-sm text-gray-600 mb-1">{{ voucher.description }}</p>
            <p class="text-xs text-gray-500">Đơn tối thiểu: {{ formatCurrency(voucher.minOrder) }}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    <!-- Address Modal -->
    <Dialog :open="showAddressModal" @update:open="showAddressModal = $event">
      <DialogContent class="sm:max-w-lg mx-4">
        <DialogHeader><DialogTitle class="text-lg md:text-xl">Chọn địa chỉ giao hàng</DialogTitle></DialogHeader>
        <DialogDescription></DialogDescription>
        <div class="space-y-3 max-h-[60vh] overflow-y-auto p-1">
          <label v-for="addr in addresses" :key="addr.id" class="block cursor-pointer">
            <div
              class="flex items-start rounded-lg border p-3 md:p-4 transition-all"
              :class="selectedAddress === addr.id ? 'border-primary bg-primary/5 shadow-md' : 'hover:bg-gray-50'"
            >
              <input
                type="radio"
                name="addressSelection"
                :value="addr.id"
                v-model="selectedAddress"
                @change="showAddressModal = false"
                class="w-4 h-4 text-primary focus:ring-primary mt-1"
              />
              <div class="ml-3 md:ml-4">
                <p class="font-medium text-sm md:text-base">
                  {{ addr.name }} <span class="text-xs md:text-sm text-gray-500">| {{ addr.phone }}</span>
                </p>
                <p class="text-xs md:text-sm text-gray-600 leading-relaxed">{{ addr.address }}</p>
              </div>
            </div>
          </label>
        </div>
        <DialogFooter>
          <button
            @click="showAddressModal = false"
            class="mt-2 w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-200 text-sm md:text-base"
          >
            Thêm địa chỉ mới
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Payment Method Modal -->
    <Dialog :open="showPaymentModal" @update:open="showPaymentModal = $event">
      <DialogContent class="sm:max-w-lg mx-4">
        <DialogHeader><DialogTitle class="text-lg md:text-xl">Chọn phương thức thanh toán</DialogTitle></DialogHeader>
        <DialogDescription></DialogDescription>
        <div class="space-y-3 max-h-[60vh] overflow-y-auto p-1">
          <label v-for="method in paymentMethods" :key="method.id" class="block cursor-pointer">
            <div
              class="flex items-center justify-between p-3 md:p-4 border rounded-lg transition-all"
              :class="selectedPayment === method.id ? 'border-primary bg-primary/5 shadow-md' : 'hover:bg-gray-50'"
            >
              <div class="flex items-center">
                <input
                  type="radio"
                  name="paymentSelection"
                  :value="method.id"
                  v-model="selectedPayment"
                  @change="showPaymentModal = false"
                  class="w-4 h-4 text-primary focus:ring-primary"
                />
                <div class="ml-3 md:ml-4 flex items-center">
                  <Icon :icon="method.icon" class="w-6 h-6 mr-3" :class="method.iconColor" />
                  <div>
                    <p class="font-medium text-sm md:text-base">{{ method.name }}</p>
                    <p class="text-xs md:text-sm text-gray-500">{{ method.description }}</p>
                  </div>
                </div>
              </div>
              <Icon v-if="method.badge" :icon="method.badge" class="w-8 h-8 text-blue-500" />
            </div>
          </label>
        </div>
      </DialogContent>
    </Dialog>

    <!-- Order Confirmation Modal -->
    <Dialog :open="showOrderConfirmModal" @update:open="showOrderConfirmModal = $event">
      <DialogContent class="sm:max-w-md mx-4">
        <DialogHeader>
          <DialogTitle class="text-lg md:text-xl text-center">Xác nhận đặt hàng</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <div class="space-y-4 py-4">
          <div class="text-center">
            <Icon icon="ph:shopping-cart-bold" class="w-16 h-16 mx-auto text-primary mb-4" />
            <p class="text-gray-600 mb-4">Bạn có chắc chắn muốn đặt hàng với tổng giá trị:</p>
            <p class="text-2xl font-bold text-primary">{{ formatCurrency(totalAmount) }}</p>
          </div>
          <div class="border-t pt-4 space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Số lượng sản phẩm:</span>
              <span class="font-medium">{{ selectedItems.length }} sản phẩm</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Phương thức thanh toán:</span>
              <span class="font-medium">{{ currentPaymentMethod?.name }}</span>
            </div>
          </div>
        </div>
        <DialogFooter class="flex flex-col sm:flex-row gap-2">
          <button
            @click="showOrderConfirmModal = false"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
          >
            Hủy
          </button>
          <button
            @click="confirmOrder"
            class="w-full px-4 py-2 bg-primary text-white rounded-lg font-medium hover:opacity-90"
          >
            Xác nhận đặt hàng
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Order Success Component -->
    <OrderSuccess v-if="showOrderSuccess" :orderData="orderData" @close="showOrderSuccess = false" />

    <!-- Bank Transfer Component -->
    <BankTransfer
      v-if="showBankTransfer"
      :orderData="orderData"
      @close="showBankTransfer = false"
      @success="handlePaymentSuccess"
    />

    <!-- Delete Cart Dialog -->
    <Dialog v-model="showDeleteCartDialog">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bạn có chắc chắn muốn xóa các sản phẩm đã chọn khỏi giỏ hàng?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button @click="removeSelectedItemsConfirmed" variant="destructive">Xóa</Button>
          <Button @click="() => (showDeleteCartDialog = false)">Hủy</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Clear Cart Dialog -->
    <Dialog v-model="showClearCartDialog">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button @click="confirmClearCart" variant="destructive">Xóa</Button>
          <Button @click="() => (showClearCartDialog = false)">Hủy</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { getCart, updateCart, clearCart } from "@/api/cartApi";
import { getAllVouchers } from "@/api/voucherApi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import OrderSuccess from "./OrderSuccess.vue";
import BankTransfer from "./BankTransfer.vue";
import { useToast } from "@/components/ui/toast/use-toast";

export default {
  components: {
    Icon,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
    OrderSuccess,
    BankTransfer,
  },
  setup() {
    const { toast } = useToast();
    const cartItems = ref([]);
    const selectAll = ref(false);
    const selectedShipping = ref("standard");
    const selectedAddress = ref("default");
    const selectedPayment = ref("cod");
    const showVoucherModal = ref(false);
    const showAddressModal = ref(false);
    const showPaymentModal = ref(false);
    const showOrderConfirmModal = ref(false);
    const showOrderSuccess = ref(false);
    const showBankTransfer = ref(false);
    const appliedVoucher = ref(null);
    const orderData = ref(null);
    const shippingOptions = [
      { id: "standard", name: "Giao hàng tiêu chuẩn", price: 30000, time: "3-5 ngày" },
      { id: "express", name: "Giao hàng nhanh", price: 50000, time: "1-2 ngày" },
    ];
    const paymentMethods = [
      {
        id: "cod",
        name: "Thanh toán khi nhận hàng",
        description: "Thanh toán bằng tiền mặt",
        icon: "ph:money-bold",
        iconColor: "text-green-600",
      },
      {
        id: "bank_transfer",
        name: "Chuyển khoản ngân hàng",
        description: "Chuyển khoản trực tiếp",
        icon: "ph:bank-bold",
        iconColor: "text-blue-600",
      },
      {
        id: "momo",
        name: "Ví MoMo",
        description: "Thanh toán qua ví điện tử",
        icon: "ph:wallet-bold",
        iconColor: "text-pink-600",
        badge: "ph:shield-check-bold",
      },
      {
        id: "zalopay",
        name: "ZaloPay",
        description: "Thanh toán qua ZaloPay",
        icon: "ph:wallet-bold",
        iconColor: "text-blue-500",
        badge: "ph:shield-check-bold",
      },
      {
        id: "credit_card",
        name: "Thẻ tín dụng/Ghi nợ",
        description: "Visa, Mastercard, JCB",
        icon: "ph:credit-card-bold",
        iconColor: "text-purple-600",
        badge: "ph:lock-bold",
      },
    ];
    const addresses = [
      {
        id: "default",
        name: "Trần Văn A",
        address: "123 Nguyễn Huệ, P. Bến Nghé, Quận 1, TP.HCM",
        phone: "0909123456",
      },
      {
        id: "office",
        name: "Công ty ABC",
        address: "Tầng 20, Tòa nhà Bitexco, 2 Hải Triều, P. Bến Nghé, Quận 1, TP.HCM",
        phone: "0909789012",
      },
    ];
    const availableVouchers = ref([]);
    const showDeleteCartDialog = ref(false);
    const showClearCartDialog = ref(false);
    const loading = ref(false);

    async function updateCartOnServer() {
      loading.value = true;
      try {
        await updateCart({ items: cartItems.value });
        toast({ title: "Cập nhật giỏ hàng thành công!" });
      } catch (e) {
        toast({ title: "Lỗi giỏ hàng!", description: "Không thể cập nhật giỏ hàng.", variant: "destructive" });
      } finally {
        loading.value = false;
      }
    }

    async function removeSelectedItems() {
      loading.value = true;
      try {
        cartItems.value = cartItems.value.filter((item) => !item.selected);
        await updateCartOnServer();
        selectAll.value = false;
        toast({ title: "Đã xóa sản phẩm khỏi giỏ hàng!" });
      } finally {
        loading.value = false;
      }
    }

    async function clearCartOnServer() {
      loading.value = true;
      try {
        await clearCart();
        cartItems.value = [];
        toast({ title: "Đã xóa toàn bộ giỏ hàng!" });
      } finally {
        loading.value = false;
      }
    }

    function applyVoucher(voucher) {
      if (canUseVoucher(voucher)) {
        appliedVoucher.value = voucher;
        showVoucherModal.value = false;
        toast({ title: "Áp dụng mã giảm giá thành công!" });
      }
    }

    function canUseVoucher(voucher) {
      return subtotal.value >= voucher.minOrder;
    }

    function proceedToCheckout() {
      if (selectedItems.value.length === 0) {
        alert("Vui lòng chọn sản phẩm!");
        return;
      }

      // Tạo order data
      orderData.value = {
        id: "ORD" + Date.now(),
        items: selectedItems.value,
        address: currentAddress.value,
        shipping: shippingOptions.value.find((s) => s.id === selectedShipping.value),
        payment: currentPaymentMethod.value,
        voucher: appliedVoucher.value,
        subtotal: subtotal.value,
        shippingFee: shippingFee.value,
        discount: voucherDiscount.value,
        total: totalAmount.value,
        createdAt: new Date(),
      };

      // Nếu thanh toán tiền mặt thì hiển thị modal xác nhận
      if (selectedPayment.value === "cod") {
        showOrderConfirmModal.value = true;
      }
      // Nếu chuyển khoản thì chuyển đến trang chuyển khoản
      else if (selectedPayment.value === "bank_transfer") {
        showBankTransfer.value = true;
      }
      // Các phương thức khác có thể thêm sau
      else {
        alert("Phương thức thanh toán đang được phát triển!");
      }
    }

    function confirmOrder() {
      showOrderConfirmModal.value = false;
      showOrderSuccess.value = true;
      // Clear cart after successful order
      cartItems.value = cartItems.value.filter((item) => !item.selected);
      selectAll.value = false;
    }

    function handlePaymentSuccess() {
      showBankTransfer.value = false;
      showOrderSuccess.value = true;
      // Clear cart after successful payment
      cartItems.value = cartItems.value.filter((item) => !item.selected);
      selectAll.value = false;
    }

    function confirmRemoveSelectedItems() {
      showDeleteCartDialog.value = true;
    }

    async function removeSelectedItemsConfirmed() {
      await removeSelectedItems();
      showDeleteCartDialog.value = false;
    }

    function confirmClearCart() {
      showClearCartDialog.value = true;
    }

    async function clearCartConfirmed() {
      await clearCartOnServer();
      showClearCartDialog.value = false;
    }

    return {
      cartItems,
      selectAll,
      selectedShipping,
      selectedAddress,
      selectedPayment,
      showVoucherModal,
      showAddressModal,
      showPaymentModal,
      showOrderConfirmModal,
      showOrderSuccess,
      showBankTransfer,
      appliedVoucher,
      orderData,
      shippingOptions,
      paymentMethods,
      addresses,
      availableVouchers,
      updateCartOnServer,
      removeSelectedItems,
      clearCartOnServer,
      applyVoucher,
      canUseVoucher,
      proceedToCheckout,
      confirmOrder,
      handlePaymentSuccess,
      showDeleteCartDialog,
      showClearCartDialog,
      confirmRemoveSelectedItems,
      removeSelectedItemsConfirmed,
      confirmClearCart,
      clearCartConfirmed,
    };
  },
  computed: {
    selectedItems() {
      return this.cartItems.filter((item) => item.selected);
    },
    subtotal() {
      return this.selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    shippingFee() {
      if (this.selectedItems.length === 0) return 0;
      if (this.appliedVoucher?.type === "fixed_shipping") return 0;
      const option = this.shippingOptions.find((s) => s.id === this.selectedShipping);
      return option ? option.price : 0;
    },
    voucherDiscount() {
      if (!this.appliedVoucher || this.appliedVoucher.type === "fixed_shipping") return 0;
      return this.appliedVoucher.type === "percentage"
        ? (this.subtotal * this.appliedVoucher.discount) / 100
        : this.appliedVoucher.discount;
    },
    totalAmount() {
      return this.subtotal - this.voucherDiscount + this.shippingFee;
    },
    currentAddress() {
      return this.addresses.find((addr) => addr.id === this.selectedAddress);
    },
    currentPaymentMethod() {
      return this.paymentMethods.find((method) => method.id === this.selectedPayment);
    },
  },
  watch: {
    cartItems: {
      handler(newItems) {
        this.selectAll = newItems.length > 0 && newItems.every((item) => item.selected);
      },
      deep: true,
    },
  },
  methods: {
    toggleSelectAll() {
      this.cartItems.forEach((item) => {
        item.selected = this.selectAll;
      });
    },
    async updateQuantity(id, change) {
      const item = this.cartItems.find((item) => item.id === id);
      if (item) item.quantity = Math.max(1, item.quantity + change);
      await this.updateCartOnServer();
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
    },
    removeVoucher() {
      this.appliedVoucher = null;
    },
  },
};
</script>

<style scoped>
.custom-checkbox {
  appearance: none;
  -webkit-appearance: none;
  position: relative;
  width: 20px;
  height: 20px;
  border: 1.5px solid hsl(var(--primary));
  border-radius: 4px;
  background-color: #fff;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.custom-checkbox:checked {
  background-color: hsl(var(--primary));
  border-color: hsl(var(--primary));
}

.custom-checkbox:checked:after {
  content: "✓";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  color: white;
}

.custom-radio {
  appearance: none;
  -webkit-appearance: none;
  position: relative;
  width: 20px;
  height: 20px;
  border: 2px solid #d1d5db;
  border-radius: 50%;
  background-color: #fff;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.custom-radio:checked {
  background-color: hsl(var(--primary));
  border-color: hsl(var(--primary));
}

.custom-radio:checked:after {
  content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.custom-radio:hover {
  border-color: hsl(var(--primary));
}

/* Mobile Scrollbar */
@media (max-width: 768px) {
  .space-y-3::-webkit-scrollbar {
    width: 4px;
  }

  .space-y-3::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  .space-y-3::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 2px;
  }
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  display: inline-block;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

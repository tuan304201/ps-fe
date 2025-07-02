<template>
  <div class="container px-3 sm:px-4 lg:px-8 md:my-5 my-2">
    <div class="bg-white rounded-xl border flex flex-col md:flex-row overflow-hidden">
      <!-- Sidebar -->
      <aside class="md:w-64 w-full border-r bg-gray-50 py-6 px-4 flex-shrink-0">
        <div class="flex flex-col items-center mb-8">
          <img :src="avatarPreview || defaultAvatar" class="w-20 h-20 rounded-full object-cover border shadow" />
          <div class="mt-2 font-semibold text-gray-800">{{ form.name }}</div>
          <div class="text-xs text-gray-500">{{ form.email }}</div>
        </div>
        <nav class="flex flex-col gap-1">
          <button
            v-for="item in menu"
            :key="item.key"
            @click="activeTab = item.key"
            :class="[
              'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition',
              activeTab === item.key ? 'bg-primary/10 text-primary' : 'hover:bg-primary/5 text-gray-700',
            ]"
          >
            <Icon :icon="item.icon" class="w-5 h-5" />
            <span>{{ item.label }}</span>
          </button>
        </nav>
      </aside>
      <!-- Main Content -->
      <section class="flex-1 p-6">
        <!-- Thông tin cá nhân -->
        <div v-if="activeTab === 'profile'">
          <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
            <Icon icon="ph:user-bold" class="w-6 h-6" /> Thông tin cá nhân
          </h2>
          <form @submit.prevent="onSave" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="flex flex-col items-center gap-2 md:col-span-2">
              <label for="avatar-upload" class="relative cursor-pointer group">
                <img :src="avatarPreview || defaultAvatar" class="w-28 h-28 rounded-full object-cover border shadow" />
                <div
                  class="absolute inset-0 bg-black/30 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <Icon icon="ph:camera-bold" class="text-white w-7 h-7" />
                </div>
                <input id="avatar-upload" type="file" accept="image/*" class="hidden" @change="onAvatarChange" />
              </label>
              <div class="text-sm text-gray-500">Nhấn vào ảnh để thay đổi</div>
            </div>
            <div>
              <Label for="name">Họ và tên</Label>
              <Input id="name" v-model="form.name" required />
            </div>
            <div>
              <Label for="email">Email</Label>
              <Input id="email" v-model="form.email" type="email" required />
            </div>
            <div>
              <Label for="phone">Số điện thoại</Label>
              <Input id="phone" v-model="form.phone" type="tel" required pattern="[0-9]{10,11}" />
            </div>
            <div>
              <Label for="dob">Ngày sinh</Label>
              <Input id="dob" v-model="form.dob" type="date" />
            </div>
            <div>
              <Label>Giới tính</Label>
              <div class="flex gap-4 mt-1">
                <label class="flex items-center gap-1">
                  <input type="radio" value="Nam" v-model="form.gender" /> Nam
                </label>
                <label class="flex items-center gap-1">
                  <input type="radio" value="Nữ" v-model="form.gender" /> Nữ
                </label>
                <label class="flex items-center gap-1">
                  <input type="radio" value="Khác" v-model="form.gender" /> Khác
                </label>
              </div>
            </div>
            <div class="md:col-span-2 flex justify-end gap-2 mt-2">
              <Button type="submit" :disabled="loading">Lưu thay đổi</Button>
            </div>
          </form>
        </div>
        <!-- Đổi mật khẩu -->
        <div v-else-if="activeTab === 'password'">
          <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
            <Icon icon="ph:lock-bold" class="w-6 h-6" /> Đổi mật khẩu
          </h2>
          <form @submit.prevent="onChangePassword" class="max-w-md space-y-5">
            <div>
              <Label for="oldPassword">Mật khẩu hiện tại</Label>
              <Input id="oldPassword" v-model="passwordForm.oldPassword" type="password" required />
            </div>
            <div>
              <Label for="newPassword">Mật khẩu mới</Label>
              <Input id="newPassword" v-model="passwordForm.newPassword" type="password" required minlength="6" />
            </div>
            <div>
              <Label for="confirmPassword">Xác nhận mật khẩu mới</Label>
              <Input
                id="confirmPassword"
                v-model="passwordForm.confirmPassword"
                type="password"
                required
                :class="{
                  'border-red-500':
                    passwordForm.newPassword !== passwordForm.confirmPassword && passwordForm.confirmPassword,
                }"
              />
              <div
                v-if="passwordForm.newPassword !== passwordForm.confirmPassword && passwordForm.confirmPassword"
                class="text-red-500 text-xs mt-1"
              >
                Mật khẩu xác nhận không khớp
              </div>
            </div>
            <div class="flex justify-end gap-2 mt-2">
              <Button type="submit" :disabled="loading || passwordForm.newPassword !== passwordForm.confirmPassword"
                >Đổi mật khẩu</Button
              >
            </div>
          </form>
        </div>
        <!-- Địa chỉ nhận hàng -->
        <div v-else-if="activeTab === 'address'">
          <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
            <Icon icon="ph:map-pin-bold" class="w-6 h-6" /> Địa chỉ nhận hàng
          </h2>
          <div class="space-y-4 max-w-2xl">
            <div
              v-for="(addr, idx) in addresses"
              :key="idx"
              class="border rounded-lg p-4 flex items-center justify-between gap-4 bg-gray-50"
            >
              <div>
                <div class="font-semibold text-gray-800">
                  {{ addr.name }}
                  <span v-if="addr.default" class="ml-2 px-2 py-0.5 text-xs bg-primary text-white rounded"
                    >Mặc định</span
                  >
                </div>
                <div class="text-gray-600 text-sm">{{ addr.phone }} | {{ addr.address }}</div>
              </div>
              <div class="flex gap-2">
                <Button size="sm" variant="outline" @click="setDefaultAddress(idx)" v-if="!addr.default"
                  >Chọn mặc định</Button
                >
                <Button size="sm" variant="outline" @click="editAddress(idx)"
                  ><Icon icon="ph:pencil-bold" class="w-4 h-4"
                /></Button>
                <Button size="sm" variant="destructive" @click="confirmDeleteAddress(idx)"
                  ><Icon icon="ph:trash-bold" class="w-4 h-4"
                /></Button>
              </div>
            </div>
            <form @submit.prevent="addOrUpdateAddress" class="border rounded-lg p-4 bg-white">
              <div class="font-semibold mb-2">
                {{ editingAddressIdx === null ? "Thêm địa chỉ mới" : "Chỉnh sửa địa chỉ" }}
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label for="addrName">Họ tên</Label>
                  <Input id="addrName" v-model="addressForm.name" required />
                </div>
                <div>
                  <Label for="addrPhone">Số điện thoại</Label>
                  <Input id="addrPhone" v-model="addressForm.phone" required pattern="[0-9]{10,11}" />
                </div>
                <div class="md:col-span-2">
                  <Label for="addrAddress">Địa chỉ</Label>
                  <Input id="addrAddress" v-model="addressForm.address" required />
                </div>
              </div>
              <div class="flex justify-end gap-2 mt-4">
                <Button type="submit">{{ editingAddressIdx === null ? "Thêm" : "Cập nhật" }}</Button>
                <Button type="button" variant="outline" v-if="editingAddressIdx !== null" @click="cancelEditAddress"
                  >Hủy</Button
                >
              </div>
            </form>
          </div>
        </div>
        <!-- Đơn mua -->
        <div v-else-if="activeTab === 'orders'">
          <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
            <Icon icon="ph:shopping-bag-bold" class="w-6 h-6" /> Đơn mua
          </h2>
          <RouterLink to="/purchase">
            <Button> Xem tất cả đơn mua </Button>
          </RouterLink>
        </div>
        <!-- Thông báo -->
        <div v-else-if="activeTab === 'notifications'">
          <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
            <Icon icon="ph:bell-bold" class="w-6 h-6" /> Thông báo
          </h2>
          <div class="space-y-3">
            <div
              v-for="(noti, idx) in notifications"
              :key="idx"
              class="border rounded-lg p-3 bg-gray-50 flex items-center gap-3"
            >
              <Icon :icon="noti.icon" class="w-6 h-6 text-primary" />
              <div>
                <div class="font-semibold">{{ noti.title }}</div>
                <div class="text-sm text-gray-600">{{ noti.content }}</div>
                <div class="text-xs text-gray-400 mt-1">{{ noti.time }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- Đăng xuất -->
        <div v-else-if="activeTab === 'logout'">
          <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
            <Icon icon="ph:sign-out-bold" class="w-6 h-6" /> Đăng xuất
          </h2>
          <Button @click="handleLogout" variant="destructive">Đăng xuất</Button>
        </div>
      </section>
    </div>
    <Dialog v-model="showDeleteAddressDialog">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bạn có chắc chắn muốn xóa địa chỉ này?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button @click="removeAddressConfirmed" variant="destructive">Xóa</Button>
          <Button @click="() => (showDeleteAddressDialog = false)">Hủy</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { Icon } from "@iconify/vue";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RouterLink, useRouter } from "vue-router";
import { getAddresses, createAddress, updateAddress, deleteAddress } from "@/api/addressApi";
import { updateProfile } from "@/api/userApi";
import { useCartStore } from "@/stores/cartStore";
import { useToast } from "@/components/ui/toast/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const defaultAvatar = "https://ui-avatars.com/api/?name=User&background=random";
const avatarPreview = ref("");
const loading = ref(false);
const activeTab = ref("profile");
const editingAddressIdx = ref(null);
const router = useRouter();
const cartStore = useCartStore();
const { toast } = useToast();
const showDeleteAddressDialog = ref(false);
const addressToDeleteIdx = ref(null);

const menu = [
  { key: "profile", label: "Thông tin cá nhân", icon: "ph:user-bold" },
  { key: "password", label: "Đổi mật khẩu", icon: "ph:lock-bold" },
  { key: "address", label: "Địa chỉ nhận hàng", icon: "ph:map-pin-bold" },
  { key: "orders", label: "Đơn mua", icon: "ph:shopping-bag-bold" },
  { key: "notifications", label: "Thông báo", icon: "ph:bell-bold" },
  { key: "logout", label: "Đăng xuất", icon: "ph:sign-out-bold" },
];

const form = ref({
  name: "Nguyễn Văn A",
  email: "user@email.com",
  phone: "0987654321",
  dob: "1995-01-01",
  gender: "Nam",
});

function onAvatarChange(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (ev) => {
      avatarPreview.value = ev.target.result;
    };
    reader.readAsDataURL(file);
  }
}

async function onSave() {
  loading.value = true;
  try {
    await updateProfile(form.value);
    toast({ title: "Cập nhật thông tin thành công!" });
  } catch (e) {
    toast({ title: "Lỗi cập nhật!", description: "Có lỗi xảy ra khi cập nhật thông tin!", variant: "destructive" });
  } finally {
    loading.value = false;
  }
}

// Đổi mật khẩu
const passwordForm = ref({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});
function onChangePassword() {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) return;
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    alert("Đổi mật khẩu thành công!");
    passwordForm.value = { oldPassword: "", newPassword: "", confirmPassword: "" };
  }, 1000);
}

// Địa chỉ
const addresses = ref([]);
const addressForm = ref({ name: "", phone: "", address: "" });
function setDefaultAddress(idx) {
  addresses.value.forEach((a, i) => (a.default = i === idx));
}
function editAddress(idx) {
  editingAddressIdx.value = idx;
  addressForm.value = { ...addresses.value[idx] };
}
function confirmDeleteAddress(idx) {
  addressToDeleteIdx.value = idx;
  showDeleteAddressDialog.value = true;
}
async function removeAddressConfirmed() {
  try {
    const id = addresses.value[addressToDeleteIdx.value]._id;
    await deleteAddress(id);
    const res = await getAddresses();
    addresses.value = res.data?.data || [];
    toast({ title: "Xóa địa chỉ thành công!", variant: "success" });
  } catch (e) {
    toast({ title: "Lỗi xóa địa chỉ!", description: "Có lỗi xảy ra khi xóa địa chỉ!", variant: "destructive" });
  } finally {
    showDeleteAddressDialog.value = false;
    addressToDeleteIdx.value = null;
  }
}
async function addOrUpdateAddress() {
  try {
    if (editingAddressIdx.value === null) {
      await createAddress(addressForm.value);
      toast({ title: "Thêm địa chỉ thành công!" });
    } else {
      const id = addresses.value[editingAddressIdx.value]._id;
      await updateAddress(id, addressForm.value);
      toast({ title: "Cập nhật địa chỉ thành công!" });
    }
    const res = await getAddresses();
    addresses.value = res.data?.data || [];
    editingAddressIdx.value = null;
    addressForm.value = { name: "", phone: "", address: "" };
  } catch (e) {
    toast({ title: "Lỗi địa chỉ!", description: "Có lỗi xảy ra khi cập nhật địa chỉ!", variant: "destructive" });
  }
}
function cancelEditAddress() {
  editingAddressIdx.value = null;
  addressForm.value = { name: "", phone: "", address: "" };
}

// Thông báo mẫu
const notifications = ref([
  {
    icon: "ph:bell-bold",
    title: "Khuyến mãi mới!",
    content: "Nhận ngay voucher 50k cho đơn hàng đầu tiên.",
    time: "1 giờ trước",
  },
  { icon: "ph:bell-bold", title: "Đơn hàng đã giao thành công", content: "Đơn #123456 đã được giao.", time: "Hôm qua" },
]);

function handleLogout() {
  localStorage.removeItem("accessToken");
  // Có thể clear thêm state user nếu có
  router.push("/login");
}

onMounted(async () => {
  try {
    const res = await getAddresses();
    addresses.value = res.data?.data || [];
  } catch (e) {}
});

const cartCount = computed(() => cartStore.cartItems?.length || 0);
</script>

<style scoped>
input[disabled],
button[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}
.menu-active {
  background: var(--primary);
  color: #fff;
}
</style>

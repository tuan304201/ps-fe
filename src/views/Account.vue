<template>
  <div class="container px-3 sm:px-4 lg:px-8 md:my-5 my-2">
    <div class="bg-white rounded-xl border flex flex-col md:flex-row overflow-hidden">
      <!-- Sidebar -->
      <aside class="md:w-64 w-full border-r bg-gray-50 py-6 px-4 flex-shrink-0">
        <div class="flex flex-col items-center mb-8">
          <img
            :src="avatarPreview || userProfile.avatar || defaultAvatar"
            class="w-20 h-20 rounded-full object-cover border shadow"
          />
          <div class="mt-2 font-semibold text-gray-800">{{ form.name }}</div>
          <div class="text-xs text-gray-500">{{ userProfile.email || form.email }}</div>
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
            <Icon icon="mdi:user" class="w-6 h-6" /> Thông tin cá nhân
          </h2>
          <form @submit.prevent="onSave" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="flex flex-col items-center gap-2 md:col-span-2">
              <label for="avatar-upload" class="relative cursor-pointer group">
                <img
                  :src="avatarPreview || userProfile.avatar || defaultAvatar"
                  class="w-28 h-28 rounded-full object-cover border shadow"
                />
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
              <Input id="email" v-model="form.email" type="email" required disabled />
            </div>
            <div>
              <Label for="phone">Số điện thoại</Label>
              <Input id="phone" v-model="form.phone" type="tel" required pattern="[0-9]{10,11}" />
            </div>
            <div>
              <Label for="dob">Ngày sinh</Label>
              <!-- <Input id="dob" v-model="form.dateOfBirth" type="date" /> -->
              <VueDatePicker
                id="dob"
                v-model="form.dateOfBirth"
                :enable-time-picker="false"
                auto-position="bottom"
                teleport="body"
              />
            </div>
            <div>
              <Label>Giới tính</Label>
              <RadioGroup v-model="form.gender" default-value="Nam" class="flex gap-4 mt-2">
                <div class="flex items-center space-x-2">
                  <RadioGroupItem id="gender-nam" value="male" />
                  <Label for="gender-nam" class="font-normal">Nam</Label>
                </div>
                <div class="flex items-center space-x-2">
                  <RadioGroupItem id="gender-nu" value="female" />
                  <Label for="gender-nu" class="font-normal">Nữ</Label>
                </div>
                <div class="flex items-center space-x-2">
                  <RadioGroupItem id="gender-khac" value="other" />
                  <Label for="gender-khac" class="font-normal">Khác</Label>
                </div>
              </RadioGroup>
            </div>
            <div class="md:col-span-2">
              <Label for="address">Địa chỉ</Label>
              <Input id="address" v-model="form.address" />
            </div>
            <div class="md:col-span-2 flex justify-end gap-2 mt-2">
              <Button type="submit" :disabled="loading">Lưu thay đổi</Button>
            </div>
          </form>
        </div>
        <!-- Đổi mật khẩu -->
        <div v-else-if="activeTab === 'password'">
          <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
            <Icon icon="uis:lock-alt" class="w-6 h-6" /> Đổi mật khẩu
          </h2>
          <form @submit.prevent="onChangePassword" class="space-y-5">
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
              <Dialog v-model:open="showOtpDialog">
                <DialogTrigger as-child>
                  <Button type="submit" :disabled="loading || passwordForm.newPassword !== passwordForm.confirmPassword"
                    >Đổi mật khẩu</Button
                  >
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Xác nhận OTP</DialogTitle>
                    <DialogDescription>
                      Mã OTP đã được gửi đến email của bạn. Vui lòng nhập mã để xác nhận đổi mật khẩu.
                    </DialogDescription>
                  </DialogHeader>
                  <div class="space-y-6">
                    <div>
                      <Label for="otp"></Label>
                      <PinInput
                        id="pin-input"
                        v-model="otpForm.otp"
                        placeholder="○"
                        :disabled="loading"
                        class="mb-2 flex justify-center items-center"
                      >
                        <PinInputGroup class="gap-1 flex justify-between">
                          <template v-for="(id, index) in 6" :key="index">
                            <PinInputSlot class="rounded-md border w-10 h-12 text-xl text-center" :index="index" />
                            <template v-if="index !== 5">
                              <PinInputSeparator />
                            </template>
                          </template>
                        </PinInputGroup>
                      </PinInput>
                    </div>
                    <div class="flex justify-between items-center">
                      <Button type="button" variant="outline" @click="resendOtp" :disabled="otpCooldown > 0">
                        {{ otpCooldown > 0 ? `Gửi lại (${otpCooldown}s)` : "Gửi lại OTP" }}
                      </Button>
                      <div class="flex gap-2">
                        <Button @click="confirmOtp" :disabled="!otpForm.otp || otpForm.otp.length !== 6"
                          >Xác nhận</Button
                        >
                        <DialogClose as-child>
                          <Button variant="outline">Hủy</Button>
                        </DialogClose>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </form>
        </div>
        <!-- Địa chỉ nhận hàng -->
        <div v-else-if="activeTab === 'address'">
          <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
            <Icon icon="bxs:map" class="w-6 h-6" /> Địa chỉ nhận hàng
          </h2>
          <div class="space-y-4">
            <div
              v-for="(addr, idx) in addresses"
              :key="addr._id"
              class="border rounded-lg p-4 flex items-center justify-between gap-4 bg-gray-50"
            >
              <div>
                <div class="font-semibold text-gray-800">
                  {{ addr.fullName }}
                  <span v-if="addr.isDefault" class="ml-2 px-2 py-0.5 text-xs bg-primary text-white rounded"
                    >Mặc định</span
                  >
                </div>
                <div class="text-gray-600 text-sm">
                  {{ addr.phoneNumber }} |
                  {{ [addr.street, addr.city, addr.state, addr.province].filter(Boolean).join(", ") }}
                </div>
              </div>
              <div class="flex gap-2">
                <Button size="sm" variant="outline" @click="setDefaultAddress(idx)" v-if="!addr.isDefault"
                  >Chọn mặc định</Button
                >
                <Button size="sm" variant="outline" @click="editAddress(idx)"
                  ><Icon icon="ph:pencil-bold" class="w-4 h-4"
                /></Button>

                <Dialog>
                  <DialogTrigger as-child>
                    <Button size="sm" variant="destructive" @click="confirmDeleteAddress(idx)"
                      ><Icon icon="ph:trash-bold" class="w-4 h-4"
                    /></Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Bạn có chắc chắn muốn xóa địa chỉ này?</DialogTitle>
                    </DialogHeader>
                    <DialogDescription></DialogDescription>
                    <DialogFooter>
                      <Button @click="removeAddressConfirmed" variant="destructive">Xóa</Button>
                      <DialogClose as-child>
                        <Button variant="outline">Hủy</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
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
                <div>
                  <Label for="province">Tỉnh/Thành phố</Label>
                  <Select v-model="addressForm.provinceCode">
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn tỉnh/thành" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Chọn tỉnh/thành</SelectLabel>
                        <SelectItem v-for="p in provinces" :key="p.code" :value="String(p.code)">{{
                          p.name_with_type
                        }}</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label for="district">Quận/Huyện</Label>
                  <Select v-model="addressForm.districtCode" :disabled="districts.length === 0">
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn quận/huyện" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Chọn quận/huyện</SelectLabel>
                        <SelectItem v-for="d in districts" :key="d.code" :value="String(d.code)">{{
                          d.name_with_type
                        }}</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label for="ward">Phường/Xã</Label>
                  <Select v-model="addressForm.wardCode" :disabled="wards.length === 0">
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn phường/xã" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Chọn phường/xã</SelectLabel>
                        <SelectItem v-for="w in wards" :key="w.code" :value="String(w.code)">{{
                          w.name_with_type
                        }}</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div class="md:col-span-2">
                  <Label for="addrAddress">Địa chỉ cụ thể (số nhà, tên đường...)</Label>
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
            <Icon icon="mynaui:cart-solid" class="w-6 h-6" /> Đơn mua
          </h2>
          <div class="space-y-4">
            <div v-if="orders.length === 0" class="text-center py-8 text-gray-500">
              <Icon icon="mynaui:cart-solid" class="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>Bạn chưa có đơn hàng nào</p>
            </div>
            <div v-else class="space-y-3">
              <div v-for="order in orders.slice(0, 5)" :key="order._id" class="border rounded-lg p-4 bg-gray-50">
                <div class="flex justify-between items-start">
                  <div>
                    <div class="font-semibold">Đơn hàng #{{ order._id.slice(-6) }}</div>
                    <div class="text-sm text-gray-600">{{ order.createdAt }}</div>
                    <div class="text-sm text-gray-600">{{ order.totalAmount?.toLocaleString() }} VNĐ</div>
                  </div>
                  <div class="text-right">
                    <div class="text-sm font-medium" :class="getStatusColor(order.status)">
                      {{ getStatusText(order.status) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <RouterLink to="/purchase" class="w-full flex items-center justify-center">
              <Button> Xem tất cả đơn mua </Button>
            </RouterLink>
          </div>
        </div>
        <!-- Thông báo -->
        <div v-else-if="activeTab === 'notifications'">
          <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
            <Icon icon="solar:bell-bold" class="w-6 h-6" /> Thông báo
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
            <Icon icon="fluent:sign-out-20-filled" class="w-6 h-6" /> Đăng xuất
          </h2>
          <Button @click="handleLogout" variant="destructive" :disabled="loading">Đăng xuất</Button>
        </div>
      </section>
    </div>

    <!-- OTP Verification Dialog -->
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, nextTick } from "vue";
import { Icon } from "@iconify/vue";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RouterLink, useRouter } from "vue-router";
import { getAddresses, createAddress, updateAddress, deleteAddress } from "@/api/addressApi";
import {
  updateProfile,
  logout,
  requestChangePassword,
  resendChangePasswordOtp,
  confirmChangePassword,
  getUserProfile,
} from "@/api/userApi";
import { getAllOrders } from "@/api/orderApi";
import { useCartStore } from "@/stores/cartStore";
import { useUserStore } from "@/stores/userStore";
import { useToast } from "@/components/ui/toast/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getProvinces, getDistricts, getWards } from "@/api/addressLocationApi";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PinInput } from "@/components/ui/pin-input";
import { PinInputGroup, PinInputSlot, PinInputSeparator } from "@/components/ui/pin-input";

const defaultAvatar = "https://ui-avatars.com/api/?name=User&background=random";
const avatarPreview = ref("");
const loading = ref(false);
const activeTab = ref("profile");
const editingAddressIdx = ref(null);
const router = useRouter();
const cartStore = useCartStore();
const userStore = useUserStore();
const { toast } = useToast();
const showDeleteAddressDialog = ref(false);
const addressToDeleteIdx = ref(null);
const showOtpDialog = ref(false);
const otpCooldown = ref(0);
const userProfile = ref({});
const orders = ref([]);
const provinces = ref([]);
const districts = ref([]);
const wards = ref([]);
const isEditingAddress = ref(false);

const menu = [
  { key: "profile", label: "Thông tin cá nhân", icon: "mdi:user" },
  { key: "password", label: "Đổi mật khẩu", icon: "uis:lock-alt" },
  { key: "address", label: "Địa chỉ nhận hàng", icon: "bxs:map" },
  { key: "orders", label: "Đơn mua", icon: "mynaui:cart-solid" },
  { key: "notifications", label: "Thông báo", icon: "solar:bell-bold" },
  { key: "logout", label: "Đăng xuất", icon: "fluent:sign-out-20-filled" },
];

const form = ref({
  name: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "male",
  address: "",
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
    const updateData = {
      name: form.value.name,
      phone: form.value.phone,
      gender: form.value.gender,
      dob: form.value.dateOfBirth || form.value.dob || "",
      address: form.value.address,
      avatar: avatarPreview.value,
    };
    if (!updateData.dob) delete updateData.dob;
    await updateProfile(updateData);
    toast({ title: "Cập nhật thông tin thành công!" });
    // Refresh user profile
    await loadUserProfile();
    // Đồng bộ đầy đủ thông tin user với Pinia store
    userStore.setUser({
      name: form.value.name,
      email: form.value.email,
      avatar: avatarPreview.value || userProfile.value.avatar || "",
    });
  } catch (e) {
    toast({
      title: "Lỗi cập nhật!",
      description: e.response?.data?.message || "Có lỗi xảy ra khi cập nhật thông tin!",
      variant: "destructive",
    });
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

const otpForm = ref({
  otp: Array(6).fill(""),
});

async function onChangePassword() {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) return;
  loading.value = true;
  try {
    await requestChangePassword({
      oldPassword: passwordForm.value.oldPassword,
      newPassword: passwordForm.value.newPassword,
    });
    showOtpDialog.value = true;
    console.log("showOtpDialog:", showOtpDialog.value);
    toast({ title: "OTP đã được gửi đến email của bạn!" });
  } catch (e) {
    toast({
      title: "Lỗi gửi OTP!",
      description: e.response?.data?.message || "Có lỗi xảy ra khi gửi OTP!",
      variant: "destructive",
    });
  } finally {
    loading.value = false;
  }
}

async function resendOtp() {
  try {
    await resendChangePasswordOtp();
    otpCooldown.value = 60;
    const timer = setInterval(() => {
      otpCooldown.value--;
      if (otpCooldown.value <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    toast({ title: "OTP mới đã được gửi lại!" });
  } catch (e) {
    toast({
      title: "Lỗi gửi lại OTP!",
      description: e.response?.data?.message || "Có lỗi xảy ra khi gửi lại OTP!",
      variant: "destructive",
    });
  }
}

async function confirmOtp() {
  if (!otpForm.value.otp || otpForm.value.otp.length !== 6 || otpForm.value.otp.some((v) => !v)) return;

  loading.value = true;
  try {
    await confirmChangePassword({
      otp: otpForm.value.otp.join(""),
      newPassword: passwordForm.value.newPassword,
    });

    showOtpDialog.value = false;
    passwordForm.value = { oldPassword: "", newPassword: "", confirmPassword: "" };
    otpForm.value.otp = Array(6).fill("");
    showOtpDialog.value = false;

    toast({ title: "Đổi mật khẩu thành công!" });
  } catch (e) {
    toast({
      title: "Lỗi xác nhận OTP!",
      description: e.response?.data?.message || "Có lỗi xảy ra khi xác nhận OTP!",
      variant: "destructive",
    });
  } finally {
    loading.value = false;
  }
}

// Địa chỉ
const addresses = ref([]);
const addressForm = ref({
  name: "",
  phone: "",
  province: "",
  provinceCode: "",
  district: "",
  districtCode: "",
  ward: "",
  wardCode: "",
  address: "",
});

async function setDefaultAddress(idx) {
  try {
    const addressId = addresses.value[idx]._id;
    await updateAddress(addressId, { isDefault: true });
    const res = await getAddresses();
    addresses.value = res.data?.data || [];
    toast({ title: "Đã đặt làm địa chỉ mặc định!" });
  } catch (e) {
    toast({
      title: "Lỗi cập nhật!",
      description: e.response?.data?.message || "Có lỗi xảy ra khi cập nhật địa chỉ mặc định!",
      variant: "destructive",
    });
  }
}

async function editAddress(idx) {
  isEditingAddress.value = true;
  editingAddressIdx.value = idx;
  const addr = addresses.value[idx];
  // Set các trường cơ bản trước
  addressForm.value = {
    name: addr.fullName,
    phone: addr.phoneNumber,
    province: addr.province || "",
    provinceCode: addr.provinceCode ? String(addr.provinceCode) : "",
    district: "",
    districtCode: "",
    ward: "",
    wardCode: "",
    address: addr.street || "",
  };
  // Nếu có provinceCode, load districts và set districtCode
  if (addressForm.value.provinceCode) {
    const resDistricts = await getDistricts(addressForm.value.provinceCode);
    districts.value = Array.isArray(resDistricts.data.data.data) ? resDistricts.data.data.data : [];
    addressForm.value.districtCode = addr.districtCode ? String(addr.districtCode) : "";
    addressForm.value.district = addr.district || "";
    // Nếu có districtCode, load wards và set wardCode
    if (addressForm.value.districtCode) {
      const resWards = await getWards(addressForm.value.districtCode);
      wards.value = Array.isArray(resWards.data.data.data) ? resWards.data.data.data : [];
      addressForm.value.wardCode = addr.wardCode ? String(addr.wardCode) : "";
      addressForm.value.ward = addr.ward || "";
    }
  }
  isEditingAddress.value = false;
}

function confirmDeleteAddress(idx) {
  console.log("Xoá địa chỉ idx:", idx, addresses.value[idx]);
  addressToDeleteIdx.value = idx;
  showDeleteAddressDialog.value = true;
}

async function removeAddressConfirmed() {
  console.log("Đã click xác nhận xoá, idx:", addressToDeleteIdx.value, addresses.value[addressToDeleteIdx.value]);
  try {
    const id = addresses.value[addressToDeleteIdx.value]._id;
    await deleteAddress(id);
    const res = await getAddresses();
    addresses.value = res.data?.data || [];
    toast({ title: "Xóa địa chỉ thành công!" });
  } catch (e) {
    toast({
      title: "Lỗi xóa địa chỉ!",
      description: e.response?.data?.message || "Có lỗi xảy ra khi xóa địa chỉ!",
      variant: "destructive",
    });
  } finally {
    showDeleteAddressDialog.value = false;
    addressToDeleteIdx.value = null;
  }
}

async function addOrUpdateAddress() {
  try {
    const provinceObj = provinces.value.find((p) => String(p.code) === addressForm.value.provinceCode);
    const districtObj = districts.value.find((d) => String(d.code) === addressForm.value.districtCode);
    const addressData = {
      fullName: addressForm.value.name,
      phoneNumber: addressForm.value.phone,
      street: addressForm.value.address,
      city: districtObj ? districtObj.name_with_type : "",
      state: provinceObj ? provinceObj.name_with_type : "",
      country: "Việt Nam",
      isDefault: false,
      province: provinceObj ? provinceObj.name_with_type : "",
      provinceCode: addressForm.value.provinceCode,
      district: districtObj ? districtObj.name_with_type : "",
      districtCode: addressForm.value.districtCode,
      ward: wards.value.find((w) => String(w.code) === addressForm.value.wardCode)?.name_with_type || "",
      wardCode: addressForm.value.wardCode,
    };
    if (editingAddressIdx.value === null) {
      await createAddress(addressData);
      toast({ title: "Thêm địa chỉ thành công!" });
    } else {
      const id = addresses.value[editingAddressIdx.value]._id;
      await updateAddress(id, addressData);
      toast({ title: "Cập nhật địa chỉ thành công!" });
    }
    const res = await getAddresses();
    addresses.value = res.data?.data || [];
    editingAddressIdx.value = null;
    addressForm.value = {
      name: "",
      phone: "",
      province: "",
      provinceCode: "",
      district: "",
      districtCode: "",
      ward: "",
      wardCode: "",
      address: "",
    };
  } catch (e) {
    toast({
      title: "Lỗi địa chỉ!",
      description: e.response?.data?.message || "Có lỗi xảy ra khi cập nhật địa chỉ!",
      variant: "destructive",
    });
  }
}

function cancelEditAddress() {
  editingAddressIdx.value = null;
  addressForm.value = {
    name: "",
    phone: "",
    province: "",
    provinceCode: "",
    district: "",
    districtCode: "",
    ward: "",
    wardCode: "",
    address: "",
  };
}

// Orders
function getStatusText(status) {
  const statusMap = {
    pending: "Chờ xác nhận",
    confirmed: "Đã xác nhận",
    shipping: "Đang giao",
    delivered: "Đã giao",
    cancelled: "Đã hủy",
  };
  return statusMap[status] || status;
}

function getStatusColor(status) {
  const colorMap = {
    pending: "text-yellow-600",
    confirmed: "text-blue-600",
    shipping: "text-purple-600",
    delivered: "text-green-600",
    cancelled: "text-red-600",
  };
  return colorMap[status] || "text-gray-600";
}

// Thông báo mẫu
const notifications = ref([
  {
    icon: "solar:bell-bold",
    title: "Khuyến mãi mới!",
    content: "Nhận ngay voucher 50k cho đơn hàng đầu tiên.",
    time: "1 giờ trước",
  },
  {
    icon: "solar:bell-bold",
    title: "Đơn hàng đã giao thành công",
    content: "Đơn #123456 đã được giao.",
    time: "Hôm qua",
  },
]);

async function handleLogout() {
  loading.value = true;
  try {
    await logout();
    localStorage.removeItem("accessToken");
    cartStore.clearCart();
    toast({ title: "Đăng xuất thành công!" });
    router.push("/login");
  } catch (e) {
    toast({
      title: "Lỗi đăng xuất!",
      description: e.response?.data?.message || "Có lỗi xảy ra khi đăng xuất!",
      variant: "destructive",
    });
  } finally {
    loading.value = false;
  }
}

async function loadUserProfile() {
  try {
    const res = await getUserProfile();
    userProfile.value = res.data?.data || {};

    // Update form with user data, chuyển dob sang Date object nếu có
    form.value = {
      name: userProfile.value.name || "",
      email: userProfile.value.email || "",
      phone: userProfile.value.phone || "",
      dateOfBirth: userProfile.value.dob ? new Date(userProfile.value.dob) : "",
      gender: userProfile.value.gender || "male",
      address: userProfile.value.address || "",
    };
  } catch (e) {
    console.error("Error loading user profile:", e);
  }
}

async function loadOrders() {
  try {
    const res = await getAllOrders();
    orders.value = res.data?.data || [];
  } catch (e) {
    console.error("Error loading orders:", e);
  }
}

onMounted(async () => {
  try {
    await Promise.all([
      loadUserProfile(),
      getAddresses().then((res) => {
        addresses.value = res.data?.data || [];
      }),
      loadOrders(),
      getProvinces().then((res) => {
        provinces.value = Array.isArray(res.data.data.data) ? res.data.data.data : [];
      }),
    ]);
  } catch (e) {
    console.error("Error loading data:", e);
  }
});

watch(
  () => addressForm.value.provinceCode,
  async (newCode) => {
    if (isEditingAddress.value) return;
    if (!newCode) {
      districts.value = [];
      addressForm.value.district = "";
      addressForm.value.districtCode = "";
      wards.value = [];
      addressForm.value.ward = "";
      addressForm.value.wardCode = "";
      return;
    }
    const res = await getDistricts(newCode);
    districts.value = Array.isArray(res.data.data.data) ? res.data.data.data : [];
    addressForm.value.district = "";
    addressForm.value.districtCode = "";
    wards.value = [];
    addressForm.value.ward = "";
    addressForm.value.wardCode = "";
  },
);

watch(
  () => addressForm.value.districtCode,
  async (newCode) => {
    if (isEditingAddress.value) return;
    if (!newCode) {
      wards.value = [];
      addressForm.value.ward = "";
      addressForm.value.wardCode = "";
      return;
    }
    const res = await getWards(newCode);
    wards.value = Array.isArray(res.data.data.data) ? res.data.data.data : [];
    addressForm.value.ward = "";
    addressForm.value.wardCode = "";
  },
);

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

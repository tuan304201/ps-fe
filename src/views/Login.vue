<template>
  <div class="container px-3 sm:px-4 lg:px-8 md:my-5 my-2 py-8">
    <div class="w-full flex flex-col justify-center items-center">
      <h2 class="text-3xl text-primary font-bold">Đăng nhập tài khoản</h2>
      <h4 class="my-2">
        Bạn chưa có tài khoản? Đăng ký
        <span class="underline text-primary">
          <router-link to="/register">tại đây</router-link>
        </span>
      </h4>
    </div>

    <div class="w-full mt-4">
      <form class="w-4/5 md:w-3/4 lg:w-1/2 m-auto" @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            placeholder="Nhập email"
            v-model="email"
          />
          <span v-if="errors.email" class="text-red-500 text-xs">{{ errors.email }}</span>
        </div>

        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Mật khẩu</label>
          <input
            type="password"
            id="password"
            class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            placeholder="Nhập mật khẩu"
            v-model="password"
          />
          <span v-if="errors.password" class="text-red-500 text-xs">{{ errors.password }}</span>
        </div>

        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              class="form-checkbox ml-3 text-sm text-gray-600"
              v-model="rememberMe"
            />
            <label for="rememberMe" class="ml-2 whitespace-nowrap text-gray-600">Ghi nhớ mật khẩu</label>
          </div>

          <router-link to="/forgot-password" class="text-gray-600 hover:text-primary transition-all">
            Quên mật khẩu?
          </router-link>
        </div>

        <div v-if="errors.general" class="text-red-500 text-sm text-center mt-3">
          {{ errors.general }}
        </div>

        <div class="w-full flex items-center justify-center">
          <button
            type="submit"
            class="mt-4 px-4 w-1/3 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-primary-dark focus:outline-none focus:ring-primary focus:border-primary flex items-center justify-center"
            :disabled="loading"
          >
            <span v-if="loading" class="loader mr-2"></span>
            Đăng nhập
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import api from "@/lib/api";
import { useToast } from "@/components/ui/toast/use-toast";

const router = useRouter();
const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const errors = ref({});
const loading = ref(false);
const { toast } = useToast();

watch(email, () => {
  errors.value.email = null;
});

watch(password, () => {
  errors.value.password = null;
});

const validateInputs = () => {
  errors.value = {};
  let isValid = true;

  if (!email.value) {
    errors.value.email = "Email không được để trống.";
    isValid = false;
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)) {
    errors.value.email = "Email không hợp lệ.";
    isValid = false;
  }

  if (!password.value) {
    errors.value.password = "Mật khẩu không được để trống.";
    isValid = false;
  } else if (password.value.length < 6) {
    errors.value.password = "Mật khẩu phải dài ít nhất 6 ký tự.";
    isValid = false;
  }

  return isValid;
};

const handleLogin = async () => {
  if (!validateInputs()) return;
  loading.value = true;
  try {
    const response = await api.post("/auth/login", {
      email: email.value,
      password: password.value,
      rememberMe: rememberMe.value,
    });
    if (response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
      if (response.data.user && response.data.user.name) {
        localStorage.setItem("userName", response.data.user.name);
        window.dispatchEvent(new Event("storage"));
      }
      toast({ title: "Đăng nhập thành công!", description: "Chào mừng bạn quay lại Pet Shop." });
      router.push("/");
    } else if (
      response.data.message?.toLowerCase().includes("xác thực") ||
      response.data.message?.toLowerCase().includes("otp")
    ) {
      toast({ title: "Tài khoản chưa xác thực!", description: "Vui lòng xác thực OTP để tiếp tục." });
      router.push({ name: "verify-otp", query: { email: email.value, autoResend: true } });
    } else {
      toast({
        title: "Đăng nhập thất bại!",
        description: response.data.message || "Đăng nhập thất bại.",
        variant: "destructive",
      });
    }
  } catch (error) {
    const message = error.response?.data?.message?.toLowerCase() || "";
    const status = error.response?.status;
    if (
      message.includes("xác thực") ||
      message.includes("otp") ||
      message.includes("quyền truy cập") ||
      status === 401 ||
      status === 403
    ) {
      toast({ title: "Tài khoản chưa xác thực!", description: "Vui lòng xác thực OTP để tiếp tục." });
      router.push({ name: "verify-otp", query: { email: email.value, autoResend: true } });
    } else {
      toast({
        title: "Lỗi đăng nhập!",
        description: error.response?.data?.message || "Có lỗi xảy ra khi đăng nhập.",
        variant: "destructive",
      });
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
input[type="checkbox"] {
  display: none;
}

input[type="checkbox"] + label {
  position: relative;
  padding-left: 30px;
  cursor: pointer;
  font-size: 16px;
  line-height: 20px;
  display: inline-block;
  color: #333;
}

input[type="checkbox"] + label:before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  border: 1px solid hsl(var(--primary));
  background-color: #fff;
  border-radius: 3px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

input[type="checkbox"]:checked + label:before {
  background-color: hsl(var(--primary));
  border-color: hsl(var(--primary));
}

input[type="checkbox"]:checked + label:after {
  content: "✓";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: white;
}

.loader {
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  width: 16px;
  height: 16px;
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

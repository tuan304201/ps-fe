<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "@/components/ui/toast/use-toast";
import ForgotPasswordOtp from "@/components/ForgotPasswordOtp.vue";
import api from "@/lib/api";

const router = useRouter();
const { toast } = useToast();

// States
const currentStep = ref(1);
const email = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const loading = ref(false);
const verifiedOtp = ref("");

// Computed
const canProceedToStep2 = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email.value && emailRegex.test(email.value);
});
const canProceedToStep3 = computed(() => newPassword.value.length >= 6 && newPassword.value === confirmPassword.value);

// Step 1: Request OTP
const requestOtp = async () => {
  if (!canProceedToStep2.value) {
    toast({
      title: "Lỗi",
      description: "Vui lòng nhập email hợp lệ",
      variant: "destructive",
    });
    return;
  }

  loading.value = true;
  try {
    await api.post("/auth/send-otp-fortgot-password", { email: email.value });
    toast({
      title: "Thành công",
      description: "Mã OTP đã được gửi đến email của bạn",
      variant: "default",
    });
    currentStep.value = 2;
  } catch (error) {
    toast({
      title: "Lỗi",
      description: error.response?.data?.message || "Không thể gửi mã OTP",
      variant: "destructive",
    });
  } finally {
    loading.value = false;
  }
};

// Step 2: Verify OTP
const handleOtpSuccess = (otp) => {
  verifiedOtp.value = otp;
  currentStep.value = 3;
  toast({
    title: "OTP đã được nhập",
    description: "Vui lòng đặt mật khẩu mới",
    variant: "default",
  });
};

const handleOtpResend = () => {
  // OTP đã được gửi lại trong component
};

// Step 3: Set new password
const resetPassword = async () => {
  if (!canProceedToStep3.value) {
    toast({
      title: "Lỗi",
      description: "Vui lòng kiểm tra lại mật khẩu",
      variant: "destructive",
    });
    return;
  }

  if (!verifiedOtp.value) {
    toast({
      title: "Lỗi",
      description: "Vui lòng nhập OTP trước",
      variant: "destructive",
    });
    return;
  }

  loading.value = true;
  try {
    await api.post("/auth/fortgot-password", {
      email: email.value,
      otp: verifiedOtp.value,
      newPassword: newPassword.value,
    });

    toast({
      title: "Thành công",
      description: "Mật khẩu đã được đặt lại thành công",
      variant: "default",
    });

    // Chuyển về trang đăng nhập
    setTimeout(() => {
      router.push("/login");
    }, 1500);
  } catch (error) {
    toast({
      title: "Lỗi",
      description: error.response?.data?.message || "Không thể đặt lại mật khẩu",
      variant: "destructive",
    });
  } finally {
    loading.value = false;
  }
};

const goBack = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  } else {
    router.push("/login");
  }
};
</script>

<template>
  <div class="container px-3 sm:px-4 lg:px-8 md:my-5 my-2 py-8">
    <div class="w-full flex flex-col justify-center items-center">
      <h2 class="text-3xl text-primary font-bold mb-2">Quên mật khẩu</h2>
      <p class="text-sm text-gray-600 text-center max-w-md">
        Nhập email để lấy lại mật khẩu một cách an toàn và nhanh chóng
      </p>
    </div>

    <!-- Progress Steps -->
    <div class="flex items-center justify-center mb-8 mt-6">
      <div class="flex items-center">
        <div v-for="step in 3" :key="step" class="flex items-center">
          <!-- Step Circle -->
          <div
            :class="[
              'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-all duration-300',
              step <= currentStep
                ? 'bg-primary border-primary text-white shadow-lg'
                : 'bg-white border-gray-300 text-gray-500',
            ]"
          >
            <span v-if="step < currentStep" class="text-white text-lg">✓</span>
            <span v-else>{{ step }}</span>
          </div>

          <!-- Line separator (không hiển thị cho step cuối) -->
          <div
            v-if="step < 3"
            :class="['w-16 h-0.5 mx-2 transition-all duration-300', step < currentStep ? 'bg-primary' : 'bg-gray-300']"
          ></div>
        </div>
      </div>
    </div>

    <!-- Step 1: Enter Email -->
    <div class="w-full mt-4" v-if="currentStep === 1">
      <form class="w-4/5 md:w-3/4 lg:w-1/2 m-auto">
        <div class="mb-6">
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            id="email"
            class="block w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
            placeholder="Nhập email của bạn"
            v-model="email"
            :disabled="loading"
          />
          <div class="flex items-center gap-2 mt-2">
            <div class="w-2 h-2 rounded-full" :class="canProceedToStep2 ? 'bg-green-500' : 'bg-gray-300'"></div>
            <p class="text-xs text-gray-500">Email hợp lệ để tiếp tục</p>
          </div>
        </div>

        <div class="w-full flex items-center justify-center">
          <button
            type="button"
            @click="requestOtp"
            :disabled="!canProceedToStep2 || loading"
            class="mt-3 w-1/3 px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <span v-if="loading" class="flex items-center gap-2">
              <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Đang gửi...
            </span>
            <span v-else class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                ></path>
              </svg>
              Gửi mã OTP
            </span>
          </button>
        </div>

        <div class="w-full flex items-center justify-center mt-4">
          <button
            type="button"
            @click="goBack"
            class="w-1/3 px-4 py-2 text-sm font-medium text-gray-600 bg-white border-2 border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
          >
            <span class="flex items-center gap-2 justify-center">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                ></path>
              </svg>
              Quay lại đăng nhập
            </span>
          </button>
        </div>
      </form>
    </div>

    <!-- Step 2: Verify OTP -->
    <div class="w-full mt-4" v-if="currentStep === 2">
      <div class="w-4/5 md:w-3/4 lg:w-1/2 m-auto">
        <ForgotPasswordOtp
          :email="email"
          :on-success="handleOtpSuccess"
          :on-resend="handleOtpResend"
          :auto-resend="false"
        />

        <div class="w-full flex items-center justify-center mt-6">
          <button
            type="button"
            @click="goBack"
            class="px-6 w-1/2 py-3 text-sm font-medium text-gray-600 bg-white border-2 border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
          >
            <span class="flex items-center gap-2 justify-center">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                ></path>
              </svg>
              Quay lại
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Step 3: Set New Password -->
    <div class="w-full mt-4" v-if="currentStep === 3">
      <form class="w-4/5 md:w-3/4 lg:w-1/2 m-auto">
        <div class="mb-6">
          <label for="newPassword" class="block text-sm font-medium text-gray-700 mb-2">Mật khẩu mới</label>
          <input
            type="password"
            id="newPassword"
            class="block w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
            placeholder="Nhập mật khẩu mới"
            v-model="newPassword"
            :disabled="loading"
          />
          <div class="flex items-center gap-2 mt-2">
            <div class="w-2 h-2 rounded-full" :class="newPassword.length >= 6 ? 'bg-green-500' : 'bg-gray-300'"></div>
            <p class="text-xs text-gray-500">Mật khẩu phải có ít nhất 6 ký tự</p>
          </div>
        </div>

        <div class="mb-6">
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">Xác nhận mật khẩu</label>
          <input
            type="password"
            id="confirmPassword"
            class="block w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
            placeholder="Nhập lại mật khẩu mới"
            v-model="confirmPassword"
            :disabled="loading"
          />
          <div v-if="confirmPassword" class="mt-2">
            <div v-if="newPassword !== confirmPassword" class="flex items-center gap-2">
              <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              <p class="text-xs text-red-500">Mật khẩu không khớp</p>
            </div>
            <div v-else-if="newPassword.length >= 6" class="flex items-center gap-2">
              <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <p class="text-xs text-green-500">Mật khẩu hợp lệ</p>
            </div>
          </div>
        </div>

        <div class="w-full flex items-center justify-center">
          <button
            type="button"
            @click="resetPassword"
            :disabled="!canProceedToStep3 || loading"
            class="mt-6 px-6 w-1/2 py-3 text-sm font-medium text-white bg-primary border border-transparent rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <span v-if="loading" class="flex items-center gap-2">
              <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Đang đặt lại...
            </span>
            <span v-else class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              Đặt lại mật khẩu
            </span>
          </button>
        </div>

        <div class="w-full flex items-center justify-center mt-4">
          <button
            type="button"
            @click="goBack"
            class="px-6 w-1/2 py-3 text-sm font-medium text-gray-600 bg-white border-2 border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
          >
            <span class="flex items-center gap-2 justify-center">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                ></path>
              </svg>
              Quay lại
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.loader {
  border: 2px solid #f3f3f3;
  border-top: 2px solid hsl(var(--primary));
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

/* Cải thiện toast notifications */
:deep(.toast) {
  background-color: white !important;
  border: 1px solid #e5e7eb !important;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
}

:deep(.toast-success) {
  border-left: 4px solid #10b981 !important;
}

:deep(.toast-error) {
  border-left: 4px solid #ef4444 !important;
}

:deep(.toast-warning) {
  border-left: 4px solid #f59e0b !important;
}

:deep(.toast-info) {
  border-left: 4px solid #3b82f6 !important;
}
</style>

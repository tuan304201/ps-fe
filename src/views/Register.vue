<template>
  <div class="container px-3 sm:px-4 lg:px-8 md:my-5 my-2 py-8">
    <div class="w-full flex flex-col justify-center items-center">
      <h2 class="text-3xl text-primary font-bold">Đăng ký tài khoản</h2>
      <h4 class="my-2">
        Bạn đã có tài khoản? Đăng nhập
        <span class="underline text-primary"><router-link to="/login">tại đây</router-link></span>
      </h4>
    </div>

    <div class="w-full mt-4">
      <form class="w-4/5 md:w-3/4 lg:w-1/2 m-auto" @submit.prevent="handleRegister">
        <div class="mb-4 flex gap-4">
          <div class="flex-1">
            <label for="first_name" class="block text-sm font-medium text-gray-700">Họ</label>
            <input
              type="text"
              id="first_name"
              class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="Nhập họ"
              v-model="firstName"
            />
            <span v-if="errors.firstName" class="text-red-500 text-xs">{{ errors.firstName }}</span>
          </div>
          <div class="flex-1">
            <label for="last_name" class="block text-sm font-medium text-gray-700">Tên</label>
            <input
              type="text"
              id="last_name"
              class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="Nhập tên"
              v-model="lastName"
            />
            <span v-if="errors.lastName" class="text-red-500 text-xs">{{ errors.lastName }}</span>
          </div>
        </div>
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
        <div class="mb-4">
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
          <input
            type="password"
            id="confirmPassword"
            class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            placeholder="Xác nhận mật khẩu"
            v-model="confirmPassword"
          />
          <span v-if="errors.confirmPassword" class="text-red-500 text-xs">{{ errors.confirmPassword }}</span>
        </div>

        <div class="w-full flex items-center justify-center">
          <button
            type="submit"
            class="mt-4 px-4 w-1/3 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-primary-dark focus:outline-none focus:ring-primary focus:border-primary flex items-center justify-center"
            :disabled="loading"
          >
            <span v-if="loading" class="loader mr-2"></span>
            Đăng ký
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from "@/lib/api";
import { useToast } from "@/components/ui/toast/use-toast";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "Register",
  setup() {
    const { toast } = useToast();
    const router = useRouter();
    const firstName = ref("");
    const lastName = ref("");
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const errors = ref({});
    const loading = ref(false);

    const validateInputs = () => {
      errors.value = {};
      let isValid = true;

      if (!firstName.value) {
        errors.value.firstName = "Họ không được để trống.";
        isValid = false;
      }

      if (!lastName.value) {
        errors.value.lastName = "Tên không được để trống.";
        isValid = false;
      }

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

      if (password.value !== confirmPassword.value || !confirmPassword.value) {
        errors.value.confirmPassword = "Mật khẩu không khớp.";
        isValid = false;
      }

      return isValid;
    };

    const handleRegister = async () => {
      if (!validateInputs()) return;
      loading.value = true;
      try {
        const response = await api.post("/auth/register", {
          name: firstName.value + " " + lastName.value,
          email: email.value,
          password: password.value,
        });
        if (response.data.message?.includes("OTP")) {
          toast({ title: "Đăng ký thành công!", description: "Vui lòng kiểm tra email để xác thực tài khoản." });
          router.push({
            name: "verify-otp",
            query: { email: email.value, password: password.value, autoResend: false },
          });
        } else {
          toast({
            title: "Đăng ký thất bại!",
            description: response.data.message || "Đăng ký thất bại.",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Lỗi đăng ký!",
          description: error.response?.data?.message || "Có lỗi xảy ra khi đăng ký.",
          variant: "destructive",
        });
      } finally {
        loading.value = false;
      }
    };

    return {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      errors,
      handleRegister,
      loading,
    };
  },

  watch: {
    firstName(value) {
      this.errors.firstName = "";
    },
    lastName(value) {
      this.errors.lastName = "";
    },
    email(value) {
      this.errors.email = "";
    },
    password(value) {
      this.errors.password = "";
    },
    confirmPassword(value) {
      this.errors.confirmPassword = "";
    },
  },
};
</script>

<style scoped>
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

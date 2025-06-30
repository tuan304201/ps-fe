<template>
  <div class="container px-3 sm:px-4 lg:px-8 md:my-5 my-2">
    <div class="w-full flex flex-col justify-center items-center">
      <h2 class="text-3xl text-primary font-bold">Đăng nhập tài khoản</h2>
      <h4 class="my-2">
        Bạn chưa có tài khoản? Đăng ký
        <span class="underline text-primary"><router-link to="/register">tại đây</router-link></span>
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

          <div class="flex items-center justify-between">
            <router-link to="/forgot-password" class="text-gray-600 hover:text-primary transition-all"
              >Quên mật khẩu?</router-link
            >
          </div>
        </div>
        <div class="w-full flex items-center justify-center">
          <button
            type="submit"
            class="mt-4 px-4 w-1/3 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-primary-dark focus:outline-none focus:ring-primary focus:border-primary"
          >
            Đăng nhập
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      rememberMe: false,
      errors: {},
    };
  },
  methods: {
    validateInputs() {
      this.errors = {};
      let isValid = true;

      if (!this.email) {
        this.errors.email = "Email không được để trống.";
        isValid = false;
      } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.email)) {
        this.errors.email = "Email không hợp lệ.";
        isValid = false;
      }

      if (!this.password) {
        this.errors.password = "Mật khẩu không được để trống.";
        isValid = false;
      } else if (this.password.length < 6) {
        this.errors.password = "Mật khẩu phải dài ít nhất 6 ký tự.";
        isValid = false;
      }

      return isValid;
    },

    async handleLogin() {
      if (!this.validateInputs()) {
        return;
      }

      try {
        const response = await axios.post("/api/login", {
          email: this.email,
          password: this.password,
          rememberMe: this.rememberMe,
        });

        if (response.data.success) {
          this.$router.push("/");
        } else {
          this.errors.general = response.data.message || "Đăng nhập thất bại.";
        }
      } catch (error) {
        this.errors.general = error.response?.data?.message || "Có lỗi xảy ra khi đăng nhập.";
      }
    },
  },

  watch: {
    email() {
      this.errors.email = null;
    },
    password() {
      this.errors.password = null;
    },
  },
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
</style>

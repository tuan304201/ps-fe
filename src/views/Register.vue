<template>
  <div class="container px-3 sm:px-4 lg:px-8 md:my-5 my-2">
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
            class="mt-4 px-4 w-1/3 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-primary-dark focus:outline-none focus:ring-primary focus:border-primary"
          >
            Đăng ký
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Register",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: {},
    };
  },
  methods: {
    validateInputs() {
      this.errors = {};
      let isValid = true;

      if (!this.firstName) {
        this.errors.firstName = "Họ không được để trống.";
        isValid = false;
      }

      if (!this.lastName) {
        this.errors.lastName = "Tên không được để trống.";
        isValid = false;
      }

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

      if (this.password !== this.confirmPassword || !this.confirmPassword) {
        this.errors.confirmPassword = "Mật khẩu không khớp.";
        isValid = false;
      }

      return isValid;
    },

    async handleRegister() {
      if (!this.validateInputs()) {
        return;
      }

      try {
        const response = await axios.post("/api/register", {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        });

        if (response.data.success) {
          this.$router.push("/login");
        } else {
          this.errors.general = response.data.message || "Đăng ký thất bại.";
        }
      } catch (error) {
        this.errors.general = error.response?.data?.message || "Có lỗi xảy ra khi đăng ký.";
      }
    },
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

<style scoped></style>

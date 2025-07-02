<script setup>
import { useRoute, useRouter } from "vue-router";
import VerifyOtp from "@/components/VerifyOtp.vue";
import api from "@/lib/api";
import { useToast } from "@/components/ui/toast/use-toast";
const route = useRoute();
const router = useRouter();
const { toast } = useToast();
const email = route.query.email || "";
const password = route.query.password || null;
const autoResend = route.query.autoResend === "true";

if (!email) {
  router.replace("/login");
}

async function onOtpSuccess() {
  console.log("onOtpSuccess called", { email, password });
  if (password) {
    try {
      const response = await api.post("/auth/login", { email, password });
      console.log("login response", response.data);
      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        if (response.data.user && response.data.user.name) {
          localStorage.setItem("userName", response.data.user.name);
          window.dispatchEvent(new Event("storage"));
        }
        toast({ title: "Đăng nhập thành công!", description: "Chào mừng bạn quay lại Pet Shop." });
        router.push("/");
        return;
      }
    } catch (e) {
      console.log("login error", e);
      toast({
        title: "Đăng nhập thất bại!",
        description: e.response?.data?.message || "Có lỗi khi đăng nhập.",
        variant: "destructive",
      });
    }
  }
  if (!password) {
    console.log("redirecting to /login from onOtpSuccess");
    router.push("/login");
  }
}
</script>
<template>
  <div class="flex flex-col items-center justify-center min-h-[33vh]">
    <VerifyOtp :email="email" :onSuccess="onOtpSuccess" :autoResend="autoResend" />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { PinInput, PinInputGroup, PinInputSeparator, PinInputSlot } from "@/components/ui/pin-input";
import { useToast } from "@/components/ui/toast/use-toast";
import api from "@/lib/api";

const props = defineProps({
  email: { type: String, required: true },
  onSuccess: { type: Function, required: false },
  onResend: { type: Function, required: false },
  autoResend: { type: Boolean, default: false },
});

const value = ref([]);
const loading = ref(false);
const resendLoading = ref(false);
const { toast } = useToast();
const resendCooldown = ref(60);
let resendInterval = null;

watch(value, async (val) => {
  console.log("OTP value changed:", val);
  if (val.length === 6 && val.every((v) => v && v.length === 1)) {
    loading.value = true;
    try {
      const otp = val.join("");
      const res = await api.post("/auth/verify-otp", { email: props.email, otp });
      toast({ title: "Xác thực thành công!", variant: "success" });
      if (props.onSuccess) props.onSuccess();
    } catch (e) {
      toast({
        title: "Xác thực thất bại!",
        description: e.response?.data?.message || "Mã OTP không đúng hoặc đã hết hạn.",
        variant: "destructive",
      });
      value.value = [];
    } finally {
      loading.value = false;
    }
  }
});

const startResendCooldown = () => {
  resendCooldown.value = 60;
  resendInterval = setInterval(() => {
    resendCooldown.value--;
    if (resendCooldown.value <= 0) {
      clearInterval(resendInterval);
      resendInterval = null;
    }
  }, 1000);
};

const resendOtp = async () => {
  resendLoading.value = true;
  try {
    await api.post("/auth/resend-otp", { email: props.email });
    toast({ title: "Đã gửi lại mã OTP!", variant: "success" });
    if (props.onResend) props.onResend();
    startResendCooldown();
  } catch (e) {
    toast({
      title: "Gửi lại OTP thất bại!",
      description: e.response?.data?.message || "Không thể gửi lại mã OTP.",
      variant: "destructive",
    });
  } finally {
    resendLoading.value = false;
  }
};

onMounted(() => {
  startResendCooldown();
  if (props.autoResend) {
    resendOtp();
  }
});
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <div class="text-center">
      <div class="font-semibold text-lg mb-2">Nhập mã xác thực OTP</div>
      <div class="text-gray-500 text-sm mb-2">
        Mã gồm 6 số đã gửi tới email <b>{{ email }}</b>
      </div>
    </div>
    <PinInput id="pin-input" v-model="value" placeholder="○" :disabled="loading" class="mb-2">
      <PinInputGroup class="gap-1">
        <template v-for="(id, index) in 6" :key="index">
          <PinInputSlot class="rounded-md border w-10 h-12 text-xl text-center" :index="index" />
          <template v-if="index !== 5">
            <PinInputSeparator />
          </template>
        </template>
      </PinInputGroup>
    </PinInput>
    <button
      class="text-primary hover:underline text-sm disabled:opacity-60"
      @click="resendOtp"
      :disabled="resendLoading || loading || resendCooldown > 0"
    >
      <span v-if="resendCooldown > 0">Gửi lại mã OTP ({{ resendCooldown }}s)</span>
      <span v-else>Gửi lại mã OTP</span>
    </button>
  </div>
</template>

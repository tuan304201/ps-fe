<script setup>
import { ref, watch, onMounted } from "vue";
import { PinInput, PinInputGroup, PinInputSeparator, PinInputSlot } from "@/components/ui/pin-input";
import { useToast } from "@/components/ui/toast/use-toast";
import api from "@/lib/api";

const props = defineProps({
  email: { type: String, required: true },
  onSuccess: { type: Function, required: true },
  onResend: { type: Function, required: true },
  autoResend: { type: Boolean, default: false },
});

const value = ref([]);
const loading = ref(false);
const resendLoading = ref(false);
const { toast } = useToast();
const resendCooldown = ref(60);
let resendInterval = null;

watch(value, async (val) => {
  if (val.length === 6 && val.every((v) => v && v.length === 1)) {
    const otp = val.join("");
    // Gọi callback để xử lý OTP
    if (props.onSuccess) props.onSuccess(otp);
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
    await api.post("/auth/resend-otp-fortgot-password", { email: props.email });
    toast({ title: "Đã gửi lại mã OTP!", variant: "default" });
    if (props.onResend) props.onResend();
    startResendCooldown();
  } catch (e) {
    toast({
      title: "Gửi lại OTP thất bại!",
      description: e.response?.data?.message || "Không thể gửi lại mã OTP.",
      variant: "default",
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
  <div class="flex flex-col items-center gap-6">
    <div class="text-center">
      <div class="font-semibold text-xl mb-3 text-gray-900">Nhập mã xác thực OTP</div>
      <div class="text-gray-600 text-sm mb-2">
        Mã gồm 6 số đã gửi tới email <b class="text-primary">{{ email }}</b>
      </div>
      <div class="text-gray-500 text-xs bg-gray-50 px-3 py-2 rounded-md inline-block">
        ⏰ Mã OTP có hiệu lực trong 60 giây
      </div>
    </div>

    <div class="w-full max-w-xs flex justify-center">
      <PinInput id="pin-input" v-model="value" placeholder="○" :disabled="loading" class="mb-4">
        <PinInputGroup class="gap-2">
          <template v-for="(id, index) in 6" :key="index">
            <PinInputSlot
              class="rounded-lg border-2 w-12 h-14 text-xl text-center font-semibold transition-all duration-200 hover:border-primary focus:border-primary"
              :index="index"
            />
            <template v-if="index !== 5">
              <PinInputSeparator />
            </template>
          </template>
        </PinInputGroup>
      </PinInput>
    </div>

    <div class="text-center">
      <button
        class="px-4 py-2 text-sm font-medium disabled:opacity-60 transition-all duration-200 rounded-md"
        :class="[
          resendCooldown > 0
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-primary hover:text-primary-dark hover:bg-primary/10',
        ]"
        @click="resendOtp"
        :disabled="resendLoading || loading || resendCooldown > 0"
      >
        <span v-if="resendLoading" class="flex items-center gap-2">
          <div class="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          Đang gửi...
        </span>
        <span v-else-if="resendCooldown > 0" class="flex items-center gap-2">
          <div class="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          Gửi lại mã OTP ({{ resendCooldown }}s)
        </span>
        <span v-else class="flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            ></path>
          </svg>
          Gửi lại mã OTP
        </span>
      </button>
    </div>
  </div>
</template>

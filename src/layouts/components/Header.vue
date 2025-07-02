<template>
  <div class="sticky left-0 right-0 z-10 top-0">
    <header class="header flex items-center justify-center shadow__header">
      <div class="container px-3 sm:px-4 lg:px-8">
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <Sheet>
              <SheetTrigger
                class="xl:hidden group lg:inline-flex h-10 w-max items-center justify-center text-md text-gray-400 font-semibold transition-colors hover:text-primary"
              >
                <Icon icon="material-symbols-light:menu-rounded" class="size-7 font-bold mr-1" />
              </SheetTrigger>
              <SheetContent>
                <SheetTitle class="hidden"></SheetTitle>
                <SheetDescription class="hidden"></SheetDescription>

                <Sidebar />
              </SheetContent>
            </Sheet>

            <RouterLink to="/">
              <div class="flex items-center justify-center gap-2 cursor-pointer">
                <img src="@/assets/logo.svg" alt="Logo Pet Shop" width="40" />
                <span class="font-black xl:text-3xl sm:text-xl text-primary whitespace-nowrap">PET SHOP</span>
              </div>
            </RouterLink>
          </div>
          <div class="header__search flex-1 hidden md:block">
            <div class="flex items-center w-full relative border-[1px] border-gray-200 rounded-full overflow-hidden">
              <input
                type="text"
                placeholder="Tìm theo tên sản phẩm"
                class="border-none outline-none pl-6 py-2 w-full pr-24"
              />
              <div
                class="text-lg cursor-pointer bg-primary absolute right-0 h-full w-[4rem] flex items-center justify-center hover:opacity-80"
              >
                <Icon icon="material-symbols-light:search" class="text-white text-4xl" />
              </div>
            </div>
          </div>

          <div class="header__icon__wrapper flex gap-2 items-center">
            <template v-if="isLoggedIn">
              <Popover>
                <PopoverTrigger>
                  <div class="flex justify-between items-center gap-2 cursor-pointer p-2 rounded hover:bg-gray-100">
                    <Icon
                      icon="material-symbols-light:person"
                      class="text-gray-700 size-8 border-[1px] border-gray-300 rounded"
                    />
                    <div class="hidden md:block">
                      <div class="text-md text-black font-semibold max-w-[10rem] truncate">{{ userName }}</div>
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent align="left">
                  <ul class="flex flex-col justify-start py-2">
                    <RouterLink
                      to="/account"
                      class="hover:bg-primary hover:text-white transition-all w-[160px] pl-2 py-2 flex items-center gap-2"
                    >
                      <Icon icon="material-symbols-light:account-box-outline" class="size-6" />
                      <span>Tài khoản</span>
                    </RouterLink>
                    <RouterLink to="/purchase">
                      <li
                        class="hover:bg-primary hover:text-white transition-all w-[160px] pl-2 py-2 flex items-center gap-2"
                      >
                        <Icon icon="material-symbols-light:box-outline-rounded" class="size-6" />
                        <span>Đơn mua</span>
                      </li>
                    </RouterLink>
                    <li
                      @click="handleLogout"
                      class="hover:bg-primary hover:text-white transition-all w-[160px] pl-2 py-2 flex items-center gap-2"
                    >
                      <Icon icon="uit:signout" class="size-6" />
                      <span>Đăng xuất</span>
                    </li>
                  </ul>
                </PopoverContent>
              </Popover>
            </template>
            <template v-else>
              <RouterLink to="/login">
                <div class="flex justify-between items-center gap-2 cursor-pointer p-2 rounded hover:bg-gray-100">
                  <Icon
                    icon="material-symbols-light:person"
                    class="text-gray-700 size-8 border-[1px] border-gray-300 rounded"
                  />
                  <div class="hidden md:block">
                    <div class="text-xs text-gray-400">Tài khoản</div>
                    <div class="text-md text-black font-semibold">Đăng nhập</div>
                  </div>
                </div>
              </RouterLink>
            </template>
            <RouterLink to="/cart">
              <div class="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-gray-100">
                <div ref="cartIconRef" class="relative" :class="{ shake: cartStore.isCartShaking }">
                  <Icon icon="material-symbols-light:shopping-cart-rounded" class="size-8" />
                  <span
                    v-if="cartStore.cartCount > 0"
                    class="cart-count flex items-center justify-center rounded-full absolute font-semibold"
                  >
                    {{ cartStore.cartCount > 99 ? "99+" : cartStore.cartCount }}
                  </span>
                </div>
                <span class="text-sm hidden md:block">Giỏ hàng</span>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </header>
    <navigation-menu />
  </div>
</template>

<script>
import { ref, onMounted, nextTick, watch } from "vue";
import { useCartStore } from "@/stores/cartStore";
import { Icon } from "@iconify/vue";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import NavigationMenu from "./NavigationMenu.vue";
import Sidebar from "./Sidebar.vue";
import { useRouter } from "vue-router";
export default {
  components: {
    NavigationMenu,
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
    Sidebar,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Icon,
  },
  name: "Header",
  setup() {
    const router = useRouter();
    const cartStore = useCartStore();
    const cartIconRef = ref(null);
    const userName = ref("");
    const isLoggedIn = ref(false);

    function handleLogout() {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userName");
      isLoggedIn.value = false;
      userName.value = "";
      router.push("/login");
    }

    function checkLogin() {
      const token = localStorage.getItem("accessToken");
      const name = localStorage.getItem("userName");
      isLoggedIn.value = !!token;
      userName.value = name || "";
    }

    onMounted(() => {
      nextTick(() => {
        if (cartIconRef.value) {
          const rect = cartIconRef.value.getBoundingClientRect();
          cartStore.setCartIconPosition({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          });
        }
      });
      checkLogin();
      window.addEventListener("storage", checkLogin);
      if (isLoggedIn.value) {
        cartStore.fetchCart();
      }
    });

    watch(isLoggedIn, (val) => {
      if (val) cartStore.fetchCart();
      else cartStore.cartItems = [];
    });

    return {
      cartStore,
      cartIconRef,
      handleLogout,
      userName,
      isLoggedIn,
    };
  },
};
</script>

<style scoped>
.header {
  background-color: #fff;
  color: #212121;
  padding: 0.4rem 0;
  z-index: 2000;
}

.header__search {
  width: calc(100% - 41rem);
  min-width: 200px;
}

.cart-count {
  color: #fff;
  background-color: red;
  padding: 0 3px;
  font-size: 0.8rem;
  right: -10px;
  top: -6px;
}

.shadow__header {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
.shake {
  animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}
</style>

<template>
  <div class="sidebar">
    <div class="w-[83%] flex items-center gap-2 cursor-pointer rounded hover:bg-gray-100 p-6">
      <Icon icon="material-symbols-light:person" class="text-gray-700 size-9 border-[1px] border-gray-300 rounded" />
      <div>
        <div class="text-xs text-gray-400">Tài khoản</div>
        <div class="text-md text-black font-semibold">Đăng nhập</div>
      </div>
    </div>

    <div class="border-b-[1px]"></div>

    <div class="sidebar-content">
      <nav class="mt-3">
        <ul v-for="item in menuTop">
          <router-link to="/product">
            <SheetClose class="w-full text-left">
              <li :key="item.id" class="px-6 cursor-pointer text-lg font-semibold py-2 w-full hover:bg-slate-100">
                {{ item.title }}
              </li>
            </SheetClose>
          </router-link>
        </ul>
      </nav>

      <div class="border-b-[1px] pb-3"></div>

      <nav class="mt-3 mb-[80px]">
        <ul v-for="item in menuBottom">
          <li :key="item.id" class="px-6 cursor-pointer text-lg font-semibold py-2 w-full hover:bg-slate-100">
            {{ item.title }}
          </li>
        </ul>
      </nav>
    </div>

    <div class="w-full flex gap-2 justify-between items-center p-6 absolute bottom-0 bg-white">
      <div class="flex gap-1 items-center w-[50%]">
        <Icon
          icon="material-symbols-light:storefront-outline-rounded"
          class="border-[1px] border-gray-300 size-8 p-1 rounded mr-1"
        />
        <span class="text-xs">Hệ thống cửa hàng</span>
      </div>
      <div class="flex gap-1 items-center w-[50%]">
        <Icon
          icon="material-symbols-light:phone-in-talk-rounded"
          class="border-[1px] border-gray-300 size-8 p-1 rounded mr-1"
        />
        <span class="text-xs">Hotline: <span class="font-semibold">0987654321</span></span>
      </div>
    </div>
  </div>
</template>

<script>
import { SheetClose } from "@/components/ui/sheet";
export default {
  components: {
    SheetClose,
  },
  data() {
    return {
      menuTop: [
        { id: 1, title: "Thức ăn cho mèo" },
        { id: 2, title: "Đồ chơi cho mèo" },
        { id: 3, title: "Giường - nệm cho mèo" },
        { id: 4, title: "Sản phẩm khuyến mãi" },
        { id: 5, title: "Sản phẩm nổi bật" },
        { id: 6, title: "Tất cả sản phẩm" },
      ],
      menuBottom: [
        { id: 1, title: "Mèo" },
        { id: 2, title: "Today's Sale" },
        { id: 3, title: "Dịch vụ chăm Pets" },
        { id: 4, title: "Tạp chí chăm Boss" },
      ],
    };
  },
};
</script>

<style scoped>
.sidebar {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.sidebar-content {
  overflow-y: auto;
  scrollbar-width: none;
}
</style>

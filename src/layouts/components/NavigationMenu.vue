<template>
  <div class="bg-primary w-full hidden xl:block">
    <div class="container flex justify-between">
      <Sheet>
        <SheetTrigger
          class="group inline-flex h-10 w-max items-center justify-center text-md text-white font-semibold transition-colors hover:text-[#FFE31A]"
        >
          <Icon icon="material-symbols-light:menu-rounded" class="size-7 font-bold mr-1" />
          Danh mục sản phẩm
        </SheetTrigger>
        <SheetContent>
          <SheetTitle class="hidden"></SheetTitle>
          <SheetDescription class="hidden"></SheetDescription>

          <Sidebar />
        </SheetContent>
      </Sheet>

      <div class="flex items-center">
        <NavigationMenu>
          <NavigationMenuList class="flex justify-between">
            <NavigationMenuItem>
              <NavigationMenuTrigger>Mèo</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul class="grid w-[1000px] gap-x-20 gap-y-10 p-4 md:w-[600px] md:grid-cols-3 lg:w-[1000px]">
                  <li v-for="item in catMenu" :key="item.id">
                    <NavigationMenuLink as-child>
                      <RouterLink
                        to="/product"
                        class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div class="text-md font-medium leading-none">{{ item.title }}</div>
                      </RouterLink>
                      <div class="ml-2">
                        <ul v-for="itemSub in item.children">
                          <li :key="itemSub.id">
                            <RouterLink
                              to="/product"
                              class="block select-none space-y-1 rounded-md p-3 leading-none no-underline hover:text-primary text-sm text-gray-700"
                              >{{ itemSub.title }}</RouterLink
                            >
                          </li>
                        </ul>
                      </div>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <RouterLink
          to="/flash-sale-1-khung-gio"
          class="group inline-flex h-10 w-max items-center justify-center px-4 py-2 text-md text-white font-semibold transition-colors hover:text-[#FFE31A]"
        >
          Today's Sale
        </RouterLink>

        <RouterLink
          to="/dich-vu-cham-pets"
          class="group inline-flex h-10 w-max items-center justify-center px-4 py-2 text-md text-white font-semibold transition-colors hover:text-[#FFE31A]"
        >
          Dịch vụ chăm Pets
        </RouterLink>

        <RouterLink
          to="/tin-tuc"
          class="group inline-flex h-10 w-max items-center justify-center px-4 py-2 text-md text-white font-semibold transition-colors hover:text-[#FFE31A]"
          >Tạp chí chăm Boss
        </RouterLink>
      </div>

      <div class="flex items-center">
        <RouterLink to="/store-system">
          <div
            class="group inline-flex h-10 w-max items-center justify-center px-4 py-2 gap-1 text-md text-white font-semibold transition-colors hover:text-[#FFE31A]"
          >
            <Icon icon="material-symbols-light:storefront-outline-rounded" class="size-6" />
            <span class="text-md">Hệ thống cửa hàng</span>
          </div>
        </RouterLink>

        <RouterLink to="/">
          <div
            class="group inline-flex h-10 w-max items-center justify-center px-4 py-2 gap-1 text-md text-white font-semibold transition-colors hover:text-[#FFE31A]"
          >
            <Icon icon="material-symbols-light:phone-in-talk-rounded" class="size-6" />
            <span class="text-md">Hotline: 0987654321</span>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar.vue";
export default {
  components: {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    Sidebar,
  },
  data() {
    return {
      catMenu: [
        {
          id: 1,
          title: "Thức ăn cho mèo",
          href: "thuc-an-cho-meo",
          children: [
            { id: 1, title: "Thức ăn hạt", href: "thuc-an-hat" },
            { id: 2, title: "Thức ăn ướt", href: "thuc-an-uot" },
            { id: 4, title: "Thức ăn điều trị bệnh", href: "thuc-an-dieu-tri-benh" },
            { id: 5, title: "Bánh thưởng mèo", href: "banh-thuong-meo" },
          ],
        },
        {
          id: 2,
          title: "Phụ kiện - đồ chơi",
          href: "phu-kien-do-choi",
          children: [
            { id: 1, title: "Đồ chơi", href: "do-choi" },
            { id: 2, title: "Thời trang - Quần áo", href: "thoi-trang-quan-ao" },
            { id: 3, title: "Vòng cổ - Dây dắt", href: "vong-co-day-dat" },
          ],
        },
        {
          id: 3,
          title: "Vận chuyển - chuồng",
          href: "van-chuyen-chuong",
          children: [
            { id: 1, title: "Chuồng - nhà nệm", href: "chuong-nha-nem" },
            { id: 2, title: "Vận chuyển", href: "van-chuyen" },
          ],
        },
        {
          id: 4,
          title: "Vệ sinh",
          href: "ve-sinh",
          children: [
            { id: 1, title: "Cát mèo", href: "cat-meo" },
            { id: 2, title: "Chăm sóc răng miệng", href: "cham-soc-rang-mieng" },
            { id: 4, title: "Sữa tắm", href: "sua-tam" },
            { id: 5, title: "Xịt khử mùi", href: "xit-khu-mui" },
          ],
        },
        {
          id: 5,
          title: "Chăm sóc sức khoẻ",
          href: "cham-soc-suc-khoe",
          children: [
            { id: 1, title: "Sữa và bình bú cho mèo", href: "sua-va-binh-bu-cho-meo" },
            { id: 2, title: "Vitamin và thực phẩm bổ sung", href: "vitamin-va-thuc-pham-bo-sung" },
          ],
        },
        {
          id: 6,
          title: "Bánh thưởng",
          href: "banh-thuong",
          children: [
            { id: 1, title: "Bánh thưởng mềm", href: "banh-thuong-mem" },
            { id: 2, title: "Súp thưởng", href: "sup-thuong" },
            { id: 4, title: "Bánh quy", href: "banh-quy" },
            { id: 5, title: "Thịt sấy khô", href: "thit-say-kho" },
          ],
        },
      ],
    };
  },
  methods: {
    navigationMenuTriggerStyle,
  },
};
</script>

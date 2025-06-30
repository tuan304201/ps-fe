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
        <NavigationMenu :delayDuration="200">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Mèo</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div class="grid grid-cols-4 gap-4 p-6 w-[1000px]">
                  <div class="col-span-3">
                    <div class="grid grid-cols-3 gap-6">
                      <div v-for="item in catMenu" :key="item.id" class="flex flex-col space-y-2">
                        <h3 class="text-lg font-bold text-primary">{{ item.title }}</h3>
                        <ul class="flex flex-col space-y-1">
                          <ListItem
                            v-for="subItem in item.children"
                            :key="subItem.title"
                            :title="subItem.title"
                            :href="subItem.href"
                          >
                            {{ subItem.description }}
                          </ListItem>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="col-span-1">
                    <RouterLink
                      to="/product/1"
                      class="group block h-full w-full select-none overflow-hidden rounded-lg bg-gradient-to-b from-rose-500 to-amber-500 no-underline outline-none transition-transform duration-300 ease-in-out hover:scale-105 focus:shadow-md"
                    >
                      <div class="flex h-full flex-col items-center justify-center p-3 text-center">
                        <img
                          src="https://bizweb.dktcdn.net/100/527/383/products/1-9e788942233b4875828c57a723bb8a19.png"
                          class="w-full object-contain transition-transform duration-300 group-hover:scale-110 rounded-md"
                          alt="Sản phẩm nổi bật"
                        />

                        <div class="mt-4 text-lg font-bold text-white">Dịch Vụ Spa Trọn Gói</div>
                        <p class="mt-1 text-sm leading-tight text-white/90">
                          Thư giãn & làm đẹp toàn diện cho boss của bạn.
                        </p>
                      </div>
                    </RouterLink>
                  </div>
                </div>
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

      <div class="flex items-center"></div>
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
} from "@/components/ui/navigation-menu";

import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar.vue";
import ListItem from "./ListItem.vue"; // Import component mới

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
    SheetTitle,
    SheetTrigger,
    Sidebar,
    ListItem, // Đăng ký component mới
  },
  data() {
    return {
      catMenu: [
        {
          id: 1,
          title: "Thức ăn cho mèo",
          children: [
            { title: "Thức ăn hạt", href: "/product", description: "Dinh dưỡng, giòn rụm, tốt cho răng miệng." },
            { title: "Pate & Thức ăn ướt", href: "/product", description: "Bổ sung nước, kích thích vị giác." },
            { title: "Thức ăn điều trị", href: "/product", description: "Hỗ trợ điều trị các bệnh lý cụ thể." },
          ],
        },
        {
          id: 2,
          title: "Vệ sinh & Chăm sóc",
          children: [
            { title: "Cát & Khay vệ sinh", href: "/product", description: "Khử mùi hiệu quả, giữ nhà sạch sẽ." },
            { title: "Sữa tắm & Khử mùi", href: "/product", description: "Làm sạch, dưỡng lông, hương thơm dịu nhẹ." },
            { title: "Dụng cụ grooming", href: "/product", description: "Lược chải, kềm cắt móng, dụng cụ lấy lông." },
          ],
        },
        {
          id: 3,
          title: "Đồ dùng & Phụ kiện",
          children: [
            { title: "Nhà, nệm, chuồng", href: "/product", description: "Không gian nghỉ ngơi êm ái, an toàn." },
            { title: "Đồ chơi & Cây cào", href: "/product", description: "Giải trí, giảm stress, bảo vệ nội thất." },
            { title: "Vòng cổ & Dây dắt", href: "/product", description: "An toàn và phong cách cho mỗi chuyến đi." },
          ],
        },
      ],
    };
  },
  // methods: {
  //   navigationMenuTriggerStyle,
  // },
};
</script>

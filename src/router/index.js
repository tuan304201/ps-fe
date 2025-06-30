import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import News from "@/views/News.vue";
import Login from "@/views/Login.vue";
import Services from "@/views/Services.vue";
import FlashSale from "@/views/FlashSale.vue";
import Cart from "@/views/Cart.vue";
import Product from "@/views/Product.vue";
import Register from "@/views/Register.vue";
import ForgotPassword from "@/views/ForgotPassword.vue";
import StoreSystem from "@/views/StoreSystem.vue";
import Purchase from "@/views/Purchase.vue";
import DetailProduct from "@/views/DetailProduct.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: { layout: "default", breadcrumb: "Trang chủ" },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { layout: "default", breadcrumb: "Đăng nhập" },
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: { layout: "default", breadcrumb: "Đăng ký" },
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      component: ForgotPassword,
      meta: { layout: "default", breadcrumb: "Quên mật khẩu" },
    },
    {
      path: "/tin-tuc",
      name: "news",
      component: News,
      meta: { layout: "default", breadcrumb: "Tin tức" },
    },
    {
      path: "/dich-vu-cham-pets",
      name: "services-pet",
      component: Services,
      meta: { layout: "default", breadcrumb: "Dịch vụ" },
    },
    {
      path: "/flash-sale-1-khung-gio",
      name: "flase-sale",
      component: Product,
      meta: { layout: "default", breadcrumb: "Flash Sale" },
    },
    {
      path: "/cart",
      name: "cart",
      component: Cart,
      meta: { layout: "default", breadcrumb: "Giỏ hàng" },
    },
    {
      path: "/product",
      name: "product",
      component: Product,
      meta: { layout: "default", breadcrumb: "Sản phẩm / :id" },
    },
    {
      path: "/product/:id",
      name: "DetailProduct",
      component: DetailProduct,
      meta: { layout: "default", breadcrumb: "Chi tiết sản phẩm" },
    },
    {
      path: "/store-system",
      name: "store-system",
      component: StoreSystem,
      meta: { layout: "default", breadcrumb: "Hệ thống cửa hàng" },
    },
    {
      path: "/purchase",
      name: "purchase",
      component: Purchase,
      meta: { layout: "default", breadcrumb: "Đơn hàng" },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // Nếu quay lại trang trước đó, sử dụng vị trí cuộn đã lưu
    if (savedPosition) {
      return savedPosition;
    } else {
      // Cuộn lên đầu trang
      return { top: 0 };
    }
  },
});

export default router;

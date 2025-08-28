import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home.vue"),
      meta: {
        layout: "default",
        title: "Pet Shop - Cửa hàng thú cưng",
        description: "Trang chủ của Pet Shop, nơi cung cấp các sản phẩm và dịch vụ tốt nhất cho thú cưng của bạn.",
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login.vue"),
      meta: {
        layout: "default",
        title: "Đăng nhập - Pet Shop",
        description: "Đăng nhập vào tài khoản Pet Shop của bạn để mua sắm và theo dõi đơn hàng.",
      },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/Register.vue"),
      meta: {
        layout: "default",
        title: "Đăng ký - Pet Shop",
        description: "Tạo tài khoản mới tại Pet Shop để trải nghiệm mua sắm và dịch vụ thú cưng tốt nhất.",
      },
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      component: () => import("@/views/ForgotPassword.vue"),
      meta: {
        layout: "default",
        title: "Quên mật khẩu - Pet Shop",
        description: "Khôi phục mật khẩu tài khoản Pet Shop của bạn một cách nhanh chóng và an toàn.",
      },
    },
    {
      path: "/tin-tuc",
      name: "news",
      component: () => import("@/views/News.vue"),
      meta: {
        layout: "default",
        breadcrumb: "Tin tức",
        title: "Tin tức - Pet Shop",
        description: "Cập nhật tin tức, xu hướng và kiến thức chăm sóc thú cưng mới nhất từ Pet Shop.",
      },
    },
    {
      path: "/tin-tuc/:id",
      name: "DetailNews",
      component: () => import("@/views/DetailNews.vue"),
      meta: {
        layout: "default",
        breadcrumb: "Chi tiết tin tức",
        description: "Cập nhật tin tức, xu hướng và kiến thức chăm sóc thú cưng mới nhất từ Pet Shop.",
      },
    },
    {
      path: "/dich-vu-cham-pets",
      name: "services-pet",
      component: () => import("@/views/Services.vue"),
      meta: {
        layout: "default",
        breadcrumb: "Dịch vụ",
        title: "Dịch vụ chăm sóc thú cưng - Pet Shop",
        description: "Khám phá các dịch vụ chăm sóc thú cưng chuyên nghiệp tại Pet Shop.",
      },
    },
    {
      path: "/flash-sale-1-khung-gio",
      name: "flase-sale",
      component: () => import("@/views/Product.vue"),
      meta: {
        layout: "default",
        breadcrumb: "Flash Sale",
        title: "Flash Sale - Pet Shop",
        description: "Săn hàng giá sốc với chương trình Flash Sale chỉ có tại Pet Shop!",
      },
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("@/views/Cart.vue"),
      meta: {
        layout: "default",
        breadcrumb: "Giỏ hàng",
        title: "Giỏ hàng - Pet Shop",
        description: "Xem lại các sản phẩm bạn đã thêm vào giỏ hàng trước khi thanh toán tại Pet Shop.",
      },
    },
    {
      path: "/product",
      name: "product",
      component: () => import("@/views/Product.vue"),
      meta: {
        layout: "default",
        breadcrumb: "Sản phẩm",
        title: "Sản phẩm - Pet Shop",
        description: "Khám phá các sản phẩm chất lượng dành cho thú cưng tại Pet Shop.",
      },
    },
    {
      path: "/product/:id",
      name: "DetailProduct",
      component: () => import("@/views/DetailProduct.vue"),
      meta: {
        layout: "default",
        breadcrumb: "Chi tiết sản phẩm",
        title: "Chi tiết sản phẩm - Pet Shop",
        description: "Thông tin chi tiết sản phẩm thú cưng bạn đang quan tâm tại Pet Shop.",
      },
    },
    {
      path: "/store-system",
      name: "store-system",
      component: () => import("@/views/StoreSystem.vue"),
      meta: {
        layout: "default",
        breadcrumb: "Hệ thống cửa hàng",
        title: "Hệ thống cửa hàng - Pet Shop",
        description: "Tìm địa chỉ hệ thống cửa hàng Pet Shop gần bạn nhất.",
      },
    },
    {
      path: "/purchase",
      name: "purchase",
      component: () => import("@/views/Purchase.vue"),
      meta: {
        layout: "default",
        breadcrumb: "Đơn hàng",
        title: "Lịch sử đơn hàng - Pet Shop",
        description: "Xem lại lịch sử mua hàng và trạng thái đơn hàng của bạn tại Pet Shop.",
      },
    },
    {
      path: "/account",
      name: "account",
      component: () => import("@/views/Account.vue"),
      meta: {
        layout: "default",
        breadcrumb: "Tài khoản",
        title: "Tài khoản - Pet Shop",
        description: "Quản lý, xem và chỉnh sửa thông tin tài khoản cá nhân tại Pet Shop.",
      },
    },
    {
      path: "/verify-otp",
      name: "verify-otp",
      component: () => import("@/views/VerifyOtpPage.vue"),
      meta: { layout: "default", title: "Xác thực OTP" },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.afterEach((to, from) => {
  document.title = to.meta.title || "Pet Shop";
  let descriptionTag = document.querySelector('meta[name="description"]');
  if (descriptionTag) {
    descriptionTag.setAttribute(
      "content",
      to.meta.description ||
        "Pet Shop - Cung cấp thức ăn, phụ kiện, đồ chơi và các dịch vụ chăm sóc thú cưng uy tín, chất lượng.",
    );
  }
});

// Middleware bảo vệ route
router.beforeEach((to, from, next) => {
  const publicPages = [
    "/login",
    "/register",
    "/forgot-password",
    "/verify-otp",
    "/",
    "/tin-tuc",
    "/tin-tuc/:id",
    "/product",
    "/product/:id",
    "/store-system",
    "/dich-vu-cham-pets",
    "/flash-sale-1-khung-gio",
  ];
  const authRequired = !publicPages.includes(to.path);
  const token = localStorage.getItem("accessToken");
  if (authRequired && !token) {
    return next("/login");
  }
  if ((to.path === "/login" || to.path === "/register") && token) {
    return next("/");
  }
  next();
});

export default router;

<template>
  <Header />
  <main>
    <Breadcrumb
      v-if="
        $route.name !== 'home' &&
        $route.name !== 'verify-otp' &&
        $route.name !== 'login' &&
        $route.name !== 'register' &&
        breadcrumbs.length
      "
      :crumbs="breadcrumbs"
      class="container px-3 sm:px-4 lg:px-8 pt-3"
    />
    <slot></slot>
  </main>
  <Footer />
</template>

<script>
import Header from "@/layouts/components/Header.vue";
import Footer from "@/layouts/components/Footer.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";

export default {
  name: "Default Layout",
  components: {
    Header,
    Footer,
    Breadcrumb,
  },
  computed: {
    breadcrumbs() {
      const route = this.$route;
      const crumbs = [{ name: "Trang chủ", path: "/" }];
      // Product detail
      if (route.name === "DetailProduct" && window.__CURRENT_PRODUCT_NAME__) {
        crumbs.push({ name: "Sản phẩm", path: "/product" });
        crumbs.push({ name: window.__CURRENT_PRODUCT_NAME__, path: route.path });
      }
      // News detail
      else if (route.name === "DetailNews" && window.__CURRENT_NEWS_TITLE__) {
        crumbs.push({ name: "Tin tức", path: "/tin-tuc" });
        crumbs.push({ name: window.__CURRENT_NEWS_TITLE__, path: route.path });
      }
      // Add more detail pages as needed
      else if (route.meta && route.meta.breadcrumb) {
        crumbs.push({ name: route.meta.breadcrumb, path: route.path });
      }
      return crumbs.filter((crumb) => crumb.name);
    },
  },
};
</script>

<style scoped></style>

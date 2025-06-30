<template>
  <Header />
  <main>
    <Breadcrumb
      v-if="$route.name !== 'home' && breadcrumbs.length"
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
      return [
        { name: "Trang chủ", path: "/" },
        { name: this.$route.meta.breadcrumb, path: this.$route.path },
      ].filter((crumb) => crumb.name);
    },
  },
};
</script>

<style scoped></style>

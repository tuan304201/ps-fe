<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

export default {
  name: "App",
  components: {
    DefaultLayout,
  },
  setup() {
    const route = useRoute();
    const layout = computed(() => {
      switch (route.meta.layout) {
        default:
          return "DefaultLayout";
      }
    });

    return {
      layout,
    };
  },
};
</script>

<style>
/* Các style chung cho ứng dụng */
</style>

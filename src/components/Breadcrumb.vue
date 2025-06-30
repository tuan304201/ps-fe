<template>
  <nav class="flex items-center text-gray-700 py-4" aria-label="Breadcrumb">
    <ol class="inline-flex items-center">
      <li v-for="(crumb, index) in crumbs" :key="index" class="inline-flex items-center">
        <template v-if="index !== crumbs.length - 1">
          <router-link
            :to="crumb.path"
            class="inline-flex items-center text-md font-semibold text-primary hover:opacity-80"
          >
            {{ crumb.name }}
          </router-link>
          <span class="mx-1">
            <Icon icon="material-symbols-light:chevron-right-rounded" class="size-5 font-bold text-primary" />
          </span>
          <!-- Phân cách -->
        </template>
        <template v-else>
          <span class="inline-flex items-center text-md font-semibold text-gray-500">
            {{ crumb.name }}
          </span>
        </template>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  props: {
    crumbs: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>

<style scoped></style>

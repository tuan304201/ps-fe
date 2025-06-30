<template>
  <li>
    <NavigationMenuLink as-child>
      <RouterLink
        :to="href"
        class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-700"
      >
        <div class="text-sm font-semibold leading-none text-gray-900 dark:text-gray-50">{{ title }}</div>
        <p class="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
          <slot />
        </p>
      </RouterLink>
    </NavigationMenuLink>
  </li>
</template>

<script setup>
import { NavigationMenuLink } from "@/components/ui/navigation-menu";

defineProps({
  href: { type: String, required: true },
  title: { type: String, required: true },
});
</script>

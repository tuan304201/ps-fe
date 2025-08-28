<script setup>
import { cn } from "@/lib/utils";
import { NavigationMenuViewport, useForwardProps } from "radix-vue";
import { computed } from "vue";

const props = defineProps({
  forceMount: { type: Boolean, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <div class="absolute left-1/3 -translate-x-1/3 top-full flex justify-center">
    <NavigationMenuViewport
      v-bind="forwardedProps"
      :class="
        cn(
          'origin-top-center relative mt-1.5 h-[--radix-navigation-menu-viewport-height] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up md:w-[--radix-navigation-menu-viewport-width]',
          props.class,
        )
      "
    />
  </div>
</template>

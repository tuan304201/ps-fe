<script setup>
import { reactiveOmit } from "@vueuse/core";
import { PinInputInput, useForwardProps } from "reka-ui";
import { cn } from "@/lib/utils";

const props = defineProps({
  index: { type: Number, required: true },
  disabled: { type: Boolean, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
});

const delegatedProps = reactiveOmit(props, "class");

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <PinInputInput
    v-bind="forwardedProps"
    :class="
      cn(
        'relative text-center focus:outline-none outline-none focus:ring-0 focus:relative flex h-9 w-9 items-center justify-center border-y border-r border-zinc-200 text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md dark:focus:ring-zinc-300 dark:border-zinc-800',
        props.class,
      )
    "
  />
</template>

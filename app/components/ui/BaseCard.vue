<template>
  <component :is="props.as" :class="cardClasses">
    <slot />
  </component>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  as: {
    type: String,
    default: "div",
  },
  variant: {
    type: String,
    default: "default",
  },
  padding: {
    type: String,
    default: "md",
  },
});

const variantClasses = {
  default: "ui-panel",
  muted: "ui-panel-muted",
  elevated: "rounded-4xl border border-white/80 bg-white shadow-card",
  glass: "rounded-4xl border border-white/15 bg-white/10 text-white shadow-glow backdrop-blur-xl",
  bare: "rounded-none border-0 bg-transparent shadow-none",
};

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-5 md:p-6",
  lg: "p-6 md:p-8",
  xl: "p-8 md:p-10",
};

const cardClasses = computed(() => [
  variantClasses[props.variant] || variantClasses.default,
  paddingClasses[props.padding] || paddingClasses.md,
]);
</script>

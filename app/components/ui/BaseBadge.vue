<template>
  <span :class="badgeClasses">
    <slot />
  </span>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "neutral",
  },
  size: {
    type: String,
    default: "md",
  },
  rounded: {
    type: String,
    default: "full",
  },
});

const variantClasses = {
  neutral: "border border-neutral-200 bg-neutral-100 text-neutral-700",
  primary: "border border-brand-100 bg-brand-50 text-brand-700",
  accent: "border border-accent-100 bg-accent-50 text-accent-700",
  success: "border border-success-50 bg-success-50 text-success-600",
  warning: "border border-warning-50 bg-warning-50 text-warning-600",
  danger: "border border-danger-50 bg-danger-50 text-danger-600",
  outline: "border border-neutral-300 bg-white text-neutral-700",
  inverted: "border border-white/10 bg-brand-950 text-white",
};

const sizeClasses = {
  sm: "px-2.5 py-1 text-[11px] font-semibold",
  md: "px-3 py-1.5 text-xs font-semibold",
  lg: "px-4 py-2 text-sm font-semibold",
};

const roundedClasses = {
  md: "rounded-xl",
  lg: "rounded-2xl",
  full: "rounded-full",
};

const badgeClasses = computed(() => [
  "inline-flex items-center justify-center gap-1 whitespace-nowrap tracking-wide",
  variantClasses[props.variant] || variantClasses.neutral,
  sizeClasses[props.size] || sizeClasses.md,
  roundedClasses[props.rounded] || roundedClasses.full,
]);
</script>

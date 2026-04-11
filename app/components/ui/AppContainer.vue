<template>
  <component :is="props.as" :class="containerClasses">
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
  size: {
    type: String,
    default: "site",
  },
  padded: {
    type: Boolean,
    default: true,
  },
});

const sizeClasses = {
  site: "max-w-site",
  wide: "max-w-wide",
  full: "max-w-none",
};

const containerClasses = computed(() => [
  "mx-auto w-full",
  sizeClasses[props.size] || sizeClasses.site,
  props.padded ? "px-4 sm:px-6 lg:px-8" : "",
]);
</script>

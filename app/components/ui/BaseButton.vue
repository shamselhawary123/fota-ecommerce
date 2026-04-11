<template>
  <NuxtLink
    v-if="to"
    :to="to"
    v-bind="sharedAttrs"
    :aria-disabled="isDisabled ? 'true' : undefined"
    :tabindex="isDisabled ? -1 : sharedAttrs.tabindex"
    :class="buttonClasses"
    @click="handleClick"
  >
    <span
      v-if="loading"
      class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
    ></span>
    <span v-else-if="$slots.leading" class="inline-flex shrink-0 items-center">
      <slot name="leading" />
    </span>

    <span v-if="$slots.default" class="truncate">
      <slot />
    </span>

    <span v-if="$slots.trailing" class="inline-flex shrink-0 items-center">
      <slot name="trailing" />
    </span>
  </NuxtLink>

  <a
    v-else-if="href"
    :href="href"
    :target="target || undefined"
    :rel="target === '_blank' ? 'noreferrer noopener' : undefined"
    v-bind="sharedAttrs"
    :aria-disabled="isDisabled ? 'true' : undefined"
    :tabindex="isDisabled ? -1 : sharedAttrs.tabindex"
    :class="buttonClasses"
    @click="handleClick"
  >
    <span
      v-if="loading"
      class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
    ></span>
    <span v-else-if="$slots.leading" class="inline-flex shrink-0 items-center">
      <slot name="leading" />
    </span>

    <span v-if="$slots.default" class="truncate">
      <slot />
    </span>

    <span v-if="$slots.trailing" class="inline-flex shrink-0 items-center">
      <slot name="trailing" />
    </span>
  </a>

  <button
    v-else
    :type="type"
    :disabled="isDisabled"
    v-bind="sharedAttrs"
    :class="buttonClasses"
    @click="handleClick"
  >
    <span
      v-if="loading"
      class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
    ></span>
    <span v-else-if="$slots.leading" class="inline-flex shrink-0 items-center">
      <slot name="leading" />
    </span>

    <span v-if="$slots.default" class="truncate">
      <slot />
    </span>

    <span v-if="$slots.trailing" class="inline-flex shrink-0 items-center">
      <slot name="trailing" />
    </span>
  </button>
</template>

<script setup>
import { computed, useAttrs } from "vue";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  type: {
    type: String,
    default: "button",
  },
  variant: {
    type: String,
    default: "primary",
  },
  size: {
    type: String,
    default: "md",
  },
  to: {
    type: [String, Object],
    default: null,
  },
  href: {
    type: String,
    default: "",
  },
  target: {
    type: String,
    default: "",
  },
  block: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);
const attrs = useAttrs();

const variantClasses = {
  primary: "bg-brand-900 text-white shadow-soft hover:bg-brand-800",
  secondary:
    "border border-white/80 bg-white text-neutral-900 shadow-soft hover:bg-neutral-50",
  outline:
    "border border-neutral-300 bg-white/70 text-neutral-800 hover:border-neutral-400 hover:bg-white",
  ghost:
    "bg-transparent text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950",
  soft: "bg-brand-50 text-brand-700 hover:bg-brand-100",
  danger: "bg-danger-500 text-white shadow-soft hover:bg-danger-600",
  inverted: "bg-white/10 text-white ring-1 ring-white/15 hover:bg-white/15",
};

const sizeClasses = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-6 text-base",
};

const isDisabled = computed(() => props.disabled || props.loading);

const sharedAttrs = computed(() => ({
  ...attrs,
}));

const buttonClasses = computed(() => [
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition duration-200",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
  variantClasses[props.variant] || variantClasses.primary,
  sizeClasses[props.size] || sizeClasses.md,
  props.block ? "w-full" : "",
  isDisabled.value ? "pointer-events-none cursor-not-allowed opacity-60" : "",
]);

const handleClick = (event) => {
  if (isDisabled.value) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }

  emit("click", event);
};
</script>

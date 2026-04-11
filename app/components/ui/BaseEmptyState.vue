<template>
  <BaseCard :variant="variant" :padding="padding" class="text-center">
    <div class="mx-auto flex max-w-xl flex-col items-center gap-4">
      <div
        class="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-700"
      >
        <slot name="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            class="h-7 w-7"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 6.75h15m-14.25 4.5h13.5m-12.75 4.5h12"
            />
          </svg>
        </slot>
      </div>

      <div class="space-y-2">
        <h3 class="text-xl font-semibold tracking-tight text-neutral-950">
          {{ title }}
        </h3>
        <p
          v-if="description"
          class="mx-auto max-w-prose text-sm leading-6 text-neutral-600 md:text-base"
        >
          {{ description }}
        </p>
      </div>

      <div
        v-if="$slots.actions"
        class="flex flex-wrap items-center justify-center gap-3 pt-2"
      >
        <slot name="actions" />
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from "./BaseCard.vue";

defineProps({
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  variant: {
    type: String,
    default: "default",
  },
  padding: {
    type: String,
    default: "lg",
  },
});
</script>

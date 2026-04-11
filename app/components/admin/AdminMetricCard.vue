<template>
  <BaseCard variant="elevated" padding="lg" class="h-full">
    <div class="flex items-start justify-between gap-4">
      <div class="space-y-3">
        <p class="text-sm font-medium text-neutral-500">
          {{ label }}
        </p>
        <div class="space-y-1">
          <h2 class="text-3xl font-semibold tracking-tight text-neutral-950">
            {{ value }}
          </h2>
          <p v-if="description" class="text-sm leading-6 text-neutral-500">
            {{ description }}
          </p>
        </div>
      </div>

      <div
        class="flex h-12 w-12 items-center justify-center rounded-full"
        :class="toneClasses"
      >
        <slot />
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
import { computed } from "vue";
import BaseCard from "~/components/ui/BaseCard.vue";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  value: {
    type: [String, Number],
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  tone: {
    type: String,
    default: "brand",
  },
});

const toneMap = {
  brand: "bg-brand-50 text-brand-700",
  accent: "bg-accent-50 text-accent-700",
  success: "bg-success-50 text-success-600",
  warning: "bg-warning-50 text-warning-600",
  danger: "bg-danger-50 text-danger-600",
};

const toneClasses = computed(() => toneMap[props.tone] || toneMap.brand);
</script>

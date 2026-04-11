<template>
  <div
    :class="[
      'flex flex-col gap-4',
      centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl',
    ]"
  >
    <BaseBadge
      v-if="eyebrow"
      variant="primary"
      size="md"
      class="w-fit"
      :class="centered ? 'mx-auto' : ''"
    >
      {{ eyebrow }}
    </BaseBadge>

    <div class="space-y-3">
      <h2 class="ui-section-title text-balance">
        {{ title }}
      </h2>
      <p v-if="description" class="ui-section-text">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup>
import BaseBadge from "~/components/ui/BaseBadge.vue";

defineProps({
  eyebrow: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  centered: {
    type: Boolean,
    default: false,
  },
});
</script>

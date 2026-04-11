<template>
  <section class="ui-page-shell !pt-4 !pb-0 md:!pt-6">
    <AppContainer size="wide">
      <div class="grid gap-4 md:grid-cols-3">
        <BaseCard
          v-for="item in items"
          :key="item.title"
          variant="muted"
          padding="md"
          class="h-full"
        >
          <div class="flex items-center gap-4">
            <div
              class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-700"
            >
              <svg
                v-if="item.icon === 'truck'"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                class="h-5 w-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 17H6.75A2.25 2.25 0 0 1 4.5 14.75V8.25A2.25 2.25 0 0 1 6.75 6h8.25A2.25 2.25 0 0 1 17.25 8.25V9m0 0h2.086a1.5 1.5 0 0 1 1.2.6l1.214 1.62c.194.258.3.572.3.895v2.635A1.5 1.5 0 0 1 20.55 16.25H19.5M17.25 9V16.25M9 17a1.5 1.5 0 1 0 3 0m-3 0a1.5 1.5 0 1 1-3 0m12 0a1.5 1.5 0 1 0 3 0m-3 0a1.5 1.5 0 1 1-3 0"
                />
              </svg>

              <svg
                v-else-if="item.icon === 'sparkles'"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                class="h-5 w-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.813 15.904 9 18l-.813-2.096a4.5 4.5 0 0 0-2.59-2.59L3.5 12.5l2.097-.813a4.5 4.5 0 0 0 2.59-2.59L9 7l.813 2.097a4.5 4.5 0 0 0 2.59 2.59l2.097.813-2.097.813a4.5 4.5 0 0 0-2.59 2.59ZM18 7l.417 1.083c.198.514.606.922 1.12 1.12L20.62 9.62l-1.083.417a2.25 2.25 0 0 0-1.12 1.12L18 12.24l-.417-1.083a2.25 2.25 0 0 0-1.12-1.12L15.38 9.62l1.083-.417c.514-.198.922-.606 1.12-1.12L18 7Z"
                />
              </svg>

              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                class="h-5 w-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 0h10.5A2.25 2.25 0 0 1 19.5 12.75v5.25a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 18v-5.25A2.25 2.25 0 0 1 6.75 10.5Z"
                />
              </svg>
            </div>

            <p class="text-sm font-semibold tracking-tight text-neutral-800 md:text-base">
              {{ item.title }}
            </p>
          </div>
        </BaseCard>
      </div>
    </AppContainer>
  </section>
</template>

<script setup>
import AppContainer from "~/components/ui/AppContainer.vue";
import BaseCard from "~/components/ui/BaseCard.vue";

defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});
</script>

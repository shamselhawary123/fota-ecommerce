<template>
  <div class="ui-page-shell">
    <AppContainer size="wide" class="ui-page-stack">
      <BaseCard variant="elevated" padding="none" class="overflow-hidden">
        <div class="grid gap-0 xl:grid-cols-[1.08fr,0.92fr]">
          <div class="space-y-6 p-8 md:p-10 xl:p-12">
            <BaseSkeleton width="11rem" height="2rem" rounded="full" />
            <BaseSkeleton height="4rem" />
            <BaseSkeleton height="4rem" />
            <BaseSkeleton width="72%" height="1.25rem" />
            <BaseSkeleton width="82%" height="1.25rem" />

            <div class="flex flex-wrap gap-3 pt-2">
              <BaseSkeleton width="10rem" height="3rem" rounded="full" />
              <BaseSkeleton width="10rem" height="3rem" rounded="full" />
            </div>

            <div class="grid gap-3 pt-3 sm:grid-cols-3">
              <BaseCard
                v-for="item in 3"
                :key="item"
                variant="muted"
                padding="md"
              >
                <div class="space-y-3">
                  <BaseSkeleton width="3.5rem" height="1rem" />
                  <BaseSkeleton width="100%" height="1rem" />
                </div>
              </BaseCard>
            </div>
          </div>

          <div class="relative min-h-[24rem] overflow-hidden bg-neutral-200">
            <BaseSkeleton class="h-full w-full !rounded-none" />
          </div>
        </div>
      </BaseCard>

      <div class="grid gap-4 md:grid-cols-3">
        <BaseCard v-for="item in 3" :key="item" variant="muted" padding="md">
          <div class="flex items-center gap-4">
            <BaseSkeleton width="3rem" height="3rem" rounded="xl" />
            <BaseSkeleton width="72%" height="1rem" />
          </div>
        </BaseCard>
      </div>

      <div class="space-y-6">
        <div class="max-w-3xl space-y-4">
          <BaseSkeleton width="9rem" height="1.75rem" rounded="full" />
          <BaseSkeleton width="24rem" height="2rem" />
          <BaseSkeleton width="32rem" height="1rem" />
        </div>

        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <BaseCard
            v-for="item in 4"
            :key="item"
            variant="elevated"
            padding="none"
            class="overflow-hidden"
          >
            <BaseSkeleton class="aspect-[4/5] w-full !rounded-none" />
          </BaseCard>
        </div>
      </div>

      <div class="space-y-6">
        <div class="max-w-3xl space-y-4">
          <BaseSkeleton width="9rem" height="1.75rem" rounded="full" />
          <BaseSkeleton width="20rem" height="2rem" />
          <BaseSkeleton width="26rem" height="1rem" />
        </div>

        <div class="grid gap-6 lg:grid-cols-3">
          <BaseCard
            v-for="item in 3"
            :key="item"
            variant="elevated"
            padding="none"
            class="overflow-hidden"
          >
            <BaseSkeleton class="aspect-[4/4.7] w-full !rounded-none" />
            <div class="space-y-4 p-5 md:p-6">
              <BaseSkeleton width="45%" height="1rem" />
              <BaseSkeleton height="1.25rem" />
              <BaseSkeleton width="90%" height="1rem" />
              <BaseSkeleton width="70%" height="1rem" />
              <BaseSkeleton width="100%" height="3rem" rounded="full" />
            </div>
          </BaseCard>
        </div>
      </div>

      <BaseCard variant="elevated" padding="none" class="overflow-hidden">
        <div class="grid gap-6 p-8 md:p-10 lg:grid-cols-[1fr,0.9fr]">
          <div class="space-y-4">
            <BaseSkeleton width="10rem" height="2rem" rounded="full" />
            <BaseSkeleton height="2.5rem" />
            <BaseSkeleton width="82%" height="1rem" />
            <BaseSkeleton width="70%" height="1rem" />
            <div class="flex flex-wrap gap-3 pt-2">
              <BaseSkeleton width="11rem" height="3rem" rounded="full" />
              <BaseSkeleton width="11rem" height="3rem" rounded="full" />
            </div>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <BaseSkeleton class="aspect-[4/5] w-full" />
            <BaseSkeleton class="aspect-[4/5] w-full" />
          </div>
        </div>
      </BaseCard>
    </AppContainer>
  </div>
</template>

<script setup>
import AppContainer from "~/components/ui/AppContainer.vue";
import BaseCard from "~/components/ui/BaseCard.vue";
import BaseSkeleton from "~/components/ui/BaseSkeleton.vue";
</script>

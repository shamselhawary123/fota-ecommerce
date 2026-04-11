<template>
  <section class="ui-page-shell !pt-0">
    <AppContainer size="wide">
      <div class="grid gap-6 xl:grid-cols-[0.92fr,1.08fr]">
        <BaseCard variant="elevated" padding="xl" class="overflow-hidden">
          <div class="space-y-8">
            <HomeSectionHeader
              :eyebrow="t('home.story.eyebrow')"
              :title="t('why.title')"
              :description="t('home.story.desc')"
            />

            <div class="overflow-hidden rounded-4xl">
              <img
                src="/images/ITL_7266.jpg"
                :alt="t('home.story.imageAlt')"
                class="aspect-[16/11] w-full object-cover"
              />
            </div>

            <div class="grid gap-3 sm:grid-cols-3">
              <BaseCard
                v-for="stat in stats"
                :key="stat.label"
                variant="muted"
                padding="md"
              >
                <p class="text-2xl font-semibold tracking-tight text-neutral-950">
                  {{ stat.value }}
                </p>
                <p class="mt-2 text-sm leading-6 text-neutral-500">
                  {{ stat.label }}
                </p>
              </BaseCard>
            </div>
          </div>
        </BaseCard>

        <div class="grid gap-4 md:grid-cols-3 xl:grid-cols-1">
          <BaseCard
            v-for="feature in features"
            :key="feature.title"
            variant="muted"
            padding="lg"
            class="h-full"
          >
            <div class="space-y-4">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700"
              >
                <svg
                  v-if="feature.icon === 'shield'"
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
                    d="M9 12.75 11.25 15 15 9.75m5.25 2.343c0 4.123-2.64 7.945-6.563 9.485a1.75 1.75 0 0 1-1.274 0C8.49 20.038 5.85 16.216 5.85 12.093V6.741c0-.784.48-1.49 1.21-1.78l4.5-1.8a1.75 1.75 0 0 1 1.3 0l4.5 1.8c.73.29 1.21.996 1.21 1.78v5.352Z"
                  />
                </svg>

                <svg
                  v-else-if="feature.icon === 'factory'"
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
                    d="M3.75 20.25h16.5M5.25 20.25V8.625a.375.375 0 0 1 .567-.322l4.866 2.92a.375.375 0 0 0 .567-.321V7.125a.375.375 0 0 1 .567-.321l4.866 2.919a.375.375 0 0 0 .567-.321V4.875a.375.375 0 0 1 .375-.375h1.875a.75.75 0 0 1 .75.75v15"
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
                    d="M9.568 3.25c.654 0 1.255.355 1.568.928l.864 1.583c.157.287.458.466.786.466h1.79c1.313 0 2.16 1.383 1.57 2.557l-.805 1.603a1 1 0 0 0 0 .894l.805 1.603c.59 1.174-.257 2.556-1.57 2.556h-1.79a.893.893 0 0 0-.786.467l-.864 1.582a1.787 1.787 0 0 1-3.136 0l-.864-1.582a.893.893 0 0 0-.786-.467h-1.79c-1.313 0-2.16-1.382-1.57-2.556l.805-1.603a1 1 0 0 0 0-.894l-.805-1.603c-.59-1.174.257-2.557 1.57-2.557h1.79c.328 0 .629-.18.786-.466l.864-1.583a1.787 1.787 0 0 1 1.568-.928Z"
                  />
                </svg>
              </div>

              <div class="space-y-3">
                <h3 class="text-xl font-semibold tracking-tight text-neutral-950">
                  {{ feature.title }}
                </h3>
                <p class="text-sm leading-7 text-neutral-600 md:text-base">
                  {{ feature.description }}
                </p>
              </div>
            </div>
          </BaseCard>
        </div>
      </div>
    </AppContainer>
  </section>
</template>

<script setup>
import HomeSectionHeader from "~/components/home/HomeSectionHeader.vue";
import AppContainer from "~/components/ui/AppContainer.vue";
import BaseCard from "~/components/ui/BaseCard.vue";

defineProps({
  stats: {
    type: Array,
    default: () => [],
  },
  features: {
    type: Array,
    default: () => [],
  },
});

const { t } = useI18n();
</script>

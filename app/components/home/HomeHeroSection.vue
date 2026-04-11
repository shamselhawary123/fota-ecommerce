<template>
  <section class="ui-page-shell !pb-0">
    <AppContainer size="wide">
      <BaseCard variant="elevated" padding="none" class="overflow-hidden">
        <div class="grid gap-0 xl:grid-cols-[1.08fr,0.92fr]">
          <div class="space-y-8 p-8 md:p-10 xl:p-12">
            <div class="space-y-5">
              <BaseBadge variant="primary" size="lg">
                {{ t("home.hero.eyebrow") }}
              </BaseBadge>

              <h1
                class="font-display text-5xl tracking-tight text-neutral-950 md:text-6xl xl:text-7xl"
              >
                {{ t("hero.title") }}
              </h1>

              <p class="max-w-prose text-base leading-8 text-neutral-600 md:text-lg">
                {{ t("hero.desc") }}
              </p>
            </div>

            <div class="flex flex-col gap-3 sm:flex-row">
              <BaseButton :to="localePath('/products')" size="lg">
                {{ t("hero.shop") }}
              </BaseButton>
              <BaseButton :to="localePath('/about')" variant="outline" size="lg">
                {{ t("hero.learn") }}
              </BaseButton>
            </div>

            <div class="grid gap-3 sm:grid-cols-3">
              <BaseCard
                v-for="stat in stats"
                :key="stat.label"
                variant="muted"
                padding="md"
                class="h-full"
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

          <div class="relative min-h-[24rem] overflow-hidden bg-brand-950 xl:min-h-full">
            <video
              autoplay
              muted
              loop
              playsinline
              class="absolute inset-0 h-full w-full object-cover"
            >
              <source src="/videos/cotton-factory.mp4" type="video/mp4" />
            </video>

            <div
              class="absolute inset-0 bg-gradient-to-br from-brand-950/75 via-brand-950/30 to-accent-950/25"
            ></div>

            <div class="relative flex h-full flex-col justify-between gap-4 p-6 md:p-8">
              <BaseCard variant="glass" padding="lg" class="max-w-md">
                <BaseBadge variant="accent" size="sm">
                  {{ t("navbar.brand.subtitle") }}
                </BaseBadge>
                <h2 class="mt-4 text-2xl font-semibold tracking-tight text-white">
                  {{ t("home.hero.panelTitle") }}
                </h2>
                <p class="mt-3 text-sm leading-7 text-white/76 md:text-base">
                  {{ t("home.hero.panelDesc") }}
                </p>
              </BaseCard>

              <div class="grid gap-3 sm:grid-cols-2">
                <BaseCard variant="glass" padding="md">
                  <p class="text-xs font-semibold uppercase tracking-[0.22em] text-white/65">
                    {{ t("why.q1.title") }}
                  </p>
                  <p class="mt-2 text-sm leading-6 text-white/80">
                    {{ t("home.trust.quality") }}
                  </p>
                </BaseCard>

                <BaseCard variant="glass" padding="md">
                  <p class="text-xs font-semibold uppercase tracking-[0.22em] text-white/65">
                    {{ t("why.q2.title") }}
                  </p>
                  <p class="mt-2 text-sm leading-6 text-white/80">
                    {{ t("home.trust.support") }}
                  </p>
                </BaseCard>
              </div>
            </div>
          </div>
        </div>
      </BaseCard>
    </AppContainer>
  </section>
</template>

<script setup>
import AppContainer from "~/components/ui/AppContainer.vue";
import BaseBadge from "~/components/ui/BaseBadge.vue";
import BaseButton from "~/components/ui/BaseButton.vue";
import BaseCard from "~/components/ui/BaseCard.vue";

defineProps({
  stats: {
    type: Array,
    default: () => [],
  },
});

const localePath = useLocalePath();
const { t } = useI18n();
</script>

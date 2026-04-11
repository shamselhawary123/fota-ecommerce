<template>
  <section class="ui-page-shell !pt-0">
    <AppContainer size="wide">
      <BaseCard
        variant="elevated"
        padding="none"
        class="relative overflow-hidden bg-brand-950 text-white"
      >
        <div
          class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(245,121,26,0.24),transparent_28%),linear-gradient(135deg,rgba(13,23,38,0.96),rgba(30,47,73,0.88))]"
        ></div>
        <div
          class="pointer-events-none absolute inset-y-0 end-0 hidden w-1/2 bg-gradient-to-l from-white/6 via-transparent to-transparent xl:block"
        ></div>

        <div
          class="relative grid gap-10 p-8 md:p-10 xl:grid-cols-[1.02fr,0.98fr] xl:items-center"
        >
          <div class="max-w-2xl space-y-6">
            <BaseBadge variant="accent" size="md">
              {{ t("home.promo.eyebrow") }}
            </BaseBadge>

            <div class="space-y-4">
              <h2
                class="text-balance font-display text-4xl tracking-tight text-white md:text-5xl xl:text-6xl"
              >
                {{ t("cta.title") }}
              </h2>
              <p class="max-w-xl text-sm leading-7 text-white/74 md:text-base">
                {{ t("cta.desc") }}
              </p>
            </div>

            <div class="flex flex-col gap-3 sm:flex-row">
              <BaseButton
                :to="localePath('/about')"
                variant="secondary"
                size="lg"
              >
                {{ t("cta.btn") }}
              </BaseButton>
              <BaseButton
                :to="localePath('/products')"
                variant="inverted"
                size="lg"
              >
                {{ t("home.promo.secondary") }}
              </BaseButton>
            </div>

            <div class="grid gap-3 sm:grid-cols-3">
              <BaseCard
                v-for="item in promoHighlights"
                :key="item.title"
                variant="glass"
                padding="md"
                class="h-full"
              >
                <p
                  class="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55"
                >
                  {{ item.title }}
                </p>
                <p class="mt-2 text-sm leading-6 text-white/82">
                  {{ item.description }}
                </p>
              </BaseCard>
            </div>
          </div>

          <div class="relative">
            <div
              class="grid gap-4 md:grid-cols-[1.12fr,0.88fr] xl:grid-cols-[1.16fr,0.84fr]"
            >
              <BaseCard variant="glass" padding="none" class="overflow-hidden">
                <img
                  src="/images/fota4.jpg"
                  :alt="t('home.promo.wholesaleImageAlt')"
                  class="aspect-[4/5] w-full object-cover rounded-lg"
                />

                <p
                  class="mt-2 text-xl font-semibold uppercase tracking-[0.22em] text-white/55"
                >
                  {{ t("why.q2.title") }}
                </p>
                <p class="mt-2 text-sm leading-6 text-white/82">
                  {{ t("home.trust.shipping") }}
                </p>
              </BaseCard>

              <div class="grid gap-4">
                <BaseCard variant="glass" padding="lg" class="h-full">
                  <div class="space-y-2">
                    <p
                      class="text-xs font-semibold uppercase tracking-[0.22em] text-white/60"
                    >
                      {{ t("about.stats.partners") }}
                    </p>
                    <p class="text-4xl font-semibold tracking-tight text-white">
                      500+
                    </p>
                  </div>
                  <p class="mt-4 text-sm leading-6 text-white/74">
                    {{ t("home.trust.support") }}
                  </p>
                </BaseCard>

                <BaseCard
                  variant="glass"
                  padding="none"
                  class="overflow-hidden"
                >
                  <img
                    src="/images/products/towel-14.jpg"
                    :alt="t('home.promo.productImageAlt')"
                    class="aspect-[4/5] w-full object-cover rounded-lg"
                  />
                </BaseCard>
              </div>
            </div>

            <!-- <BaseCard
              variant="glass"
              padding="md"
              class="absolute inset-x-4 bottom-4 md:inset-x-8 xl:bottom-6 xl:start-8 xl:end-auto xl:w-72"
            >
              <p
                class="text-xs font-semibold uppercase tracking-[0.22em] text-white/55"
              >
                {{ t("why.q2.title") }}
              </p>
              <p class="mt-2 text-sm leading-6 text-white/82">
                {{ t("home.trust.shipping") }}
              </p>
            </BaseCard> -->
          </div>
        </div>
      </BaseCard>
    </AppContainer>
  </section>
</template>

<script setup>
import { computed } from "vue";
import AppContainer from "~/components/ui/AppContainer.vue";
import BaseBadge from "~/components/ui/BaseBadge.vue";
import BaseButton from "~/components/ui/BaseButton.vue";
import BaseCard from "~/components/ui/BaseCard.vue";

const localePath = useLocalePath();
const { t } = useI18n();

const promoHighlights = computed(() => [
  {
    title: t("why.q1.title"),
    description: t("home.trust.quality"),
  },
  {
    title: t("about.stats.partners"),
    description: t("home.trust.support"),
  },
  {
    title: t("why.q2.title"),
    description: t("home.trust.shipping"),
  },
]);
</script>

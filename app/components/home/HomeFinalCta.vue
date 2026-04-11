<template>
  <section class="ui-page-shell !pt-0">
    <AppContainer size="wide">
      <BaseCard variant="elevated" padding="none" class="relative overflow-hidden">
        <div
          class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(90,127,186,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(245,121,26,0.16),transparent_26%)]"
        ></div>

        <div
          class="relative flex flex-col gap-6 p-8 md:p-10 xl:flex-row xl:items-center xl:justify-between"
        >
          <div class="max-w-3xl space-y-4">
            <BaseBadge variant="primary" size="md">
              {{ t("home.finalCta.eyebrow") }}
            </BaseBadge>
            <h2 class="text-balance text-3xl font-semibold tracking-tight text-neutral-950 md:text-4xl">
              {{ t("about.cta.title") }}
            </h2>
            <p class="text-sm leading-7 text-neutral-600 md:text-base">
              {{ t("about.cta.desc") }}
            </p>
          </div>

          <div class="flex flex-col gap-3 sm:flex-row">
            <BaseButton :to="localePath('/products')" size="lg">
              {{ t("about.cta.btn") }}
            </BaseButton>
            <BaseButton :to="localePath('/about')" variant="outline" size="lg">
              {{ t("hero.learn") }}
            </BaseButton>
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

const localePath = useLocalePath();
const { t } = useI18n();
</script>

<template>
  <section class="ui-page-shell">
    <AppContainer size="wide">
      <div class="ui-page-stack">
        <HomeSectionHeader
          :eyebrow="t('home.collections.eyebrow')"
          :title="t('home.collections.title')"
          :description="t('home.collections.desc')"
        />

        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <BaseCard
            v-for="item in collections"
            :key="item.key"
            variant="elevated"
            padding="none"
            class="group h-full overflow-hidden"
            :class="item.featured ? 'md:col-span-2' : ''"
          >
            <div class="relative flex h-full min-h-[22rem] flex-col overflow-hidden">
              <img
                :src="item.image"
                :alt="item.title"
                class="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/35 to-transparent"
              ></div>

              <div class="relative mt-auto space-y-4 p-6 text-white md:p-7">
                <BaseBadge variant="accent" size="sm">
                  {{ item.badge }}
                </BaseBadge>

                <div class="space-y-3">
                  <h3 class="text-2xl font-semibold tracking-tight">
                    {{ item.title }}
                  </h3>
                  <p class="max-w-prose text-sm leading-7 text-white/78 md:text-base">
                    {{ item.description }}
                  </p>
                </div>

                <BaseButton :to="item.to" variant="secondary">
                  {{ t("home.collections.browse") }}
                </BaseButton>
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
import BaseBadge from "~/components/ui/BaseBadge.vue";
import BaseButton from "~/components/ui/BaseButton.vue";
import BaseCard from "~/components/ui/BaseCard.vue";

defineProps({
  collections: {
    type: Array,
    default: () => [],
  },
});

const { t } = useI18n();
</script>

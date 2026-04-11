<template>
  <section class="ui-page-shell">
    <AppContainer size="wide">
      <div class="ui-page-stack">
        <div
          class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <HomeSectionHeader
            :eyebrow="t('home.featured.eyebrow')"
            :title="t('featured.title')"
            :description="t('home.featured.desc')"
          />

          <BaseButton :to="localePath('/products')" variant="outline">
            {{ t("home.featured.viewAll") }}
          </BaseButton>
        </div>

        <div v-if="loading" class="grid gap-6 lg:grid-cols-3">
          <BaseCard
            v-for="item in 3"
            :key="item"
            variant="elevated"
            padding="none"
            class="overflow-hidden"
          >
            <BaseSkeleton class="aspect-[4/4.7] w-full !rounded-none" />
            <div class="space-y-4 p-5 md:p-6">
              <BaseSkeleton width="38%" height="1rem" />
              <BaseSkeleton height="1.25rem" />
              <BaseSkeleton width="94%" height="1rem" />
              <BaseSkeleton width="72%" height="1rem" />
              <BaseSkeleton width="100%" height="3rem" rounded="full" />
            </div>
          </BaseCard>
        </div>

        <div v-else-if="products.length" class="grid gap-6 lg:grid-cols-3">
          <HomeProductFeatureCard
            v-for="product in products"
            :key="product.id"
            :product="product"
          />
        </div>

        <BaseEmptyState
          v-else
          :title="t('home.featured.emptyTitle')"
          :description="t('home.featured.emptyDesc')"
        >
          <template #actions>
            <BaseButton :to="localePath('/products')">
              {{ t("hero.shop") }}
            </BaseButton>
          </template>
        </BaseEmptyState>
      </div>
    </AppContainer>
  </section>
</template>

<script setup>
import HomeProductFeatureCard from "~/components/home/HomeProductFeatureCard.vue";
import HomeSectionHeader from "~/components/home/HomeSectionHeader.vue";
import AppContainer from "~/components/ui/AppContainer.vue";
import BaseButton from "~/components/ui/BaseButton.vue";
import BaseCard from "~/components/ui/BaseCard.vue";
import BaseEmptyState from "~/components/ui/BaseEmptyState.vue";
import BaseSkeleton from "~/components/ui/BaseSkeleton.vue";

defineProps({
  products: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const localePath = useLocalePath();
const { t } = useI18n();
</script>

<template>
  <BaseCard variant="elevated" padding="none" class="group h-full overflow-hidden">
    <div class="relative overflow-hidden bg-surface-muted">
      <img
        :src="product.image || fallbackImage"
        :alt="product.title || t('productCard.fallback.product')"
        class="aspect-[4/4.7] w-full object-cover transition duration-500 group-hover:scale-105"
      />

      <div class="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4">
        <BaseBadge variant="inverted" size="sm">
          {{ categoryLabel }}
        </BaseBadge>

        <BaseBadge :variant="product.stock > 0 ? 'success' : 'danger'" size="sm">
          {{
            product.stock > 0
              ? t("productCard.stock.inStock")
              : t("productCard.stock.soldOut")
          }}
        </BaseBadge>
      </div>

      <div v-if="product.discount_percent > 0" class="absolute bottom-4 start-4">
        <BaseBadge variant="danger" size="md">
          {{ product.discount_percent }}% {{ t("productCard.discount.off") }}
        </BaseBadge>
      </div>
    </div>

    <div class="space-y-5 p-5 md:p-6">
      <div class="space-y-3">
        <h3 class="text-xl font-semibold tracking-tight text-neutral-950">
          {{ product.title }}
        </h3>
        <p class="min-h-[4.5rem] text-sm leading-7 text-neutral-600">
          {{ product.description || t("productCard.fallback.description") }}
        </p>
      </div>

      <div class="flex items-end justify-between gap-4">
        <div class="space-y-1">
          <div
            v-if="product.discount_percent > 0"
            class="flex flex-wrap items-center gap-2"
          >
            <p class="text-2xl font-semibold tracking-tight text-neutral-950">
              {{ finalPrice }} {{ t("productCard.currency") }}
            </p>
            <p class="text-sm text-neutral-400 line-through">
              {{ product.price }} {{ t("productCard.currency") }}
            </p>
          </div>

          <p v-else class="text-2xl font-semibold tracking-tight text-neutral-950">
            {{ product.price }} {{ t("productCard.currency") }}
          </p>
        </div>

        <BaseBadge variant="outline" size="sm">
          #{{ product.id }}
        </BaseBadge>
      </div>

      <BaseButton block :to="localePath(`/products/${product.id}`)">
        {{ t("productCard.actions.viewDetails") }}
      </BaseButton>
    </div>
  </BaseCard>
</template>

<script setup>
import { computed } from "vue";
import BaseBadge from "~/components/ui/BaseBadge.vue";
import BaseButton from "~/components/ui/BaseButton.vue";
import BaseCard from "~/components/ui/BaseCard.vue";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const localePath = useLocalePath();
const { t } = useI18n();

const fallbackImage = "/images/products/towel-1.jpg";

const finalPrice = computed(() =>
  Math.round(
    Number(props.product.price || 0) -
      Number(props.product.price || 0) *
        (Number(props.product.discount_percent || 0) / 100),
  ),
);

const categoryLabel = computed(() => {
  const category = props.product.category;

  if (!category) {
    return t("productCard.fallback.product");
  }

  const categoriesMap = {
    all: t("productCategories.all"),
    bath: t("productCategories.bath"),
    hand: t("productCategories.hand"),
    spa: t("productCategories.spa"),
    sport: t("productCategories.sport"),
    face: t("productCategories.face"),
  };

  return categoriesMap[category] || category;
});
</script>

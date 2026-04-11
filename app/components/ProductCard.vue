<template>
  <BaseCard
    variant="elevated"
    padding="none"
    class="group flex h-full flex-col overflow-hidden"
  >
    <div :class="layoutClasses">
      <div :class="mediaWrapperClasses">
        <img
          :src="product.image || fallbackImage"
          :alt="product.title || t('productCard.fallback.product')"
          :class="mediaClasses"
        />

        <div
          class="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-950/28 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100"
        ></div>

        <div
          class="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4"
        >
          <div class="flex flex-wrap gap-2">
            <BaseBadge v-if="hasDiscount" variant="danger" size="sm">
              {{ t("productCard.badges.sale") }}
            </BaseBadge>
            <BaseBadge v-else-if="isNew" variant="accent" size="sm">
              {{ t("productCard.badges.new") }}
            </BaseBadge>
            <BaseBadge variant="inverted" size="sm">
              {{ categoryLabel }}
            </BaseBadge>
          </div>

          <BaseButton
            variant="secondary"
            size="sm"
            class="!min-h-10 !w-10 !px-0 shadow-soft"
            :aria-label="
              isWishlisted
                ? t('productCard.actions.removeWishlist')
                : t('productCard.actions.addWishlist')
            "
            @click="toggleWishlist"
          >
            <template #leading>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                :fill="isWishlisted ? 'currentColor' : 'none'"
                stroke="currentColor"
                stroke-width="1.8"
                class="h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m12 20.25-.375-.313C6.75 15.862 3.75 13.02 3.75 9.188a4.688 4.688 0 0 1 8.25-3.021 4.688 4.688 0 0 1 8.25 3.021c0 3.832-3 6.674-7.875 10.749L12 20.25Z"
                />
              </svg>
            </template>
          </BaseButton>
        </div>

        <div class="absolute inset-x-0 bottom-0 p-4">
          <BaseBadge
            :variant="product.stock > 0 ? 'success' : 'danger'"
            size="sm"
          >
            {{
              product.stock > 0
                ? t("productCard.stock.inStock")
                : t("productCard.stock.soldOut")
            }}
          </BaseBadge>
        </div>
      </div>

      <div class="flex min-h-0 flex-1 flex-col gap-5 p-5 md:p-6">
        <div class="space-y-3">
          <h2 :class="titleClasses">
            {{ product.title }}
          </h2>

          <p :class="descriptionClasses">
            {{ product.description || t("productCard.fallback.description") }}
          </p>
        </div>

        <div class="mt-auto space-y-4">
          <div class="flex items-end justify-between gap-4">
            <div class="space-y-1">
              <div v-if="hasDiscount" class="flex flex-wrap items-center gap-2">
                <p
                  class="text-2xl font-semibold tracking-tight text-neutral-950"
                >
                  {{ finalPrice }} {{ t("productCard.currency") }}
                </p>
                <p class="text-sm text-neutral-400 line-through">
                  {{ originalPrice }} {{ t("productCard.currency") }}
                </p>
              </div>

              <p
                v-else
                class="text-2xl font-semibold tracking-tight text-neutral-950"
              >
                {{ originalPrice }} {{ t("productCard.currency") }}
              </p>
            </div>

            <BaseBadge
              v-if="hasDiscount"
              variant="outline"
              size="md"
              class="text-red-500 bg-red-50 border-red-200"
            >
              -{{ product.discount_percent }}%
            </BaseBadge>
          </div>

          <div class="grid gap-3 sm:grid-cols-2">
            <BaseButton
              block
              :disabled="product.stock <= 0"
              @click="handleAddToCart"
            >
              <template #leading>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  class="h-4 w-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 3.75h1.386c.51 0 .955.343 1.085.837L5.7 8.25m0 0h11.79c.72 0 1.34.504 1.483 1.21l1.2 5.25a1.5 1.5 0 0 1-1.464 1.84H8.25a1.5 1.5 0 0 1-1.464-1.18L5.7 8.25Zm2.55 10.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Zm9 0a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Z"
                  />
                </svg>
              </template>
              {{
                product.stock > 0
                  ? t("productDetails.actions.addToCart")
                  : t("productDetails.actions.soldOut")
              }}
            </BaseButton>

            <BaseButton
              block
              variant="outline"
              :to="localePath(`/products/${product.id}`)"
            >
              {{ t("productCard.actions.viewDetails") }}
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
import { computed, ref } from "vue";
import BaseBadge from "~/components/ui/BaseBadge.vue";
import BaseButton from "~/components/ui/BaseButton.vue";
import BaseCard from "~/components/ui/BaseCard.vue";
import { useCartStore } from "~/stores/cart";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  layout: {
    type: String,
    default: "grid",
  },
});

const localePath = useLocalePath();
const { t } = useI18n();
const cartStore = useCartStore();
const isWishlisted = ref(false);

const fallbackImage = "/images/products/towel-1.jpg";

const hasDiscount = computed(
  () => Number(props.product.discount_percent || 0) > 0,
);

const originalPrice = computed(() =>
  Number(props.product.originalPrice || props.product.price || 0),
);

const finalPrice = computed(() =>
  hasDiscount.value
    ? Math.round(
        originalPrice.value -
          originalPrice.value *
            (Number(props.product.discount_percent || 0) / 100),
      )
    : originalPrice.value,
);

const isNew = computed(() => {
  if (!props.product.created_at) return false;

  const createdAt = new Date(props.product.created_at).getTime();

  if (!Number.isFinite(createdAt)) return false;

  return Date.now() - createdAt <= 1000 * 60 * 60 * 24 * 30;
});

const categoryLabel = computed(() => {
  if (!props.product.category) {
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

  return categoriesMap[props.product.category] || props.product.category;
});

const layoutClasses = computed(() =>
  props.layout === "list"
    ? "flex h-full flex-col md:grid md:grid-cols-[18rem,1fr]"
    : "flex h-full flex-col",
);

const mediaWrapperClasses = computed(() => [
  "relative overflow-hidden bg-surface-muted",
  props.layout === "list" ? "md:h-full" : "",
]);

const mediaClasses = computed(() => [
  "w-full object-cover transition duration-500 group-hover:scale-105",
  props.layout === "list"
    ? "aspect-[4/3] md:h-full md:aspect-auto"
    : "aspect-[4/4.7]",
]);

const titleClasses = computed(() => [
  "text-xl font-semibold tracking-tight text-neutral-950 line-clamp-2",
  props.layout === "list" ? "md:min-h-0" : "min-h-[3.5rem]",
]);

const descriptionClasses = computed(() => [
  "text-sm leading-7 text-neutral-600",
  props.layout === "list"
    ? "line-clamp-3 md:min-h-0 md:text-base"
    : "line-clamp-3 min-h-[5.25rem]",
]);

const handleAddToCart = () => {
  cartStore.addToCart(props.product);
};

const toggleWishlist = () => {
  isWishlisted.value = !isWishlisted.value;
};
</script>

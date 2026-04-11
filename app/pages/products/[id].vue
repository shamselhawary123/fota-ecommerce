<template>
  <div class="pb-20 pt-8 md:pt-10">
    <AppContainer class="space-y-8 md:space-y-10">
      <div
        class="flex flex-col gap-4 rounded-4xl border border-white/70 bg-white/80 p-5 shadow-soft backdrop-blur xl:flex-row xl:items-center xl:justify-between"
      >
        <div class="space-y-3">
          <NuxtLink
            :to="localePath('/products')"
            class="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 transition hover:text-neutral-950"
          >
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
                d="m15.75 19.5-7.5-7.5 7.5-7.5"
              />
            </svg>
            {{ t("productDetails.back") }}
          </NuxtLink>

          <div class="space-y-2">
            <BaseBadge variant="outline" size="md">
              {{ t("productDetails.hero.eyebrow") }}
            </BaseBadge>
            <h1 class="text-2xl font-semibold tracking-tight text-neutral-950">
              {{
                product?.title || t("productDetails.fallback.product")
              }}
            </h1>
          </div>
        </div>

        <BaseBadge
          v-if="product"
          :variant="product.stock > 0 ? 'success' : 'danger'"
          size="lg"
        >
          {{
            product.stock > 0
              ? t("productDetails.stock.inStock")
              : t("productDetails.stock.soldOut")
          }}
        </BaseBadge>
      </div>

      <section
        v-if="isLoading"
        class="grid gap-6 lg:grid-cols-[minmax(0,1.05fr),minmax(0,0.95fr)]"
      >
        <BaseCard variant="elevated" padding="lg" class="space-y-5">
          <BaseSkeleton height="32rem" rounded="xl" />
          <div class="grid grid-cols-4 gap-3">
            <BaseSkeleton
              v-for="index in 4"
              :key="index"
              height="5.5rem"
              rounded="xl"
            />
          </div>
        </BaseCard>

        <BaseCard variant="elevated" padding="lg" class="space-y-6">
          <BaseSkeleton width="9rem" height="2rem" rounded="full" />
          <BaseSkeleton width="75%" height="2.75rem" rounded="xl" />
          <BaseSkeleton lines="3" height="1rem" />
          <div class="grid gap-4 sm:grid-cols-2">
            <BaseSkeleton height="7.5rem" rounded="xl" />
            <BaseSkeleton height="7.5rem" rounded="xl" />
          </div>
          <BaseSkeleton height="4.25rem" rounded="xl" />
          <div class="grid gap-3 sm:grid-cols-2">
            <BaseSkeleton height="3rem" rounded="full" />
            <BaseSkeleton height="3rem" rounded="full" />
          </div>
        </BaseCard>
      </section>

      <template v-else-if="product">
        <section
          class="grid gap-6 lg:grid-cols-[minmax(0,1.05fr),minmax(0,0.95fr)] xl:gap-8"
        >
          <BaseCard variant="elevated" padding="lg" class="space-y-5">
            <div
              class="overflow-hidden rounded-[2rem] border border-neutral-200 bg-surface-muted"
            >
              <transition name="product-image" mode="out-in">
                <img
                  :key="selectedImage"
                  :src="selectedImage"
                  :alt="product.title || t('productDetails.fallback.product')"
                  class="aspect-[4/4.7] w-full object-cover"
                />
              </transition>
            </div>

            <div
              class="grid gap-3"
              :class="galleryImages.length > 3 ? 'grid-cols-4' : 'grid-cols-3'"
            >
              <button
                v-for="(image, index) in galleryImages"
                :key="`${image}-${index}`"
                type="button"
                class="overflow-hidden rounded-[1.35rem] border bg-surface-muted p-1 transition duration-200"
                :class="
                  selectedImage === image
                    ? 'border-brand-400 shadow-soft'
                    : 'border-neutral-200 hover:border-neutral-300'
                "
                @click="selectedImage = image"
              >
                <img
                  :src="image"
                  :alt="`${product.title || t('productDetails.fallback.product')} ${index + 1}`"
                  class="aspect-square w-full rounded-[1rem] object-cover"
                />
              </button>
            </div>
          </BaseCard>

          <BaseCard
            variant="elevated"
            padding="xl"
            class="flex h-full flex-col gap-6"
          >
            <div class="flex flex-wrap items-center gap-3">
              <BaseBadge variant="primary" size="md">
                {{ categoryLabel(product.category) }}
              </BaseBadge>
              <BaseBadge
                v-if="hasDiscount"
                variant="danger"
                size="md"
              >
                {{ product.discount_percent }}%
                {{ t("productDetails.discount.off") }}
              </BaseBadge>
              <BaseBadge
                :variant="product.stock > 0 ? 'success' : 'danger'"
                size="md"
              >
                {{
                  product.stock > 0
                    ? t("productDetails.stock.inStock")
                    : t("productDetails.stock.soldOut")
                }}
              </BaseBadge>
            </div>

            <div class="space-y-4">
              <div class="space-y-3">
                <h2
                  class="text-3xl font-semibold tracking-tight text-neutral-950 md:text-4xl"
                >
                  {{ product.title }}
                </h2>
                <p class="max-w-2xl text-base leading-7 text-neutral-600">
                  {{ product.description }}
                </p>
              </div>

              <div class="grid gap-3 sm:grid-cols-3">
                <BaseCard
                  v-for="highlight in purchaseHighlights"
                  :key="highlight.label"
                  variant="muted"
                  padding="md"
                  class="h-full"
                >
                  <p
                    class="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500"
                  >
                    {{ highlight.label }}
                  </p>
                  <p class="mt-2 text-sm font-semibold leading-6 text-neutral-950">
                    {{ highlight.value }}
                  </p>
                </BaseCard>
              </div>

              <div
                class="flex flex-wrap items-end gap-x-4 gap-y-3 rounded-4xl border border-neutral-200 bg-neutral-50/80 p-5"
              >
                <div class="space-y-1">
                  <p class="text-sm font-medium text-neutral-500">
                    {{ t("productDetails.price.label") }}
                  </p>
                  <div class="flex flex-wrap items-end gap-3">
                    <p
                      class="text-3xl font-semibold tracking-tight text-neutral-950"
                    >
                      {{ finalPrice }} {{ t("productCard.currency") }}
                    </p>
                    <p
                      v-if="hasDiscount"
                      class="text-lg text-neutral-400 line-through"
                    >
                      {{ originalPrice }} {{ t("productCard.currency") }}
                    </p>
                  </div>
                  <p
                    v-if="savingsAmount > 0"
                    class="text-sm font-medium text-success-700"
                  >
                    {{
                      t("productDetails.price.savings", {
                        amount: savingsAmount,
                        currency: t("productCard.currency"),
                      })
                    }}
                  </p>
                </div>

                <div
                  v-if="hasDiscount"
                  class="inline-flex items-center gap-2 rounded-full border border-danger-100 bg-danger-50 px-4 py-2 text-sm font-semibold text-danger-600"
                >
                  <span>{{ t("productDetails.price.original") }}</span>
                  <span>-{{ product.discount_percent }}%</span>
                </div>
              </div>
            </div>

            <div
              class="grid gap-4 rounded-4xl border border-neutral-200 bg-white/80 p-5 sm:grid-cols-[auto,1fr]"
            >
              <div class="space-y-1">
                <p class="text-sm font-semibold text-neutral-950">
                  {{ t("productDetails.quantity.label") }}
                </p>
                <p class="text-sm leading-6 text-neutral-500">
                  {{ t("productDetails.quantity.hint") }}
                </p>
              </div>

              <div
                class="flex w-full items-center justify-between gap-3 rounded-full border border-neutral-200 bg-neutral-50 p-2 sm:justify-self-end"
              >
                <BaseButton
                  variant="outline"
                  size="sm"
                  class="!min-h-10 !w-10 !px-0"
                  :disabled="quantity <= 1 || product.stock <= 0"
                  @click="decrementQuantity"
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
                        d="M5 12h14"
                      />
                    </svg>
                  </template>
                </BaseButton>

                <span
                  class="flex min-w-[3rem] justify-center text-base font-semibold text-neutral-950"
                >
                  {{ quantity }}
                </span>

                <BaseButton
                  variant="outline"
                  size="sm"
                  class="!min-h-10 !w-10 !px-0"
                  :disabled="quantity >= maxQuantity || product.stock <= 0"
                  @click="incrementQuantity"
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
                        d="M12 5v14m7-7H5"
                      />
                    </svg>
                  </template>
                </BaseButton>
              </div>
            </div>

            <div class="grid gap-3 sm:grid-cols-2">
              <BaseButton
                block
                size="lg"
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
                size="lg"
                variant="outline"
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
                {{
                  isWishlisted
                    ? t("productDetails.actions.removeFromWishlist")
                    : t("productDetails.actions.addToWishlist")
                }}
              </BaseButton>
            </div>

            <div class="grid gap-4 md:grid-cols-3">
              <BaseCard variant="muted" padding="md">
                <p class="text-sm font-medium text-neutral-500">
                  {{ t("productDetails.info.delivery") }}
                </p>
                <p
                  class="mt-2 text-sm font-semibold leading-6 text-neutral-950"
                >
                  {{ t("productDetails.info.deliveryValue") }}
                </p>
              </BaseCard>

              <BaseCard variant="muted" padding="md">
                <p class="text-sm font-medium text-neutral-500">
                  {{ t("productDetails.info.quality") }}
                </p>
                <p
                  class="mt-2 text-sm font-semibold leading-6 text-neutral-950"
                >
                  {{ t("productDetails.info.qualityValue") }}
                </p>
              </BaseCard>

              <BaseCard variant="muted" padding="md">
                <p class="text-sm font-medium text-neutral-500">
                  {{ t("productDetails.info.returns") }}
                </p>
                <p
                  class="mt-2 text-sm font-semibold leading-6 text-neutral-950"
                >
                  {{ t("productDetails.info.returnsValue") }}
                </p>
              </BaseCard>
            </div>
          </BaseCard>
        </section>

        <section class="grid gap-6 xl:grid-cols-[minmax(0,1fr),21rem]">
          <div class="space-y-6">
            <BaseCard variant="elevated" padding="xl">
              <div class="space-y-4">
                <div class="space-y-2">
                  <BaseBadge variant="outline" size="md">
                    {{ t("productDetails.description.eyebrow") }}
                  </BaseBadge>
                  <h2
                    class="text-2xl font-semibold tracking-tight text-neutral-950"
                  >
                    {{ t("productDetails.description.title") }}
                  </h2>
                </div>

                <p class="text-base leading-8 text-neutral-600">
                  {{ product.description }}
                </p>
              </div>
            </BaseCard>

            <BaseCard variant="elevated" padding="xl">
              <div class="space-y-5">
                <div class="space-y-2">
                  <BaseBadge variant="outline" size="md">
                    {{ t("productDetails.reviews.eyebrow") }}
                  </BaseBadge>
                  <h2
                    class="text-2xl font-semibold tracking-tight text-neutral-950"
                  >
                    {{ t("productDetails.reviews.title") }}
                  </h2>
                  <p class="text-sm leading-7 text-neutral-600">
                    {{ t("productDetails.reviews.subtitle") }}
                  </p>
                </div>

                <BaseEmptyState
                  :title="t('productDetails.reviews.emptyTitle')"
                  :description="t('productDetails.reviews.emptyDesc')"
                  padding="lg"
                >
                  <template #actions>
                    <BaseButton variant="outline" size="md">
                      {{ t("productDetails.reviews.writeCta") }}
                    </BaseButton>
                  </template>
                </BaseEmptyState>
              </div>
            </BaseCard>
          </div>

          <BaseCard variant="muted" padding="xl" class="h-fit space-y-5">
            <div class="space-y-2">
              <BaseBadge variant="outline" size="md">
                {{ t("productDetails.summary.eyebrow") }}
              </BaseBadge>
              <h2 class="text-xl font-semibold tracking-tight text-neutral-950">
                {{ t("productDetails.summary.title") }}
              </h2>
            </div>

            <div class="space-y-4">
              <div
                class="rounded-3xl border border-neutral-200 bg-white/80 p-4"
              >
                <p class="text-sm font-medium text-neutral-500">
                  {{ t("productDetails.info.category") }}
                </p>
                <p class="mt-2 text-sm font-semibold text-neutral-950">
                  {{ categoryLabel(product.category) }}
                </p>
              </div>

              <div
                class="rounded-3xl border border-neutral-200 bg-white/80 p-4"
              >
                <p class="text-sm font-medium text-neutral-500">
                  {{ t("productDetails.summary.shippingTitle") }}
                </p>
                <p class="mt-2 text-sm leading-6 text-neutral-950">
                  {{ t("productDetails.summary.shippingDesc") }}
                </p>
              </div>

              <div
                class="rounded-3xl border border-neutral-200 bg-white/80 p-4"
              >
                <p class="text-sm font-medium text-neutral-500">
                  {{ t("productDetails.summary.supportTitle") }}
                </p>
                <p class="mt-2 text-sm leading-6 text-neutral-950">
                  {{ t("productDetails.summary.supportDesc") }}
                </p>
              </div>
            </div>
          </BaseCard>
        </section>

        <section class="space-y-5">
          <div
            class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
          >
            <div class="space-y-2">
              <BaseBadge variant="outline" size="md">
                {{ t("productDetails.related.eyebrow") }}
              </BaseBadge>
              <h2 class="text-2xl font-semibold tracking-tight text-neutral-950">
                {{ t("productDetails.related.title") }}
              </h2>
            </div>

            <BaseButton
              variant="ghost"
              :to="localePath('/products')"
            >
              {{ t("productDetails.related.viewAll") }}
            </BaseButton>
          </div>

          <div
            v-if="relatedProducts.length"
            class="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
          >
            <ProductCard
              v-for="item in relatedProducts"
              :key="item.id"
              :product="item"
            />
          </div>

          <BaseEmptyState
            v-else
            :title="t('productDetails.related.emptyTitle')"
            :description="t('productDetails.related.emptyDesc')"
          >
            <template #actions>
              <BaseButton :to="localePath('/products')" variant="outline">
                {{ t("productDetails.actions.browseAll") }}
              </BaseButton>
            </template>
          </BaseEmptyState>
        </section>
      </template>

      <BaseEmptyState
        v-else
        :title="t('productDetails.states.notFound')"
        :description="t('productDetails.states.notFoundDesc')"
      >
        <template #actions>
          <BaseButton :to="localePath('/products')" variant="outline">
            {{ t("productDetails.actions.browseAll") }}
          </BaseButton>
        </template>
      </BaseEmptyState>
    </AppContainer>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import AppContainer from "~/components/ui/AppContainer.vue";
import BaseBadge from "~/components/ui/BaseBadge.vue";
import BaseButton from "~/components/ui/BaseButton.vue";
import BaseCard from "~/components/ui/BaseCard.vue";
import BaseEmptyState from "~/components/ui/BaseEmptyState.vue";
import BaseSkeleton from "~/components/ui/BaseSkeleton.vue";
import ProductCard from "~/components/ProductCard.vue";
import { useCartStore } from "~/stores/cart";
import { useProductsStore } from "~/stores/products";

const fallbackImage = "/images/products/towel-1.jpg";

const localePath = useLocalePath();
const route = useRoute();
const productsStore = useProductsStore();
const cartStore = useCartStore();
const { t } = useI18n();

const quantity = ref(1);
const isWishlisted = ref(false);
const selectedImage = ref(fallbackImage);

const isLoading = computed(() => productsStore.loading);
const productId = computed(() => route.params.id);

onMounted(async () => {
  if (!productsStore.products.length) {
    await productsStore.fetchProducts();
  }
});

const product = computed(() =>
  productsStore.products.find((item) => String(item.id) === String(productId.value)),
);

const hasDiscount = computed(
  () => Number(product.value?.discount_percent || 0) > 0,
);

const originalPrice = computed(() =>
  Number(product.value?.originalPrice || product.value?.price || 0),
);

const finalPrice = computed(() =>
  hasDiscount.value
    ? Math.round(
        originalPrice.value -
          originalPrice.value *
            (Number(product.value?.discount_percent || 0) / 100),
      )
    : originalPrice.value,
);

const maxQuantity = computed(() => Math.max(Number(product.value?.stock || 0), 1));

const galleryImages = computed(() => {
  if (!product.value) return [fallbackImage];

  const rawImages = [
    product.value.image,
    product.value.image_2,
    product.value.image_3,
    product.value.image_4,
    ...(Array.isArray(product.value.images) ? product.value.images : []),
    ...(Array.isArray(product.value.gallery) ? product.value.gallery : []),
  ];

  const uniqueImages = rawImages.filter(
    (image, index) => image && rawImages.indexOf(image) === index,
  );

  return uniqueImages.length ? uniqueImages : [fallbackImage];
});

const relatedProducts = computed(() => {
  if (!product.value) return [];

  return productsStore.products
    .filter(
      (item) =>
        String(item.id) !== String(product.value.id) &&
        item.category === product.value.category,
    )
    .slice(0, 4);
});

const savingsAmount = computed(() =>
  Math.max(originalPrice.value - finalPrice.value, 0),
);

const purchaseHighlights = computed(() => {
  if (!product.value) return [];

  const highlights = [
    {
      label: t("productDetails.highlights.collection"),
      value: categoryLabel(product.value.category),
    },
    {
      label: t("productDetails.highlights.availability"),
      value:
        product.value.stock > 0
          ? t("productDetails.highlights.stockValue", {
              count: product.value.stock,
            })
          : t("productDetails.stock.soldOut"),
    },
  ];

  if (savingsAmount.value > 0) {
    highlights.push({
      label: t("productDetails.highlights.offer"),
      value: t("productDetails.price.savings", {
        amount: savingsAmount.value,
        currency: t("productCard.currency"),
      }),
    });
  } else {
    highlights.push({
      label: t("productDetails.highlights.shipping"),
      value: t("productDetails.info.deliveryValue"),
    });
  }

  return highlights;
});

watch(
  galleryImages,
  (images) => {
    selectedImage.value = images[0] || fallbackImage;
  },
  { immediate: true },
);

watch(
  product,
  (nextProduct) => {
    quantity.value = nextProduct?.stock > 0 ? 1 : 0;
    isWishlisted.value = false;
  },
  { immediate: true },
);

const categoryLabel = (category) => {
  if (!category) return t("productDetails.fallback.product");

  const categoriesMap = {
    all: t("productCategories.all"),
    bath: t("productCategories.bath"),
    hand: t("productCategories.hand"),
    spa: t("productCategories.spa"),
    sport: t("productCategories.sport"),
    face: t("productCategories.face"),
  };

  return categoriesMap[category] || category;
};

const incrementQuantity = () => {
  quantity.value = Math.min(quantity.value + 1, maxQuantity.value);
};

const decrementQuantity = () => {
  quantity.value = Math.max(quantity.value - 1, product.value?.stock > 0 ? 1 : 0);
};

const handleAddToCart = () => {
  if (!product.value || product.value.stock <= 0) return;

  for (let count = 0; count < quantity.value; count += 1) {
    cartStore.addToCart(product.value);
  }
};

const toggleWishlist = () => {
  isWishlisted.value = !isWishlisted.value;
};

useSeoMeta(() => ({
  title: product.value
    ? `${product.value.title} | Fota Store`
    : `${t("productDetails.fallback.product")} | Fota Store`,
  description:
    product.value?.description || t("productCard.fallback.description"),
  ogTitle: product.value?.title || t("productDetails.fallback.product"),
  ogDescription:
    product.value?.description || t("productCard.fallback.description"),
  ogImage: selectedImage.value || fallbackImage,
}));
</script>

<style scoped>
.product-image-enter-active,
.product-image-leave-active {
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
}

.product-image-enter-from,
.product-image-leave-to {
  opacity: 0;
  transform: scale(0.985);
}
</style>

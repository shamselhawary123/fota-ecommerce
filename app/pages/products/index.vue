<template>
  <div class="ui-page-shell">
    <AppContainer size="wide" class="ui-page-stack">
      <BaseCard variant="elevated" padding="xl" class="relative overflow-hidden">
        <div
          class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(90,127,186,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(245,121,26,0.14),transparent_26%)]"
        ></div>

        <div
          class="relative grid gap-6 xl:grid-cols-[1fr,18rem] xl:items-end"
        >
          <div class="space-y-4">
            <BaseBadge variant="primary" size="md">
              {{ t("productsPage.hero.eyebrow") }}
            </BaseBadge>
            <h1
              class="text-balance font-display text-4xl tracking-tight text-neutral-950 md:text-5xl xl:text-6xl"
            >
              {{ t("productsPage.hero.title") }}
            </h1>
            <p class="max-w-2xl text-sm leading-7 text-neutral-600 md:text-base">
              {{ t("productsPage.hero.desc") }}
            </p>
          </div>

          <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            <BaseCard variant="muted" padding="md">
              <p
                class="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500"
              >
                {{ t("productsPage.stats.products") }}
              </p>
              <p class="mt-2 text-3xl font-semibold tracking-tight text-neutral-950">
                {{ productsStore.products.length }}
              </p>
            </BaseCard>

            <BaseCard variant="muted" padding="md">
              <p
                class="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500"
              >
                {{ t("productsPage.stats.categories") }}
              </p>
              <p class="mt-2 text-3xl font-semibold tracking-tight text-neutral-950">
                {{ categoryFilters.length - 1 }}
              </p>
            </BaseCard>
          </div>
        </div>
      </BaseCard>

      <BaseCard variant="muted" padding="none" class="overflow-hidden">
        <div class="p-5 md:p-6 xl:p-7">
          <div
            class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
          >
            <div class="space-y-2">
              <div class="flex flex-wrap items-center gap-2">
                <BaseBadge variant="outline" size="sm">
                  {{ t("productsPage.filters.badge") }}
                </BaseBadge>
                <BaseBadge variant="primary" size="sm">
                  {{
                    t("productsPage.filters.results", {
                      count: filteredProducts.length,
                    })
                  }}
                </BaseBadge>
              </div>
              <div class="space-y-1">
                <h2 class="text-2xl font-semibold tracking-tight text-neutral-950">
                  {{ t("productsPage.filters.title") }}
                </h2>
                <p class="text-sm leading-7 text-neutral-600">
                  {{ t("productsPage.filters.desc") }}
                </p>
              </div>
            </div>

            <div
              class="flex flex-wrap items-center gap-3 text-sm text-neutral-500"
            >
              <BaseBadge variant="outline" size="sm">
                {{
                  t("productsPage.pagination.page", {
                    current: safeCurrentPage,
                    total: safeTotalPages,
                  })
                }}
              </BaseBadge>
              <BaseButton size="sm" variant="ghost" @click="resetFilters">
                {{ t("productsPage.filters.reset") }}
              </BaseButton>
              <BaseButton
                size="sm"
                variant="outline"
                :aria-expanded="isFiltersOpen ? 'true' : 'false'"
                @click="isFiltersOpen = !isFiltersOpen"
              >
                {{
                  isFiltersOpen
                    ? t("productsPage.filters.hide")
                    : t("productsPage.filters.show")
                }}
                <template #trailing>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                    class="h-4 w-4 transition duration-200"
                    :class="isFiltersOpen ? 'rotate-180' : ''"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </template>
              </BaseButton>
            </div>
          </div>

          <transition
            enter-active-class="overflow-hidden transition-all duration-300 ease-out"
            enter-from-class="max-h-0 translate-y-2 opacity-0"
            enter-to-class="max-h-[1200px] translate-y-0 opacity-100"
            leave-active-class="overflow-hidden transition-all duration-250 ease-in"
            leave-from-class="max-h-[1200px] translate-y-0 opacity-100"
            leave-to-class="max-h-0 -translate-y-1 opacity-0"
          >
            <div v-if="isFiltersOpen" class="pt-6">
              <div class="ui-divider mb-6"></div>

              <div class="grid gap-4 xl:grid-cols-[1.15fr,1fr,0.9fr]">
                <BaseCard variant="default" padding="lg" class="h-full">
                  <div class="space-y-4">
                    <div class="space-y-1">
                      <p
                        class="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500"
                      >
                        {{ t("productsPage.filters.searchTitle") }}
                      </p>
                      <p class="text-sm text-neutral-600">
                        {{ t("productsPage.filters.searchDesc") }}
                      </p>
                    </div>

                    <BaseInput
                      v-model="searchQuery"
                      :label="t('productsPage.search.label')"
                      :placeholder="t('productsPage.search.placeholder')"
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
                            d="m21 21-4.35-4.35m1.35-5.4a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
                          />
                        </svg>
                      </template>
                    </BaseInput>
                  </div>
                </BaseCard>

                <BaseCard variant="default" padding="lg" class="h-full">
                  <div class="space-y-4">
                    <div class="space-y-1">
                      <p
                        class="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500"
                      >
                        {{ t("productsPage.filters.priceTitle") }}
                      </p>
                      <p class="text-sm text-neutral-600">
                        {{ t("productsPage.filters.priceDesc") }}
                      </p>
                    </div>

                    <div class="grid gap-3 sm:grid-cols-2">
                      <BaseInput
                        v-model="minPrice"
                        type="number"
                        :label="t('productsPage.filters.minPrice')"
                        :placeholder="t('productsPage.filters.minPricePlaceholder')"
                      />
                      <BaseInput
                        v-model="maxPrice"
                        type="number"
                        :label="t('productsPage.filters.maxPrice')"
                        :placeholder="String(maxAvailablePrice || 0)"
                      />
                    </div>
                  </div>
                </BaseCard>

                <BaseCard variant="default" padding="lg" class="h-full">
                  <div class="space-y-4">
                    <div class="space-y-1">
                      <p
                        class="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500"
                      >
                        {{ t("productsPage.filters.sortViewTitle") }}
                      </p>
                      <p class="text-sm text-neutral-600">
                        {{ t("productsPage.filters.sortViewDesc") }}
                      </p>
                    </div>

                    <div class="space-y-3">
                      <p class="text-sm font-semibold text-neutral-700">
                        {{ t("productsPage.filters.sortLabel") }}
                      </p>
                      <div class="flex flex-wrap gap-2">
                        <BaseButton
                          v-for="option in sortOptions"
                          :key="option.value"
                          size="sm"
                          :variant="sortBy === option.value ? 'primary' : 'outline'"
                          @click="sortBy = option.value"
                        >
                          {{ option.label }}
                        </BaseButton>
                      </div>
                    </div>

                    <div class="space-y-3">
                      <p class="text-sm font-semibold text-neutral-700">
                        {{ t("productsPage.filters.viewLabel") }}
                      </p>
                      <div class="flex gap-2">
                        <BaseButton
                          size="sm"
                          :variant="viewMode === 'grid' ? 'primary' : 'outline'"
                          class="!min-h-10 !w-10 !px-0"
                          :aria-label="t('productsPage.filters.gridView')"
                          @click="viewMode = 'grid'"
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
                                d="M5.25 5.25h4.5v4.5h-4.5Zm9 0h4.5v4.5h-4.5Zm-9 9h4.5v4.5h-4.5Zm9 0h4.5v4.5h-4.5Z"
                              />
                            </svg>
                          </template>
                        </BaseButton>

                        <BaseButton
                          size="sm"
                          :variant="viewMode === 'list' ? 'primary' : 'outline'"
                          class="!min-h-10 !w-10 !px-0"
                          :aria-label="t('productsPage.filters.listView')"
                          @click="viewMode = 'list'"
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
                                d="M7.5 6.75h12M7.5 12h12m-12 5.25h12M4.5 6.75h.008v.008H4.5Zm0 5.25h.008v.008H4.5Zm0 5.25h.008v.008H4.5Z"
                              />
                            </svg>
                          </template>
                        </BaseButton>
                      </div>
                    </div>
                  </div>
                </BaseCard>
              </div>

              <div class="ui-divider my-6"></div>

              <div class="space-y-3">
                <div class="space-y-1">
                  <p
                    class="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500"
                  >
                    {{ t("productsPage.filters.categoryTitle") }}
                  </p>
                  <p class="text-sm text-neutral-600">
                    {{ t("productsPage.filters.categoryDesc") }}
                  </p>
                </div>

                <div class="flex flex-wrap gap-2">
                  <BaseButton
                    v-for="category in categoryFilters"
                    :key="category.value"
                    size="sm"
                    :variant="selectedCategory === category.value ? 'primary' : 'outline'"
                    @click="selectedCategory = category.value"
                  >
                    {{ category.label }}
                  </BaseButton>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </BaseCard>

      <div v-if="isLoading" :class="productsWrapperClasses">
        <BaseCard
          v-for="item in skeletonItems"
          :key="item"
          variant="elevated"
          padding="none"
          class="overflow-hidden"
        >
          <div :class="viewMode === 'list' ? 'md:grid md:grid-cols-[18rem,1fr]' : ''">
            <BaseSkeleton
              :class="
                viewMode === 'list'
                  ? 'aspect-[4/3] w-full md:h-full md:aspect-auto !rounded-none'
                  : 'aspect-[4/4.7] w-full !rounded-none'
              "
            />

            <div class="space-y-4 p-5 md:p-6">
              <BaseSkeleton width="7rem" height="1rem" />
              <BaseSkeleton height="1.4rem" />
              <BaseSkeleton width="92%" height="1rem" />
              <BaseSkeleton width="75%" height="1rem" />
              <BaseSkeleton width="10rem" height="1.8rem" />
              <div class="grid gap-3 sm:grid-cols-2">
                <BaseSkeleton width="100%" height="3rem" rounded="full" />
                <BaseSkeleton width="100%" height="3rem" rounded="full" />
              </div>
            </div>
          </div>
        </BaseCard>
      </div>

      <BaseEmptyState
        v-else-if="filteredProducts.length === 0"
        :title="t('productsPage.states.empty')"
        :description="t('productsPage.states.emptyDesc')"
      >
        <template #actions>
          <BaseButton @click="resetFilters">
            {{ t("productsPage.filters.reset") }}
          </BaseButton>
        </template>
      </BaseEmptyState>

      <div v-else :class="productsWrapperClasses">
        <ProductCard
          v-for="product in paginatedProducts"
          :key="product.id"
          :product="product"
          :layout="viewMode"
        />
      </div>

      <BaseCard
        v-if="!isLoading && totalPages > 1"
        variant="bare"
        padding="none"
      >
        <div
          class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <p class="text-sm text-neutral-500">
            {{ t("productsPage.pagination.desc") }}
          </p>

          <div class="flex flex-wrap items-center gap-2">
            <BaseButton
              variant="outline"
              size="sm"
              :disabled="currentPage === 1"
              @click="goToPreviousPage"
            >
              {{ t("productsPage.actions.previous") }}
            </BaseButton>

            <BaseButton
              v-for="page in totalPages"
              :key="page"
              size="sm"
              :variant="currentPage === page ? 'primary' : 'outline'"
              @click="goToPage(page)"
            >
              {{ page }}
            </BaseButton>

            <BaseButton
              variant="outline"
              size="sm"
              :disabled="currentPage === totalPages"
              @click="goToNextPage"
            >
              {{ t("productsPage.actions.next") }}
            </BaseButton>
          </div>
        </div>
      </BaseCard>
    </AppContainer>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import ProductCard from "~/components/ProductCard.vue";
import AppContainer from "~/components/ui/AppContainer.vue";
import BaseBadge from "~/components/ui/BaseBadge.vue";
import BaseButton from "~/components/ui/BaseButton.vue";
import BaseCard from "~/components/ui/BaseCard.vue";
import BaseEmptyState from "~/components/ui/BaseEmptyState.vue";
import BaseInput from "~/components/ui/BaseInput.vue";
import BaseSkeleton from "~/components/ui/BaseSkeleton.vue";
import { useProductsStore } from "~/stores/products";

const productsStore = useProductsStore();
const { t } = useI18n();

const searchQuery = ref("");
const selectedCategory = ref("all");
const minPrice = ref("");
const maxPrice = ref("");
const sortBy = ref("newest");
const viewMode = ref("grid");
const isFiltersOpen = ref(false);
const currentPage = ref(1);
const itemsPerPage = 8;

const isLoading = computed(() => productsStore.loading);

const categoryFilters = computed(() => [
  { label: t("productCategories.all"), value: "all" },
  { label: t("productCategories.bath"), value: "bath" },
  { label: t("productCategories.hand"), value: "hand" },
  { label: t("productCategories.spa"), value: "spa" },
  { label: t("productCategories.sport"), value: "sport" },
  { label: t("productCategories.face"), value: "face" },
]);

const sortOptions = computed(() => [
  { label: t("productFilters.newest"), value: "newest" },
  { label: t("productFilters.popularity"), value: "popularity" },
  { label: t("productFilters.priceLowHigh"), value: "price-asc" },
  { label: t("productFilters.priceHighLow"), value: "price-desc" },
]);

const skeletonItems = Array.from(
  { length: itemsPerPage },
  (_, index) => index + 1,
);

const getDisplayPrice = (product) => {
  const basePrice = Number(product.originalPrice || product.price || 0);
  const discount = Number(product.discount_percent || 0);

  if (discount > 0) {
    return Math.round(basePrice - basePrice * (discount / 100));
  }

  return basePrice;
};

const getCreatedAtValue = (product) => {
  if (!product.created_at) return 0;

  const timestamp = new Date(product.created_at).getTime();
  return Number.isFinite(timestamp) ? timestamp : 0;
};

const maxAvailablePrice = computed(() =>
  productsStore.products.reduce(
    (highest, product) => Math.max(highest, getDisplayPrice(product)),
    0,
  ),
);

const filteredProducts = computed(() => {
  let products = [...productsStore.products];

  if (selectedCategory.value !== "all") {
    products = products.filter(
      (product) => product.category === selectedCategory.value,
    );
  }

  if (searchQuery.value.trim()) {
    products = products.filter((product) =>
      String(product.title || "")
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase()),
    );
  }

  if (minPrice.value !== "") {
    products = products.filter(
      (product) => getDisplayPrice(product) >= Number(minPrice.value),
    );
  }

  if (maxPrice.value !== "") {
    products = products.filter(
      (product) => getDisplayPrice(product) <= Number(maxPrice.value),
    );
  }

  switch (sortBy.value) {
    case "price-asc":
      products.sort((a, b) => getDisplayPrice(a) - getDisplayPrice(b));
      break;
    case "price-desc":
      products.sort((a, b) => getDisplayPrice(b) - getDisplayPrice(a));
      break;
    case "popularity":
      products.sort((a, b) => {
        const scoreA = Number(a.popularity ?? a.rating ?? a.stock ?? 0);
        const scoreB = Number(b.popularity ?? b.rating ?? b.stock ?? 0);
        return scoreB - scoreA || getCreatedAtValue(b) - getCreatedAtValue(a);
      });
      break;
    default:
      products.sort((a, b) => getCreatedAtValue(b) - getCreatedAtValue(a));
      break;
  }

  return products;
});

const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / itemsPerPage),
);

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredProducts.value.slice(start, start + itemsPerPage);
});

const safeTotalPages = computed(() => Math.max(totalPages.value, 1));
const safeCurrentPage = computed(() =>
  Math.min(currentPage.value, safeTotalPages.value),
);

const productsWrapperClasses = computed(() =>
  viewMode.value === "list"
    ? "grid gap-6"
    : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
);

const scrollToTop = () => {
  if (!import.meta.client) return;

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const goToPage = (page) => {
  currentPage.value = page;
  scrollToTop();
};

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
    scrollToTop();
  }
};

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
    scrollToTop();
  }
};

const resetFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = "all";
  minPrice.value = "";
  maxPrice.value = "";
  sortBy.value = "newest";
  currentPage.value = 1;
};

onMounted(async () => {
  if (import.meta.client) {
    isFiltersOpen.value = window.matchMedia("(min-width: 1024px)").matches;
  }

  if (!productsStore.products.length) {
    await productsStore.fetchProducts();
  }
});

watch([searchQuery, selectedCategory, minPrice, maxPrice, sortBy], () => {
  currentPage.value = 1;
});

watch(filteredProducts, () => {
  if (currentPage.value > safeTotalPages.value) {
    currentPage.value = 1;
  }
});
</script>

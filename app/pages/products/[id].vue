<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Back -->
      <NuxtLink
        :to="localePath('/products')"
        class="inline-flex items-center gap-2 mb-6 text-sm font-medium text-gray-700 hover:text-black transition"
      >
        ← {{ t("productDetails.back") }}
      </NuxtLink>

      <!-- Loading -->
      <div
        v-if="isLoading"
        class="bg-white rounded-3xl shadow p-10 text-center text-gray-500"
      >
        {{ t("productDetails.states.loading") }}
      </div>

      <!-- Product -->
      <div
        v-else-if="product"
        class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
      >
        <!-- Image Card -->
        <div
          class="bg-white rounded-3xl shadow border border-gray-100 p-4 md:p-6"
        >
          <div class="overflow-hidden rounded-2xl">
            <img
              :src="product.image || 'https://picsum.photos/900/700'"
              :alt="product.title || t('productDetails.fallback.product')"
              class="w-full h-[320px] sm:h-[450px] object-cover hover:scale-105 transition duration-500"
            />
          </div>
        </div>

        <!-- Details Card -->
        <div
          class="bg-white rounded-3xl shadow border border-gray-100 p-6 md:p-8"
        >
          <span
            class="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-black text-white capitalize mb-4"
          >
            {{
              categoryLabel(product.category, "productDetails.fallback.product")
            }}
          </span>

          <h1
            class="text-3xl md:text-4xl font-bold text-gray-900 leading-tight"
          >
            {{ product.title }}
          </h1>

          <p class="text-gray-500 mt-4 text-base md:text-lg leading-7">
            {{ product.description }}
          </p>

          <div class="mt-6 flex items-center gap-4 flex-wrap">
            <template v-if="product.discount_percent > 0">
              <p class="text-3xl font-bold text-gray-900">
                {{ discountedPrice(product.price, product.discount_percent) }}
                EGP
              </p>

              <p class="text-xl text-red-400 line-through">
                {{ product.price }} EGP
              </p>

              <span
                class="px-3 py-1 rounded-full text-sm bg-red-100 text-red-700 font-medium"
              >
                {{ product.discount_percent }}%
                {{ t("productDetails.discount.off") }}
              </span>
            </template>

            <template v-else>
              <p class="text-3xl font-bold text-gray-900">
                {{ product.price }} EGP
              </p>
            </template>

            <span
              class="px-3 py-1 rounded-full text-sm font-medium"
              :class="
                product.stock > 0
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              "
            >
              {{
                product.stock > 0
                  ? t("productDetails.stock.inStock")
                  : t("productDetails.stock.soldOut")
              }}
            </span>
          </div>

          <!-- Info Blocks -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div class="bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <p class="text-sm text-gray-500 mb-1">
                {{ t("productDetails.info.category") }}
              </p>
              <p class="font-semibold text-gray-800 capitalize">
                {{
                  categoryLabel(
                    product.category,
                    "productDetails.fallback.general",
                  )
                }}
              </p>
            </div>

            <div class="bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <p class="text-sm text-gray-500 mb-1">
                {{ t("productDetails.info.delivery") }}
              </p>
              <p class="font-semibold text-gray-800">
                {{ t("productDetails.info.deliveryValue") }}
              </p>
            </div>

            <div class="bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <p class="text-sm text-gray-500 mb-1">
                {{ t("productDetails.info.quality") }}
              </p>
              <p class="font-semibold text-gray-800">
                {{ t("productDetails.info.qualityValue") }}
              </p>
            </div>

            <div class="bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <p class="text-sm text-gray-500 mb-1">
                {{ t("productDetails.info.returns") }}
              </p>
              <p class="font-semibold text-gray-800">
                {{ t("productDetails.info.returnsValue") }}
              </p>
            </div>
          </div>

          <!-- Actions -->
          <div class="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              v-if="product.stock > 0"
              class="flex-1 bg-black text-white px-6 py-4 rounded-2xl font-semibold hover:bg-gray-800 transition shadow"
              @click="cartStore.addToCart(product)"
            >
              {{ t("productDetails.actions.addToCart") }}
            </button>

            <button
              v-else
              disabled
              class="flex-1 bg-gray-300 text-gray-600 px-6 py-4 rounded-2xl font-semibold cursor-not-allowed"
            >
              {{ t("productDetails.actions.soldOut") }}
            </button>

            <NuxtLink
              :to="localePath('/cart')"
              class="flex-1 text-center bg-white border border-gray-300 text-gray-800 px-6 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition"
            >
              {{ t("productDetails.actions.goToCart") }}
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Not Found -->
      <div
        v-else
        class="bg-white rounded-3xl shadow p-10 text-center text-red-500 text-lg"
      >
        {{ t("productDetails.states.notFound") }}
      </div>

      <!-- Related Products -->
      <div v-if="product && relatedProducts.length" class="mt-12">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900">
            {{ t("productDetails.related.title") }}
          </h2>

          <NuxtLink
            :to="localePath('/products')"
            class="text-sm font-medium text-gray-600 hover:text-black"
          >
            {{ t("productDetails.related.viewAll") }}
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard
            v-for="item in relatedProducts"
            :key="item.id"
            :product="item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useProductsStore } from "~/stores/products";
import { useRoute } from "vue-router";
import { useCartStore } from "~/stores/cart";

const localePath = useLocalePath();
const route = useRoute();
const productsStore = useProductsStore();
const cartStore = useCartStore();

const isLoading = computed(() => productsStore.loading);
const productId = route.params.id;

const { t } = useI18n();

onMounted(async () => {
  if (!productsStore.products.length) {
    await productsStore.fetchProducts();
  }
});

const product = computed(() =>
  productsStore.products.find((p) => String(p.id) === String(productId)),
);

const relatedProducts = computed(() => {
  if (!product.value) return [];

  return productsStore.products
    .filter(
      (p) =>
        String(p.id) !== String(product.value.id) &&
        p.category === product.value.category,
    )
    .slice(0, 4);
});

const discountedPrice = (price, discount) => {
  return Math.round(price - price * (discount / 100));
};

const categoryLabel = (
  category,
  fallbackKey = "productDetails.fallback.product",
) => {
  if (!category) return t(fallbackKey);

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
</script>

<template>
  <div
    class="group bg-white rounded-3xl shadow border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
  >
    <div class="relative overflow-hidden">
      <img
        :src="product.image || 'https://picsum.photos/500/400'"
        :alt="product.title || t('productCard.fallback.product')"
        class="w-full h-60 object-cover group-hover:scale-105 transition duration-500"
      />

      <!-- Category -->
      <span
        class="absolute top-4 left-4 bg-black/80 text-white text-xs px-3 py-1 rounded-full capitalize"
      >
        {{ categoryLabel(product.category) }}
      </span>

      <!-- Stock -->
      <span
        class="absolute top-4 right-4 text-xs px-3 py-1 rounded-full font-semibold"
        :class="
          product.stock > 0
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'
        "
      >
        {{
          product.stock > 0
            ? t("productCard.stock.inStock")
            : t("productCard.stock.soldOut")
        }}
      </span>

      <!-- Discount -->
      <span
        v-if="product.discount_percent > 0"
        class="absolute bottom-4 left-4 bg-red-500 text-white text-m px-3 py-1 rounded-full font-bold shadow"
      >
        {{ product.discount_percent }}% {{ t("productCard.discount.off") }}
      </span>
    </div>

    <div class="p-5">
      <h2 class="text-lg font-bold text-gray-800 line-clamp-1">
        {{ product.title }}
      </h2>

      <p class="text-sm text-gray-500 mt-2 line-clamp-2 min-h-[40px]">
        {{ product.description || t("productCard.fallback.description") }}
      </p>

      <div class="mt-4">
        <div
          v-if="product.discount_percent > 0"
          class="flex items-center gap-3 flex-wrap"
        >
          <p class="text-xl font-bold text-gray-900">
            {{ discountedPrice(product.price, product.discount_percent) }}
            {{ t("productCard.currency") }}
          </p>

          <p class="text-lg text-red-400 line-through">
            {{ product.price }} {{ t("productCard.currency") }}
          </p>
        </div>

        <p v-else class="text-xl font-bold text-gray-900">
          {{ product.price }} {{ t("productCard.currency") }}
        </p>
      </div>

      <!-- <p class="mt-2 text-sm text-gray-500">
        Available: {{ product.stock ?? 0 }}
      </p> -->

      <NuxtLink
        :to="localePath(`/products/${product.id}`)"
        class="mt-5 inline-flex w-full items-center justify-center bg-black text-white px-4 py-3 rounded-xl hover:bg-gray-800 transition font-medium"
      >
        {{ t("productCard.actions.viewDetails") }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const localePath = useLocalePath();
const { t } = useI18n();

defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const discountedPrice = (price, discount) => {
  return Math.round(price - price * (discount / 100));
};

const categoryLabel = (category) => {
  if (!category) return t("productCard.fallback.product");

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

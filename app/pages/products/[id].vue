<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Back -->
      <NuxtLink
        to="/products"
        class="inline-flex items-center gap-2 mb-6 text-sm font-medium text-gray-700 hover:text-black transition"
      >
        ← Back to Products
      </NuxtLink>

      <!-- Loading -->
      <div
        v-if="isLoading"
        class="bg-white rounded-3xl shadow p-10 text-center text-gray-500"
      >
        Loading product...
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
              alt="product"
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
            {{ product.category || "product" }}
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
                {{ product.discount_percent }}% OFF
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
              {{ product.stock > 0 ? "In Stock" : "Sold Out" }}
            </span>
          </div>

          <!-- Info Blocks -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div class="bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <p class="text-sm text-gray-500 mb-1">Category</p>
              <p class="font-semibold text-gray-800 capitalize">
                {{ product.category || "General" }}
              </p>
            </div>

            <div class="bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <p class="text-sm text-gray-500 mb-1">Delivery</p>
              <p class="font-semibold text-gray-800">2 - 4 Business Days</p>
            </div>

            <div class="bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <p class="text-sm text-gray-500 mb-1">Quality</p>
              <p class="font-semibold text-gray-800">Premium Material</p>
            </div>

            <div class="bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <p class="text-sm text-gray-500 mb-1">Returns</p>
              <p class="font-semibold text-gray-800">7 Days Return Policy</p>
            </div>
          </div>

          <!-- Actions -->
          <div class="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              v-if="product.stock > 0"
              class="flex-1 bg-black text-white px-6 py-4 rounded-2xl font-semibold hover:bg-gray-800 transition shadow"
              @click="cartStore.addToCart(product)"
            >
              Add To Cart
            </button>

            <button
              v-else
              disabled
              class="flex-1 bg-gray-300 text-gray-600 px-6 py-4 rounded-2xl font-semibold cursor-not-allowed"
            >
              Sold Out
            </button>

            <NuxtLink
              to="/cart"
              class="flex-1 text-center bg-white border border-gray-300 text-gray-800 px-6 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition"
            >
              Go to Cart
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Not Found -->
      <div
        v-else
        class="bg-white rounded-3xl shadow p-10 text-center text-red-500 text-lg"
      >
        Product not found.
      </div>

      <!-- Related Products -->
      <div v-if="product && relatedProducts.length" class="mt-12">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900">
            Related Products
          </h2>

          <NuxtLink
            to="/products"
            class="text-sm font-medium text-gray-600 hover:text-black"
          >
            View All
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

const route = useRoute();
const productsStore = useProductsStore();
const cartStore = useCartStore();

const isLoading = computed(() => productsStore.loading);
const productId = route.params.id;

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
</script>

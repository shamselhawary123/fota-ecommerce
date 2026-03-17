<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Hero -->
      <div
        class="rounded-3xl bg-gradient-to-r from-black via-gray-900 to-gray-700 text-white p-8 md:p-10 shadow-lg mb-8"
      >
        <div class="max-w-3xl">
          <p class="text-sm uppercase tracking-widest text-gray-300 mb-3">
            Fota Store Collection
          </p>
          <h1 class="text-3xl md:text-5xl font-bold mb-4">
            Discover Premium Towels & Home Essentials
          </h1>
          <p class="text-gray-300 text-base md:text-lg leading-7">
            Explore our carefully selected products with modern quality, elegant
            design, and everyday comfort.
          </p>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-3xl shadow p-4 md:p-6 mb-8">
        <div
          class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >
          <!-- Search -->
          <div class="w-full lg:max-w-md">
            <label class="block text-sm font-medium text-gray-600 mb-2">
              Search Products
            </label>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by title..."
              class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <!-- Categories -->
          <div class="flex flex-wrap gap-3">
            <button
              v-for="category in categoryFilters"
              :key="category.value"
              @click="selectedCategory = category.value"
              :class="[
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border',
                selectedCategory === category.value
                  ? 'bg-black text-white border-black shadow-md scale-105'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100',
              ]"
            >
              {{ category.label }}
            </button>
          </div>
        </div>

        <div class="mt-5 text-sm text-gray-500">
          Showing
          <span class="font-semibold text-gray-800">
            {{ paginatedProducts.length }}
          </span>
          of
          <span class="font-semibold text-gray-800">
            {{ filteredProducts.length }}
          </span>
          product(s)
        </div>
      </div>

      <!-- Loading -->
      <div
        v-if="isLoading"
        class="bg-white rounded-3xl shadow p-10 text-center text-gray-500"
      >
        Loading products...
      </div>

      <!-- Products -->
      <div v-else>
        <div
          v-if="filteredProducts.length === 0"
          class="bg-white rounded-3xl shadow p-10 text-center text-gray-500"
        >
          No products found.
        </div>

        <template v-else>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <ProductCard
              v-for="product in paginatedProducts"
              :key="product.id"
              :product="product"
            />
          </div>

          <!-- Pagination -->
          <div
            v-if="totalPages > 1"
            class="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <button
              @click="goToPreviousPage"
              :disabled="currentPage === 1"
              class="px-4 py-2 rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <
            </button>

            <button
              v-for="page in totalPages"
              :key="page"
              @click="goToPage(page)"
              :class="[
                'w-11 h-11 rounded-xl text-sm font-medium transition',
                currentPage === page
                  ? 'bg-black text-white shadow-md'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100',
              ]"
            >
              {{ page }}
            </button>

            <button
              @click="goToNextPage"
              :disabled="currentPage === totalPages"
              class="px-4 py-2 rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              >
            </button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useProductsStore } from "~/stores/products";

const productsStore = useProductsStore();

const isLoading = computed(() => productsStore.loading);
const searchQuery = ref("");
const selectedCategory = ref("all");
const currentPage = ref(1);
const itemsPerPage = 8;

const categoryFilters = [
  { label: "All", value: "all" },
  { label: "Bath", value: "bath" },
  { label: "Hand", value: "hand" },
  { label: "Spa", value: "spa" },
  { label: "Sport", value: "sport" },
  { label: "Face", value: "face" },
];

onMounted(async () => {
  if (!productsStore.products.length) {
    await productsStore.fetchProducts();
  }
});

const filteredProducts = computed(() => {
  let products = [...productsStore.products];

  if (selectedCategory.value !== "all") {
    products = products.filter(
      (product) => product.category === selectedCategory.value,
    );
  }

  if (searchQuery.value.trim()) {
    products = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
    );
  }

  return products;
});

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage);
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredProducts.value.slice(start, end);
});

const goToPage = (page) => {
  currentPage.value = page;
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
};

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
};

watch([searchQuery, selectedCategory], () => {
  currentPage.value = 1;
});

watch(filteredProducts, () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = 1;
  }
});
</script>

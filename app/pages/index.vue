<template>
  <ClientOnly fallback-tag="div">
    <div v-if="pageReady">
      <!-- Hero Section -->
      <section class="bg-gray-100 py-8 px-4">
        <div class="max-w-7xl mx-auto">
          <div
            class="relative overflow-hidden rounded-[32px] min-h-[620px] md:min-h-[700px] flex items-center justify-center text-center"
          >
            <video
              autoplay
              muted
              loop
              playsinline
              class="absolute inset-0 w-full h-full object-cover scale-105 blur-[2px]"
            >
              <source src="/videos/cotton-factory.mp4" type="video/mp4" />
            </video>

            <div class="absolute inset-0 bg-black/45"></div>

            <div class="relative z-10 px-6 max-w-4xl">
              <h1
                class="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white"
              >
                Premium Towels Crafted for Comfort & Quality
              </h1>

              <p
                class="text-gray-200 max-w-2xl mx-auto mb-8 text-base md:text-xl leading-8"
              >
                We manufacture high-quality towels using premium cotton
                materials, designed for homes, hotels, and wholesale partners.
              </p>

              <div class="flex flex-col sm:flex-row justify-center gap-4">
                <NuxtLink
                  to="/products"
                  class="bg-white text-black px-7 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
                >
                  Shop Products
                </NuxtLink>

                <NuxtLink
                  to="/about"
                  class="border border-white text-white px-7 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition"
                >
                  Learn More
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Why Choose Us -->
      <section class="py-20 container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
          Why Choose Fota Store?
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div
            class="p-8 bg-white rounded-3xl shadow border border-gray-100 hover:shadow-lg transition"
          >
            <h3 class="text-xl font-semibold mb-3">Premium Quality</h3>
            <p class="text-gray-600 leading-7">
              Made from carefully selected cotton for maximum softness and
              durability.
            </p>
          </div>

          <div
            class="p-8 bg-white rounded-3xl shadow border border-gray-100 hover:shadow-lg transition"
          >
            <h3 class="text-xl font-semibold mb-3">Factory Direct</h3>
            <p class="text-gray-600 leading-7">
              Buy directly from the manufacturer with competitive prices for
              retail and wholesale.
            </p>
          </div>

          <div
            class="p-8 bg-white rounded-3xl shadow border border-gray-100 hover:shadow-lg transition"
          >
            <h3 class="text-xl font-semibold mb-3">Trusted by Businesses</h3>
            <p class="text-gray-600 leading-7">
              Supplying hotels, gyms, and resellers with reliable bulk
              solutions.
            </p>
          </div>
        </div>
      </section>

      <!-- Featured Products -->
      <section class="py-20 bg-gray-50">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl md:text-4xl font-bold mb-10 text-center">
            Featured Products
          </h2>

          <div
            v-if="featuredProducts.length"
            class="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <ProductCard
              v-for="product in featuredProducts"
              :key="product.id"
              :product="product"
            />
          </div>

          <div
            v-else
            class="bg-white rounded-3xl shadow p-8 text-center text-gray-500"
          >
            Loading featured products...
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="py-20 text-center px-4">
        <h2 class="text-4xl font-bold mb-6">Looking for Wholesale Orders?</h2>

        <p class="text-gray-600 mb-8 max-w-xl mx-auto leading-7">
          We provide special pricing and custom solutions for bulk and wholesale
          buyers.
        </p>

        <NuxtLink
          to="/about"
          class="bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition"
        >
          More about Us
        </NuxtLink>
      </section>
    </div>
  </ClientOnly>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useProductsStore } from "~/stores/products";
import { useUserStore } from "~/stores/auth";

const productsStore = useProductsStore();
const userStore = useUserStore();

const pageReady = ref(false);

onMounted(async () => {
  await userStore.loadUser();

  if (userStore.user?.role === "admin") {
    return navigateTo("/admin");
  }

  if (!productsStore.products.length) {
    await productsStore.fetchProducts();
  }

  pageReady.value = true;
});

const featuredProducts = computed(() => productsStore.products.slice(0, 3));
</script>

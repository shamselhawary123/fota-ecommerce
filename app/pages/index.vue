<template>
  <div>
    <ClientOnly fallback-tag="div">
      <div v-if="pageReady">
        <!-- Hero -->
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
                  {{ t("hero.title") }}
                </h1>

                <p
                  class="text-gray-200 max-w-2xl mx-auto mb-8 text-base md:text-xl leading-8"
                >
                  {{ t("hero.desc") }}
                </p>

                <div class="flex flex-col sm:flex-row justify-center gap-4">
                  <NuxtLink
                    :to="localePath('/products')"
                    class="bg-white text-black px-7 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
                  >
                    {{ t("hero.shop") }}
                  </NuxtLink>

                  <NuxtLink
                    :to="localePath('/about')"
                    class="border border-white text-white px-7 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition"
                  >
                    {{ t("hero.learn") }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Why -->
        <section class="py-20 container mx-auto px-4">
          <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
            {{ t("why.title") }}
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div class="p-8 bg-white rounded-3xl shadow border border-gray-100">
              <h3 class="text-xl font-semibold mb-3">
                {{ t("why.q1.title") }}
              </h3>
              <p class="text-gray-600 leading-7">{{ t("why.q1.desc") }}</p>
            </div>

            <div class="p-8 bg-white rounded-3xl shadow border border-gray-100">
              <h3 class="text-xl font-semibold mb-3">
                {{ t("why.q2.title") }}
              </h3>
              <p class="text-gray-600 leading-7">{{ t("why.q2.desc") }}</p>
            </div>

            <div class="p-8 bg-white rounded-3xl shadow border border-gray-100">
              <h3 class="text-xl font-semibold mb-3">
                {{ t("why.q3.title") }}
              </h3>
              <p class="text-gray-600 leading-7">{{ t("why.q3.desc") }}</p>
            </div>
          </div>
        </section>

        <!-- Featured -->
        <section class="py-20 bg-gray-50">
          <div class="container mx-auto px-4">
            <h2 class="text-3xl md:text-4xl font-bold mb-10 text-center">
              {{ t("featured.title") }}
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
              {{ t("featured.loading") }}
            </div>
          </div>
        </section>

        <!-- CTA -->
        <section class="py-20 text-center px-4">
          <h2 class="text-4xl font-bold mb-6">
            {{ t("cta.title") }}
          </h2>

          <p class="text-gray-600 mb-8 max-w-xl mx-auto leading-7">
            {{ t("cta.desc") }}
          </p>

          <NuxtLink
            :to="localePath('/about')"
            class="bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition"
          >
            {{ t("cta.btn") }}
          </NuxtLink>
        </section>
      </div>
    </ClientOnly>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import { useProductsStore } from "~/stores/products";
import { useUserStore } from "~/stores/auth";

const localePath = useLocalePath();
const productsStore = useProductsStore();
const userStore = useUserStore();
const { t } = useI18n();
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

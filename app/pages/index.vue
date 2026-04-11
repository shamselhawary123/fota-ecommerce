<template>
  <div>
    <HomePageSkeleton v-if="!pageReady" />

    <div v-else class="pb-10 md:pb-14">
      <HomeHeroSection :stats="heroStats" />
      <HomeTrustStrip :items="trustItems" />
      <HomeCollectionsSection :collections="collections" />
      <HomeFeaturedSection
        :products="featuredProducts"
        :loading="isLoading"
      />
      <HomePromoBanner />
      <HomeStorySection :stats="storyStats" :features="storyFeatures" />
      <HomeFinalCta />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import HomeCollectionsSection from "~/components/home/HomeCollectionsSection.vue";
import HomeFeaturedSection from "~/components/home/HomeFeaturedSection.vue";
import HomeFinalCta from "~/components/home/HomeFinalCta.vue";
import HomeHeroSection from "~/components/home/HomeHeroSection.vue";
import HomePageSkeleton from "~/components/home/HomePageSkeleton.vue";
import HomePromoBanner from "~/components/home/HomePromoBanner.vue";
import HomeStorySection from "~/components/home/HomeStorySection.vue";
import HomeTrustStrip from "~/components/home/HomeTrustStrip.vue";
import { useProductsStore } from "~/stores/products";
import { useUserStore } from "~/stores/auth";

const localePath = useLocalePath();
const productsStore = useProductsStore();
const userStore = useUserStore();
const { t } = useI18n();
const pageReady = ref(false);

const isLoading = computed(() => productsStore.loading);
const featuredProducts = computed(() => productsStore.products.slice(0, 3));

const heroStats = computed(() => [
  {
    value: "10+",
    label: t("about.stats.exp"),
  },
  {
    value: "500+",
    label: t("about.stats.partners"),
  },
  {
    value: "1000+",
    label: t("about.stats.orders"),
  },
]);

const storyStats = computed(() => heroStats.value);

const trustItems = computed(() => [
  {
    icon: "truck",
    title: t("home.trust.shipping"),
  },
  {
    icon: "sparkles",
    title: t("home.trust.quality"),
  },
  {
    icon: "shield",
    title: t("home.trust.support"),
  },
]);

const collections = computed(() => [
  {
    key: "bath",
    title: t("productCategories.bath"),
    badge: t("productCategories.bath"),
    description: t("home.collections.items.bath"),
    image: "/images/products/towel-23.jpg",
    to: localePath("/products"),
    featured: true,
  },
  {
    key: "hand",
    title: t("productCategories.hand"),
    badge: t("productCategories.hand"),
    description: t("home.collections.items.hand"),
    image: "/images/products/towel-5.jpg",
    to: localePath("/products"),
    featured: false,
  },
  {
    key: "spa",
    title: t("productCategories.spa"),
    badge: t("productCategories.spa"),
    description: t("home.collections.items.spa"),
    image: "/images/products/towel-14.jpg",
    to: localePath("/products"),
    featured: false,
  },
  {
    key: "sport",
    title: t("productCategories.sport"),
    badge: t("productCategories.sport"),
    description: t("home.collections.items.sport"),
    image: "/images/products/towel-8.jpg",
    to: localePath("/products"),
    featured: true,
  },
]);

const storyFeatures = computed(() => [
  {
    icon: "shield",
    title: t("why.q1.title"),
    description: t("why.q1.desc"),
  },
  {
    icon: "factory",
    title: t("why.q2.title"),
    description: t("why.q2.desc"),
  },
  {
    icon: "sparkles",
    title: t("why.q3.title"),
    description: t("why.q3.desc"),
  },
]);

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
</script>

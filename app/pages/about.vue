<template>
  <div class="bg-white">
    <!-- Hero -->
    <section class="relative bg-black text-white py-24 text-center px-4">
      <h1 class="text-5xl font-bold mb-6 tracking-wide">
        {{ t("about.hero.title") }}
      </h1>

      <p class="max-w-2xl mx-auto text-gray-300 text-lg">
        {{ t("about.hero.desc") }}
      </p>
    </section>

    <!-- Story -->
    <section class="py-20 container mx-auto px-6">
      <div class="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 class="text-3xl font-bold mb-6">
            {{ t("about.story.title") }}
          </h2>

          <p class="text-gray-600 leading-relaxed mb-6">
            {{ t("about.story.p1") }}
          </p>

          <p class="text-gray-600 leading-relaxed">
            {{ t("about.story.p2") }}
          </p>
        </div>

        <div class="bg-gray-100 p-10 rounded-2xl shadow-xl">
          <h3 class="text-2xl font-semibold mb-4">
            {{ t("about.features.title") }}
          </h3>

          <ul class="space-y-3 text-gray-600">
            <li>✔ {{ t("about.features.f1") }}</li>
            <li>✔ {{ t("about.features.f2") }}</li>
            <li>✔ {{ t("about.features.f3") }}</li>
            <li>✔ {{ t("about.features.f4") }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="bg-gray-50 py-20">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div>
            <h3 class="text-4xl font-bold text-black mb-2">10+</h3>
            <p class="text-gray-600">{{ t("about.stats.exp") }}</p>
          </div>

          <div>
            <h3 class="text-4xl font-bold text-black mb-2">500+</h3>
            <p class="text-gray-600">{{ t("about.stats.partners") }}</p>
          </div>

          <div>
            <h3 class="text-4xl font-bold text-black mb-2">1000+</h3>
            <p class="text-gray-600">{{ t("about.stats.orders") }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 text-center px-6">
      <h2 class="text-4xl font-bold mb-6">
        {{ t("about.cta.title") }}
      </h2>

      <p class="text-gray-600 mb-8 max-w-xl mx-auto">
        {{ t("about.cta.desc") }}
      </p>

      <NuxtLink
        :to="localePath('/products')"
        class="bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition"
      >
        {{ t("about.cta.btn") }}
      </NuxtLink>
    </section>
  </div>
</template>
<script setup>
const { t } = useI18n();
const localePath = useLocalePath();
</script>

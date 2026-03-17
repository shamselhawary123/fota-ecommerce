<template>
  <div class="bg-white">
    <!-- Hero -->
    <section class="relative bg-black text-white py-24 text-center px-4">
      <h1 class="text-5xl font-bold mb-6 tracking-wide">About Fota Store</h1>

      <p class="max-w-2xl mx-auto text-gray-300 text-lg">
        Crafting premium towels with precision, quality, and years of
        manufacturing expertise.
      </p>
    </section>

    <!-- Story Section -->
    <section class="py-20 container mx-auto px-6">
      <div class="grid md:grid-cols-2 gap-16 items-center">
        <!-- Text -->
        <div>
          <h2 class="text-3xl font-bold mb-6">Our Story</h2>

          <p class="text-gray-600 leading-relaxed mb-6">
            Fota Store began with one simple mission: to manufacture towels that
            combine softness, durability, and premium quality.
          </p>

          <p class="text-gray-600 leading-relaxed">
            Today, we proudly supply homes, hotels, gyms, and wholesale partners
            with textile products designed to last.
          </p>
        </div>

        <!-- Visual Card -->
        <div class="bg-gray-100 p-10 rounded-2xl shadow-xl">
          <h3 class="text-2xl font-semibold mb-4">What Makes Us Different?</h3>

          <ul class="space-y-3 text-gray-600">
            <li>✔ High-density premium cotton</li>
            <li>✔ Factory-direct competitive pricing</li>
            <li>✔ Bulk & wholesale capabilities</li>
            <li>✔ Strict quality control standards</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="bg-gray-50 py-20">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div>
            <h3 class="text-4xl font-bold text-black mb-2">10+</h3>
            <p class="text-gray-600">Years of Experience</p>
          </div>

          <div>
            <h3 class="text-4xl font-bold text-black mb-2">500+</h3>
            <p class="text-gray-600">Business Partners</p>
          </div>

          <div>
            <h3 class="text-4xl font-bold text-black mb-2">1000+</h3>
            <p class="text-gray-600">Bulk Orders Delivered</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 text-center px-6">
      <h2 class="text-4xl font-bold mb-6">Ready to Work With Us?</h2>

      <p class="text-gray-600 mb-8 max-w-xl mx-auto">
        Whether you're a retailer or a wholesale partner, we are ready to
        deliver quality at scale.
      </p>

      <NuxtLink
        to="/products"
        class="bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition"
      >
        Explore Our Products
      </NuxtLink>
    </section>
  </div>
</template>

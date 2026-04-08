<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center px-4">
    <div
      class="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center border border-gray-100"
    >
      <div
        class="mx-auto mb-6 w-20 h-20 rounded-2xl bg-black text-white flex items-center justify-center text-3xl font-bold"
      >
        403
      </div>

      <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Access Denied
      </h1>

      <p class="text-gray-600 leading-7 mb-8">
        You are not allowed to access this page.
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <NuxtLink
          :to="localePath('/')"
          class="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
        >
          Back to Home
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const localePath = useLocalePath();
</script>

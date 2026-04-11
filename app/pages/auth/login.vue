<template>
  <div
    class="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10"
  >
    <div
      class="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden"
    >
      <div class="grid md:grid-cols-2 min-h-[650px]">
        <!-- Left Side -->
        <div class="relative hidden md:block">
          <img
            src="/images/fota4.jpg"
            :alt="$t('login.visualAlt')"
            class="w-full h-full object-cover"
          />

          <div class="absolute inset-0 bg-black/50"></div>

          <div
            class="absolute inset-0 flex flex-col justify-center px-10 text-white"
          >
            <h1 class="text-4xl font-bold leading-tight mb-4">
              {{ $t("login.welcome") }} <br />
            </h1>

            <p class="text-gray-200 leading-7 max-w-md">
              {{ $t("login.desc") }}
            </p>

            <div class="mt-8">
              <p class="text-sm text-gray-300">{{ $t("login.noAccount") }}</p>
              <NuxtLink
                :to="localePath('/auth/register')"
                class="inline-block mt-2 font-semibold underline underline-offset-4 hover:text-gray-200 transition"
              >
                {{ $t("login.createAccount") }}
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Right Side -->
        <div class="flex items-center justify-center p-8 md:p-10">
          <div class="w-full max-w-md">
            <div class="mb-8">
              <h2 class="text-3xl font-bold text-gray-800 mb-2">
                {{ $t("login.title") }}
              </h2>
              <p class="text-gray-500">
                {{ $t("login.subtitle") }}
              </p>
            </div>

            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  {{ $t("login.email") }}
                </label>
                <input
                  v-model="email"
                  type="email"
                  :placeholder="$t('login.email')"
                  class="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  {{ $t("login.password") }}
                </label>

                <div class="relative">
                  <input
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    :placeholder="$t('login.password')"
                    class="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition pr-16"
                  />

                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-black transition"
                  >
                    {{ showPassword ? $t("login.hide") : $t("login.show") }}
                  </button>
                </div>
              </div>

              <p v-if="error" class="text-red-500 text-sm">
                {{ error }}
              </p>

              <button
                @click="handleLogin"
                :disabled="isLoading"
                class="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ isLoading ? $t("login.loading") : $t("login.button") }}
              </button>
            </div>

            <p class="mt-6 text-center text-gray-600">
              {{ $t("login.noAccount") }}
              <NuxtLink
                class="font-semibold text-black hover:underline ms-1"
                :to="localePath('/auth/register')"
              >
                {{ $t("login.register") }}
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "guest",
});

import { ref } from "vue";
import { useUserStore } from "~/stores/auth";
import { useRouter } from "vue-router";

const localePath = useLocalePath();
const userStore = useUserStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const error = ref(null);
const showPassword = ref(false);
const isLoading = ref(false);
const { t } = useI18n();

const getErrorMessage = (err) => {
  const message = String(err?.message || "");

  if (message.startsWith("auth.errors.")) {
    return t(message);
  }

  return message;
};

const handleLogin = async () => {
  error.value = null;

  if (!email.value || !password.value) {
    error.value = t("login.validation.required");
    return;
  }

  try {
    isLoading.value = true;
    await userStore.login({
      email: email.value,
      password: password.value,
    });
    router.push(localePath("/"));
  } catch (err) {
    error.value = getErrorMessage(err);
  } finally {
    isLoading.value = false;
  }
};
</script>

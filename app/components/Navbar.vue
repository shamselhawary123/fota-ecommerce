<template>
  <header
    class="fixed top-0 left-0 w-full z-50 transition-transform duration-300 backdrop-blur-sm"
  >
    <AppContainer size="wide" :padded="false">
      <div class="ui-panel relative overflow-hidden px-4 py-3 md:px-5">
        <div
          class="absolute inset-y-0 start-0 w-32 bg-gradient-to-r from-brand-50/70 to-transparent"
        ></div>

        <div class="relative flex items-center justify-between gap-4">
          <NuxtLink
            :to="homeLink"
            class="group flex min-w-0 items-center gap-3"
          >
            <div
              class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/70 bg-white shadow-soft"
            >
              <img
                src="/images/tt.png"
                :alt="t('navbar.logoAlt')"
                class="h-10 w-10 object-contain"
              />
            </div>

            <div class="min-w-0">
              <p
                class="truncate text-base font-semibold tracking-tight text-neutral-950 sm:text-lg"
              >
                {{ brandTitle }}
              </p>
              <p
                class="truncate text-[11px] font-semibold uppercase tracking-[0.24em] text-neutral-500"
              >
                {{ brandSubtitle }}
              </p>
            </div>
          </NuxtLink>

          <nav
            class="hidden items-center gap-1 rounded-full bg-surface-muted/70 p-1 lg:flex"
          >
            <NuxtLink
              :to="productsLink"
              :class="desktopLinkClasses(productsLink)"
            >
              {{ t("navbar.links.products") }}
            </NuxtLink>

            <NuxtLink
              :to="localePath('/about')"
              :class="desktopLinkClasses(localePath('/about'))"
            >
              {{ t("navbar.links.about") }}
            </NuxtLink>

            <NuxtLink
              v-if="!isAdmin"
              :to="localePath('/cart')"
              :class="desktopLinkClasses(localePath('/cart'))"
            >
              {{ t("navbar.links.cart") }}
              <BaseBadge variant="primary" size="sm">
                {{ cartItemsCount }}
              </BaseBadge>
            </NuxtLink>
          </nav>

          <div class="hidden items-center gap-2 md:flex">
            <div
              class="flex items-center gap-1 rounded-full bg-surface-muted/70 p-1"
            >
              <NuxtLink
                :to="switchLocalePath('en')"
                :class="localeButtonClasses('en')"
              >
                EN
              </NuxtLink>
              <NuxtLink
                :to="switchLocalePath('ar')"
                :class="localeButtonClasses('ar')"
              >
                AR
              </NuxtLink>
            </div>

            <template v-if="isLoggedIn">
              <NuxtLink
                :to="localePath('/profile')"
                :class="desktopLinkClasses(localePath('/profile'))"
              >
                {{ t("navbar.links.profile") }}
              </NuxtLink>
              <BaseButton variant="ghost" @click="handleLogout">
                {{ t("navbar.links.logout") }}
              </BaseButton>
            </template>

            <template v-else>
              <BaseButton variant="ghost" :to="localePath('/auth/login')">
                {{ t("navbar.links.login") }}
              </BaseButton>
              <BaseButton :to="localePath('/auth/register')">
                {{ t("navbar.links.register") }}
              </BaseButton>
            </template>
          </div>

          <BaseButton
            variant="outline"
            size="sm"
            class="md:hidden !min-h-11 !w-11 !px-0"
            :aria-expanded="isMenuOpen ? 'true' : 'false'"
            :aria-label="t('navbar.toggle')"
            @click="isMenuOpen = !isMenuOpen"
          >
            <template #leading>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                class="h-5 w-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 7h16M4 12h16M4 17h16"
                />
              </svg>
            </template>
          </BaseButton>
        </div>
      </div>
    </AppContainer>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isMenuOpen"
        class="fixed inset-0 z-[55] bg-brand-950/35 backdrop-blur-sm md:hidden"
        @click="isMenuOpen = false"
      ></div>
    </transition>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-x-full opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-x-0 opacity-100"
      leave-to-class="translate-x-full opacity-0"
    >
      <div
        v-if="isMenuOpen"
        class="fixed inset-y-3 end-3 z-[60] flex w-[min(90vw,24rem)] flex-col rounded-4xl border border-white/70 bg-white/95 p-5 shadow-floating backdrop-blur-xl md:hidden"
      >
        <div
          class="flex items-center justify-between gap-4 border-b border-neutral-200/80 pb-4"
        >
          <div>
            <p class="text-base font-semibold tracking-tight text-neutral-950">
              {{ brandTitle }}
            </p>
            <p class="text-xs uppercase tracking-[0.24em] text-neutral-500">
              {{ brandSubtitle }}
            </p>
          </div>

          <BaseButton
            variant="outline"
            size="sm"
            class="!min-h-10 !w-10 !px-0"
            :aria-label="t('navbar.close')"
            @click="isMenuOpen = false"
          >
            <template #leading>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                class="h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </template>
          </BaseButton>
        </div>

        <div
          class="mt-5 flex items-center gap-1 rounded-full bg-surface-muted/80 p-1"
        >
          <NuxtLink
            :to="switchLocalePath('en')"
            :class="localeButtonClasses('en')"
          >
            EN
          </NuxtLink>
          <NuxtLink
            :to="switchLocalePath('ar')"
            :class="localeButtonClasses('ar')"
          >
            AR
          </NuxtLink>
        </div>

        <nav class="mt-6 flex flex-1 flex-col gap-2">
          <NuxtLink :to="productsLink" :class="mobileLinkClasses(productsLink)">
            {{ t("navbar.links.products") }}
          </NuxtLink>

          <NuxtLink
            :to="localePath('/about')"
            :class="mobileLinkClasses(localePath('/about'))"
          >
            {{ t("navbar.links.about") }}
          </NuxtLink>
        </nav>

        <div class="mt-6 grid gap-3 border-t border-neutral-200/80 pt-5">
          <NuxtLink
            v-if="!isAdmin"
            :to="localePath('/cart')"
            :class="mobileLinkClasses(localePath('/cart'))"
          >
            <span>{{ t("navbar.links.cart") }}</span>
            <BaseBadge variant="primary" size="sm">
              {{ cartItemsCount }}
            </BaseBadge>
          </NuxtLink>

          <template v-if="isLoggedIn">
            <BaseButton variant="outline" block :to="localePath('/profile')">
              {{ t("navbar.links.profile") }}
            </BaseButton>
            <BaseButton variant="danger" block @click="handleLogout">
              {{ t("navbar.links.logout") }}
            </BaseButton>
          </template>

          <template v-else>
            <BaseButton variant="outline" block :to="localePath('/auth/login')">
              {{ t("navbar.links.login") }}
            </BaseButton>

            <BaseButton block :to="localePath('/auth/register')">
              {{ t("navbar.links.register") }}
            </BaseButton>
          </template>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import AppContainer from "~/components/ui/AppContainer.vue";
import BaseBadge from "~/components/ui/BaseBadge.vue";
import BaseButton from "~/components/ui/BaseButton.vue";
import { useRoute } from "vue-router";
import { useCartStore } from "~/stores/cart";
import { useUserStore } from "~/stores/auth";

const authStore = useUserStore();
const cartStore = useCartStore();
const isMenuOpen = ref(false);
const hydrated = ref(false);
const route = useRoute();
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();
const { locale, t } = useI18n();

const isLoggedIn = computed(() => hydrated.value && authStore.isLoggedIn);
const isAdmin = computed(
  () => hydrated.value && authStore.user?.role === "admin",
);
const cartItemsCount = computed(() =>
  hydrated.value && !isAdmin.value ? cartStore.totalItems : 0,
);

const homeLink = computed(() => localePath(isAdmin.value ? "/admin" : "/"));
const productsLink = computed(() =>
  localePath(isAdmin.value ? "/admin/products" : "/products"),
);
const brandTitle = computed(() =>
  isAdmin.value ? t("navbar.admin.title") : t("navbar.brand.title"),
);
const brandSubtitle = computed(() =>
  isAdmin.value ? t("navbar.admin.subtitle") : t("navbar.brand.subtitle"),
);

const isActiveRoute = (path) =>
  route.path === path || route.path.startsWith(`${path}/`);

const desktopLinkClasses = (path) => [
  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition",
  isActiveRoute(path)
    ? "bg-white text-neutral-950 shadow-soft"
    : "text-neutral-600 hover:bg-white/70 hover:text-neutral-950",
];

const mobileLinkClasses = (path) => [
  "flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium transition",
  isActiveRoute(path)
    ? "border-brand-100 bg-brand-50 text-brand-700"
    : "border-neutral-200 bg-surface-muted/70 text-neutral-700 hover:bg-white",
];

const localeButtonClasses = (code) => [
  "inline-flex min-w-[3rem] items-center justify-center rounded-full px-3 py-2 text-xs font-semibold tracking-[0.22em] transition",
  locale.value === code
    ? "bg-brand-900 text-white shadow-soft"
    : "text-neutral-500 hover:bg-white hover:text-neutral-950",
];

const handleLogout = async () => {
  isMenuOpen.value = false;
  await authStore.logout();
};

onMounted(() => {
  hydrated.value = true;
});

watch(
  () => route.fullPath,
  () => {
    isMenuOpen.value = false;
  },
);
</script>

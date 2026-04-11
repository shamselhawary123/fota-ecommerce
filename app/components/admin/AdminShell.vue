<template>
  <div class="pb-12 pt-8 md:pt-10">
    <AppContainer size="wide" class="space-y-6">
      <div class="grid gap-6 xl:grid-cols-[18rem,minmax(0,1fr)]">
        <aside class="xl:sticky xl:top-28 xl:self-start">
          <BaseCard variant="elevated" padding="lg" class="space-y-6">
            <div class="space-y-3">
              <BaseBadge variant="outline" size="md">
                {{ t("admin.shell.eyebrow") }}
              </BaseBadge>
              <div class="space-y-2">
                <h2 class="text-2xl font-semibold tracking-tight text-neutral-950">
                  {{ t("admin.shell.title") }}
                </h2>
                <p class="text-sm leading-6 text-neutral-600">
                  {{ t("admin.shell.desc") }}
                </p>
              </div>
            </div>

            <nav class="grid gap-2">
              <NuxtLink
                v-for="item in navItems"
                :key="item.key"
                :to="item.to"
                class="rounded-3xl border px-4 py-4 transition duration-200"
                :class="
                  isActive(item.to)
                    ? 'border-brand-200 bg-brand-50 text-brand-900 shadow-soft'
                    : 'border-transparent bg-neutral-50 text-neutral-700 hover:border-neutral-200 hover:bg-white'
                "
              >
                <div class="flex items-start justify-between gap-3">
                  <div class="space-y-1">
                    <p class="text-sm font-semibold tracking-tight">
                      {{ item.label }}
                    </p>
                    <p class="text-xs leading-5 text-neutral-500">
                      {{ item.description }}
                    </p>
                  </div>

                  <span
                    class="inline-flex h-10 w-10 items-center justify-center rounded-full"
                    :class="
                      isActive(item.to)
                        ? 'bg-white text-brand-700'
                        : 'bg-white text-neutral-500'
                    "
                  >
                    <svg
                      v-if="item.icon === 'dashboard'"
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
                        d="M3.75 5.25A1.5 1.5 0 0 1 5.25 3.75h4.5a1.5 1.5 0 0 1 1.5 1.5v4.5a1.5 1.5 0 0 1-1.5 1.5h-4.5a1.5 1.5 0 0 1-1.5-1.5v-4.5ZM12.75 5.25a1.5 1.5 0 0 1 1.5-1.5h4.5a1.5 1.5 0 0 1 1.5 1.5v10.5a1.5 1.5 0 0 1-1.5 1.5h-4.5a1.5 1.5 0 0 1-1.5-1.5V5.25ZM3.75 14.25a1.5 1.5 0 0 1 1.5-1.5h4.5a1.5 1.5 0 0 1 1.5 1.5v4.5a1.5 1.5 0 0 1-1.5 1.5h-4.5a1.5 1.5 0 0 1-1.5-1.5v-4.5Z"
                      />
                    </svg>
                    <svg
                      v-else-if="item.icon === 'products'"
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
                        d="m20.25 7.5-8.25-4.5-8.25 4.5m16.5 0v9l-8.25 4.5m8.25-13.5L12 12m0 9V12M3.75 7.5v9L12 21"
                      />
                    </svg>
                    <svg
                      v-else
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
                        d="M3.75 9.75h16.5m-15 0V18A2.25 2.25 0 0 0 7.5 20.25h9A2.25 2.25 0 0 0 18.75 18V9.75m-13.5 0 1.56-4.68A1.5 1.5 0 0 1 8.24 4.5h7.52a1.5 1.5 0 0 1 1.43 1.02l1.56 4.68M9.75 13.5h4.5"
                      />
                    </svg>
                  </span>
                </div>
              </NuxtLink>
            </nav>

            <ClientOnly>
              <BaseCard variant="muted" padding="md" class="space-y-3">
                <div class="flex items-center gap-3">
                  <div
                    class="flex h-11 w-11 items-center justify-center rounded-full bg-brand-900 text-white"
                  >
                    <span class="text-sm font-semibold">
                      {{ userInitials }}
                    </span>
                  </div>

                  <div class="min-w-0">
                    <p class="truncate text-sm font-semibold text-neutral-950">
                      {{ accountName }}
                    </p>
                    <p class="truncate text-xs text-neutral-500">
                      {{ accountEmail }}
                    </p>
                  </div>
                </div>

                <BaseButton
                  block
                  variant="outline"
                  size="sm"
                  @click="userStore.logout"
                >
                  {{ t("navbar.links.logout") }}
                </BaseButton>
              </BaseCard>

              <template #fallback>
                <BaseCard variant="muted" padding="md" class="space-y-3">
                  <div class="flex items-center gap-3">
                    <BaseSkeleton width="2.75rem" height="2.75rem" circle />

                    <div class="min-w-0 flex-1 space-y-2">
                      <BaseSkeleton width="7.5rem" height="0.875rem" />
                      <BaseSkeleton width="10rem" height="0.75rem" />
                    </div>
                  </div>

                  <BaseSkeleton width="100%" height="2.5rem" rounded="full" />
                </BaseCard>
              </template>
            </ClientOnly>
          </BaseCard>
        </aside>

        <div class="space-y-6">
          <BaseCard variant="elevated" padding="lg">
            <div
              class="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
            >
              <div class="space-y-3">
                <BaseBadge variant="outline" size="md">
                  {{ eyebrow }}
                </BaseBadge>
                <div class="space-y-2">
                  <h1
                    class="text-3xl font-semibold tracking-tight text-neutral-950 md:text-4xl"
                  >
                    {{ title }}
                  </h1>
                  <p class="max-w-3xl text-sm leading-7 text-neutral-600 md:text-base">
                    {{ description }}
                  </p>
                </div>
              </div>

              <div class="flex flex-col gap-3 sm:items-end">
                <div class="flex flex-wrap gap-2">
                  <slot name="actions" />
                </div>

                <ClientOnly>
                  <div
                    class="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-600"
                  >
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
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V8.25a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 8.25v10.5A2.25 2.25 0 0 1 18.75 21H5.25A2.25 2.25 0 0 1 3 18.75ZM3 9.75h18"
                      />
                    </svg>
                    <span>{{ todayLabel }}</span>
                  </div>

                  <template #fallback>
                    <div
                      class="inline-flex min-h-11 items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-600"
                    >
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
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V8.25a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 8.25v10.5A2.25 2.25 0 0 1 18.75 21H5.25A2.25 2.25 0 0 1 3 18.75ZM3 9.75h18"
                        />
                      </svg>
                      <BaseSkeleton width="10rem" height="0.875rem" />
                    </div>
                  </template>
                </ClientOnly>
              </div>
            </div>
          </BaseCard>

          <slot />
        </div>
      </div>
    </AppContainer>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import AppContainer from "~/components/ui/AppContainer.vue";
import BaseBadge from "~/components/ui/BaseBadge.vue";
import BaseButton from "~/components/ui/BaseButton.vue";
import BaseCard from "~/components/ui/BaseCard.vue";
import BaseSkeleton from "~/components/ui/BaseSkeleton.vue";
import { useUserStore } from "~/stores/auth";

const props = defineProps({
  eyebrow: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
});

const route = useRoute();
const localePath = useLocalePath();
const { t, locale } = useI18n();
const userStore = useUserStore();

const navItems = computed(() => [
  {
    key: "dashboard",
    label: t("admin.nav.dashboard"),
    description: t("admin.nav.dashboardDesc"),
    to: localePath("/admin"),
    icon: "dashboard",
  },
  {
    key: "products",
    label: t("admin.nav.products"),
    description: t("admin.nav.productsDesc"),
    to: localePath("/admin/products"),
    icon: "products",
  },
  {
    key: "storefront",
    label: t("admin.nav.storefront"),
    description: t("admin.nav.storefrontDesc"),
    to: localePath("/products"),
    icon: "storefront",
  },
]);

const todayLabel = computed(() =>
  new Intl.DateTimeFormat(locale.value === "ar" ? "ar-EG" : "en-GB", {
    dateStyle: "full",
  }).format(new Date()),
);

const accountName = computed(
  () => userStore.user?.name || t("admin.shell.accountFallback"),
);

const accountEmail = computed(
  () => userStore.user?.email || t("admin.shell.role"),
);

const userInitials = computed(() => {
  const name = accountName.value.trim();

  if (!name) return "FS";

  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((segment) => segment[0]?.toUpperCase())
    .join("");
});

const isActive = (target) =>
  route.path === target || route.path.startsWith(`${target}/`);
</script>

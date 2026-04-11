<template>
  <footer class="mt-20 border-t border-white/60 bg-white/55 backdrop-blur-xl">
    <AppContainer class="py-12 md:py-14">
      <BaseCard variant="muted" padding="none" class="relative overflow-hidden">
        <div
          class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(90,127,186,0.1),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(245,121,26,0.1),transparent_24%)]"
        ></div>

        <div class="relative p-8 md:p-10">
          <div class="grid gap-10 xl:grid-cols-[1.2fr,0.82fr,0.82fr,1fr]">
            <div class="space-y-6">
              <NuxtLink :to="homeLink" class="flex items-center gap-4">
                <div
                  class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/70 bg-white shadow-soft"
                >
                  <img
                    src="/images/tt.png"
                    :alt="t('footer.logoAlt')"
                    class="h-11 w-11 object-contain"
                  />
                </div>

                <div class="min-w-0">
                  <p
                    class="truncate text-lg font-semibold tracking-tight text-neutral-950"
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

              <p
                class="max-w-md text-sm leading-7 text-neutral-600 md:text-base"
              >
                {{ t("hero.desc") }}
              </p>

              <div class="flex flex-wrap gap-2">
                <BaseBadge variant="primary" size="sm">
                  {{ t("why.q1.title") }}
                </BaseBadge>
                <BaseBadge variant="outline" size="sm">
                  {{ t("why.q2.title") }}
                </BaseBadge>
              </div>
            </div>

            <div class="space-y-4">
              <h3
                class="text-sm font-semibold uppercase tracking-[0.22em] text-neutral-500"
              >
                {{ labels.shop }}
              </h3>

              <nav class="grid gap-2">
                <NuxtLink
                  :to="productsLink"
                  class="ui-shell-link !justify-start !px-0 !py-1"
                >
                  {{ t("navbar.links.products") }}
                </NuxtLink>
                <NuxtLink
                  :to="localePath('/about')"
                  class="ui-shell-link !justify-start !px-0 !py-1"
                >
                  {{ t("navbar.links.about") }}
                </NuxtLink>
                <NuxtLink
                  v-if="!isAdmin"
                  :to="localePath('/cart')"
                  class="ui-shell-link !justify-start !px-0 !py-1"
                >
                  {{ t("navbar.links.cart") }}
                </NuxtLink>
                <a
                  href="mailto:hello@fotastore.com"
                  class="ui-shell-link !justify-start !px-0 !py-1"
                >
                  {{ labels.contact }}
                </a>
              </nav>
            </div>

            <div class="space-y-4">
              <h3
                class="text-sm font-semibold uppercase tracking-[0.22em] text-neutral-500"
              >
                {{ labels.company }}
              </h3>

              <div class="grid gap-2">
                <NuxtLink
                  v-if="isLoggedIn"
                  :to="localePath('/profile')"
                  class="ui-shell-link !justify-start !px-0 !py-1"
                >
                  {{ t("navbar.links.profile") }}
                </NuxtLink>
                <NuxtLink
                  v-else
                  :to="localePath('/auth/login')"
                  class="ui-shell-link !justify-start !px-0 !py-1"
                >
                  {{ t("navbar.links.login") }}
                </NuxtLink>
                <NuxtLink
                  v-if="!isLoggedIn"
                  :to="localePath('/auth/register')"
                  class="ui-shell-link !justify-start !px-0 !py-1"
                >
                  {{ t("navbar.links.register") }}
                </NuxtLink>
                <button
                  type="button"
                  class="ui-shell-link !justify-start !px-0 !py-1"
                >
                  {{ labels.privacy }}
                </button>
                <button
                  type="button"
                  class="ui-shell-link !justify-start !px-0 !py-1"
                >
                  {{ labels.terms }}
                </button>
                <button
                  v-if="isLoggedIn"
                  type="button"
                  class="ui-shell-link !justify-start !px-0 !py-1 text-danger-500 hover:text-danger-600"
                  @click="authStore.logout()"
                >
                  {{ t("navbar.links.logout") }}
                </button>
              </div>
            </div>

            <div class="space-y-4">
              <h3
                class="text-sm font-semibold uppercase tracking-[0.22em] text-neutral-500"
              >
                {{ labels.contactHeading }}
              </h3>

              <div class="grid gap-2 text-sm text-neutral-600">
                <a
                  href="mailto:fotastore@gmail.comm"
                  class="ui-shell-link !justify-start !px-0 !py-1"
                >
                  fotastore@gmail.com
                </a>
                <a
                  href="tel:+201000000000"
                  class="ui-shell-link !justify-start !px-0 !py-1"
                >
                  +20 100 000 0000
                </a>
              </div>

              <div class="flex flex-wrap gap-2 pt-2">
                <BaseButton
                  v-for="social in socials"
                  :key="social.label"
                  variant="outline"
                  size="sm"
                  class="!min-h-10 !w-10 !px-0"
                  :aria-label="social.label"
                >
                  <template #leading>
                    <svg
                      v-if="social.icon === 'instagram'"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.8"
                      class="h-4 w-4"
                    >
                      <rect
                        x="3.75"
                        y="3.75"
                        width="16.5"
                        height="16.5"
                        rx="4.5"
                      />
                      <circle cx="12" cy="12" r="3.5" />
                      <circle
                        cx="17.2"
                        cy="6.8"
                        r="0.75"
                        fill="currentColor"
                        stroke="none"
                      />
                    </svg>

                    <svg
                      v-else-if="social.icon === 'facebook'"
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
                        d="M14.25 8.25h2.25V4.5h-2.25a4.5 4.5 0 0 0-4.5 4.5v2.25H7.5V15h2.25v4.5H13.5V15h2.625l.375-3.75H13.5V9a.75.75 0 0 1 .75-.75Z"
                      />
                    </svg>

                    <svg
                      v-else
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
                        d="M17.25 6.75 6.75 17.25M6.75 6.75h10.5v10.5"
                      />
                    </svg>
                  </template>
                </BaseButton>
              </div>
            </div>
          </div>

          <div class="ui-divider my-8"></div>

          <div
            class="flex flex-col gap-3 text-sm text-neutral-500 lg:flex-row lg:items-center lg:justify-between"
          >
            <p>&copy; {{ year }} {{ t("navbar.brand.title") }}</p>
            <p>{{ labels.footerNote }}</p>
          </div>
        </div>
      </BaseCard>
    </AppContainer>
  </footer>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import AppContainer from "~/components/ui/AppContainer.vue";
import BaseBadge from "~/components/ui/BaseBadge.vue";
import BaseButton from "~/components/ui/BaseButton.vue";
import BaseCard from "~/components/ui/BaseCard.vue";
import { useUserStore } from "~/stores/auth";

const authStore = useUserStore();
const localePath = useLocalePath();
const { t } = useI18n();
const hydrated = ref(false);

const year = new Date().getFullYear();
const isLoggedIn = computed(() => hydrated.value && authStore.isLoggedIn);
const isAdmin = computed(
  () => hydrated.value && authStore.user?.role === "admin",
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

const labels = computed(() => ({
  shop: t("footer.shop"),
  company: t("footer.company"),
  contact: t("footer.contact"),
  contactHeading: t("footer.contactHeading"),
  privacy: t("footer.privacy"),
  terms: t("footer.terms"),
  footerNote: t("footer.footerNote"),
}));

const socials = computed(() => [
  { label: t("footer.social.instagram"), icon: "instagram" },
  { label: t("footer.social.facebook"), icon: "facebook" },
  { label: t("footer.social.x"), icon: "x" },
]);

onMounted(() => {
  hydrated.value = true;
});
</script>

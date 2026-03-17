<template>
  <nav
    class="sticky top-0 z-50 border-b border-white/10 bg-gray-600/90 backdrop-blur-xl text-white shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
  >
    <div class="container mx-auto px-4 py-3">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <ClientOnly>
          <NuxtLink
            v-if="authStore.user?.role === 'user' || !authStore.isLoggedIn"
            to="/"
            class="flex items-center gap-3 group"
          >
            <div
              class="h-12 w-12 rounded-2xl bg-white/10 border border-white/10 p-0 shadow-sm group-hover:bg-white/15 transition"
            >
              <img
                src="/images/tt.png"
                alt="Fota Store Logo"
                class="max-w-full max-h-full object-contain rounded-xl"
              />
            </div>

            <div class="hidden sm:block">
              <p class="text-xl font-bold tracking-wide leading-none">
                Fota Store
              </p>
              <p class="text-xs text-gray-200 mt-1 tracking-[0.2em] uppercase">
                Premium Cotton
              </p>
            </div>
          </NuxtLink>

          <NuxtLink
            v-if="authStore.user?.role === 'admin'"
            to="/admin"
            class="flex items-center gap-3 group"
          >
            <div
              class="h-12 w-12 rounded-2xl bg-white/10 border border-white/10 p-0 shadow-sm group-hover:bg-white/15 transition"
            >
              <img
                src="/images/tt.png"
                alt="Fota Store Logo"
                class="max-w-full max-h-full object-contain rounded-xl"
              />
            </div>

            <div class="hidden sm:block">
              <p class="text-xl font-bold tracking-wide leading-none">
                Admin Dashboard
              </p>
              <p class="text-xs text-gray-200 mt-1 tracking-[0.2em] uppercase">
                Fota Store Panel
              </p>
            </div>
          </NuxtLink>
        </ClientOnly>

        <!-- Desktop Links -->
        <div class="hidden md:flex items-center gap-2">
          <ClientOnly>
            <NuxtLink
              v-if="authStore.user?.role !== 'admin'"
              to="/products"
              class="nav-link"
            >
              Products
            </NuxtLink>

            <NuxtLink
              v-if="authStore.user?.role === 'admin'"
              to="/admin/products"
              class="nav-link"
            >
              Products
            </NuxtLink>
          </ClientOnly>

          <NuxtLink to="/about" class="nav-link"> About </NuxtLink>

          <ClientOnly>
            <NuxtLink
              v-if="authStore.user?.role !== 'admin'"
              to="/cart"
              class="nav-link relative"
            >
              Cart
              <span
                class="ml-2 inline-flex min-w-[24px] h-6 px-2 items-center justify-center text-white-800 text-xs font-bold"
              >
                {{ `( ${cartStore.totalItems} )` }}
              </span>
            </NuxtLink>
          </ClientOnly>

          <ClientOnly>
            <template v-if="authStore.isLoggedIn">
              <NuxtLink to="/profile" class="nav-link"> Profile </NuxtLink>

              <button class="logout-btn" @click="authStore.logout()">
                Logout
              </button>
            </template>

            <template v-else>
              <NuxtLink to="/auth/login" class="nav-link"> Login </NuxtLink>

              <NuxtLink to="/auth/register" class="primary-btn">
                Register
              </NuxtLink>
            </template>
          </ClientOnly>
        </div>

        <!-- Mobile Button -->
        <button
          @click="isMenuOpen = !isMenuOpen"
          class="md:hidden h-11 w-11 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/15 transition"
        >
          <div class="flex flex-col gap-1.5">
            <span class="w-5 h-0.5 bg-white rounded"></span>
            <span class="w-5 h-0.5 bg-white rounded"></span>
            <span class="w-5 h-0.5 bg-white rounded"></span>
          </div>
        </button>
      </div>
    </div>

    <!-- Mobile Overlay -->
    <transition name="fade">
      <div
        v-if="isMenuOpen"
        class="fixed inset-0 z-40 bg-black/40 md:hidden"
        @click="isMenuOpen = false"
      ></div>
    </transition>

    <!-- Mobile Menu -->
    <transition name="slide-down">
      <div
        v-if="isMenuOpen"
        class="absolute top-full left-0 w-full bg-gray-600/95 backdrop-blur-xl text-white shadow-2xl rounded-b-3xl md:hidden z-50 border-t border-white/10"
      >
        <div class="px-5 py-5 flex flex-col gap-3">
          <ClientOnly>
            <NuxtLink
              v-if="authStore.user?.role !== 'admin'"
              to="/products"
              class="mobile-link"
              @click="isMenuOpen = false"
            >
              Products
            </NuxtLink>

            <NuxtLink
              v-if="authStore.user?.role === 'admin'"
              to="/admin/products"
              class="mobile-link"
              @click="isMenuOpen = false"
            >
              Products
            </NuxtLink>
          </ClientOnly>

          <NuxtLink to="/about" class="mobile-link" @click="isMenuOpen = false">
            About
          </NuxtLink>

          <ClientOnly>
            <NuxtLink
              v-if="authStore.user?.role !== 'admin'"
              to="/cart"
              class="mobile-link"
              @click="isMenuOpen = false"
            >
              Cart ({{ cartStore.totalItems }})
            </NuxtLink>
          </ClientOnly>

          <ClientOnly>
            <template v-if="authStore.isLoggedIn">
              <NuxtLink
                to="/profile"
                class="mobile-link"
                @click="isMenuOpen = false"
              >
                Profile
              </NuxtLink>

              <button
                class="mobile-logout"
                @click="
                  authStore.logout();
                  isMenuOpen = false;
                "
              >
                Logout
              </button>
            </template>

            <template v-else>
              <NuxtLink
                to="/auth/login"
                class="mobile-link"
                @click="isMenuOpen = false"
              >
                Login
              </NuxtLink>

              <NuxtLink
                to="/auth/register"
                class="mobile-primary"
                @click="isMenuOpen = false"
              >
                Register
              </NuxtLink>
            </template>
          </ClientOnly>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { useCartStore } from "~/stores/cart";
import { useUserStore } from "~/stores/auth";

const authStore = useUserStore();
const cartStore = useCartStore();
const isMenuOpen = ref(false);
</script>

<style scoped>
.nav-link {
  @apply px-4 py-2.5 rounded-xl text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300;
}

.primary-btn {
  @apply px-5 py-2.5 rounded-xl text-sm font-semibold bg-white text-gray-800 hover:bg-gray-100 transition-all duration-300 shadow-sm;
}

.logout-btn {
  @apply px-4 py-2.5 rounded-xl text-sm font-medium text-red-100 hover:text-white hover:bg-red-500/20 transition-all duration-300;
}

.mobile-link {
  @apply px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white/90 hover:bg-white/10 hover:text-white transition-all duration-300;
}

.mobile-primary {
  @apply px-4 py-3 rounded-2xl bg-white text-gray-800 font-semibold text-center hover:bg-gray-100 transition-all duration-300;
}

.mobile-logout {
  @apply px-4 py-3 rounded-2xl bg-red-500/15 border border-red-300/10 text-red-100 text-left hover:bg-red-500/25 hover:text-white transition-all duration-300;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.28s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>

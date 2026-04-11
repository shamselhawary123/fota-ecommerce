<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Header -->
      <div
        class="rounded-3xl bg-gradient-to-r from-black via-gray-900 to-gray-700 text-white p-8 shadow-lg mb-8"
      >
        <h1 class="text-3xl md:text-4xl font-bold mb-3">
          {{ $t("checkout.title") }}
        </h1>
        <p class="text-gray-300">
          {{ $t("checkout.subtitle") }}
        </p>
      </div>

      <ClientOnly>
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Checkout Form -->
          <div
            class="lg:col-span-2 bg-white rounded-3xl shadow border border-gray-100 p-6 md:p-8"
          >
            <h2 class="text-2xl font-bold mb-6 text-gray-800">
              {{ $t("checkout.shipping") }}
            </h2>

            <div class="grid sm:grid-cols-2 gap-4">
              <input
                v-model="checkoutForm.customerName"
                type="text"
                :placeholder="$t('checkout.fullName')"
                class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              />

              <input
                v-model="checkoutForm.phone"
                type="text"
                :placeholder="$t('checkout.phone')"
                class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              />

              <input
                v-model="checkoutForm.city"
                type="text"
                :placeholder="$t('checkout.city')"
                class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black sm:col-span-2"
              />

              <textarea
                v-model="checkoutForm.address"
                :placeholder="$t('checkout.address')"
                rows="3"
                class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black sm:col-span-2"
              ></textarea>

              <textarea
                v-model="checkoutForm.notes"
                :placeholder="$t('checkout.notes')"
                rows="3"
                class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black sm:col-span-2"
              ></textarea>
            </div>

            <h2 class="text-2xl font-bold mt-10 mb-6 text-gray-800">
              {{ $t("checkout.payment") }}
            </h2>

            <div class="space-y-4">
              <label
                class="flex items-center justify-between border border-gray-300 rounded-2xl px-4 py-4 cursor-pointer hover:border-black transition"
              >
                <div>
                  <p class="font-semibold text-gray-800">
                    {{ $t("checkout.cod") }}
                  </p>
                  <p class="text-sm text-gray-500">
                    {{ $t("checkout.codDesc") }}
                  </p>
                </div>

                <input
                  v-model="checkoutForm.paymentMethod"
                  type="radio"
                  value="cod"
                  class="w-4 h-4"
                />
              </label>

              <label
                class="flex items-center justify-between border border-gray-300 rounded-2xl px-4 py-4 cursor-pointer opacity-60"
              >
                <div>
                  <p class="font-semibold text-gray-800">
                    {{ $t("checkout.card") }}
                  </p>
                  <p class="text-sm text-gray-500">
                    {{ $t("checkout.comingSoon") }}
                  </p>
                </div>

                <input disabled type="radio" class="w-4 h-4" />
              </label>
            </div>

            <p v-if="formError" class="text-red-500 text-sm mt-5">
              {{ formError }}
            </p>
          </div>

          <!-- Summary -->
          <div
            class="bg-white rounded-3xl shadow border border-gray-100 p-6 h-fit sticky top-24"
          >
            <h2 class="text-2xl font-bold text-gray-800 mb-6">
              {{ $t("checkout.summary") }}
            </h2>

            <div
              v-for="item in cartStore.currentUserCart"
              :key="item.id"
              class="flex items-center justify-between gap-4 py-4 border-b"
            >
              <div class="flex items-center gap-3 min-w-0">
                <img
                  :src="item.image || '/images/products/towel-1.jpg'"
                  :alt="t('checkout.productImageAlt')"
                  class="w-14 h-14 rounded-xl object-cover"
                />

                <div class="min-w-0">
                  <p class="font-medium text-gray-800 truncate">
                    {{ item.title }}
                  </p>

                  <template
                    v-if="item.originalPrice && item.originalPrice > item.price"
                  >
                    <div class="flex items-center gap-2 flex-wrap text-sm">
                      <span class="text-gray-800 font-medium">
                        {{ item.quantity }} × {{ item.price }}
                        {{ t("cart.currency") }}
                      </span>
                      <span class="text-gray-400 line-through">
                        {{ item.originalPrice }} {{ t("cart.currency") }}
                      </span>
                      <span
                        class="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-medium"
                      >
                        {{
                          getDiscountPercent(item.originalPrice, item.price)
                        }}% {{ t("productCard.discount.off") }}
                      </span>
                    </div>
                  </template>

                  <p v-else class="text-sm text-gray-500">
                    {{ item.quantity }} × {{ item.price }}
                    {{ t("cart.currency") }}
                  </p>
                </div>
              </div>
            </div>

            <div class="space-y-4 text-gray-600 mt-6">
              <div class="flex justify-between">
                <span>{{ $t("checkout.items") }}</span>
                <span class="font-semibold text-gray-800">
                  {{ cartStore.totalItems }}
                </span>
              </div>

              <div class="flex justify-between">
                <span>{{ $t("checkout.subtotal") }}</span>
                <span class="font-semibold text-gray-800">
                  {{ cartStore.totalPrice }} {{ t("cart.currency") }}
                </span>
              </div>

              <div class="flex justify-between">
                <span>{{ $t("checkout.shippingCost") }}</span>
                <span class="font-semibold text-green-600">{{
                  $t("checkout.free")
                }}</span>
              </div>
            </div>

            <div class="border-t my-6"></div>

            <div
              class="flex justify-between text-lg font-bold text-gray-900 mb-6"
            >
              <span>{{ $t("checkout.total") }}</span>
              <span>{{ cartStore.totalPrice }} {{ t("cart.currency") }}</span>
            </div>

            <div
              v-if="isSuccess"
              class="mb-4 p-4 bg-green-100 text-green-700 rounded-xl text-sm font-medium"
            >
              {{ $t("checkout.success") }}
            </div>

            <button
              @click="handleConfirm"
              :disabled="isLoading"
              class="w-full bg-black text-white py-4 rounded-2xl transition duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800"
            >
              <span v-if="isLoading">{{ $t("checkout.processing") }}</span>
              <span v-else>{{ $t("checkout.confirm") }}</span>
            </button>
          </div>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});

import { useCartStore } from "~/stores/cart";
import { useOrdersStore } from "~/stores/orders";
import { useProductsStore } from "~/stores/products";
import { useUserStore } from "~/stores/auth";
import { ref, onMounted } from "vue";

const localePath = useLocalePath();
const cartStore = useCartStore();
const ordersStore = useOrdersStore();
const productsStore = useProductsStore();
const userStore = useUserStore();

const isLoading = ref(false);
const isSuccess = ref(false);
const formError = ref("");
const { t } = useI18n();

const checkoutForm = ref({
  customerName: userStore.user?.name || "",
  phone: userStore.user?.phone || "",
  address: userStore.user?.address || "",
  city: userStore.user?.city || "",
  notes: "",
  paymentMethod: "cod",
});

onMounted(async () => {
  if (cartStore.currentUserCart.length === 0) {
    navigateTo(localePath("/cart"));
    return;
  }

  if (!productsStore.products.length) {
    await productsStore.fetchProducts();
  }

  cartStore.refreshCartPrices(productsStore.products);
});

const validateForm = () => {
  if (!checkoutForm.value.customerName.trim()) {
    formError.value = t("checkout.validation.fullName");
    return false;
  }

  if (!checkoutForm.value.phone.trim()) {
    formError.value = t("checkout.validation.phone");
    return false;
  }

  if (!checkoutForm.value.address.trim()) {
    formError.value = t("checkout.validation.address");
    return false;
  }

  if (!checkoutForm.value.city.trim()) {
    formError.value = t("checkout.validation.city");
    return false;
  }

  formError.value = "";
  return true;
};

const getDiscountPercent = (originalPrice, finalPrice) => {
  if (!originalPrice || originalPrice <= finalPrice) return 0;
  return Math.round(((originalPrice - finalPrice) / originalPrice) * 100);
};

const handleConfirm = async () => {
  if (isLoading.value) return;

  if (!validateForm()) return;

  isLoading.value = true;

  const userId = userStore.user?.id;

  if (!userId) {
    isLoading.value = false;
    return;
  }

  await ordersStore.addOrder(
    userId,
    cartStore.currentUserCart,
    cartStore.totalPrice,
    checkoutForm.value,
  );

  await productsStore.decreaseStockAfterOrder(cartStore.currentUserCart);
  await ordersStore.fetchOrders();
  await productsStore.fetchProducts();

  cartStore.clearCart();

  isSuccess.value = true;

  setTimeout(() => {
    navigateTo(localePath("/orders"));
  }, 1500);
};
</script>

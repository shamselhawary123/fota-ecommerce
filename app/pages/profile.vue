<template>
  <div class="min-h-screen bg-gray-100 py-10">
    <div class="max-w-6xl mx-auto px-4">
      <h1 class="text-3xl font-bold mb-8 text-gray-800">
        {{ $t("profile.title") }}
      </h1>

      <ClientOnly>
        <!-- Profile Header -->
        <div
          class="relative overflow-hidden rounded-3xl shadow-lg mb-8 bg-gradient-to-r from-white via-gray-50 to-gray-100 border border-gray-200"
        >
          <!-- Decorative blur -->
          <div
            class="absolute -top-10 -right-10 w-40 h-40 bg-black/5 rounded-full blur-3xl"
          ></div>
          <div
            class="absolute -bottom-10 -left-10 w-40 h-40 bg-gray-300/20 rounded-full blur-3xl"
          ></div>

          <div
            class="relative p-6 md:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
          >
            <div
              class="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-start"
            >
              <div class="flex flex-col items-center">
                <img
                  :src="
                    isEditing
                      ? avatarPreview || 'https://i.pravatar.cc/150?img=12'
                      : userStore.user?.avatar ||
                        'https://i.pravatar.cc/150?img=12'
                  "
                  :alt="$t('avatar.profile')"
                  class="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
                />

                <div v-if="isEditing" class="mt-4 w-full max-w-[220px]">
                  <label class="block text-sm font-medium text-gray-600 mb-2">
                    {{ $t("profile.changeAvatar") }}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    @change="handleAvatarChange"
                    :placeholder="$t('avatar.upload')"
                    class="block w-full text-sm text-gray-600 file:me-0 sm:file:me-4 file:mb-2 sm:file:mb-0 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-black file:text-white hover:file:opacity-90"
                  />
                </div>
              </div>

              <div class="flex-1">
                <h2
                  class="text-2xl md:text-3xl font-bold text-gray-900 break-words"
                >
                  {{ userStore.user?.name }}
                </h2>

                <p class="text-gray-500 break-all mt-1 text-base">
                  {{ userStore.user?.email }}
                </p>

                <div
                  class="flex flex-wrap justify-center sm:justify-start gap-2 mt-4"
                >
                  <span
                    class="px-4 py-1.5 rounded-full text-sm font-medium bg-black text-white shadow"
                  >
                    {{ roleLabel(userStore.user?.role) }}
                  </span>

                  <span
                    class="px-4 py-1.5 rounded-full text-sm font-medium bg-white text-gray-700 border border-gray-200 shadow-sm"
                  >
                    {{ $t("profile.joined") }}:

                    {{
                      userStore.user?.joinDate
                        ? formatShortDate(userStore.user.joinDate)
                        : $t("profile.fallback.na")
                    }}
                  </span>
                </div>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row w-full lg:w-auto gap-3">
              <button
                v-if="!isEditing"
                @click="isEditing = true"
                class="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition w-full sm:w-auto shadow"
              >
                {{ $t("profile.edit") }}
              </button>

              <button
                @click="logout"
                class="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition w-full sm:w-auto shadow"
              >
                {{ $t("profile.logout") }}
              </button>
            </div>
          </div>
        </div>
        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div class="bg-white rounded-2xl shadow p-5">
            <p class="text-sm text-gray-500">{{ $t("profile.totalOrders") }}</p>
            <h3 class="text-2xl font-bold mt-2">{{ totalOrders }}</h3>
          </div>

          <div class="bg-white rounded-2xl shadow p-5">
            <p class="text-sm text-gray-500">{{ $t("profile.totalSpent") }}</p>
            <h3 class="text-2xl font-bold mt-2">
              {{ totalSpent }} {{ $t("cart.currency") }}
            </h3>
          </div>

          <div class="bg-white rounded-2xl shadow p-5">
            <p class="text-sm text-gray-500">
              {{ $t("profile.pending") }}
            </p>
            <h3 class="text-2xl font-bold mt-2 text-yellow-500">
              {{ pendingCount }}
            </h3>
          </div>

          <div class="bg-white rounded-2xl shadow p-5">
            <p class="text-sm text-gray-500">{{ $t("profile.delivered") }}</p>
            <h3 class="text-2xl font-bold mt-2 text-green-600">
              {{ deliveredCount }}
            </h3>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left Side -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Personal / Edit Info -->
            <div class="bg-white rounded-2xl shadow p-6">
              <h2 class="text-xl font-semibold mb-6 text-gray-800">
                {{ $t("profile.accountInfo") }}
              </h2>

              <!-- View Mode -->
              <div v-if="!isEditing" class="grid md:grid-cols-2 gap-5">
                <div>
                  <p class="text-sm text-gray-500">{{ $t("profile.name") }}</p>
                  <p class="font-medium text-gray-800">
                    {{ userStore.user?.name || $t("profile.fallback.na") }}
                  </p>
                </div>

                <div>
                  <p class="text-sm text-gray-500">
                    {{ $t("profile.email") }}
                  </p>
                  <p class="font-medium text-gray-800">
                    {{ userStore.user?.email || $t("profile.fallback.na") }}
                  </p>
                </div>

                <div>
                  <p class="text-sm text-gray-500">
                    {{ $t("profile.phone") }}
                  </p>
                  <p class="font-medium text-gray-800">
                    {{ userStore.user?.phone || $t("profile.fallback.na") }}
                  </p>
                </div>

                <div>
                  <p class="text-sm text-gray-500">
                    {{ $t("profile.gender") }}
                  </p>
                  <p class="font-medium text-gray-800">
                    {{ genderLabel(userStore.user?.gender) }}
                  </p>
                </div>

                <div class="md:col-span-2">
                  <p class="text-sm text-gray-500">{{ $t("profile.bio") }}</p>
                  <p class="font-medium text-gray-800">
                    {{ userStore.user?.bio || $t("profile.fallback.noBio") }}
                  </p>
                </div>
              </div>

              <!-- Edit Mode -->
              <div v-else class="space-y-4">
                <div class="grid md:grid-cols-2 gap-4">
                  <input
                    v-model="editedName"
                    type="text"
                    :placeholder="$t('register.name')"
                    class="w-full border rounded-xl px-4 py-3"
                  />

                  <input
                    v-model="editedEmail"
                    type="email"
                    :placeholder="$t('register.email')"
                    class="w-full border rounded-xl px-4 py-3"
                  />

                  <input
                    v-model="editedPhone"
                    type="text"
                    :placeholder="$t('register.phone')"
                    class="w-full border rounded-xl px-4 py-3"
                  />

                  <select
                    v-model="editedGender"
                    class="w-full border rounded-xl px-4 py-3"
                  >
                    <option value="">{{ $t("profile.form.selectGender") }}</option>
                    <option value="male">{{ $t("register.male") }}</option>
                    <option value="female">{{ $t("register.female") }}</option>
                  </select>
                </div>

                <textarea
                  v-model="editedBio"
                  rows="4"
                  :placeholder="$t('profile.bio')"
                  class="w-full border rounded-xl px-4 py-3"
                ></textarea>

                <div class="flex gap-4">
                  <button
                    @click="saveChanges"
                    class="bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700 transition"
                  >
                    {{ $t("profile.save") }}
                  </button>

                  <button
                    @click="cancelEdit"
                    class="bg-gray-400 text-white px-5 py-2 rounded-xl hover:bg-gray-500 transition"
                  >
                    {{ $t("profile.cancel") }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Recent Orders -->
            <div class="bg-white rounded-2xl shadow p-6">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-xl font-semibold">
                  {{ $t("profile.recentOrders") }}
                </h2>

                <NuxtLink
                  :to="localePath('/orders')"
                  class="text-sm text-black font-medium hover:underline"
                >
                  {{ $t("profile.viewOrders") }}
                </NuxtLink>
              </div>

              <div v-if="recentOrders.length > 0" class="space-y-4">
                <div
                  v-for="order in recentOrders"
                  :key="order.id"
                  class="border rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 hover:shadow-sm transition"
                >
                  <div>
                    <p class="font-medium text-gray-800">
                      {{
                        order.items?.map((item) => item.title).join(" & ") ||
                        $t("profile.fallback.noProducts")
                      }}
                    </p>

                    <p class="text-sm text-gray-500 mt-1">
                      {{ $t("profile.orderId") }} {{ order.id }}
                    </p>

                    <p class="text-sm text-gray-400 mt-1">
                      {{ formatDate(order.created_at) }}
                    </p>
                  </div>

                  <div class="text-end">
                    <p class="font-semibold text-lg">
                      {{ order.total }} {{ $t("cart.currency") }}
                    </p>
                    <span
                      class="inline-block mt-2 px-3 py-1 rounded-full text-sm"
                      :class="statusColor(order.status)"
                    >
                      {{ orderStatusLabel(order.status) }}
                    </span>
                    <span
                      class="inline-block mt-2 px-3 py-1 rounded-full text-sm"
                      :class="paymentStatusColor(order.payment_status)"
                    >
                      {{ paymentStatusLabel(order.payment_status) }}
                    </span>
                  </div>
                </div>
              </div>

              <div v-else class="text-gray-500 text-center py-6">
                {{ $t("profile.noOrders") }}
              </div>
            </div>
          </div>

          <!-- Right Side -->
          <div class="space-y-8">
            <!-- Shipping Info -->
            <div class="bg-white rounded-2xl shadow p-6">
              <h2 class="text-xl font-semibold mb-6 text-gray-800">
                {{ $t("profile.shipping") }}
              </h2>

              <div v-if="!isEditing" class="space-y-4">
                <div>
                  <p class="text-sm text-gray-500">
                    {{ $t("profile.address") }}
                  </p>
                  <p class="font-medium text-gray-800">
                    {{ userStore.user?.address || $t("profile.fallback.na") }}
                  </p>
                </div>

                <div>
                  <p class="text-sm text-gray-500">
                    {{ $t("profile.city") }}
                  </p>
                  <p class="font-medium text-gray-800">
                    {{ userStore.user?.city || $t("profile.fallback.na") }}
                  </p>
                </div>

                <div>
                  <p class="text-sm text-gray-500">
                    {{ $t("profile.country") }}
                  </p>
                  <p class="font-medium text-gray-800">
                    {{ userStore.user?.country || $t("profile.fallback.na") }}
                  </p>
                </div>

                <div>
                  <p class="text-sm text-gray-500">
                    {{ $t("profile.postal") }}
                  </p>
                  <p class="font-medium text-gray-800">
                    {{ userStore.user?.postalCode || $t("profile.fallback.na") }}
                  </p>
                </div>
              </div>

              <div v-else class="space-y-4">
                <input
                  v-model="editedAddress"
                  type="text"
                  :placeholder="$t('profile.address')"
                  class="w-full border rounded-xl px-4 py-3"
                />

                <input
                  v-model="editedCity"
                  type="text"
                  :placeholder="$t('profile.city')"
                  class="w-full border rounded-xl px-4 py-3"
                />

                <input
                  v-model="editedCountry"
                  type="text"
                  :placeholder="$t('profile.country')"
                  class="w-full border rounded-xl px-4 py-3"
                />

                <input
                  v-model="editedPostalCode"
                  type="text"
                  :placeholder="$t('profile.postal')"
                  class="w-full border rounded-xl px-4 py-3"
                />
              </div>
            </div>
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

import { ref, computed, onMounted } from "vue";
import { useUserStore } from "~/stores/auth";
import { useOrdersStore } from "~/stores/orders";

const localePath = useLocalePath();
const { t, locale } = useI18n();
const userStore = useUserStore();
const ordersStore = useOrdersStore();

const isEditing = ref(false);

const editedName = ref(userStore.user?.name || "");
const editedEmail = ref(userStore.user?.email || "");
const editedPhone = ref(userStore.user?.phone || "");
const editedGender = ref(userStore.user?.gender || "");
const editedBio = ref(userStore.user?.bio || "");
const editedAddress = ref(userStore.user?.address || "");
const editedCity = ref(userStore.user?.city || "");
const editedCountry = ref(userStore.user?.country || "");
const editedPostalCode = ref(userStore.user?.postalCode || "");

const editedAvatar = ref(userStore.user?.avatar || "");
const avatarPreview = ref(userStore.user?.avatar || "");

const handleAvatarChange = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    editedAvatar.value = reader.result;
    avatarPreview.value = reader.result;
  };

  reader.readAsDataURL(file);
};
const saveChanges = async () => {
  await userStore.updateProfile({
    name: editedName.value,
    email: editedEmail.value,
    phone: editedPhone.value,
    gender: editedGender.value,
    bio: editedBio.value,
    address: editedAddress.value,
    city: editedCity.value,
    country: editedCountry.value,
    postalCode: editedPostalCode.value,
    avatar: editedAvatar.value,
  });

  isEditing.value = false;
};

const cancelEdit = () => {
  editedName.value = userStore.user?.name || "";
  editedEmail.value = userStore.user?.email || "";
  editedPhone.value = userStore.user?.phone || "";
  editedGender.value = userStore.user?.gender || "";
  editedBio.value = userStore.user?.bio || "";
  editedAddress.value = userStore.user?.address || "";
  editedCity.value = userStore.user?.city || "";
  editedCountry.value = userStore.user?.country || "";
  editedPostalCode.value = userStore.user?.postalCode || "";
  editedAvatar.value = userStore.user?.avatar || "";
  avatarPreview.value = userStore.user?.avatar || "";

  isEditing.value = false;
};
const logout = () => {
  userStore.logout();
  navigateTo(localePath("/"));
};

const formatDate = (date) => {
  if (!date) return t("profile.fallback.na");

  return new Intl.DateTimeFormat(locale.value === "ar" ? "ar-EG" : "en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
};

const formatShortDate = (date) => {
  if (!date) return t("profile.fallback.na");

  return new Intl.DateTimeFormat(locale.value === "ar" ? "ar-EG" : "en-GB", {
    dateStyle: "medium",
  }).format(new Date(date));
};

const genderLabel = (gender) => {
  const genders = {
    male: t("register.male"),
    female: t("register.female"),
  };

  return genders[gender] || t("profile.fallback.na");
};

const roleLabel = (role) => {
  const roles = {
    admin: t("profile.roles.admin"),
    user: t("profile.roles.user"),
  };

  return roles[role] || role || t("profile.fallback.na");
};

const orderStatusLabel = (status) => t(`orders.statuses.${status || "pending"}`);

const paymentStatusLabel = (status) =>
  t(`orders.paymentStatuses.${status || "pending"}`);

const recentOrders = computed(() => {
  const userId = userStore.user?.id;
  if (!userId) return [];

  const allOrders = ordersStore.getUserOrders(userId) || [];
  return allOrders.slice(0, 3);
});

const totalOrders = computed(() => {
  const userId = userStore.user?.id;
  if (!userId) return 0;
  return ordersStore.getUserOrders(userId).length;
});

const totalSpent = computed(() => {
  const userId = userStore.user?.id;
  if (!userId) return 0;

  return ordersStore
    .getUserOrders(userId)
    .reduce((sum, order) => sum + order.total, 0);
});

const pendingCount = computed(() => {
  const userId = userStore.user?.id;
  if (!userId) return 0;

  return ordersStore
    .getUserOrders(userId)
    .filter((order) => order.status === "pending").length;
});

const deliveredCount = computed(() => {
  const userId = userStore.user?.id;
  if (!userId) return 0;

  return ordersStore
    .getUserOrders(userId)
    .filter((order) => order.status === "delivered").length;
});

const statusColor = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "confirmed":
      return "bg-blue-100 text-blue-700";
    case "shipped":
      return "bg-purple-100 text-purple-700";
    case "delivered":
      return "bg-green-100 text-green-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const paymentStatusColor = (status) => {
  switch (status) {
    case "paid":
      return "bg-green-100 text-green-700";
    case "unpaid":
      return "bg-red-100 text-red-700";
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "failed":
      return "bg-red-100 text-red-700";
    case "refunded":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};
onMounted(async () => {
  await ordersStore.fetchOrders();
});
</script>

<template>
  <div
    class="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10"
  >
    <div
      class="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden"
    >
      <div class="grid md:grid-cols-2">
        <!-- Left Side -->
        <div class="relative hidden md:block">
          <img
            src="/images/products/towel-8.jpg"
            :alt="$t('register.visualAlt')"
            class="w-full h-full object-cover"
          />

          <div class="absolute inset-0 bg-black/50"></div>

          <div
            class="absolute inset-0 flex flex-col justify-center px-10 text-white"
          >
            <h1 class="text-4xl font-bold leading-tight mb-4">
              {{ $t("register.welcome") }}<br />
            </h1>

            <p class="text-gray-200 leading-7 max-w-md">
              {{ $t("register.desc") }}
            </p>

            <div class="mt-8">
              <p class="text-sm text-gray-300">
                {{ $t("register.haveAccount") }}
              </p>
              <NuxtLink
                :to="localePath('/auth/login')"
                class="inline-block mt-2 font-semibold underline underline-offset-4 hover:text-gray-200 transition"
              >
                {{ $t("register.login") }}
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Right Side -->
        <div class="p-8">
          <h2 class="text-2xl font-bold mb-6 text-gray-800">
            {{ step === "form" ? $t("register.title") : $t("register.verify") }}
          </h2>

          <!-- STEP 1: FORM -->
          <template v-if="step === 'form'">
            <!-- Avatar Upload -->
            <div class="flex items-center gap-4 mb-6">
              <div
                class="w-20 h-20 rounded-full overflow-hidden border bg-gray-100"
              >
                <img
                  :src="avatarPreview || 'https://i.pravatar.cc/150?img=12'"
                  :alt="$t('avatar.profile')"
                  class="w-full h-full object-cover"
                />
              </div>

              <div class="flex-1">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  {{ $t("avatar.profile") }}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  @change="handleAvatarChange"
                  :placeholder="$t('avatar.upload')"
                  class="block w-full text-sm text-gray-600 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-black file:text-white hover:file:opacity-90"
                />
              </div>
            </div>

            <div class="space-y-4">
              <input
                v-model="name"
                type="text"
                :placeholder="$t('register.name')"
                class="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              />

              <input
                v-model="email"
                type="email"
                :placeholder="$t('register.email')"
                class="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              />

              <div class="grid grid-cols-2 gap-4">
                <input
                  v-model="phone"
                  type="text"
                  :placeholder="$t('register.phone')"
                  class="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />

                <select
                  v-model="gender"
                  :placeholder="$t('register.gender')"
                  class="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option disabled value="">{{ $t("register.gender") }}</option>
                  <option value="male">{{ $t("register.male") }}</option>
                  <option value="female">{{ $t("register.female") }}</option>
                </select>
              </div>

              <input
                v-model="address"
                type="text"
                :placeholder="$t('register.address')"
                class="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              />

              <div class="grid grid-cols-3 gap-4">
                <input
                  v-model="city"
                  type="text"
                  :placeholder="$t('register.city')"
                  class="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />

                <input
                  v-model="country"
                  type="text"
                  :placeholder="$t('register.country')"
                  class="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />

                <input
                  v-model="postalCode"
                  type="text"
                  :placeholder="$t('register.postal')"
                  class="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <textarea
                v-model="bio"
                rows="3"
                :placeholder="$t('register.bio')"
                class="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              ></textarea>

              <div class="relative">
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  :placeholder="$t('register.password')"
                  class="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
                >
                  {{ showPassword ? $t("login.hide") : $t("login.show") }}
                </button>
              </div>

              <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
              <p v-if="success" class="text-green-600 text-sm">{{ success }}</p>

              <button
                @click="handleSendOtp"
                :disabled="userStore.loading"
                class="w-full bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                {{
                  userStore.loading
                    ? $t("register.sending")
                    : $t("register.sendOtp")
                }}
              </button>
            </div>
          </template>

          <!-- STEP 2: VERIFY OTP -->
          <template v-else>
            <div class="space-y-4">
              <p class="text-gray-600 leading-7">
                {{ $t("register.sent") }}
                <span class="font-semibold text-black">{{ email }}</span>
              </p>

              <input
                v-model="otp"
                type="text"
                maxlength="8"
                :placeholder="$t('register.otp')"
                class="w-full border border-gray-300 p-3 rounded-xl text-center tracking-[0.4em] text-lg focus:outline-none focus:ring-2 focus:ring-black"
              />

              <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
              <p v-if="success" class="text-green-600 text-sm">{{ success }}</p>

              <button
                @click="handleVerifyOtp"
                :disabled="userStore.loading"
                class="w-full bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                {{
                  userStore.loading
                    ? $t("register.verifying")
                    : $t("register.verifyBtn")
                }}
              </button>

              <button
                @click="handleResendOtp"
                :disabled="userStore.loading"
                class="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition disabled:opacity-50"
              >
                {{ $t("register.resend") }}
              </button>

              <button
                @click="step = 'form'"
                class="w-full text-sm text-gray-500 hover:text-black transition"
              >
                {{ $t("register.registerAgain") }}
              </button>
            </div>
          </template>

          <p class="mt-6 text-center text-gray-600">
            {{ $t("register.haveAccount") }}
            <NuxtLink
              class="font-semibold text-black hover:underline ms-1"
              :to="localePath('/auth/login')"
            >
              {{ $t("register.login") }}
            </NuxtLink>
          </p>
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

const step = ref("form");

const name = ref("");
const email = ref("");
const password = ref("");
const phone = ref("");
const address = ref("");
const city = ref("");
const country = ref("");
const postalCode = ref("");
const gender = ref("");
const avatar = ref("");
const avatarPreview = ref("");
const bio = ref("");
const joinDate = ref(new Date().toISOString());
const otp = ref("");

const showPassword = ref(false);
const error = ref(null);
const success = ref(null);
const { t } = useI18n();

const getErrorMessage = (err) => {
  const message = String(err?.message || "");

  if (message.startsWith("auth.errors.")) {
    return t(message);
  }

  return message;
};

const handleAvatarChange = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    avatar.value = reader.result;
    avatarPreview.value = reader.result;
  };

  reader.readAsDataURL(file);
};

const handleSendOtp = async () => {
  error.value = null;
  success.value = null;

  if (!name.value || !email.value || !password.value) {
    error.value = t("register.validation.required");
    return;
  }

  try {
    await userStore.sendRegisterOtp({
      name: name.value,
      email: email.value,
      password: password.value,
      phone: phone.value,
      address: address.value,
      city: city.value,
      country: country.value,
      postalCode: postalCode.value,
      gender: gender.value,
      avatar: avatar.value,
      bio: bio.value,
      joinDate: joinDate.value,
      role: "user",
    });

    success.value = t("register.messages.otpSent");
    step.value = "verify";
  } catch (err) {
    error.value = getErrorMessage(err);
  }
};

const handleVerifyOtp = async () => {
  error.value = null;
  success.value = null;

  if (!otp.value.trim()) {
    error.value = t("register.validation.otpRequired");
    return;
  }

  try {
    await userStore.verifyRegisterOtp({
      email: email.value,
      token: otp.value,
    });

    success.value = t("register.messages.accountCreated");
    router.push(localePath("/"));
  } catch (err) {
    error.value = getErrorMessage(err);
  }
};

const handleResendOtp = async () => {
  error.value = null;
  success.value = null;

  try {
    await userStore.sendRegisterOtp({
      name: name.value,
      email: email.value,
      password: password.value,
      phone: phone.value,
      address: address.value,
      city: city.value,
      country: country.value,
      postalCode: postalCode.value,
      gender: gender.value,
      avatar: avatar.value,
      bio: bio.value,
      joinDate: joinDate.value,
      role: "user",
    });

    success.value = t("register.messages.otpResent");
  } catch (err) {
    error.value = getErrorMessage(err);
  }
};
</script>

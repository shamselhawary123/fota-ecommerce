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
            alt="Register visual"
            class="w-full h-full object-cover"
          />

          <div class="absolute inset-0 bg-black/50"></div>

          <div
            class="absolute inset-0 flex flex-col justify-center px-10 text-white"
          >
            <h1 class="text-4xl font-bold leading-tight mb-4">
              Welcome to <br />
              Fota Store
            </h1>

            <p class="text-gray-200 leading-7 max-w-md">
              Join Fota Store and verify your email to create your account
              securely.
            </p>

            <div class="mt-8">
              <p class="text-sm text-gray-300">Already have an account?</p>
              <NuxtLink
                to="/auth/login"
                class="inline-block mt-2 font-semibold underline underline-offset-4 hover:text-gray-200 transition"
              >
                Log in here
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Right Side -->
        <div class="p-8">
          <h2 class="text-2xl font-bold mb-6 text-gray-800">
            {{ step === "form" ? "Register" : "Verify Your Email" }}
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
                  alt="Avatar"
                  class="w-full h-full object-cover"
                />
              </div>

              <div class="flex-1">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Profile Avatar
                </label>
                <input
                  type="file"
                  accept="image/*"
                  @change="handleAvatarChange"
                  class="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-black file:text-white hover:file:opacity-90"
                />
              </div>
            </div>

            <div class="space-y-4">
              <input
                v-model="name"
                type="text"
                placeholder="Full Name"
                class="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              />

              <input
                v-model="email"
                type="email"
                placeholder="Email Address"
                class="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              />

              <div class="grid grid-cols-2 gap-4">
                <input
                  v-model="phone"
                  type="text"
                  placeholder="Phone Number"
                  class="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />

                <select
                  v-model="gender"
                  class="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option disabled value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <input
                v-model="address"
                type="text"
                placeholder="Address"
                class="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              />

              <div class="grid grid-cols-3 gap-4">
                <input
                  v-model="city"
                  type="text"
                  placeholder="City"
                  class="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />

                <input
                  v-model="country"
                  type="text"
                  placeholder="Country"
                  class="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />

                <input
                  v-model="postalCode"
                  type="text"
                  placeholder="Postal Code"
                  class="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <textarea
                v-model="bio"
                rows="3"
                placeholder="Short Bio"
                class="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              ></textarea>

              <div class="relative">
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Password"
                  class="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
                >
                  {{ showPassword ? "Hide" : "Show" }}
                </button>
              </div>

              <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
              <p v-if="success" class="text-green-600 text-sm">{{ success }}</p>

              <button
                @click="handleSendOtp"
                :disabled="userStore.loading"
                class="w-full bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                {{ userStore.loading ? "Sending..." : "Send OTP" }}
              </button>
            </div>
          </template>

          <!-- STEP 2: VERIFY OTP -->
          <template v-else>
            <div class="space-y-4">
              <p class="text-gray-600 leading-7">
                We sent a verification code to
                <span class="font-semibold text-black">{{ email }}</span>
              </p>

              <input
                v-model="otp"
                type="text"
                maxlength="8"
                placeholder="Enter OTP code"
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
                  userStore.loading ? "Verifying..." : "Verify & Create Account"
                }}
              </button>

              <button
                @click="handleResendOtp"
                :disabled="userStore.loading"
                class="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition disabled:opacity-50"
              >
                Resend OTP
              </button>

              <button
                @click="step = 'form'"
                class="w-full text-sm text-gray-500 hover:text-black transition"
              >
                Back to registration form
              </button>
            </div>
          </template>

          <p class="mt-6 text-center text-gray-600">
            Already have an account?
            <NuxtLink
              class="font-semibold text-black hover:underline ml-1"
              to="/auth/login"
            >
              Login
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
    error.value = "Name, email and password are required.";
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

    success.value = "OTP sent successfully. Check your email.";
    step.value = "verify";
  } catch (err) {
    error.value = err.message;
  }
};

const handleVerifyOtp = async () => {
  error.value = null;
  success.value = null;

  if (!otp.value.trim()) {
    error.value = "OTP code is required.";
    return;
  }

  try {
    await userStore.verifyRegisterOtp({
      email: email.value,
      token: otp.value,
    });

    success.value = "Account created successfully! Redirecting...";
    router.push("/");
  } catch (err) {
    error.value = err.message;
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

    success.value = "A new OTP has been sent.";
  } catch (err) {
    error.value = err.message;
  }
};
</script>

import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUserStore = defineStore(
  "auth",
  () => {
    const user = ref(null);
    const loading = ref(false);
    const pendingRegisterData = ref(null);

    const { $supabase } = useNuxtApp();

    const createProfile = async (profileData) => {
      const { error } = await $supabase.from("profiles").insert([
        {
          id: profileData.id,
          name: profileData.name,
          email: profileData.email,
          phone: profileData.phone || "",
          avatar: profileData.avatar || "",
          bio: profileData.bio || "",
          address: profileData.address || "",
          city: profileData.city || "",
          country: profileData.country || "",
          postal_code: profileData.postalCode || "",
          gender: profileData.gender || "",
          role: profileData.role || "user",
          join_date: profileData.joinDate || new Date().toISOString(),
        },
      ]);

      if (error) {
        throw new Error(error.message);
      }
    };

    const fetchProfile = async (userId) => {
      const { data, error } = await $supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    };

    const sendRegisterOtp = async (registerData) => {
      loading.value = true;

      try {
        pendingRegisterData.value = registerData;

        const { error } = await $supabase.auth.signInWithOtp({
          email: registerData.email,
          options: {
            shouldCreateUser: true,
          },
        });

        if (error) {
          throw new Error(error.message);
        }
      } finally {
        loading.value = false;
      }
    };

    const verifyRegisterOtp = async ({ email, token }) => {
      loading.value = true;

      try {
        const { data, error } = await $supabase.auth.verifyOtp({
          email,
          token,
          type: "email",
        });

        if (error) {
          throw new Error(error.message);
        }

        const authUser = data.user;

        if (!authUser) {
          throw new Error("OTP verification failed.");
        }

        if (!pendingRegisterData.value) {
          throw new Error("Registration data is missing. Please try again.");
        }

        const registerData = pendingRegisterData.value;

        // set password after OTP verification
        const { error: passwordError } = await $supabase.auth.updateUser({
          password: registerData.password,
        });

        if (passwordError) {
          throw new Error(passwordError.message);
        }

        const profilePayload = {
          id: authUser.id,
          name: registerData.name,
          email: registerData.email,
          phone: registerData.phone,
          address: registerData.address,
          city: registerData.city,
          country: registerData.country,
          postalCode: registerData.postalCode,
          gender: registerData.gender,
          avatar: registerData.avatar,
          bio: registerData.bio,
          joinDate: registerData.joinDate,
          role: registerData.role || "user",
        };

        await createProfile(profilePayload);

        user.value = profilePayload;
        pendingRegisterData.value = null;
      } finally {
        loading.value = false;
      }
    };

    const login = async ({ email, password }) => {
      loading.value = true;

      try {
        const { data, error } = await $supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          throw new Error(error.message);
        }

        const authUser = data.user;

        if (!authUser) {
          throw new Error("Login failed.");
        }

        const profile = await fetchProfile(authUser.id);

        user.value = {
          id: authUser.id,
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
          avatar: profile.avatar,
          bio: profile.bio,
          address: profile.address,
          city: profile.city,
          country: profile.country,
          postalCode: profile.postal_code,
          gender: profile.gender,
          role: profile.role,
          joinDate: profile.join_date,
        };
      } finally {
        loading.value = false;
      }
    };

    const loadUser = async () => {
      try {
        const {
          data: { user: authUser },
          error,
        } = await $supabase.auth.getUser();

        if (error || !authUser) {
          user.value = null;
          return;
        }

        const profile = await fetchProfile(authUser.id);

        user.value = {
          id: authUser.id,
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
          avatar: profile.avatar,
          bio: profile.bio,
          address: profile.address,
          city: profile.city,
          country: profile.country,
          postalCode: profile.postal_code,
          gender: profile.gender,
          role: profile.role,
          joinDate: profile.join_date,
        };
      } catch {
        user.value = null;
      }
    };

    const updateProfile = async (updatedData) => {
      if (!user.value) return;

      const nextUser = {
        ...user.value,
        ...updatedData,
      };

      const { error } = await $supabase
        .from("profiles")
        .update({
          name: nextUser.name,
          email: nextUser.email,
          phone: nextUser.phone,
          avatar: nextUser.avatar,
          bio: nextUser.bio,
          address: nextUser.address,
          city: nextUser.city,
          country: nextUser.country,
          postal_code: nextUser.postalCode,
          gender: nextUser.gender,
        })
        .eq("id", nextUser.id);

      if (error) {
        throw new Error(error.message);
      }

      user.value = nextUser;
    };
    const localePath = useLocalePath();
    const logout = async () => {
      await $supabase.auth.signOut();
      user.value = null;
      navigateTo(localePath("/auth/login"));
    };

    const isLoggedIn = computed(() => !!user.value);
    const isAdmin = computed(() => user.value?.role === "admin");

    return {
      user,
      loading,
      pendingRegisterData,
      sendRegisterOtp,
      verifyRegisterOtp,
      login,
      logout,
      loadUser,
      updateProfile,
      fetchProfile,
      isLoggedIn,
      isAdmin,
    };
  },
  {
    persist: true,
  },
);

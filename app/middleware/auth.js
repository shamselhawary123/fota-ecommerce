export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server) return;

  const userStore = useUserStore();

  if (!userStore.user) {
    await userStore.loadUser();
  }
  const localePath = useLocalePath();

  if (!userStore.user) {
    return navigateTo(localePath("/auth/login"));
  }
});

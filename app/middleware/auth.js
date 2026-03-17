export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server) return;

  const userStore = useUserStore();

  if (!userStore.user) {
    await userStore.loadUser();
  }

  if (!userStore.user) {
    return navigateTo("/auth/login");
  }
});

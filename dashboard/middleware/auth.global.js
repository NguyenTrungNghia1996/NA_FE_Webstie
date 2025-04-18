import { useUserStore } from "~~/stores/userStore";
import { useJwt } from "@vueuse/integrations/useJwt";

export default defineNuxtRouteMiddleware(async (to) => {
  // Bỏ qua middleware nếu đang ở trang login
  if (to.path === "/auth/login" ||to.path === "/test" ) return;
  const userStore = useUserStore();
  const token = userStore.user?.token;
  if (!token) return navigateTo("/auth/login");
  try {
    const { payload } = useJwt(token);
    const isTokenValid = payload.value?.exp && (Date.now() / 1000 < payload.value.exp);
    if (!isTokenValid) {
      userStore.logout();
      return navigateTo("/auth/login");
    }
  } catch (error) {
    console.error("JWT validation error:", error);
    userStore.logout();
    return navigateTo("/auth/login");
  }
});

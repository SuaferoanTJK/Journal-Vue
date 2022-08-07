<script>
import useAuth from "@/modules/auth/composables/useAuth";
export default {
  setup() {
    const { authStatus, checkAuthStatus } = useAuth();
    checkAuthStatus();
    return authStatus;
  },
};
</script>

<template>
  <router-view />
</template>

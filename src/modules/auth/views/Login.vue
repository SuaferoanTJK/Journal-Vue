<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import useAuth from "@/modules/auth/composables/useAuth";

export default {
  name: "LoginView",
  setup() {
    const { signInUser } = useAuth();
    const router = useRouter();
    const userForm = ref({
      email: "",
      password: "",
    });
    return {
      userForm,
      onSubmit: async () => {
        const { ok, message } = await signInUser(userForm.value);
        if (!ok) {
          let newMessage;
          switch (message) {
            case "EMAIL_NOT_FOUND":
              newMessage = "The email was not found in our DB";
              break;
            case "INVALID_PASSWORD":
              newMessage = "The password is incorrect";
              break;
            default:
              newMessage = "Unexpected Error";
              break;
          }
          Swal.fire("Error", newMessage, "error");
        } else router.push({ name: "noEntry" });
      },
    };
  },
};
</script>

<template>
  <form @submit.prevent="onSubmit" class="space-y-5 mb-4">
    <div class="flex flex-col gap-2">
      <label for="email">Email</label>
      <input
        id="email"
        type="email"
        v-model="userForm.email"
        placeholder="Enter your email"
        class="rounded outline-gray-300"
        required
      />
    </div>
    <div class="flex flex-col gap-2">
      <label for="password">Password</label>
      <input
        id="password"
        type="password"
        v-model="userForm.password"
        placeholder="Enter your password"
        class="rounded outline-gray-300"
        required
      />
    </div>
    <input
      type="submit"
      value="Login"
      class="rounded w-full bg-emerald-700 hover:bg-emerald-600 py-2 px-4 font-semibold text-white cursor-pointer"
    />
  </form>
  <router-link
    :to="{ name: 'register' }"
    class="text-sm hover:underline text-gray-500"
  >
    You don't have an account?
  </router-link>
</template>

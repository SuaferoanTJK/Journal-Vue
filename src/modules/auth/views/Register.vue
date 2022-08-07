<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import useAuth from "@/modules/auth/composables/useAuth";

export default {
  name: "RegisterView",
  setup() {
    const { createUser } = useAuth();
    const router = useRouter();
    const userForm = ref({
      name: "",
      email: "",
      password: "",
    });
    return {
      userForm,
      onSubmit: async () => {
        const { ok, message } = await createUser(userForm.value);
        if (!ok) {
          let newMessage;
          switch (message) {
            case "EMAIL_EXISTS":
              newMessage = "This email is already being used";
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
      <label for="name">Name</label>
      <input
        id="name"
        type="text"
        v-model="userForm.name"
        placeholder="Enter your name"
        class="rounded outline-gray-300"
        required
      />
    </div>
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
      value="Register"
      class="rounded w-full bg-emerald-700 hover:bg-emerald-600 py-2 px-4 font-semibold text-white cursor-pointer"
    />
  </form>
  <router-link
    :to="{ name: 'login' }"
    class="text-sm hover:underline text-gray-500"
  >
    You have an account?
  </router-link>
</template>

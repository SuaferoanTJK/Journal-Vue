<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import useAuth from "@/modules/auth/composables/useAuth";

export default {
  name: "Nav-Component",
  setup() {
    const hidden = ref(true);
    const router = useRouter();
    const { username, logout } = useAuth();

    return {
      hidden,
      username,
      dropdown: () => {
        hidden.value = !hidden.value;
      },
      onLogout: () => {
        router.push({ name: "login" });
        logout();
      },
    };
  },
};
</script>

<template>
  <nav class="bg-white px-4 py-2.5 shadow-md">
    <div
      class="container flex flex-wrap justify-between items-center md:w-10/12 mx-auto"
    >
      <router-link to="/" class="flex items-center">
        <img src="@/assets/logo.png" class="mr-3 h-6 sm:h-9" alt="Vue Logo" />
        <span class="self-center text-xl font-semibold whitespace-nowrap">
          {{ username }}
        </span>
      </router-link>
      <button
        type="button"
        @click="dropdown"
        class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <svg
          class="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <div
        class="justify-between items-center w-full md:flex md:w-auto md:order-1"
        :class="[hidden ? 'hidden' : 'absolute top-10 left-0']"
      >
        <ul
          class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white"
        >
          <li class="flex gap-3 items-center text-slate-700 hover:text-sky-700">
            <button
              @click="onLogout"
              class="block py-2 pr-4 pl-3 rounded md:bg-transparent md:p-0"
            >
              Logout
            </button>
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

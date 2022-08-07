<script>
export default {
  name: "authLayout",
  computed: {
    title() {
      return this.$route.name;
    },
  },
};
</script>

<template>
  <div
    class="min-h-screen relative flex flex-col justify-center items-center px-4 md:px-0"
  >
    <div class="absolute bg-black -z-10">
      <img
        class="h-screen w-screen object-cover opacity-70"
        src="@/assets/bg.jpg"
        alt="bg"
      />
    </div>
    <div class="flex flex-col gap-6 w-full">
      <h1
        class="text-3xl md:text-4xl font-bold text-white text-uppercase text-center capitalize"
      >
        {{ title }}
      </h1>
      <div class="rounded bg-white p-6 w-full md:w-2/3 mx-auto space-y-5">
        <router-view />
      </div>
    </div>
  </div>
</template>

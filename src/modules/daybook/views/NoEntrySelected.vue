<script>
import Fab from "@/modules/daybook/components/Fab.vue";
export default {
  components: {
    Fab,
  },
};
</script>

<template>
  <div
    class="flex flex-col justify-center items-center p-2 min-h-full relative"
  >
    <h1 class="text-3xl font-bold">No Entry Selected</h1>
    <img
      src="@/assets/noEntry.png"
      alt="NoEntry"
      class="text-center w-80 lg:w-[500px]"
    />
    <Fab class="absolute bottom-0 right-0" />
  </div>
</template>

<script>
import Fab from "@/modules/daybook/components/Fab.vue";
export default {
  name: "NoEntrySelected",
  components: {
    Fab,
  },
  methods: {
    createNewEntry() {
      this.$router.push({ name: "entry", params: { id: "new" } });
    },
  },
};
</script>

<template>
  <div
    class="flex flex-col justify-center items-center p-2 md:min-h-[85vh] relative"
  >
    <h1 class="text-3xl font-bold">No Entry Selected</h1>
    <img
      src="@/assets/noEntry.png"
      alt="NoEntry"
      class="text-center w-80 lg:w-[500px]"
    />
    <Fab @on:click="createNewEntry" class="absolute bottom-0 right-0" />
  </div>
</template>

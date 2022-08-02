<script>
export default {
  name: "HomeView",
  methods: {
    goToDaybook() {
      this.$router.push({ name: "noEntry" });
    },
  },
};
</script>

<template>
  <div>
    <h1>This is home page</h1>
    <button @click="goToDaybook">Go to Daybook</button>
  </div>
</template>

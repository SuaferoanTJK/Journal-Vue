<script>
export default {
  name: "Fab-Component",
  props: {
    icon: {
      type: String,
      default: "fa-plus",
    },
  },
};
</script>

<template>
  <button
    @click="$emit('on:click')"
    class="bg-slate-600 hover:bg-slate-500 rounded-[100%] p-3"
  >
    <i class="fa fa-2x text-white" :class="icon"></i>
  </button>
</template>

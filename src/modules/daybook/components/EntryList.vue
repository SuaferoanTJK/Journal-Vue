<script>
import Entry from "./Entry";

export default {
  components: {
    Entry,
  },
};
</script>

<template>
  <div>
    <input
      type="text"
      placeholder="Search entry"
      class="appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow"
    />
    <ul class="mt-4 max-h-64 md:max-h-[80vh] overflow-y-scroll">
      <li v-for="item in 5" :key="item"><Entry /></li>
    </ul>
  </div>
</template>

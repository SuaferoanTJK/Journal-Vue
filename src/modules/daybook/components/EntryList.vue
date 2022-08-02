<script>
import Entry from "./Entry";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      term: "",
    };
  },
  components: {
    Entry,
  },
  computed: {
    ...mapGetters("journal", ["getEntriesByTerm"]),
    entriesByTerm() {
      return this.getEntriesByTerm(this.term);
    },
  },
};
</script>

<template>
  <div>
    <input
      type="text"
      placeholder="Search entry"
      v-model="term"
      class="appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow"
    />
    <ul class="mt-4 max-h-64 md:max-h-[80vh] overflow-y-auto">
      <li v-for="entry in entriesByTerm" :key="entry.id">
        <Entry :entry="entry" />
      </li>
    </ul>
  </div>
</template>

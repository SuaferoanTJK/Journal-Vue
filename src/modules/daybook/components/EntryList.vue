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
    <button
      @click="this.$router.push({ name: 'entry', params: { id: 'new' } })"
      class="rounded w-full bg-lime-700 hover:bg-lime-800 text-white font-semibold cursor-pointer p-2 my-2 flex gap-2 items-center justify-center"
    >
      <i class="fa fa-plus-circle"></i>
      <p>New Entry</p>
    </button>
    <ul class="max-h-64 md:max-h-[80vh] overflow-y-auto">
      <li v-for="entry in entriesByTerm" :key="entry.id">
        <Entry :entry="entry" />
      </li>
    </ul>
  </div>
</template>

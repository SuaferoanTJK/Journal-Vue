<script>
import Fab from "../components/Fab";
import { formatDate } from "../helpers/formatDate";
import { mapGetters } from "vuex";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      entry: null,
    };
  },
  components: {
    Fab,
  },
  computed: {
    ...mapGetters("journal", ["getEntryByID"]),
    date() {
      const date = formatDate(this.entry.date);
      return date;
    },
  },
  methods: {
    loadEntry() {
      const entry = this.getEntryByID(this.id);
      if (!entry) this.$router.push({ name: "noEntry" });
      this.entry = entry;
    },
  },
  created() {
    this.loadEntry();
  },
  watch: {
    id() {
      this.loadEntry();
    },
  },
};
</script>

<template>
  <div
    v-if="entry"
    class="shadow-lg md:min-h-[85vh] p-5 border-2 rounded relative"
  >
    <div class="flex flex-col lg:flex-row gap-2 justify-between">
      <h1 class="font-bold text-3xl text-green-800">
        <p>{{ date }}</p>
      </h1>
      <div class="flex gap-4">
        <button
          class="flex gap-3 items-center bg-red-600 hover:bg-red-700 py-2 px-4 text-white font-semibold rounded"
        >
          <p>Delete</p>
          <i class="fa fa-trash-alt" />
        </button>
        <button
          class="flex gap-3 items-center bg-lime-600 hover:bg-lime-700 py-2 px-4 text-white font-semibold rounded"
        >
          <p>Upload</p>
          <i class="fa fa-upload" />
        </button>
      </div>
    </div>
    <div class="mt-3">
      <div>
        <label for="text" class="font-semibold">Text</label>
        <textarea
          id="text"
          placeholder="What happened today?"
          v-model="entry.text"
          class="rounded w-full py-2 px-3 text-gray-700 leading-tight min-h-[20vh] md:min-h-[50vh]"
        ></textarea>
      </div>
      <div v-if="entry.picture">
        <label class="font-semibold">Image</label>
        <img
          src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/83/4a/64/grand-canyon-national.jpg?w=1200&h=-1&s=1"
          alt="entry-picture"
          class="w-80 md:w-60"
        />
      </div>
      <Fab class="absolute bottom-3 right-3" icon="fa-save" />
    </div>
  </div>
</template>

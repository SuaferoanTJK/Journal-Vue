<script>
import { formatDate } from "../helpers/formatDate";

export default {
  name: "Entry-component",
  props: {
    entry: {
      type: Object,
      required: true,
    },
  },
  computed: {
    shortText() {
      return this.entry.text.length > 100
        ? this.entry.text.substring(0, 100) + "..."
        : this.entry.text;
    },
    date() {
      const date = formatDate(this.entry.date);
      return date;
    },
  },
};
</script>

<template>
  <div class="p-4 bg-white rounded my-4 mr-2 shadow-lg border">
    <div
      @click="$router.push({ name: 'entry', params: { id: entry.id } })"
      class="font-semibold text-lg cursor-pointer hover:underline"
    >
      <p>{{ date }}</p>
    </div>
    <p>{{ shortText }}</p>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapGetters, mapActions } from "vuex";
import Fab from "../components/Fab";
import { formatDate } from "../helpers/formatDate";
import uploadImage from "../helpers/uploadImage";

export default {
  name: "EntryView",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      entry: null,
      localImage: null,
      file: null,
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
    ...mapActions("journal", ["createEntry", "updateEntry", "deleteEntry"]),
    loadEntry() {
      let entry;
      if (this.id === "new") {
        entry = {
          text: "",
          date: new Date().getTime(),
        };
      } else {
        entry = this.getEntryByID(this.id);
        if (!entry) return this.$router.push({ name: "noEntry" });
      }
      this.entry = entry;
    },
    async saveEntry() {
      Swal.fire({
        title: "Please wait",
        allowOutsideClick: false,
      });
      Swal.showLoading();

      const picture = await uploadImage(this.file);
      this.entry.picture = picture;

      if (this.entry.id) {
        await this.updateEntry(this.entry);
      } else {
        const id = await this.createEntry(this.entry);
        this.$router.push({ name: "entry", params: { id } });
      }
      this.file = null;
      Swal.fire("Saved", "Entry registered successfully", "success");
    },
    async onDeleteEntry() {
      const { isConfirmed } = await Swal.fire({
        title: "Are you sure?",
        text: "Once deleted, it can't be recovered",
        showDenyButton: true,
        confirmButtonText: "Yes, I'm sure",
      });
      if (isConfirmed) {
        Swal.fire({
          title: "Please wait",
          allowOutsideClick: false,
        });
        Swal.showLoading();
        await this.deleteEntry(this.entry.id);
        this.$router.push({ name: "noEntry" });
        Swal.fire("Deleted", "", "success");
      }
    },
    onSelectedImage(event) {
      const file = event.target.files[0];
      if (!file) {
        this.localImage = null;
        this.file = null;
        return;
      }
      this.file = file;
      const fr = new FileReader();
      fr.onload = () => (this.localImage = fr.result);
      fr.readAsDataURL(file);
    },
    onSelectImage() {
      this.$refs.imageSelector.click();
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
      <div class="flex flex-col gap-4">
        <input
          type="file"
          @change="onSelectedImage"
          ref="imageSelector"
          v-show="false"
          accept="image/png, image/jpeg, image/jpg"
        />
        <div class="flex gap-2 justify-between">
          <button
            v-if="entry.id"
            @click="onDeleteEntry"
            class="deleteBtn w-full h-12 items-center text-sm bg-red-600 hover:bg-red-700 py-1 px-3 text-white font-semibold rounded"
          >
            Delete
          </button>
          <button
            @click="onSelectImage"
            class="w-full h-12 items-center text-sm bg-lime-600 hover:bg-lime-700 py-1 px-3 text-white font-semibold rounded"
          >
            Upload photo
          </button>
        </div>
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
      <div v-if="localImage">
        <label class="font-semibold">Image</label>
        <img :src="localImage" alt="entry-picture" class="w-80 md:w-60" />
      </div>
      <div v-if="entry.picture && !localImage">
        <label class="font-semibold">Image</label>
        <img :src="entry.picture" alt="entry-picture" class="w-80 md:w-60" />
      </div>
      <Fab
        @on:click="saveEntry"
        icon="fa-save"
        class="absolute bottom-3 right-3"
      />
    </div>
  </div>
</template>

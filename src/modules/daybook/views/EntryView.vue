<script>
import Fab from "../components/Fab";
export default {
  components: {
    Fab,
  },
};
</script>

<template>
  <div class="shadow-lg min-h-full p-5 border-2 rounded relative">
    <div class="flex flex-col lg:flex-row gap-2 justify-between">
      <h1 class="font-bold text-3xl text-green-800">
        <span>15th </span><span>July </span><span>2022</span>
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
          class="rounded w-full py-2 px-3 text-gray-700 leading-tight min-h-[20vh] md:min-h-[50vh]"
        ></textarea>
      </div>
      <div>
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

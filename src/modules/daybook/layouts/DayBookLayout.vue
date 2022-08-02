<script>
import Navbar from "../components/Navbar";
import EntryList from "../components/EntryList";

export default {
  components: { Navbar, EntryList },
};
</script>

<template>
  <Navbar />
  <div class="flex flex-col md:flex-row gap-5 px-4 md:w-10/12 mx-auto my-5">
    <div class="w-full md:w-1/2 lg:w-1/4 pb-5 md:pb-0 border-b-2 md:border-b-0">
      <EntryList />
    </div>
    <div class="w-full md:w-1/2 lg:w-3/4"><router-view /></div>
  </div>
</template>

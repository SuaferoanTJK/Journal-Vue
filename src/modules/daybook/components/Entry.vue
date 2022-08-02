<script>
export default {
  name: "Entry-component",
};
</script>

<template>
  <div class="p-4 bg-white rounded m-4 ml-0 shadow-lg border">
    <div
      @click="$router.push({ name: 'entry', params: { id: 10 } })"
      class="font-semibold text-lg cursor-pointer hover:underline"
    >
      <span>15th </span><span>July </span><span>2022</span>
    </div>
    <div>
      Deserunt eu anim quis aliqua exercitation sint deserunt ad anim irure
      cillum sint nisi ut. Lorem nisi ex officia officia consequat id quis
      tempor nostrud. Officia eu sunt ut Lorem sit voluptate mollit.
    </div>
  </div>
</template>

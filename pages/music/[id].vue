<script lang="ts" setup>
import { BASE_URL } from "~/constants";

const route = useRoute();
const id = route.params.id;
// d5fe314a-6ae5-448e-a21c-2b350a387ad3

// useFetch(BASE_URL + "/")

// useHead({
//   title: "Music Name",
// });
</script>

<template>
  <section class="bg-base-200 p-10">
    <div class="flex items-center justify-center space-x-8">
      <img
        src="https://upload.wikimedia.org/wikipedia/en/7/7e/Martin_Garrix_-_Animals.png"
        alt="Music Image"
        class="rounded-lg w-[10rem] h-[10rem]"
      />
      <div>
        <h1 class="text-4xl font-bold">Music Name</h1>
        <p>Artists</p>
      </div>
    </div>
  </section>
</template>

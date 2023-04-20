<script lang="ts" setup>
import { Music } from "~/types";

defineProps<{
  music: Music;
}>();
</script>
<template>
  <div
    class="w-full hover:bg-gray-100 rounded-xl cursor-pointer transition p-2 py-3 flex items-center justify-between"
  >
    <div class="flex items-center space-x-8">
      <img
        src="https://upload.wikimedia.org/wikipedia/en/7/7e/Martin_Garrix_-_Animals.png"
        class="w-[6rem] h-[6rem] rounded-lg shadow-2xl object-cover"
        alt="Gitinnit User's Profile Image"
      />
      <div class="py-1">
        <h1 class="text-3xl font-bold">{{ music.name }}</h1>
        <p>{{ music.artists.map((item) => item.name).join(", ") }}</p>
      </div>
    </div>

    <div>play</div>
  </div>
</template>

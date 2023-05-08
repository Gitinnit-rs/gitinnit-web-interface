<script lang="ts" setup>
import { Music } from "@/types";

defineProps<{
  music: Music;
}>();
</script>
<template>
  <div class="w-full rounded-xl p-2 py-3 flex items-center justify-between">
    <div class="flex items-center space-x-6">
      <img
        src="https://upload.wikimedia.org/wikipedia/en/7/7e/Martin_Garrix_-_Animals.png"
        class="w-[4.5rem] h-[4.5rem] rounded-lg shadow-2xl object-cover"
        alt="Gitinnit Music Profile Image"
      />
      <div class="py-1">
        <h1 class="font-bold">{{ music.name }}</h1>
        <p v-if="music.artists" class="text-xs">
          <span v-for="(artist, i) in music.artists" :key="artist.id">
            {{ artist.name }}
            <span v-if="i !== music.artists.length - 1">, </span>
          </span>
        </p>
      </div>
    </div>

    <div>
      <slot name="actions" />
    </div>
  </div>
</template>

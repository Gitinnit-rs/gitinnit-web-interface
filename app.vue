<script setup lang="ts">
import AudioPlayer from './components/AudioPlayer.vue';

useHead({
  titleTemplate: "%s - Gitinnit",
});
</script>

<template>
  <div data-theme="cmyk" class="min-h-screen">
    <!-- <Sidebar /> -->
    <Navbar />
    <NuxtPage />
    <AudioPlayer />
  </div>
</template>

<style>
@import url("@/assets/style.css");
</style>

<script setup lang="ts">
import AudioPlayer from "./components/AudioPlayer.vue";

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

.responsive-grid {
    @apply gap-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5;
}
</style>

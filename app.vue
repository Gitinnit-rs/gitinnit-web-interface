<script setup lang="ts">
useHead({
  titleTemplate: "%s - Gitinnit",
});
</script>

<template>
  <div data-theme="cmyk" class="min-h-screen">
    <!-- <Sidebar /> -->
    <Navbar />
    <NuxtPage />
  </div>
</template>

<style>
@import url("@/assets/style.css");
</style>
